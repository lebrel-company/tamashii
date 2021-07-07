'use strict';
// libraries:
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {devKeys} from './dev';

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


var _keys = null

if (process.env.NODE_ENV === 'dev') {
    _keys = devKeys
} else {
    _keys = {
        aws: {
            bucket: process.env.BUCKET,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        },
        paypal: {
            client: process.env.PAYPAL_CLIENT,
            secret: process.env.PAYPAL_SECRET,
            api: process.env.PAYPAL_PAYMENT_API
        },
        mongodb: {
            host: process.env.MONGO_HOST
        }
    }
}

export const KEYS = _keys
