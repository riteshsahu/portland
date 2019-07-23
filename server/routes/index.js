const express = require('express');
const router = express.Router(); 
const userRoutes = require('./userRoutes');
const manageCustomerRoutes = require('./manageCustomerRoutes');
const customerDetailsRoutes = require('./customerDetailsRoutes');
const countryRoutes = require('./countryRoutes');
const clientInfoRoutes = require('./clientInfoRoutes');
const addressRoutes = require('./addressRoutes');
const occupationRoutes = require('./occupationRoutes');
const declarationRoutes = require('./declarationRoutes');
const residenceRoutes = require('./residenceRoutes');
const clientCreditFileRoutes = require('./clientCreditFileRoutes');
const dualProcessRoutes = require('./dualProcessRoutes');

const intekRoutes = require('./intekRoutes');
const authRoutes = require('./authRoutes');

//Agent Routes start from Here 
const businessInfoRoutes = require('./businessInfoRoutes');
const businessBranchRoutes = require('./businessBranchRoutes');
const agentInfoRoutes = require('./agentInfoRoutes');
const contactInfoRoutes = require('./contactInfoRoutes');
const ccOfficerInfoRoutes = require('./ccOfficerRooutes');
const businessStructureRoutes = require('./businessStructureRoutes');
const businessFormRoutes = require('./businessFormRoutes');
const fbReviewRoutes = require('./fbReviewRoutes')
router.get('/ping', (req, res) =>
  res.send('pong')
);
  
//router.use('/login', userRoutes);

//router.use('/login', userRoutes);
router.use('/user',userRoutes);            //registration
router.use('/login',authRoutes);           // 

router.use('/manageCustomer', manageCustomerRoutes);
router.use('/customerDetails',customerDetailsRoutes);
router.use('/country',countryRoutes);
router.use('/clientInfo',clientInfoRoutes);
router.use('/address',addressRoutes);
router.use('/occupation',occupationRoutes);
router.use('/declaration',declarationRoutes);
router.use('/residence',residenceRoutes);
router.use('/clientCreditFile',clientCreditFileRoutes);
router.use('/addDualProcess',dualProcessRoutes);
router.use('/intek',intekRoutes);

//Agent Routes start from Here 
router.use('/businessInfo',businessInfoRoutes);
router.use('/agentInfo',agentInfoRoutes);
router.use('/contactInfo', contactInfoRoutes);
router.use('/ccOfficerInfo',ccOfficerInfoRoutes)
router.use('/businessStructure',businessStructureRoutes)
router.use('/businessForm',businessFormRoutes)
router.use('/businessBranch',businessBranchRoutes)
router.use('/fbReviewRoutes', fbReviewRoutes)
module.exports = router;