import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query); // Gửi từ khóa tìm kiếm lên component cha
  };

  return (
    <div
      style={{
        position: "absolute", // Đặt thanh tìm kiếm ở vị trí tuyệt đối
        top: "20px", // Cách phía trên 20px
        right: "20px", // Cách phía phải 20px
        zIndex: 1000, // Đảm bảo thanh tìm kiếm nằm trên các thành phần khác
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Thanh input */}
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "250px", // Chiều rộng thanh tìm kiếm
            padding: "8px 12px", // Thêm padding trên dưới và bên phải
            paddingLeft: "40px", // Tạo khoảng cách bên trái để không bị che bởi biểu tượng
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "20px", // Bo góc
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Đổ bóng
          }}
        />
        {/* SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px", // Đặt icon cách mép trái 10px
            transform: "translateY(-50%)", // Căn giữa theo chiều dọc
            width: "20px", // Kích thước icon
            height: "20px",
            color: "#555", // Màu của icon
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
}