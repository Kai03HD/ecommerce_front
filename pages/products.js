
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";


const Title = styled.h1`
  font-size: 1.5em;
`;

export default function ProductPage({products}){
        return(
            <>
            <Header />
            <Center>
               <Title>Tất cả sản phẩm</Title>
               <ProductGrid products={products}/>
            </Center>
           
            </>
        )
    }
export async function getServerSideProps(){
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return{
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}