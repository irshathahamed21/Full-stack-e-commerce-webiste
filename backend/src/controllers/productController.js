
const Product = require("../models/productModel")
const errorHandler = require("../utilities/errorHandler")
// const errorHandler = require("../utilities/errorHandler")
const catchAsyncerror = require("../middleware/catchAsyncerror")
const cloudinary = require("cloudinary")

const ApiFeatures = require("../middleware/apiFeatures")



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
// 
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
    catch (error) {
        return res.status(500).json({ success:false,  message:error.message})
    }

}

// get product details or get single product

exports.getProductDetails = async (req, res) => {

    const product = await Product.findById(req.params.id)

    try {
        if (!product) {
            // return next(new errorHandler("Product not found", 404) )
            res.status(202).json({ message: "product not found" })
        }

        res.status(200).json({
            success: true,
            product
        })
    }
    catch (error) {
        return res.status(500).json({success:false,  message:error.message })
    }

}

//  create the new review or update the review

exports.createProductReview = async (req, res, next) => {
    try { 
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
  }
  catch(error){
    return res.status(500).json({ success:false,  message:error.message })
  }
}

  


exports.getAllProductReviews = async(req,res) => {

    try {

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
    catch(error){
        return res.status(500).json({ success:false,  message:error.message })
    }

}

// delete product reviews by admin
exports.deleteProductReviews = async(req,res) => {
    try {
    const product = await Product.findById(req.query.productId)

    if(!product) {
        return res.status(201).json({
            
            message:"product not found"
        })
    }

    console.log(req.query.id, req.query.productId)
    
    const reviews = product.reviews.filter((rev)  => rev._id.toString() !== req.query.id.toString()            
    )
    let ratings = 0;

    if(reviews.length === 0){
        ratings = 0;
    }
    else {
        let totalRatingsSum = 0;
        reviews.forEach((rat) => totalRatingsSum = totalRatingsSum + rat.ratings )
        ratings = totalRatingsSum / product.reviews.length
        }

    const numReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numReviews
        }, 
        {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    return res.status(200).json({
        success:true,
    })
}
    catch(error){
        return res.status(500).json({ success:false, message:error.message})
    }
}

// show all products for admin

exports.getAdminProducts = async(req,res) => {
    try{
        const products = await Product.find()
        res.status(200).json({success:true, products })
    }
    catch(error){
        res.status(500).json({
            success:false, message:error.message
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
            var result = await cloudinary.v2.uploader.upload(images[i], {
                folder:"products"
            })
            imagesLinks.push({
                public_id:result.public_id,
                url:result.secure_url
            })
        }
       
        req.body.images = imagesLinks
        req.body.user = req.user.id

        const product = await Product.create(req.body)
        res.status(201).json({success:true, product})
    }
    catch(error) {
        res.status(500).json({
            success:false, message:error.message
        })
    }
} 



// update product --> admin

exports.updateProduct = async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            res.status(500).json({
                success:false, message:"Product not found with this Id"
            })
        }
        // Images Start Here
        let images = [];
      
        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
      
        if (images !== undefined) {
          // Deleting Images From Cloudinary
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
      
          const imagesLinks = [];
      
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
      
          req.body.images = imagesLinks;
        }
      
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
      
        res.status(200).json({
          success: true,
          product,
        });
    
    }
    catch(error){
        res.status(500).json({
            success:false, message:error.message
        })
    }
}


// delete product --> admin

exports.deleteProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(! product){
        res.status(201).json({success:false, message:"product not found with this Id"})

        }

        for(let i = 0; i < product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        await product.remove()


        res.status(200).json({success:true, message:"Product deleted successfully"})
    }
    catch(error){
        res.status(500).json({success:false, message:error.message})
    }    
}





