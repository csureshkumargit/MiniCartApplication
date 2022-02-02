import React from "react";
import { shallow } from 'enzyme';
import { testStore } from "../../Utils";
import Header from "../Header";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Header store={store} />).childAt(0).dive();
    return wrapper;
};

describe('Testing Header Component', () => {
    describe('Testing initial Render', () => {
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
                    "total_amount": "78",
                    "total_qty": 2,
                    "modalIsOpenForMiniCart": false
                }
            }
            props = {
                openOrCloseMiniCart: mockFunc,
                removeProductFromMiniCart: mockFunc
            }
            wrapper = setUp(initialState);
            wrapper.setProps(props);
        })
        it('Should render without errors', () => {
            const component = wrapper.find(`[data-test='Header']`);
            expect(component.length).toBe(1);
        });
        it('Should simulate Open Mini Cart-props', () => {
            const component = wrapper.find(`[data-test='OpenMinicart']`);
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
        it('Should simulate Close Mini Cart-props', () => {
            const component = wrapper.find(`[data-test='CloseMinicart']`);
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
        it('Should simulate Remove Item From Mini Cart-props', () => {
            const component = wrapper.find(`[data-test='RemoveItemMinicart-0']`);
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
    })
})