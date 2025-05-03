import styled from "styled-components"
import CartIcon from "./icons/CartIcon"
import Button from "./Button"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const ProductWrapper = styled.div`

`
const Box = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`
const ProductInfoBox = styled.div`
    margin-top: 5px;
`
const PriceRow = styled.div`
  display: block; /* Thay đổi từ flex sang block */
  margin-top: 2px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column; /* Đặt flex-direction thành column để xuống dòng */
    gap: 5px; /* Khoảng cách giữa giá và nút */
    align-items: flex-start; /* Căn lề trái */
  }
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;
const Title = styled(Link)`
    font-weight: normal;
    font-size:.9rem;
    color:inherit;
    text-decoration:none;
    margin:0;
`
export default function ProductBox({_id, title, description, price, images}) {
    const {addProduct} = useContext(CartContext);
    const url = '/product/' + _id;
  
    return (
      <ProductWrapper>
        <Box href={url}>
          <div>
            <img src={images?.[0]} alt=""/>
          </div>
        </Box>
        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            {/* Định dạng số tiền với toLocaleString */}
            <Price>
              {price.toLocaleString('vi-VN')}đ
            </Price>
            <Button block onClick={() => addProduct(_id)} primary outline>
            Thêm vào giỏ hàng
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    );
  }