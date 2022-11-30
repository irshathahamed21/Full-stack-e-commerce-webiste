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

exports.getSingleOrder = async (req, res) => { 
  const order = await Order.findById(req.params.id).populate("user", "name email")
  
  if(!order){
    res.status(404).json({success:false, message:"Order not found with this Id"})
  }

  res.status(200).json({
    success:true,
    order
  })

}