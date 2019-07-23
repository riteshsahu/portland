const DualProcessService = require('../service/dualProcessService');
class DualProcessController{

    static addDualProcess(req,res){
        let address = req.body;
        req.appUser = "Sada";
        DualProcessService.addDualProcess(address,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = DualProcessController;