const OccupationService = require('../service/occupationService');
class OccupationController{

    static addOccupation(req,res){
        let occupation = req.body;
        req.appUser = "Sada";
        OccupationService.addOccupation(occupation,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = OccupationController;