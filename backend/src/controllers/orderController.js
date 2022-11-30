const Order = require("../models/orderModel")
const Product = require("../models/productModel")

// create new order
exports.newOrder = async(req,res) => {
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

// get Single Order
exports.getSingleOrder = async (req, res) => {
  
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email")
  
    if(!order){
      res.status(404).json({success:false, message:"Order not found with this Id"})
    }
  
    res.status(200).json({
      success:true,
      order
    })
  }
  catch(error){
    res.status(400).json({success:false,message:error.data.message})
  }
  

}

// get logged in user's all orders

exports.myOrders = async(req,res) => {
  try{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({success:true,orders})

    
  }
  catch(error){
    res.status(400).json({success:false,message:error.data.message})

  }
}

// get all orders only for admin

exports.getAllOrders = async(req,res) => {
  try {
    const allOrders = await Order

    let totalAmount = 0;
    allOrders.forEach((item) => {
      totalAmount = totalAmount + item.totalPrice
    })

    res.status(200).json({success:true, allOrders})
  }
  catch(error){
    res.status(400).json({success:false,message:error.data.message})

  }
}





