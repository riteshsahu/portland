const UserService = require("../service/userService");

class UserController{

        static addUser(req,res){
           let data = req.body;
                UserService.addUser(data).then( result =>{
                   res.json(result);
                   console.log(result)
                }).catch(err =>{
                        res.status(500)
                        res.json(err)
                        console.log(err)

                })            
        }

        
        static getUsers(req,res){
                // let data = req.body;
                     UserService.getUsers().then( result =>{
                        res.json(result);
                        console.log(result)
                     }).catch(err =>{
                             res.status(500)
                             res.json(err)
                             console.log(err)
     
                     })            
             }

             
        static authUser(req,res){
                console.log("Called");
                let data = req.body;
                UserService.authUser(data).then( result =>{
                   res.json(result);
                }).catch(err =>{
                        res.status(500)
                        res.json(err)
                }) 
        }
      

}

module.exports = UserController;