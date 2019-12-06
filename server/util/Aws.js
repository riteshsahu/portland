const AWS = require('aws-sdk');
const config = require('../config/env/index');
const bucket = require('./s3bucket');


AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});

var s3bucket = new AWS.S3({ params: { Bucket: config.aws.bucketName } });

class Aws {
    static deleteFile(key) {
        return new Promise((resolve, reject) => {
            var params = {
                Bucket: config.aws.bucketName,
                Key: key
            };
            s3bucket.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(" errr.",err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

    static updateFile(file) {
        return new Promise((resolve, reject) => {
            var buf = new Buffer.from(file.data.replace(/^data:(.*);base64,/, ""), 'base64');
            var fileName = `${(new Date()).getTime()}_${file.name}`
            var s3Data = {
                Key: fileName,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'multipart/form-data',
                ACL: 'public-read',
            };

            var filePath = 'https://afro-project.s3.us-east-2.amazonaws.com/' + fileName;
            s3bucket.putObject(s3Data, function (perr, pres) {
                if (perr) {
                    console.log("Error uploading data: ", perr);
                    reject(perr);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey", pres);
                    resolve(filePath);
                }
            });

        })
    }
}

module.exports = Aws;