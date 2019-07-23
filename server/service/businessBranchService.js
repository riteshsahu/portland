const db = require('../util/db');

class BusinessBranchService {


    static addBusinessBranch(data) {
        let id = data.userId;
        let organization_id = data.organizationId;
        let created_at = data.created_at;
        let updated_at= data.updated_at;
        let created_by = data.created_by;
        let updated_by = data.updated_by;
        let isActive= data.isActive;
        let finalBranch = data.branch.map(dt => {
            let arr = [];
            arr[0] = organization_id;
            arr[1] = id;
            arr[2] = dt.branchName;
            arr[3] = dt.email;
            arr[4] = dt.contactPerson;
            arr[5] = dt.contactNo;
            arr[6] = dt.Address1;
            arr[7] = dt.Address2;
            arr[8] = dt.countryCode;
            arr[9] = dt.stateCode;
            arr[10] = dt.city;
            arr[11] = dt.zip;
            arr[12] = created_at;
            arr[13] = updated_at;
            arr[14] = created_by;
            arr[15] = updated_by;
            arr[16] = isActive;
            return arr;
        });

        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(connection)
                }).then(() => {
                    return new Promise((res, rej) => {
                        connection.query(`INSERT INTO branches (organization_id,userId, name,email,contact_person,contact_no,address1, address2, country, state, city, zip,created_at,updated_at,created_by,updated_by, is_active)
                     VALUES ?`,
                            [finalBranch],
                            (err, result) => {
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
module.exports = BusinessBranchService;
