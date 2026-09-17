const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const requireAdmin =
  require("../middleware/requireAdmin");

const {
  getAdminMe,
  getAdminDashboard,
  listAdminRequests,
  getAdminRequest,
  createProposalForRequest,
} = require("../controllers/adminController");

const router = express.Router();

// Protect every admin route below this point.
router.use(
  authMiddleware,
  requireAdmin
);

// Admin account
router.get(
  "/me",
  getAdminMe
);

// Dashboard
router.get(
  "/dashboard",
  getAdminDashboard
);

// Project requests
router.get(
  "/requests",
  listAdminRequests
);

router.get(
  "/requests/:requestId",
  getAdminRequest
);

// Create proposal from a project request
router.post(
  "/requests/:requestId/proposals",
  createProposalForRequest
);

module.exports = router;