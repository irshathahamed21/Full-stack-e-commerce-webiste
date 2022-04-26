const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please enter "],
        maxLength: [8, "Price cannot be morethan 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product cateogory"]

    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock length can exceed morethan 4 characters"],
        default: 1

    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref:"user",
                required: true
        
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now

    }




})

module.exports = mongoose.model("Product", productSchema)