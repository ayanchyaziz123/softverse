const Product = require('../models/product');
const mongoose = require('mongoose');
const Review = require('../models/review');
const Category = require('../models/category');
const review = require('../models/review');
const { response } = require('express');



exports.imageUpload = async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const file = req.file.filename;
        var id = mongoose.Types.ObjectId(product_id);
        const filter = { _id: id };
        const update = { image: file };
        let product = await Product.findOneAndUpdate(filter, update, {
            new: true
        });
        return res.status(200).json({
            image: file,
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "serevr error"
        });
    }
}

exports.createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const productId = mongoose.Types.ObjectId(req.params.id);
        const userId = req.userId;
        const review = new Review({
            product: productId,
            user: userId,
            rating: rating,
            comment: comment
        });
        await review.save();
        await Product.findOneAndUpdate({ _id: productId }, {
            $push: {
                "review": review
            }
        });

        // save and redirect...
        const rev = await Review.find({ product: productId }).populate('user');
        return res.status(200).json({
            "review": rev
        });

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "serevr error"
        });
    }
}




exports.offerProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            "products": products,
            "message": "success",
        });
    }
    catch (error) {
        res.status(400).json({
            detail: "serevr error"
        });
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndRemove(id);
        return res.status(200).json(
            {
                "message": "Deleted",
            });
    }
    catch (error) {
        res.status(400).json({
            detail: "serevr error"
        });
    }
}



exports.createProduct = async (req, res, next) => {
    console.log("create product ", req.body, req.file);
    try {
        const { languageAndTool, name, price, description, quantity, lifeTimePrice, visibility, offer, videoUrl } = req.body;

        var val = languageAndTool.split(",");
        if (!languageAndTool) return res.status(400).json({
            detail: "Did not give product language and tool"
        })
        if (!videoUrl) return res.status(400).json({
            detail: "Did not give video url"
        })
        if (!name) return res.status(400).json({
            detail: "Did not give product name"
        })
        if (!price) return res.status(400).json({
            detail: "Did not give product price"
        })
        if (!description) return res.status(400).json({
            detail: "Did not give product description"
        })
        if (!lifeTimePrice) return res.status(400).json({
            detail: "Did not give product lifeTimePrice"
        })
        if (!offer) return res.status(400).json({
            detail: "Did not give product offer"
        })
        if (offer < 0) return res.status(400).json({
            detail: "Dont give negative value as offer"
        })
        if (offer > 100) return res.status(400).json({
            detail: "Dont give offer percentage more than 100"
        })
        if (!req.file) return res.status(400).json({
            detail: "Did not give product image"
        })
        const file = req.file.filename;

        const product = new Product({
            languageAndTool: val,
            name,
            price,
            lifeTimePrice,
            description,
            quantity,
            image: file,
            videoUrl,
            visibility,
            offer
        })
        await product.save();

        return res.status(200).json({
            product: product,
            message: "Successfully Product added"
        })
    }
    catch (error) {
        console.log("eror ", error);
        res.status(400).json({
            detail: "Serevr error occured"
        });
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const product = await Product.findById(_id = id)
        return res.status(200).json({
            product: product
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "serevr error. Could not retrive the data!!!"
        });
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { languageAndTool, name, price, description, quantity, lifeTimePrice, visibility, offer } = req.body;

        var val = languageAndTool.split(",");
        if (!languageAndTool) return res.status(400).json({
            detail: "Did not give product language and tool"
        })
        if (!name) return res.status(400).json({
            detail: "Did not give product name"
        })
        if (!price) return res.status(400).json({
            detail: "Did not give product price"
        })
        if (!description) return res.status(400).json({
            detail: "Did not give product description"
        })
        if (!lifeTimePrice) return res.status(400).json({
            detail: "Did not give product lifeTimePrice"
        })
        if (!offer) return res.status(400).json({
            detail: "Did not give product offer"
        })
        if (offer < 0) return res.status(400).json({
            detail: "Dont give negative value as offer"
        })
        if (offer > 100) return res.status(400).json({
            detail: "Dont give offer percentage more than 100"
        })
        const file = req.file;
        var pro;
        if (file) {
            pro = {
                languageAndTool: val,
                name,
                price,
                lifeTimePrice,
                description,
                quantity,
                image: req.file.filename,
                visibility,
                offer
            }
        }
        else {
            pro = {
                languageAndTool: val,
                name,
                price,
                lifeTimePrice,
                description,
                quantity,
                visibility,
                offer
            }
        }

        var id = mongoose.Types.ObjectId(req.params.id)
        const filter = { _id: id }
        let updateProduct = await Product.findOneAndUpdate(filter, pro, {
            new: true
        });
        return res.status(200).json({
            product: updateProduct,
            message: 'Update successfully completed'
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).send("An error occured");
    }
}








exports.getProducts = async (req, res, next) => {
    let k = req.query.keyword;
    let p = req.query.page;
    const categories = await Category.find().limit(12);
    const top = await Product.find();
    var topProducts = [];
    for (let i in top) {
        if (top[i].review.length > 0) {
            topProducts.push(top[i]);
        }
    }


    try {
        if (k == undefined && p == undefined) {
            const page = 1;
            const limit = 5;
            const total = await Product.countDocuments();
            const pages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const products = await Product.find().sort({ 'update_at': -1 }).limit(limit).skip(startIndex).populate('review');
            return res.status(200).json(
                {
                    success: true,
                    count: products.length,
                    products,
                    categories,
                    topProducts,
                    pages,
                    page,
                    message: 'Successfully data loaded'
                }
            )
        }
        else if (k + 10 == 10) {

            const page = req.query.page;
            const limit = 5;
            const total = await Product.countDocuments();
            const pages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const products = await Product.find().sort({ 'update_at': -1 }).limit(limit).skip(startIndex).populate('review').exec();
            return res.status(200).json(
                {
                    success: true,
                    count: products.length,
                    products,
                    categories,
                    topProducts,
                    pages,
                    page,
                    message: 'Successfully data loaded'
                }
            )
        }
        else {
            const page = req.query.page;
            const limit = 5;
            const startIndex = (page - 1) * limit
            let query = String(k);
            const p = await Product.find(
                {
                    "$or": [
                        { name: { $regex: query } },
                    ]
                }
            )
            const pages = Math.ceil(p.length / limit)
            const products = await Product.find(
                {
                    "$or": [
                        { name: { $regex: query } },
                    ]
                }
            ).sort({ 'update_at': -1 }).limit(limit).skip(startIndex).populate('review').exec();
            return res.status(200).json(
                {
                    success: true,
                    count: products.length,
                    products,
                    categories,
                    topProducts,
                    pages,
                    page,
                    message: 'Successfully data loaded'
                }
            )

        }
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            detail: "server could not load the data in proper time!"
        });

    }
}
