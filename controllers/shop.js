const Shop = require('../model/shop');
const Area = require('../model/area');

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const { shopName, customerName, number, area, gstNo, address } = req.body;

    // Check if area exists
    const areaExists = await Area.findById(area);
    if (!areaExists) {
      return res.status(400).json({ message: 'Area not found' });
    }

    const shop = new Shop({
      shopName,
      customerName,
      number,
      area,
      gstNo,
      address
    });

    await shop.save();
    res.status(201).json({message:'Shop add succesfully',shop});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('area');
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('area');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shop
exports.updateShop = async (req, res) => {
  try {
    const { shopName, customerName, number, area, gstNo, address } = req.body;

    // Check if area exists
    const areaExists = await Area.findById(area);
    if (!areaExists) {
      return res.status(400).json({ message: 'Area not found' });
    }

    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { shopName, customerName, number, area, gstNo, address },
      { new: true }
    ).populate('area');

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Search shops
exports.searchShops = async (req, res) => {
    try {
      const { shopName, customerName, area } = req.query;   
  
      // Build search query
      const query = {};
      if (shopName) {
        query.shopName = { $regex: shopName, $options: 'i' }; // Case-insensitive search
      }
      if (customerName) {
        query.customerName = { $regex: customerName, $options: 'i' }; // Case-insensitive search
      }
      if (area) {
        // Validate area ID format if necessary
        query.area = area;
      }
  
      // Perform the search
      const shops = await Shop.find(query).populate('area');
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  