const GetProductsOnPageRefresh = () => {
    let res_product = [];
    let total_amount = 0;
    let total_qty = 0;
    res_product = JSON.parse(sessionStorage.getItem('shop_cart'))
    res_product.map(item => {

        total_amount += item.qty * parseInt(item.price);
        total_qty += item.qty;
    })
    return ({ type: "SAVED_PRODUCTS", product: res_product, total_amount: total_amount, total_qty: total_qty })
}

export default GetProductsOnPageRefresh;