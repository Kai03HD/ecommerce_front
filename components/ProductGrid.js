import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { useState } from "react";
import SearchBar from "@/components/SearchBar"; // Import SearchBar

const StyledProductGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-top: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const SearchWrapper = styled.div`
  margin-bottom: 20px; /* Khoảng cách giữa thanh tìm kiếm và danh sách sản phẩm */
  text-align: center; /* Căn giữa thanh tìm kiếm */
`;

export default function ProductGrid({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products); // State lọc sản phẩm

  // Hàm xử lý tìm kiếm
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredProducts(products); // Hiển thị toàn bộ sản phẩm nếu không có từ khóa
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <SearchWrapper>
        <SearchBar onSearch={handleSearch} />
      </SearchWrapper>

      {/* Danh sách sản phẩm */}
      <StyledProductGrid>
        {filteredProducts?.length > 0 &&
          filteredProducts.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </StyledProductGrid>
    </div>
  );
}