import React, { useState, useEffect } from "react";
import { getProductsCategory, getCategory } from "../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";
import Heading from './../../shared/components/common/Heading';
import Pagination from "../../shared/components/Pagination";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const limit = 9;
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState({ limit });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    getCategory(id)
      .then(({ data }) => {
        setCategory(data.data.docs[0].category_name);
      })
      .catch(error => {
        console.error("Error in getCategory:", error);
      });

    getProductsCategory(id, {
      params: {
        limit,
        page,
        keyword
      }
    })
      .then(({ data }) => {
        setTotal(data.data.pages.total);
        setProducts(data.data.docs);
        setPages({ ...pages, ...data.data.pages });
        window.scrollTo(0, 400);
      })
      .catch(error => {
        console.error("Error in getProductsCategory:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, keyword]);

  useEffect(() => {
    document.title = "MobileShop - Danh sách sản phẩm";
  }, []);

  const handlePageChange = (newPage) => {
    setSearchParams({ keyword, page: newPage });
  };


  return (
    <div>
      <div className="products">
        <div className="category-name">
          <Heading className="text-uppercase">{category}</Heading>
          <span className="text-red product-total mb-3">({total})</span>
        </div>
        <div className="product-list card-deck">
          {products.map((product) => (
            <ProductItem key={product._id} item={product} />
          ))}
        </div>
      </div>
      <div id="pagination">
        <Pagination pages={pages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Category;
