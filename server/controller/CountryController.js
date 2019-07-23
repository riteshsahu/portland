const CountryService = require('../service/countryService');
class CountryController{

        static getCountries(req,res){
                CountryService.getCountries().then( data =>{
                        res.json(data);
                }).catch(err =>{
                        res.status(500);
                        res.json(err);
                })
        }

        static getStates(req,res){
                let countryId = req.params['countryId']
                CountryService.getState(countryId).then( data =>{
                        res.json(data);
                }).catch(err =>{
                        res.status(500);
                        res.json(err);
                })
        }
      

}

module.exports = CountryController;