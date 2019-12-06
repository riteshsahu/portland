const AWS = require('aws-sdk');
const config = require('../config/env/index');


AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});

var s3bucket = new AWS.S3({ params: { Bucket: config.aws.bucketName } });

class S3bucket {

    static objectPut(s3Data) {
        return new Promise((resolve, reject) => {
            console.log("inside s3bucket.js", s3Data)
            s3bucket.putObject(s3Data, function (perr, pres) {
                if (perr) {
                    console.log("Error uploading data: ", perr);
                    reject(perr);
                } else {
                    console
                    console.log("Successfully uploaded data to myBucket/myKey", pres);
                    resolve(pres);
                }
            });
        });
    }

  }


module.exports = S3bucket;