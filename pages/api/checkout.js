import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Should be a POST request." });
  }

  const { name, phoneNumber, email, city, streetAddress, cartProducts } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !city || !streetAddress || !cartProducts || cartProducts.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Kết nối tới MongoDB
    await mongooseConnect();

    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const uniqueIds = [...new Set(cartProducts)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    if (!productsInfos || productsInfos.length === 0) {
      return res.status(404).json({ error: "No products found for the given IDs." });
    }

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find((p) => p._id.toString() === productId);
      const quantity = cartProducts.filter((id) => id === productId).length || 0;

      if (quantity > 0 && productInfo) {
        const unitPrice = productInfo.price; // Chuyển giá sang đồng (VND)
        line_items.push({
          quantity,
          price_data: {
            currency: "VND",
            product_data: { name: productInfo.title },
            unit_amount: unitPrice,
          },
        });
      }
    }

    // Tính tổng giá trị đơn hàng
    const totalAmount = line_items.reduce(
      (sum, item) => sum + item.price_data.unit_amount * item.quantity,
      0
    );

    // Ghi log để debug
    console.log("Line Items:", line_items);
    console.log("Total Amount:", totalAmount);

    // Kiểm tra nếu tổng giá trị vượt quá giới hạn của Stripe
    if (totalAmount > 99_999_999) {
      return res.status(400).json({
        error: "The total amount exceeds the maximum allowed value of 99,999,999 VND.",
      });
    }

    // Lưu đơn hàng vào MongoDB
    const orderDoc = await Order.create({
      line_items: line_items.map((item) => ({
        quantity: item.quantity,
        price: item.price_data.unit_amount / 100, // Chuyển về giá trị gốc (nghìn đồng)
      })),
      name,
      phoneNumber,
      email,
      city,
      streetAddress,
      paid: false,
    });

    const PUBLIC_URL = process.env.PUBLIC_URL || process.env.LOCAL_URL || "http://localhost:3000";

    // Tạo phiên thanh toán Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items.map((item) => ({
        quantity: item.quantity,
        price_data: item.price_data,
      })),
      mode: "payment",
      customer_email: email,
      success_url: `${PUBLIC_URL}/cart?success=1`,
      cancel_url: `${PUBLIC_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString() },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error in checkout handler:", error); // Ghi log lỗi chi tiết
    res.status(500).json({ error: error.message || "An error occurred during payment." });
  }
}