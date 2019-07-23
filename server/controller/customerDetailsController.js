const CustomerDetailsService = require("../service/customerDetailsService");

class CustmerDetailsController{

        static customerDetails(req,res){
           let data = req.body;
                CustomerDetailsService.customerDetails(data).then( result =>{                        
                   res.json(result);
                }).catch(err =>{
                       
                        res.status(500)
                        res.json(err)
                })
            
        }

      

}

module.exports = CustmerDetailsController;