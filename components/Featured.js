import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";

const Bg = styled.div`
    background-color: #222;
    color: #fff
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    color: #fff
`
const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }  // Khi màn hình lớn hơn 768px
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;// chia 2 cột
    div:nth-child(1) {
      order: 0;// trở lại thứ tự bình thường
    }
    img{
      max-width: 100%;
    }
  }
`;
const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`
const Column = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
export default function Featured({product}){
    const {addProduct} = useContext(CartContext)
    function addFeaturedToCart(){
        addProduct(product._id)
    }
    return(
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                    <div>
                        <Title>{product?.title}</Title>
                      <Desc>{product?.description}</Desc>
                      <ButtonWrapper>
                      <ButtonLink href={'/product/'+product?._id} outline={1} white={1} >Xem thêm</ButtonLink>
                      <Button white onClick={addFeaturedToCart}>
                        <CartIcon/>
                  Thêm vào giỏ hàng
                      </Button>
                      </ButtonWrapper>
                   
                     </div>
                     </Column>
                     <Column>
                    <div>
                        <img src="https://res.cloudinary.com/kaiser-next-ecommerce/image/upload/v1746287180/ecommerce_uploads/e2ejnxczjgi9zltiyiwb.png"/>
                    </div>
                    </Column>
                </Wrapper>
            </Center>        
        </Bg>
        
)}