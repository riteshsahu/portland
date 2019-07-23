const BusinessInfoService = require('../service/businessInfoService');
class BusinessInfoController{

    static addBusinessInfo(req,res){
        let businessInfo = req.body;
        BusinessInfoService.addBusinessInfo(businessInfo).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = BusinessInfoController;