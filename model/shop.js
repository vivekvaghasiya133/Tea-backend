const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shopSchema = new Schema({
  shopName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  area: {   
    type: Schema.Types.ObjectId,
    ref: 'area',
    required: true
  },
  gstNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Shop', shopSchema);
