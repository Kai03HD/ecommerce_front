import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    margin-top: 40px;
    gap: 40px;
`;
const ProductCell = styled.td`
    padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
const CartBox = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 10px; 
`;
const Holder = styled.div`
  display: flex;
  gap: 5px;
`;
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function plusProduct(id) {
        addProduct(id);
    }

    function minusProduct(id) {
        removeProduct(id);
    }

    async function doPayment() {
        if (!validateInputs()) return;

        try {
            const response = await axios.post('/api/checkout', {
                name, phoneNumber, email, city, streetAddress, cartProducts,
            });
            if (response.data.url) {
                window.location = response.data.url;
            }
        } catch (error) {
            console.error('Payment failed:', error);
            const errorMessage = error.response?.data?.error || 'An error occurred during payment. Please try again.';
            alert(errorMessage);
        }
    }

    function validateInputs() {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Invalid email address.');
            return false;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            alert('Invalid phone number.');
            return false;
        }
        return true;
    }

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    let total = 0;
    if (products?.length) {
        for (const productId of cartProducts) {
            const price = products.find(p => p._id === productId)?.price || 0;
            total += price;
        }
    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnWrapper>
                        <CartBox>
                            <h1>Cảm ơn bạn đã mua hàng</h1>
                            <p>Chúng tôi sẽ email cho bạn khi sản phẩm đã gửi</p>
                        </CartBox>
                    </ColumnWrapper>
                </Center>
            </>
        );
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnWrapper>
                    <CartBox>
                        <h2>Giỏ hàng</h2>
                        {!cartProducts?.length && (
                            <div>Bạn chưa có sản phẩm</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="" />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductCell>
                                            <td>
                                                <Button onClick={() => minusProduct(product._id)}>-</Button>
                                                <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                                                <Button onClick={() => plusProduct(product._id)}>+</Button>
                                            </td>
                                            <td>{formatPrice(cartProducts.filter(id => id === product._id).length * product.price)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{formatPrice(total)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </CartBox>
                    {!!cartProducts?.length && (
                        <CartBox>
                            <h2>Thông tin đặt hàng</h2>
                            <Holder>
                                <Input type="text"
                                    placeholder="Name"
                                    value={name}
                                    name="name"
                                    onChange={ev => setName(ev.target.value)} />
                                <Input type="tel"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    name="phoneNumber"
                                    pattern="[0-9]{10}"
                                    onChange={ev => setPhoneNumber(ev.target.value)} />
                            </Holder>
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text"
                                placeholder="City"
                                value={city}
                                name="city"
                                onChange={ev => setCity(ev.target.value)} />
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Button block black onClick={doPayment}>Tiếp tục thanh toán</Button>
                        </CartBox>
                    )}
                </ColumnWrapper>
            </Center>
        </>
    );
}