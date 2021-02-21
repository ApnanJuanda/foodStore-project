const mongoose = require("mongoose");

const {model, Schema} = mongoose;

const cartItemSchema = Schema({
    name:{
        type: String,
        minLength: [5, 'Panjang nama makanan minimal 3 karakter'],
        required: [true, 'name must be filled']
    },
    qty:{
        type: Number,
        min: [1, 'Minimal qty adalah 1'],
        required: [true, 'qty must be filled']
    },
    price:{
        type: Number,
        default: 0
    },
    image_url:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product' //agar terhubung ke model Product nanti di controller terkait akan ada populate
    }
})

module.exports = model('CartItem', cartItemSchema);