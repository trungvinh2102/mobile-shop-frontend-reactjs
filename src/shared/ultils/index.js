import { BASE_URL } from "../constants/app";
// const data = "Vietpro";
export const getImageProduct = (imageName) => {
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}

export const formatPrice = (price) => {
    if (price == null) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
