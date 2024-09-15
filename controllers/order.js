const TeaOrder = require('../model/order'); // Adjust the path as necessary

// Create a new tea order
exports.createTeaOrder = async (req, res) => {
  try {
    const teaOrder = new TeaOrder(req.body);
    await teaOrder.save();
    res.status(201).json({message:'Order create succesfully', teaOrder});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tea orders
exports.getAllTeaOrders = async (req, res) => {
  try {
    const teaOrders = await TeaOrder.find().populate('ShopName');
    res.status(200).json(teaOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a tea order by ID
exports.getTeaOrderById = async (req, res) => {
  try {
    const teaOrder = await TeaOrder.findById(req.params.id).populate('ShopName');
    if (!teaOrder) {
      return res.status(404).json({ error: 'Tea order not found' });
    }
    res.status(200).json(teaOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tea order by ID
exports.updateTeaOrder = async (req, res) => {
  try {
    const updatedData = req.body;
    const teaOrder = await TeaOrder.findByIdAndUpdate(req.params.id, updatedData, { new: true }).populate('ShopName');
    if (!teaOrder) {
      return res.status(404).json({ error: 'Tea order not found' });
    }
    await teaOrder.save(); // Ensure pre-save hook recalculates totalPrice and savings
    res.status(200).json(teaOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a tea order by ID
exports.deleteTeaOrder = async (req, res) => {
  try {
    const teaOrder = await TeaOrder.findByIdAndDelete(req.params.id);
    if (!teaOrder) {
      return res.status(404).json({ error: 'Tea order not found' });
    }
    res.status(204).json(); // No content to return
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
