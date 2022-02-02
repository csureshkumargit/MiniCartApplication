import React from "react";
import GetDefaultProducts from "../store/Actions/GetDefaultProducts";
import GetProductsOnPageRefresh from "../store/Actions/GetProductsOnPageRefresh";
import AddOrRemoveProducts from "../store/Actions/AddOrRemoveProducts";
import "../Styles/Cart.css"
import { connect } from "react-redux";
class Cart extends React.Component {
    componentDidMount() {
        if (sessionStorage.getItem('shop_cart') && sessionStorage.getItem('shop_cart').length > 0) {
            this.props.getProductsOnPageRefresh();
        }
        else {
            this.props.getDefaultProducts();
        }
    }
    render() {

        const { product, usrmsg } = this.props;
        return (
            <div className="container" data-test="cart">
                {product && product.length > 0 && product.map((item, index) =>
                    <div className="row cart-item" key={item.id}>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <img src={`../Assets${item.image}`} alt={item.title} className="cart-image"></img>
                        </div>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-5 col-xl-5">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 cart-title" data-testid="Product">
                                {item.title}
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 cart-description">
                                {item.desc}
                            </div>
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2">

                            {item.qty > 0 ? <button onClick={() => this.props.addOrRemoveProducts(item.id, "-", product)} className="cart-add-remove-btn" data-test={`removeItem-${index}`}>-</button> :
                                <button className="cart-add-remove-btn" disabled >-</button>}
                            <button className="cart-add-remove-btn cart-btn-qty">{item.qty}</button>
                            <button onClick={() => this.props.addOrRemoveProducts(item.id, "+", product)} className="cart-add-remove-btn" data-test={`addItem-${index}`}>+</button>

                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 cart-price">
                            {item.currency}{item.qty * item.price}
                        </div>
                        {product.length != index + 1 ? <hr size="5"></hr> : null}
                    </div>

                )
                }
                {usrmsg && usrmsg.length > 0 ? <div className="usr-msg" data-test='usrmsg'>{usrmsg}</div> : null}
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDefaultProducts: () => dispatch(GetDefaultProducts()),
        getProductsOnPageRefresh: () => dispatch(GetProductsOnPageRefresh()),
        addOrRemoveProducts: (itemId, Operation, product) => dispatch(AddOrRemoveProducts(itemId, Operation, product))
    }

}
const mapStateToProps = (state) => {
    return {
        product: state.cartItems.product,
        total_amount: state.cartItems.total_amount,
        usrmsg: state.cartItems.usrmsg,
        error: state.cartItems.error
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);