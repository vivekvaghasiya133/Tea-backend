// areaController.js
const Area = require('../model/area'); // Adjust the path as necessary

// Get all areas
exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single area by ID
exports.getAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new area
exports.createArea = async (req, res) => {
    try {
      // Check if the area already exists
      const existingArea = await Area.findOne({ area: req.body.area });
      if (existingArea) {
        return res.status(400).json({ message: 'Area already exists' });
      }
  
      // If not, create a new area
      const area = new Area({
        area: req.body.area,
      });
  
      const newArea = await area.save();
      res.status(201).json({message : 'Area added',newArea});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Update an existing area
exports.updateArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });

    area.area = req.body.area;
    const updatedArea = await area.save();
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an area
exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });

    await area.remove();
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
