module.exports = {
    env: 'local',
    port: process.env.PORT || 8080, 
    db: {
      // "uri": "mysql://QN4icqhwDK:8HATfqaoyF@remotemysql.com:3306/QN4icqhwDK",
      "uri": "mysql://root@127.0.0.1:3306/portland",
      "connectionLimit": 100,
      "acquireTimeout": 100000,
      "connectTimeout": 100000
    },
    aws : {
      accessKeyId: "AKIAI7O75HYRI2ZP6NXA",
      secretAccessKey: "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",
      bucketName : "afro-project"
    },
    logging: {
      logToFile: process.env.LOGFILEPATH ? true : false,
      logFilePath: process.env.LOGFILEPATH || "../logs",
      logToConsole: true,
      logHTTPToFile: process.env.HTTPLOGFILEPATH ? true : false,
      logHTTPToConsole: true
    },
    vapidPublicKey: "BJSb4Xhcs8_ZPa0Qu4epmDeU9GBj4E8BrDjFZebMZBMHBqP4HyAW-bGleVlnX7N9Qnlj4uPUGGxzYj9F_-4xq2Q",
    vapidPrivateKey: "5NwdayA2A7s0spACkz2E93jcTQYWNl2VhbwPNBOeX_A",
    googleApiKey: "AIzaSyD9gPW-PJ7eztnlR137aWYm3d-wvDZWKGo",
    email: "pandeyaniket546@gmail.com"
  };
  
