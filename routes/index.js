var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const verifyToken = require("../Middleware/authMiddleware");
const adminController = require("../controllers/admin"); // Import the admin controller
const teaOrderController = require("../controllers/order");
const areaController = require('../controllers/area');
const ShopController = require('../controllers/shop');

// Route to create a new admin
router.post("/admin", adminController.createAdmin);

// Route to get all admins
router.get("/admin",verifyToken, adminController.getAdmins);

// Route to get a specific admin by ID
router.get("/admin/:id",verifyToken, adminController.getAdminById);

// Route to update an admin by ID
router.put("/admin/:id",verifyToken, adminController.updateAdmin);

// Route to delete an admin by ID
router.delete("/admin/:id",verifyToken, adminController.deleteAdmin);

router.post("/login", adminController.loginAdmin);







// Route to create a new tea order
router.post('/tea-orders', teaOrderController.createTeaOrder);

// Route to get all tea orders
router.get('/tea-orders', teaOrderController.getAllTeaOrders);

// Route to get a tea order by ID
router.get('/tea-orders/:id', teaOrderController.getTeaOrderById);

// Route to update a tea order by ID
router.put('/tea-orders/:id', teaOrderController.updateTeaOrder);

// Route to delete a tea order by ID
router.delete('/tea-orders/:id', teaOrderController.deleteTeaOrder);




// GET all areas
router.get('/areas', areaController.getAllAreas);

// GET a single area by ID
router.get('/areas/:id', areaController.getAreaById);

// POST a new area
router.post('/areas', areaController.createArea);

// PUT to update an area
router.put('/areas/:id', areaController.updateArea);

// DELETE an area
router.delete('/areas/:id', areaController.deleteArea);





router.post('/shops', ShopController.createShop);
router.get('/shops', ShopController.getAllShops);
router.get('/shops/:id', ShopController.getShopById);
router.put('/shops/:id', ShopController.updateShop);
router.delete('/shops/:id', ShopController.deleteShop);
router.get('/search', ShopController.searchShops);



module.exports = router;
