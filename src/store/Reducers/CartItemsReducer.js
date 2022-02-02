
const initState = {
    product: [],
    total_amount: 0,
    total_qty: 0,
    modalIsOpenForMiniCart: false,
    usrmsg: undefined,
    error: undefined
}
const CartItemsReducer = (state = initState, action) => {


    let cartItems = {
        "DEFAULT_PRODUCTS": { ...state, product: action.product, total_amount: action.total_amount, total_qty: action.total_qty, usrmsg: undefined },
        "SAVED_PRODUCTS": { ...state, product: action.product, total_amount: action.total_amount, total_qty: action.total_qty },
        "ADD_OR_REMOVE_PRODUCTS": { ...state, product: action.product, total_amount: action.total_amount, total_qty: action.total_qty },
        "ADD_OR_REMOVE_PRODUCTS_MIN_CART": { ...state, product: action.product, total_amount: action.total_amount, total_qty: action.total_qty },
        "NO_PRODUCTS_IN_MIN_CART": {
            ...state, product: action.product, modalIsOpenForMiniCart: action.modalIsOpenForMiniCart,
            total_amount: action.total_amount, total_qty: action.total_qty, usrmsg: action.usrmsg
        },
        "MODAL_MINCART_OPEN_OR_CLOSE": { ...state, modalIsOpenForMiniCart: action.modalIsOpenForMiniCart },
        "SERVICE_ERROR": { ...state, error: action.error }
    }
    return (cartItems[action.type] || state);
}

export default CartItemsReducer;