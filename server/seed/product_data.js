'use strict';
// libraries:
var mongoose = require('mongoose')
import _ from 'lodash'
import {DateTime} from 'luxon'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {generatePublishDatesInput} from '../src/types/product/product.resolvers';
//==============================================================================

export var listOfProducts = [
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Goku',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Dragon Ball Z figuart',
        sku: '1',
        stock: 10,
        available: true,
        publish: '2021-08-13',
        purchaseLimit: 3,
        listOfImages: [
            'https://omochanoruumu.com/wp-content/uploads/2018/01/gh0.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71YRJ1CizSL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/91Y8WRGOsEL._AC_SL1500_.jpg'
        ],
        listOfTags: ['']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Guts',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Guts from Berserk',
        sku: '2',
        stock: 10,
        available: true,
        purchaseLimit: 1,
        publish: '2021-08-01',
        listOfImages: [
            'https://images-na.ssl-images-amazon.com/images/I/71-iF8CS68L._AC_SL1391_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61pqxCQzjJL._AC_SL1000_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61wy2BGfFGL._AC_SL1000_.jpg'
        ],
        listOfTags: ['']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Kenshin Himura',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Kenshing amazing figure',
        sku: '3',
        stock: 10,
        available: true,
        purchaseLimit: 5,
        publish: '2021-09-13',
        listOfImages: [
            'https://images-na.ssl-images-amazon.com/images/I/71qPAzt74DL._AC_SL1500_.jpg',
            'https://toydistrictmanila.com/wp-content/uploads/2021/04/cc9203295cebd1b0d83b445d500aaebd.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/51wLNCUvwUL._AC_SL1000_.jpg'
        ],
        listOfTags: ['april']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Nezuko Kamado',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Personaje de la serie Demon Slayer',
        sku: '4',
        stock: 10,
        available: true,
        purchaseLimit: 3,
        publish: '2021-09-28',
        listOfImages: [
            'https://images-na.ssl-images-amazon.com/images/I/51tNKUIwFrL._AC_SL1001_.jpg',
            'https://img.joomcdn.net/860c6a503109fd2c4a8e667a21c8e909392e6bd5_original.jpeg',
            'https://images-na.ssl-images-amazon.com/images/I/61XRvgrRBrL._AC_SX425_.jpg'
        ],
        listOfTags: ['june']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'Shaka de Virgo',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Caballero Dorado',
        sku: '5',
        stock: 10,
        available: true,
        purchaseLimit: 3,
        publish: '2021-10-01',
        listOfImages: [
            'https://i.pinimg.com/originals/97/34/10/9734106d0bc81c5209e0f1bc69ff709d.jpg',
            'https://images3.imgbox.com/49/3e/acbIrRNi_o.jpg',
            'https://i.pinimg.com/originals/40/e0/d3/40e0d3fd0deb5cd12dceb1b0a59d2e57.jpg'
        ],
        listOfTags: ['june']
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: 'YoRHa No. 2 Modelo B',
        price: {
            amount: 100,
            currency: 'MXN'
        },
        description: 'Un prototipo femenino de los androides YoRHa que cuenta entre sus rasgos principales la tranquilidad y frialdad.',
        sku: '6',
        stock: 10,
        available: true,
        purchaseLimit: 4,
        publish: '2021-11-29',
        listOfImages: [
            'https://http2.mlstatic.com/D_NQ_NP_2X_625380-MLM40858436301_022020-F.webp',
            'https://ae01.alicdn.com/kf/H3c33b2b9065e4d5a861d02d001323520o/Figura-de-acci-n-de-NieR-Automata-YoRHa-modelo-de-mu-eco-de-colecci-n-figura.jpg_q50.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61eNl7%2BitvL._AC_SL1500_.jpg'
        ],
        listOfTags: ['june']
    }
]


export function forDatabaseInsertion() {
    let lop = _.cloneDeep(listOfProducts)
    let result = []

    lop.forEach((p) => {
        delete p._id
        p.publish = generatePublishDatesInput(p.publish)
        result.push(p)

    })


    return result
}













