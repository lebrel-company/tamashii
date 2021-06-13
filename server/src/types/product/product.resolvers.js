'use strict';
// libraries:
import {ProductModel} from './product.model';
import {authenticated, authorized} from '../../utils/auth';
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
//==============================================================================

async function createProduct(parent, args, context, info) {
    try {
        const newProduct = await new ProductModel(args.input);
        return await newProduct.save();
    } catch (error) {
        console.log(error)
        throw new Error('Unable to create product')
    }
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
async function queryListOfProducts(parent, args, context, info) {
    try {
        return await ProductModel.find({}).exec();
    } catch (error) {
        console.log(error);
    }
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
async function queryProduct(parent, args, context, info) {
    const product = await ProductModel.findById(args.id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}

async function queryAllAvailableProducts() {
    var _p = await ProductModel.find({'available': true})
    return _p
}

// --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
async function updateProduct(parent, args, context, info) {
    const _product = await ProductModel.findOneAndUpdate(
        {
            _id: args.id
        },
        {
            name: args.name,
            price: {
                amount: args.price.amount,
                currency: args.price.currency
            },
            description: args.description,
            code: args.code,
            stock: args.stock,
            publishDate: new Date(args.publish),
            available: args.available,
            listOfImages: args.listOfImages,
            listOfTags: args.listOfTags
        }
    );
}

async function queryProductById(parent, args, context, info) {
    var result;
    try {
        result = await ProductModel.findOne({_id: args.input})
        console.log(result)
    } catch (_e) {
        console.log(_e)
    }

    return result
}

//==============================================================================

export default {
    Query: {
        queryAllAvailableProducts: queryAllAvailableProducts,
        queryProductById: queryProductById
    },
    Mutation: {
        createProduct: authenticated(
            authorized('ADMIN', createProduct)
        ),
        updateProduct: authenticated(
            authorized('ADMIN', updateProduct)
        )
    }
};
