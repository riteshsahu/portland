const BusinessStructureService = require('../service/businessStructureService');
class BusinessStructureController{

    static addBusinessStructure(req,res){
        let businessStructure = req.body;
        BusinessStructureService.addBusinessStructure(businessStructure).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = BusinessStructureController;