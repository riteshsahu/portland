const ManageService = require("../service/manageService");

class ManageController{

        static manageCustomer(req,res){
           let data = req.body;

                ManageService.manageCustomer(data).then( result =>{                        
                   res.json(result);
                }).catch(err =>{
                        res.status(500)
                        res.json(err)
                })
            
        }

      

}

module.exports = ManageController;