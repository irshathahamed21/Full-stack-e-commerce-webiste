const { router } = require("../..")
const Product = require("../models/productModel")
const ErrorHandler = require("../utilities/errorHandler")
// const errorHandler = require("../utilities/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")

const ApiFeatures = require("../middleware/apiFeatures")

exports.createProducts = async (req, res, next) => {
    try {
        req.body.user = req.user.id
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log("error", err)
    }

}


// create products --> admin


exports.createProducts = async (req, res, next) => {
    try {
        req.body.user = req.user.id
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log("error", err)
    }

}


// get allproducts 
exports.getAllProducts = async (req, res, next) => {

    try {
        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter();

        let products = await apiFeature.query.clone()

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);

        products = await apiFeature.query.clone();



        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount,
        });
    }
    catch (err) {
        console.log("error", err)
    }

}

// get product details or get single product

exports.getProductDetails = async (req, res) => {

    const product = await Product.findById(req.params.id)

    try {
        if (!product) {
            // return next(new ErrorHandler("Product not found", 404) )
            res.status(202).json({ message: "product not found" })
        }

        res.status(200).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log("error", err)
    }





}
exports.updateProduct = async (req, res) => {

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
        if (!product) {
            res.status(202).json({ message: "product not found" })
        }

        res.status(200).json({
            success: true,
            product
        })
    }

    catch (err) {
        console.log("error", err)
    }


}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            res.status(202).json({ message: "product not found" })
        }

        res.status(200).json({
            success: true,
            product
        })
    }

    catch (err) {
        console.log("error", err)
    }


}


//  create the new review or update the review


exports.createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };


  
    const product = await Product.findById(productId);
    console.log(product)
  
    
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } 
    
    else {
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
    }

    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  };
  


exports.getAllProductReviews = async(req,res) => {

    const product = await Product.findById(req.query.id)

    if(!product) {
        return res.status(201).json({
            
            message:"product not found"
        })
    }

    return res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}


exports.deleteProductReviews = async(req,res) => {

    const product = await Product.findById(req.query.id)

    if(!product) {
        return res.status(201).json({
            
            message:"product not found"
        })
    }

    return res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}

// show all products for admin

exports.getAdminProducts = async(req,res) => {
    try{
        const products = await Product.find()
        res.status(200).json({success:true, products })
    }
    catch(err){
        res.status(500).json({
            success:false, message:err.message
        })
    }
}

// create product --> admin

exports.createProduct = async(req,res) => {
    try {

        let images = []
        if(typeof(req.body.images) === "string"){
            images.push(req.body.images)
        }
        else {
            images = req.body.images;
        }

        const imagesLinks = []

        for(let i = 0; i < images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder:"products"
            })
        }
        imagesLinks.push({
            public_id:result.public_id,
            url:result.secure_url
        })
        req.body.images = imagesLinks
        req.body.user = req.user.id

        const product = await Product.create(req.body)
        res.status(201).json({success:true, product})
    }
    catch(error) {
        res.status(500).json({
            success:false, message:err.message
        })
    }
} 



// update product --> admin

exports.updateProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if(!product) {
            res.status(404).json({message:"Product not found"})
        }
        let images = []

    }
    catch(error){

    }
}







