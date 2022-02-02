const GetModalActionForMinCart = (value) => {
    return ({ type: "MODAL_MINCART_OPEN_OR_CLOSE", modalIsOpenForMiniCart: value })
}

export default GetModalActionForMinCart;