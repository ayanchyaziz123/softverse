const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    languageAndTool: [String],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lifeTimePrice:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    }],
    image: {
        type: String
    },
    videoUrl: {
        type:String
    },
    offer:{
        type: Number
    },
    visibility:{
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);