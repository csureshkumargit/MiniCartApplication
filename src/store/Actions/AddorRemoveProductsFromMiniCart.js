const AddorRemoveProductsFromMiniCart = (item_id, product) => {
    let updproduct = [];
    let total_amount = 0;
    let total_qty = 0;
    if (Array.isArray(product) && product.length > 0) {
        updproduct = product.filter(item => item.id !== item_id)
    }
    if (updproduct.length > 0) {
        sessionStorage.setItem('shop_cart', JSON.stringify(updproduct));
        updproduct && updproduct.length > 0 && updproduct.map(item => {

            total_amount += item.qty * parseInt(item.price);
            total_qty += item.qty;
        })
        return ({ type: "ADD_OR_REMOVE_PRODUCTS_MIN_CART", product: updproduct, total_amount: total_amount, total_qty: total_qty })
    }
    else {
        sessionStorage.clear('shop_cart');
        return ({
            type: "NO_PRODUCTS_IN_MIN_CART", product: updproduct, modalIsOpenForMiniCart: false,
            total_amount: 0, total_qty: 0, usrmsg: "No items in your cart. Please refresh your page to get the default Products."
        })
    }


}
export default AddorRemoveProductsFromMiniCart;