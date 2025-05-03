import styled from "styled-components"
import ProductBox from "@/components/ProductBox";

const StyledProductGrid = styled.div`
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-top: 30px;
    @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

`
export default function ProductGrid({products}){
    return(
        <StyledProductGrid>
              {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
        </StyledProductGrid>
    )
}