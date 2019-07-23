const ClientCreditFileService = require('../service/clientCreditFileService');
class ResidenceController{

    static addClientCreditFile(req,res){
        let address = req.body;
        req.appUser = "Sada";
        ClientCreditFileService.addClientCreditFile(address,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = ResidenceController;