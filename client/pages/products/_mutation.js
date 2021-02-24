import { gql } from '@apollo/client';

var createNewProductMutation = gql `
    mutation createNewProduct($input: ProductInput){
        createNewProduct(input:$input){
        id
        name
        price{
            amount
            currency
        }
        description
        jancode
        category
        stock
        available
        images
        }
    }

`

export {createNewProductMutation};