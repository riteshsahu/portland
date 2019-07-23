const CcOfficerService = require('../service/ccOfficerService');
class CcOfficerController{

    static addccOfficerInfo(req,res){
        let ccOfficerInfo = req.body;
        CcOfficerService.addccOfficerInfo(ccOfficerInfo).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = CcOfficerController;