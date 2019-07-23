const UserService = require("../service/userService");
const ClientInfoService = require('../service/clientInfoService');
const AddressService = require('../service/addressService');
const OccupationService = require('../service/occupationService');
const ClientCreditFileService = require('../service/clientCreditFileService');
const DualProcessService = require('../service/dualProcessService');
const DeclarationService = require('../service/declarationService');
const ResidenceService = require('../service/residenceService');
const ClientIdentificationService = require('../service/clientIdentificationService');

class IntekController{

    static addIntek(req,res){
        let reqData = req.body;
        let  identification= reqData.identification;
      //  req.appUser = "Sada";
        return new Promise((resolve,reject) => {
            
            let userParam = {
                "name" : reqData.clientInfo.firstName+' '+reqData.clientInfo.lastName,
                "email" : reqData.address.email,
                "password" : "123456",
                "role" : 2,
                "isApproved" : 1
            }
            UserService.addUser(userParam).then( data =>{
                console.log('result------',data);
                let userId = data.userId; 
                Promise.all([     
                    ClientInfoService.addClientInfo(reqData.clientInfo,userId),
                    AddressService.addAddress(reqData.address,userId),   
                    OccupationService.addOccupation(reqData.occupation,userId),
                    ClientIdentificationService.addclientIdentification(identification.govtId,userId),       
                    DualProcessService.addDualProcess(identification.dualProcess,userId), // 0
                    ClientCreditFileService.addClientCreditFile(identification.creditFile,userId), //1
                    ResidenceService.addResidence(reqData.residence,userId),
                    DeclarationService.addDeclaration(reqData.declaration,userId), // 2
                          ]).then( results => {
                  console.log(results);
              }).catch(err => {
                  console.log(err);
                 reject(err);
              })
            }).catch(errors =>{
                console.log(errors);
            })
         
         
            console.log(reqData);
            resolve(reqData);
        })
       


        // DualProcessService.addDualProcess(address,req.appUser).then( data =>{
        //     res.json(data);
        // }).catch(err =>{
        //     res.status(500).send(err);
        // });



    }
}

module.exports = IntekController;