const AddOrRemoveProducts = (item_id, operation, product) => {
    let calc_amt = 0;
    let total_qty = 0;
    let updateProduct = [...product];
    if (operation == "+") {
        updateProduct.map(item => {
            if (item.id === item_id) {
                item.qty = item.qty + 1;
            }
        })
    }
    else {
        updateProduct.map(item => {
            if (item.id === item_id) {
                if (item.qty >= 0) {
                    item.qty = item.qty - 1;
                }
            }
        })
    }
    updateProduct.map(item => {
        calc_amt += item.qty * parseInt(item.price);
        total_qty += item.qty;
    })
    sessionStorage.setItem('shop_cart', JSON.stringify(updateProduct));
    return ({ type: "ADD_OR_REMOVE_PRODUCTS", product: updateProduct, total_amount: calc_amt, total_qty: total_qty })

}

export default AddOrRemoveProducts;