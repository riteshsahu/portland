const FbReviewService = require('../service/fbReviewService');
class FbReviewController{

    static getFbReview(req,res){
        FbReviewService.getFbReview().then( data =>{
            res.json(data);
        }).catch(err =>{
            console.log(err);
            res.status(500).send(err);
        });
    }
}

module.exports = FbReviewController;