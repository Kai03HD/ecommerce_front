import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th{
         text-align: left;
         text-transform: uppercase;
         color: #ccc;
         font-size: .7rem;
         font-weight: 700;
    }
    td{
           border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`
export default function Table(props){
    return(
        <StyledTable {...props} />
    )
}