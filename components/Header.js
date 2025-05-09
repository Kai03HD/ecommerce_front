import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/BarIcon";

const StyleHeader = styled.header`
        background-color: #222

`
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`
const Wrapper = styled.div`
    display: flex;    
    justify-content: space-between;
    padding: 20px 0;
`
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
   top: 70px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export default function Header()
{
    const [mobileNavActive,setMobileNavActive] = useState(false);
    const {cartProducts} = useContext(CartContext);
    return (
        <StyleHeader>
            <Center>
                <Wrapper>
                <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav mobileNavActive={mobileNavActive}>
                <NavLink href={"/"}>Trang chủ</NavLink>
                <NavLink  href={"/products"}>Sản phẩm</NavLink >
                <NavLink  href={"/categories"}>Danh sách sản phẩm</NavLink >
                <NavLink  href={"/account"}>Tài khoản</NavLink >
                <NavLink  href={"/cart"}>Giỏ hàng({cartProducts.length})</NavLink >
            </StyledNav>
                <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                         <BarsIcon />
                 </NavButton>
                </Wrapper>
            
            </Center>
        </StyleHeader>
    )
}