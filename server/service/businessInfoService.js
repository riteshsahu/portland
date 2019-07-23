const db = require('../util/db');
const BusinessInfo = require('../model/businessInfo');
class BusinessInfoService {

    static getBusinessInfoById(id){
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //address['createdBy'] = user;
                    connection.query(`select * from BusinessInfo where userId = ?`, [id], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve( results.map(result =>{ new BusinessInfo(result)}));
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static addBusinessInfo(businessInfo, user) {
        let businessInfoList = businessInfo.map( businessInfo =>{
            return [businessInfo.businessType, businessInfo.businessTypeInput, businessInfo.registrationPlace,businessInfo.expiryDate,
            businessInfo.bin,businessInfo.streetNo,businessInfo.unitNo,businessInfo.streetAdd,businessInfo.country,businessInfo.city,
            businessInfo.province,businessInfo.zipcode,businessInfo.primaryPhone,businessInfo.fax,businessInfo.userId,businessInfo.createDate,
        businessInfo.createdBy,businessInfo.updateDate,businessInfo.updatedBy ];
        })
      
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //address['createdBy'] = user;
                    connection.query(`INSERT INTO BusinessInfo (businessType,businessTypeInput,registrationPlace,expiryDate,
                        bin,streetNo,unitNo,streetAdd,country,city,province,zipcode,primaryPhone,fax,userId,createDate,createdBy,updateDate,updatedBy) values ?`, [businessInfoList], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(result.insertId)
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

}

module.exports = BusinessInfoService;
