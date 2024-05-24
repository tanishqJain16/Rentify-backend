const router = require("express").Router();
const { addProperty, getAllProperties, getUserProperty, deleteProperty, editProperty, sendEmail } = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/addProperty", authenticateToken, addProperty);
router.get("/getAllProperties", getAllProperties);
router.post("/getUserProperty", authenticateToken, getUserProperty);
router.delete("/deleteProperty/:id", authenticateToken, deleteProperty);
router.put("/editProperty/:id", authenticateToken, editProperty);
router.post("/sendEmail", authenticateToken, sendEmail);

module.exports = router;