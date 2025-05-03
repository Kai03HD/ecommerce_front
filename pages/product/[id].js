import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartIcon from "@/components/icons/CartIcon";
import ProductImage from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
`;
const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext);
    const formatPrice = (price) => {
      return price.toLocaleString("vi-VN") + "đ";
    };
    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                <WhiteBox>
                <ProductImage images={product.images} />
                </WhiteBox>
                <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <PriceRow>
              <div>
              <Price>{formatPrice(product.price)}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />Thêm vào giỏ hàng
                </Button>
              </div>
            </PriceRow>
                </div>
                </ColWrapper>
              
            </Center>
        </>    
    )
}
export  async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return{
        props:{
           
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}