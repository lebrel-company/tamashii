'use strict';
// libraries:
import axios from 'axios'
import {gql} from 'apollo-server'
import util from 'util'
import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import _ from 'lodash'
import mongoose from 'mongoose'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
import {ProductModel} from '../../src/types/product/product.model';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {CART_PRODUCTS} from './cart_products_int_test';
import {hostname, axiosConfig} from '../constants';
import {dropAll} from '../cleanup';
import {listOfProducts, forDatabaseInsertion} from '../../seed/product_data';
import {authData} from '../auth';
import status from '../../src/utils/status';

var pp = (el) => console.log(util.inspect(el, false, 5, true))
chai.use(chaiGraphQL)
var assert = chai.assert
var expect = chai.expect
var should = chai.should

//==============================================================================

export function cartFragments() {
    return `
        __typename
        ... on MyCart{
            status
            message
            cart{
                id
                idUser
                timeout{
                    start
                    end
                }

                listOfProducts{
                    id
                    sku
                    purchaseLimit
                    name
                    thumbnail
                    price{
                        amount
                        currency
                    }
                    quantity
                }
            }
        }
        ... on InvalidCart{
            status
            message
            listOfErrors
        }
        ... on DeletedCart{
                status
                message
                listOfProducts{
                    id
                    sku
                    purchaseLimit
                    name
                }
        }
    `
}

export var CART = {
    mutations: {
        createCart: `
            mutation createCart($input: CartProductInput!){
                createCart(input: $input){
                    ${cartFragments()}
                }
            }
        `,
        deleteCart: `
            mutation deleteCart{
                deleteCart{
                    ${cartFragments()}
                }
            }
        `
    }
}


var goku = listOfProducts[0]

var cartProductInput = {
    idProduct: goku._id.toString(),
    quantity: 1
}


//=============================================================================

describe('CART', function cartTests() {

    beforeEach(async function () {
        await dropAll()
        await ProductModel.insertMany(forDatabaseInsertion())
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('NO-AUTH.Cart: Reject cart creation.', async function () {

        var res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: cartProductInput
                    }
                },
                axiosConfig
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        assert.graphQLError(res.data)
        expect(res.data.errors[0].message).to.be.equal('Not authorized')
    })


    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Successful cart creation.', async function () {
        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`
        let res;
        try {
            res = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: cartProductInput
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        assert.graphQL(res.data)
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Cart already exists.', async function () {
        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`
        let res_01;
        let res_02;
        try {
            res_01 = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: cartProductInput
                    }
                },
                CLIENT_AUTH_CONFIG
            )
            res_02 = await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: cartProductInput
                    }
                },
                CLIENT_AUTH_CONFIG
            )
        } catch (_e) {
            pp(_e.response.data)
        }

        assert.graphQLSubset(
            res_02.data,
            {
                createCart: {
                    status: status.invalid
                }
            }
        )
    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

    it('CL-AUTH.Cart: Delete cart.', async () => {

        var CLIENT_AUTH_CONFIG = _.cloneDeep(axiosConfig)
        let {token} = await authData()
        CLIENT_AUTH_CONFIG.headers.authorization = `Bearer ${token}`
        let res;
        let _listOfProducts = await ProductModel.find({})


        let idGuts = listOfProducts[1]._id.toString()
        let idKenshin = listOfProducts[2]._id.toString()

        try {
            await axios.post(
                hostname,
                {
                    query: CART.mutations.createCart,
                    variables: {
                        input: cartProductInput
                    }
                },
                CLIENT_AUTH_CONFIG
            )

            //-     -     -     -     -     -     -     -     -     -     -   -

            await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.addProductToCart,
                    variables: {
                        input: {
                            idProduct: idGuts,
                            quantity: 1
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )

            //-     -     -     -     -     -     -     -     -     -     -   -

            await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.addProductToCart,
                    variables: {
                        input: {
                            idProduct: idKenshin,
                            quantity: 1
                        }
                    }
                },
                CLIENT_AUTH_CONFIG
            )


            //-     -     -     -     -     -     -     -     -     -     -   -

            await axios.post(
                hostname,
                {
                    query: CART_PRODUCTS.mutations.updateProductQuantity,
                    variables: {
                        input: {
                            idProduct: listOfProducts[2]._id.toString(),
                            quantity: 4
                        }
                    }
                }
            )

            // -     -     -     -     -     -     -     -     -     -     -   -

            res = await axios.post(
                hostname,
                {
                    query: CART.mutations.deleteCart
                },
                CLIENT_AUTH_CONFIG
            )

        } catch (_e) {
            pp(_e.response.data)
        }


        let listOfProductsInStore = await ProductModel.find({})
        listOfProductsInStore.forEach((p) => {
            expect(p.stock).to.be.equal(10)
        })

    })

    // --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- -

})








