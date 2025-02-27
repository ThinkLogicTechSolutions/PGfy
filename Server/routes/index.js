const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const ownerRoutes = require('./OwnerRoutes');
const tenantRoutes = require('./TenantRoutes');
const adminRoutes = require('./AdminRoutes');

router.use('/auth', authRoutes);
router.use('/owner', ownerRoutes);
router.use('/tenant', tenantRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
