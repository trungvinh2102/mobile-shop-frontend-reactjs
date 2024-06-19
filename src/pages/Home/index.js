import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import Heading from "../../shared/components/common/Heading";
const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    // Featured
    getProducts({
      params: {
        limit: 6,
        "filter[is_featured]": true,
      }
    }).then(({ data }) => {
      setFeaturedProducts(data.data.docs);
    });

    // Latest
    getProducts({
      params: {
        limit: 6,
      }
    }).then(({ data }) => {
      setLatestProducts(data.data.docs);
    });
  }, []);

  useEffect(() => {
    document.title = "MobileShop - Trang chủ"
  }, [])

  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <Heading className="text-uppercase">Sản phẩm nổi bật</Heading>
        <div className="product-list card-deck">
          {
            featuredProducts.map((product, index) =>
              <ProductItem key={index} item={product} />
            )
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <Heading className="text-uppercase">Sản phẩm mới</Heading>
        <div className="product-list card-deck">
          {
            latestProducts.map((product, index) =>
              <ProductItem key={index} item={product} />
            )
          }
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};
export default Home;
