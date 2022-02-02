import axios from "axios";
const GetDefaultProducts = () => {
    let products = [];
    let total_amount = 0;
    let total_qty = 0;
    return async (dispatch) => {
        await axios.get("https://dnc0cmt2n557n.cloudfront.net/products.json")
            .then((response_products) => {
                if (response_products.data.products && response_products.data.products.length > 0) {
                    response_products.data.products.map((item, index) => {
                        products.push({ ...item, qty: 1 })
                    })
                }
                products.map(item => {
                    total_amount += item.qty * parseInt(item.price);
                    total_qty += item.qty;
                })
                sessionStorage.setItem('shop_cart', JSON.stringify(products));
                dispatch({ type: "DEFAULT_PRODUCTS", product: products, total_amount: total_amount, total_qty: total_qty })

            })
            .catch(err => {
                dispatch({ type: "SERVICE_ERROR", error: err.message })
            })

    }
}
export default GetDefaultProducts;