

module.exports = function(async){  
    return{
        SetRouting: function(router){
            router.get('/latest-football-news', this.footbalNews)
            
        },
        footbalNews: function(req,res){

            // https://content.guardianapis.com/football?page-size=20&order-by=newest&show-fields=all&api-key=5ba60cf8-6bd6-4c49-9304-9cd851db3381
            
            res.render('news/footballnews', {title: "Fighting Bees- Latest News",user: req.user});
        }
    }

}