const ResidenceService = require('../service/residenceService');
class ResidenceController{

    static addResidence(req,res){
        let address = req.body;
        req.appUser = "Sada";
        ResidenceService.addResidence(address,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = ResidenceController;