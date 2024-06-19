import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const limit = 9;
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    limit,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        limit,
        page,
      }
    })
      .then(({ data }) => {
        setPages({ ...pages, ...data.data.pages });
        setProducts(data.data.docs);
        window.scrollTo(0, 400); // Cuộn trang lên đầu sau khi nhận dữ liệu mới
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ keyword, page: newPage });
  };

  useEffect(() => {
    document.title = "MobileShop - Danh sách sản phảm"
  }, [])

  return (
    <div>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {
            products?.map((product) =>
              <ProductItem item={product} />
            )
          }
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
export default Search;
