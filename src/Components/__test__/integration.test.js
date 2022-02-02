import moxios from 'moxios';
import { testStore } from '../../Utils';
import GetDefaultProducts from "../../store/Actions/GetDefaultProducts";
import AddOrRemoveProducts from '../../store/Actions/AddOrRemoveProducts';
import AddorRemoveProductsFromMiniCart from '../../store/Actions/AddorRemoveProductsFromMiniCart'
import GetProductsOnPageRefresh from '../../store/Actions/GetProductsOnPageRefresh';
import GetModalActionForMinCart from '../../store/Actions/GetModalActionForMinCart';

describe('Integration Test', () => {

    describe('Get Default Product From API', () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        test('Store is updated correctly', () => {

            const expectedState = {
                "products": [
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
                ]
            }
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                })
            });

            return store.dispatch(GetDefaultProducts())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.cartItems.product).toStrictEqual(expectedState.products);
                })

        });

        test('service Error', () => {

            const expectedState = {
                "products": []
            }
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 500,
                    response: {}
                })
            });

            return store.dispatch(GetDefaultProducts())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.cartItems.error).toBeDefined();
                })

        });
    });

    describe('Add or Remove Product in cart', () => {

        test('Adding Product', () => {

            const product = [
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
            ]

            const store = testStore();
            store.dispatch(AddOrRemoveProducts("123442", "+", product))
            const newstate = store.getState();
            expect(newstate.cartItems.total_qty).toBe(3);
        })


        test('Removing Product', () => {

            const product = [
                {
                    "id": "123442",
                    "title": "Product 1",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product1.jpeg",
                    "price": "39",
                    "qty": 2,
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
            ]

            const store = testStore();
            store.dispatch(AddOrRemoveProducts("123442", "-", product))
            const newstate = store.getState();
            expect(newstate.cartItems.total_qty).toBe(2);
        })

    })

    describe('Remove Products in Mini cart', () => {

        test('Remove Product 1 from Mini cart', () => {
            const product = [
                {
                    "id": "123442",
                    "title": "Product 1",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product1.jpeg",
                    "price": "39",
                    "qty": 2,
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
            ]

            const store = testStore();
            store.dispatch(AddorRemoveProductsFromMiniCart("123442", product))
            const newstate = store.getState();
            expect(newstate.cartItems.product.length).toBe(1);
        })

        test('Remove Product 2 from Mini cart', () => {
            const product = [
                {
                    "id": "123443",
                    "title": "Product 2",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product2.jpeg",
                    "price": "39",
                    "qty": 1,
                    "currency": "$"
                }
            ]

            const store = testStore();
            store.dispatch(AddorRemoveProductsFromMiniCart("123443", product))
            const newstate = store.getState();
            expect(newstate.cartItems.product.length).toBe(0);
        })
    })
    describe('Get Products on Page Refresh', () => {

        test('Ensure saved products are available in reducer', () => {
            const product = [
                {
                    "id": "123442",
                    "title": "Product 1",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product1.jpeg",
                    "price": "39",
                    "qty": 2,
                    "currency": "$"
                }
            ]
            sessionStorage.setItem('shop_cart', JSON.stringify(product));
            const store = testStore();
            store.dispatch(GetProductsOnPageRefresh())
            const newstate = store.getState();
            expect(newstate.cartItems.product.length).toBe(1);
        })
    })
    describe('Get Modal Actions For Mini Cart', () => {
        test('Open the Mini Cart ', () => {
            const store = testStore();
            store.dispatch(GetModalActionForMinCart(true))
            const newstate = store.getState();
            expect(newstate.cartItems.modalIsOpenForMiniCart).toBe(true);
        })
    })
});