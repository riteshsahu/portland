const BusinessFormService = require('../service/businessFormService');
class BusinessFormController{

    static addBusinessForm(req,res){
        let businessForm = req.body;
        BusinessFormService.addBusinessForm(businessForm).then( data =>{
            res.json(data);
        }).catch(err =>{
            console.log(err);
            res.status(500).send(err);
        });
    }
}

module.exports = BusinessFormController;