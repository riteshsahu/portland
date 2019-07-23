const DeclrationService = require('../service/declarationService');
class DeclarationController{

    static addDeclaration(req,res){
        let address = req.body;
        req.appUser = "Sada";
        DeclrationService.addDeclaration(address,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = DeclarationController;