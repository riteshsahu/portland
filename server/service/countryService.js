const db = require('../util/db');
var Country = require('../model/Country');
var State = require('../model/State');

class CountryService{

   static getCountries(){
       return new Promise((resolve,reject) =>{
        var connection;
        db.getConnection().then( conn => {
            connection = conn;
            connection.query('select * from country',[],(err, rows, fields) =>{
                if( err ) reject(err)
                let Countries = rows.map( item => new Country(item));
                resolve(Countries);
            })
        })
       })
   }

   static getState(countryId){
    return new Promise((resolve,reject) =>{
        var connection;
        db.getConnection().then( conn => {
            connection = conn;
            connection.query('select * from state where country_id = ?',[countryId],(err, rows, fields) =>{
                if( err ) reject(err)
                let states = rows.map( item => new State(item));
                resolve(states);
            })
        })
       })
   }
}

module.exports = CountryService;