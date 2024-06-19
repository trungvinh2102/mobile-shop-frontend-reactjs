import { getImageProduct } from "../ultils";
import { Link } from "react-router-dom";
import { formatPrice } from "../ultils/index";

const ProductItem = ({ item }) => {
  return (
    <div className="text-center product-item card">
      <Link to={`/ProductDetails-${item._id}`}>
        <img alt="" src={getImageProduct(item.image)} />
      </Link>
      <h4>
        <Link to={`/ProductDetails-${item._id}`}>{item.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{formatPrice(item.price)}đ</span>
      </p>
    </div>
  );
};
export default ProductItem;
