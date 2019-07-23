const clientInfoService = require('../service/clientInfoService');
const ClientInfo = require('../model/clientInfo');
class ClientInfoController{

    static addClientInfo(req,res){
        let clientInfo = req.body;
        req.appUser = "Sada";
        clientInfo['dob'] = new Date(clientInfo['dob'])
        clientInfoService.addClientInfo(clientInfo,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = ClientInfoController;