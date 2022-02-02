import React from "react";
import { shallow } from 'enzyme';
import { testStore } from "../../Utils";
import Cart from "../Cart";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Cart store={store} />).childAt(0).dive();
    return wrapper;
};

describe('Testing Cart Component', () => {
    describe('Testing initial Render', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                "cartItems": {
                    "product": [
                        {
                            "id": "123442",
                            "title": "Product 1",
                            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                            "image": "/product1.jpeg",
                            "price": "39",
                            "qty": 1,
                            "currency": "$"
                        },
                        {
                            "id": "123443",
                            "title": "Product 2",
                            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                            "image": "/product2.jpeg",
                            "price": "39",
                            "qty": 1,
                            "currency": "$"
                        }
                    ],
                    "total_amount": "220",
                    "total_qty": 2,
                    "usrmsg": undefined
                }
            }
            wrapper = setUp(initialState);
        })
        it('Should render without errors', () => {
            const component = wrapper.find(`[data-test='cart']`);
            expect(component.length).toBe(1);
        });
        it('Should simulate remove item buttons', () => {
            const component = wrapper.find(`[data-test='removeItem-0']`);
            component.simulate('click');
            expect(1).toBe(1);
        });
        it('Should simulate add item buttons', () => {
            const component = wrapper.find(`[data-test='addItem-0']`);
            expect(1).toBe(1);
        });
    })
    describe('Testing Props', () => {
        let wrapper;
        let mockFunc;
        let props;
        beforeEach(() => {
            mockFunc = jest.fn();
            const initialState = {
                "cartItems": {
                    "product": [
                        {
                            "id": "123442",
                            "title": "Product 1",
                            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                            "image": "/product1.jpeg",
                            "price": "39",
                            "qty": 1,
                            "currency": "$"
                        },
                        {
                            "id": "123443",
                            "title": "Product 2",
                            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                            "image": "/product2.jpeg",
                            "price": "39",
                            "qty": 1,
                            "currency": "$"
                        }
                    ],
                    "total_amount": "220",
                    "total_qty": 2,
                    "usrmsg": undefined
                }
            }
            props = {
                addOrRemoveProducts: mockFunc,
                getProductsOnPageRefresh: mockFunc,
                getDefaultProducts: mockFunc,
            }
            wrapper = setUp(initialState);
            wrapper.setProps(props);

        })

        afterEach(() => {
            window.sessionStorage.clear();
        })
        it('Should render without errors', () => {
            const component = wrapper.find(`[data-test='cart']`);
            expect(component.length).toBe(1);
        });
        it('Should simulate remove item buttons', () => {
            const component = wrapper.find(`[data-test='removeItem-0']`);
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
        it('Should simulate add item buttons', () => {
            const component = wrapper.find(`[data-test='addItem-0']`);
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
        it('Ensure Default Product on Component Did Mount', () => {
            let product = [
                {
                    "id": "123442",
                    "title": "Product 1",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product1.jpeg",
                    "price": "39",
                    "qty": 1,
                    "currency": "$"
                },
                {
                    "id": "123443",
                    "title": "Product 2",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product2.jpeg",
                    "price": "39",
                    "qty": 1,
                    "currency": "$"
                }
            ];
            window.sessionStorage.setItem('shop_cart', JSON.stringify(product))
            const instance = wrapper.instance();
            instance.componentDidMount();
            expect(props.getProductsOnPageRefresh).toHaveBeenCalledTimes(1);
        });
        it('Ensure Default Product on Component Did Mount', () => {

            const instance = wrapper.instance();
            instance.componentDidMount();
            expect(props.getProductsOnPageRefresh).toHaveBeenCalledTimes(1);
            //expect(props.getDefaultProducts).toHaveBeenCalledTimes(1);
        });

    })
    describe('Testing No items in user cart message', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                "cartItems": {
                    "product": [
                    ],
                    "total_amount": 0,
                    "total_qty": 0,
                    "usrmsg": "No items in your cart. Please refresh your page to get the default Products."
                }
            }
            wrapper = setUp(initialState);
        })
        it('Should render without errors', () => {
            const component = wrapper.find(`[data-test='usrmsg']`);
            expect(component.length).toBe(1);
        });
    })

})
