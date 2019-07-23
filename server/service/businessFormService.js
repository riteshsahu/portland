const db = require('../util/db');
// const BusinessStructure = require('../model/businessStructure');

class BusinessFormService {


static addBusinessForm(data) {
    return new Promise((resolve, reject) => {
        var connection;
        db.getConnection().
            then(conn => {
                connection = conn;
                return db.beginTransaction(connection)
            }).then(() => {
                return new Promise((res,rej) => {
                    connection.query(`INSERT INTO organization (organization_id,email,userId, title, contact_person, contact_no,
                        about, website, address1, address2, country, state, city, zip,created_at,updated_at,created_by,updated_by, is_active) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [data.businessId,data.email, data.userId, data.title, data.contact_person, data.contact_no, data.about, data.website, data.address1,
                       data.address2,data.country,data.state,data.city,data.zip,data.created_at,data.updated_at, data.created_by,data.updated_by,data.isActive], (err, result) => {
                       if (err) {
                           console.log(err)
                           db.rollbackTransaction(connection)
                           db.releaseConnection(connection)
                           rej(err)
                       } else {
                           db.commitTransaction(connection)
                        db.releaseConnection(connection)
                           resolve(result)
                       }
                
                })
            })
               
            })
            .catch(err => {
                reject(err);
            })
    })
}

  






}
module.exports = BusinessFormService;
