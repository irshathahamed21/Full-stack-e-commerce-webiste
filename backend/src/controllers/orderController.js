const Order = require("../models/orderModel")
const Product = require("../models/productModel")

// create new order
exports.newOrder = async(req,res) => {
  try {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
    
      res.status(201).json({
        success: true,
        order,
      });
    }
    catch(error){
    res.status(400).json({success:false,message:error.message})

    }
}

// get Single Order
exports.getSingleOrder = async (req, res) => {
  
  try {
    const order = await Order.findById(req.params.id)
  
    if(!order){
      res.status(404).json({success:false, message:"Order not found with this Id"})
    }
  
    res.status(200).json({
      success:true,
      order
    })
  }
  catch(error){
    res.status(400).json({success:false,message:error.message})
  }
  

}

// get logged in user's all orders

exports.myOrders = async(req,res) => {
  try{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({success:true, orders})

    
  }
  catch(error){
    res.status(400).json({success:false,message:error.message})

  }
}

// get all orders only for admin

exports.getAllOrders = async(req,res) => {
  try {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((item) => {
      totalAmount = totalAmount + item.totalPrice
    })

    res.status(200).json({success:true, totalAmount, orders})
  }
  catch(error){
    res.status(400).json({success:false,message:error.message})

  }
}

// update order status by admin

exports.updateOrder = async(req,res) => {
  try {
    const order = await Order.findById(req.params.id)
    
    if(!order){
      res.status(404).json({success:false, message:"Order not found with this Id"})
    }

    if(order.orderStatus === "Delivered"){
      res.status(404).json({success:false, message:"You have already delivered this order"})

    }

    if(req.body.status === "Shipped"){
      order.orderItems.forEach(async(e) => {
          await updateStock(e.product, e.quantity)
      })
    }
    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
      order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({success:true})
  }
  catch(error){
    res.status(400).json({success:false,message:error.message})

  }
}

async function updateStock (id, quantity){
  const product = await Product.findById(id)

  product.Stock = product.Stock - quantity

  await product.save({validateBeforeSave:false})
  
}


// delete Order by admin

exports.deleteOrder = async(req,res) => {
  try {
    const order = await Order.findById(req.params.id)

    if(!order){
      res.status(200).json({message:"Order not found with this id"})
    }
    await order.remove()
    res.status(200).json({success:true})


  }
  catch(error){
    res.status(400).json({success:false,message:error.message})

  }

}




