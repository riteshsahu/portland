const AddressService = require('../service/addressService');
class AddressController{

    static addAddress(req,res){
        let address = req.body;
        req.appUser = "Sada";
        AddressService.addAddress(address,req.appUser).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = AddressController;