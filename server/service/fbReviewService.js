
var FB = require('fb');
const fb = new FB.Facebook({ version: 'v2.4', appId: '315949052677139', xfbml: true });


class FbReviewService {
    static getFbReview() {
        return new Promise((resolve, reject) => {
        FB.api('/710679609328062/ratings',
            { "access_token": "EAAEfWp8NTBMBAMQY1leiaZBZBcJsp33IiGP9NDiMQpanknkyEFBKKcJuWoMtIy7GKm9yKgbPQ2xM4ZCl14th7pbMqADPMRiDq8HNKxbwm2uvJveoQJWbMCLXvmpAjbxcI6jWMaDUP8vetpsp59DlZCoDdRxRWjtR1RnvL9nc5Xx2ogwZCNZBfEDm35bEZB7JnnLJEN5JbSyVgZDZD" },
            function (res) {
                if (!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    reject(res.error);
                }
                resolve(res);

            });
        });
    }
}
module.exports = FbReviewService;
