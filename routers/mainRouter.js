const express = require('express');
const pageController = require('../controllers/pageController');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

// INDEX & ADMIN PAGE
router.route('/').get(pageController.getIndexPage);
router.route('/admin').get(authMiddleware,pageController.getAdminPage);

// CRUD OPS
router.route('/add').post(roleMiddleware('admin'),projectController.createProject);
router.route('/update/:id').put(projectController.updateProject);
router.route('/delete/:id').delete(projectController.deleteProject);

// ADMIN REGISTER & LOGIN
router.route('/register').post(authController.createUser); //user create
router.route('/login').post(redirectMiddleware,authController.loginUser); //user login
router.route('/logout').get(authController.logoutUser); //user logout

// CONTACT MESSAGE
router.route('/contact').post(pageController.sendEmail);

module.exports = router;