import React from "react";
import Modal from "react-modal";
import AddorRemoveProductsFromMiniCart from "../store/Actions/AddorRemoveProductsFromMiniCart";
import GetModalActionForMinCart from "../store/Actions/GetModalActionForMinCart";
import '../Styles/Header.css'
import { connect } from "react-redux";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};
class Header extends React.Component {
    render() {
        const { total_amount, total_qty, product, modalIsOpenForMiniCart } = this.props;
        return (
            <div className="container-fluid" data-test="Header">
                <div className="row header">
                    <div className="offset-8 offset-sm-10 offset-md-10 offset-lg-10 offset-xl-10 col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 header-amt-qty">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 total-cart-amt-header">
                                    &#36;{total_amount}
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 total-cart-qty-header">
                                    {total_qty}Items
                                </div>
                            </div>
                            <div className="col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9" onClick={() => this.props.openOrCloseMiniCart(!modalIsOpenForMiniCart)} data-test='OpenMinicart'>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    {/* <strong class="fa-solid fa-cart-shopping"></strong> */}
                                    <strong className="fa-solid fa-sort-down sort-down"></strong>
                                    <strong className="fa-solid fa-dolly cart-icon"></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpenForMiniCart}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="container">
                        <span onClick={() => this.props.openOrCloseMiniCart(!modalIsOpenForMiniCart)} className="modal-close-icon" data-test='CloseMinicart'>X</span>
                        {product && product.length > 0 && product.map((item, index) =>
                            <div className="row min-cart-item" key={item.id}>
                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 min-remove-cart-item" onClick={() => { this.props.removeProductFromMiniCart(item.id, product) }}
                                    data-test={`RemoveItemMinicart-${index}`}>
                                    X
                                </div>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 min-cart-product-title">
                                            {item.title}
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            {item.currency}{item.qty * item.price}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 min-cart-product-qty">
                                    Qty {item.qty}
                                </div>
                                {product.length !== index + 1 ? <hr size="5"></hr> : null}
                            </div>
                        )
                        }
                    </div>
                </Modal>
                <hr size="6"></hr>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromMiniCart: (itemId, product) => dispatch(AddorRemoveProductsFromMiniCart(itemId, product)),
        openOrCloseMiniCart: (value) => dispatch(GetModalActionForMinCart(value))
    }

}
const mapStateToProps = (state) => {
    return {
        product: state.cartItems.product,
        total_amount: state.cartItems.total_amount,
        total_qty: state.cartItems.total_qty,
        modalIsOpenForMiniCart: state.cartItems.modalIsOpenForMiniCart,
        error: state.cartItems.error
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);