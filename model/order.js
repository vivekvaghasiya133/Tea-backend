const mongoose = require("mongoose");

// Define the schema for the tea order
const teaOrderSchema = new mongoose.Schema({
  ShopName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
 
  quantities: {
    "250gm": {
      type: Number,
      default: 0, 
    },
    "500gm": {
      type: Number,
      default: 0,
    },
    "1kg": {
      type: Number,
      default: 0,
    },
  },
  prices: {
    "250gm": {
      type: Number,
      required: true,
    },
    "500gm": {
      type: Number,
      required: true,
    },
    "1kg": {
      type: Number,
      required: true,
    },
  },
  discount: {
    "250gm": {
      type: Number,
      required: true,
      default: 0
    },
    "500gm": {
      type: Number,
      required: true,
      default: 0
    },
    "1kg": {
      type: Number,
      required: true,
      default: 0
    },
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  savings: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'Delivered', 'Canceled'],
    default: 'pending',
  },
});

// Method to calculate total price and total savings
teaOrderSchema.methods.calculateTotalPriceAndSavings = function () {
  const totalPrice = (
    (this.quantities["250gm"] * this.prices["250gm"] - this.discount["250gm"]) +
    (this.quantities["500gm"] * this.prices["500gm"] - this.discount["500gm"]) +
    (this.quantities["1kg"] * this.prices["1kg"] - this.discount["1kg"])
  );
  
  const totalSavings = (
    (this.quantities["250gm"] * this.discount["250gm"]) +
    (this.quantities["500gm"] * this.discount["500gm"]) +
    (this.quantities["1kg"] * this.discount["1kg"])
  );

  return { totalPrice, totalSavings };
};

// Pre-save hook to calculate totalPrice and savings
teaOrderSchema.pre("save", function (next) {
  const { totalPrice, totalSavings } = this.calculateTotalPriceAndSavings();
  this.totalPrice = totalPrice;
  this.savings = totalSavings;
  next();
});

// Create the model from the schema
const TeaOrder = mongoose.model("TeaOrder", teaOrderSchema);

module.exports = TeaOrder;
