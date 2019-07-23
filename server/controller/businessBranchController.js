const BusinessBranchService = require('../service/businessBranchService');
class BusinessBranchController{

    static addBusinessBranch(req,res){
        let businessBranch = req.body;
        BusinessBranchService.addBusinessBranch(businessBranch).then( data =>{
            res.json(data);
        }).catch(err =>{
            console.log(err);
            res.status(500).send(err);
        });
    }
}

module.exports = BusinessBranchController;