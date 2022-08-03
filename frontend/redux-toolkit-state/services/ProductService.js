import multi_http from '../http-multipart-data';
import http from '../http-common';

const create_product = (product) => {
    return multi_http.post(`/product/createProduct`, product);
};

const update_product = (product, id) => {
    return multi_http.put(`/product/updateProduct/${id}`, product);
};

const get_products = () =>{
    return http.get('/product');
}

const delete_product = (id) =>{
    return http.delete(`/product/deleteProduct/${id}`);
}

const get_product_by_id = (id) =>{
    return http.get(`/product/getProduct/${id}`);
}



const ProductService = {
   create_product,
   get_products,
   delete_product,
   get_product_by_id,
   update_product,
};
export default ProductService;