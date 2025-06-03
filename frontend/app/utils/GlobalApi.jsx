const { default: axios } = require("axios");
// import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api",
})

const getCategory = () => axiosClient.get('/categories?populate=*');
const getSliders = () => axiosClient.get('/sliders?populate=*').then((resp) => {
    return resp.data.data;
})
const getDiscountBanner = () => axiosClient.get('/discount-banners?populate=*');

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
});
const SignIn = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})
const getBlogBySlug = (slug) => axiosClient.get(`/blogs?filters[slug][$eq]=${slug}&populate=*`);

const getAllProducts = async () => {
    const res = await fetch(`http://localhost:1337/products?populate=*`);
    return await res.json();
};
const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt,
    }
});

const getCartItems = (userId, jwt) => axiosClient.get('/user-carts?filters[userId][$eq]=' + userId + '&populate[products][populate]=image',
    {
        headers: {
            Authorization: 'Bearer ' + jwt,
        }
    }).then((resp) => {
        const data = resp.data.data;
        const cartItemsList = data.map((item, index) => {
            const product = item.products?.[0] || {}; // handle array properly

            return {
                id: item.id,
                quantity: item.quantity,
                amount: item.amount,
                name: product.name || 'No name',
                actualPrice: product.mrp || 0,
                amount: product.price || 0,
                image:
                    product?.image?.formats?.small?.url,
                products: product.id
            };
        });

        return cartItemsList;
    })
const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/'+id, {
    headers: {
        Authorization: 'Bearer ' + jwt,
    }
});

export default {
    getCategory,
    getSliders,
    getDiscountBanner,
    registerUser,
    SignIn,
    getBlogBySlug,
    getAllProducts,
    addToCart,
    getCartItems,
    deleteCartItem,
}