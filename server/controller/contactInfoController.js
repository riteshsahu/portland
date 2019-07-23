const ContactInfoService = require('../service/contactInfoService');
class ContactInfoController{

    static addContactInfo(req,res){
        let contactInfo = req.body;
        ContactInfoService.addContactInfo(contactInfo).then( data =>{
            res.json(data);
        }).catch(err =>{
            res.status(500).send(err);
        });
    }
}

module.exports = ContactInfoController;