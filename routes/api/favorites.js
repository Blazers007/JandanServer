// 第三方
var router 		= require('express').Router();
var async 		= require('async');
var request 	= require('request');
var xml2js 		= require('xml2js');
var _ 			= require('underscore');
// 数据库
var db 			= require('../../server').db;
var Favorite 	= require('../../models/favorite');


/**
 * GET /api/{userId}/image
 * 返回指定的userId的Favorite JSON 结构
 */
router.get('/api/:userId/image', function(req, res, next) {
	Favorite.findOne({userId: req.params.userId})
        .select('images')
		.exec(function(err, fav) {
			if (err) return next(err);
			if (fav) {
				console.log(fav);
				res.send(fav.images);
			}else{
				res.end('404');
			}
		});
});


/**
 * POST /api/user/{userID}/favorite
 * 向指定的Favorite中添加数据 (不改变原有数据)
 * */
router.post('/api/users/:userId/favorite', function(req, res, next) {
    console.log(req.params.userId);
    console.log(req.body.favorite);
    var favorite = JSON.parse(req.body.favorite);
    // 判断是否存在UserID
    Favorite.findOne({userId: req.params.userId})
        .exec(function(err, fav){
            if (err) return res.end('0');
            if (!fav) {
                console.log("Could not find user match %s Create a new one", req.params.userId);
                Favorite.create({
                    userId: req.params.userId,
                    newses: favorite.newses,
                    images: favorite.images,
                    jokes: favorite.jokes
                }, function(err, doc){
                    if (err) return res.end('0');
                    res.end('1');
                });
            } else {
                console.log("Find and update");
                fav.update({$push:{newses: favorite.newses, images: favorite.images, jokes: favorite.jokes}},function(err, fav){
                   if (err) return res.end('0');
                    res.end('1');
                });
            }
        })
});

/**
* PUT /api/users/{userID}/favorite
* 更新该用户的Favorite数据
*/
router.put('/api/users/:userId/favorite', function(req, res, next) {
	// 没有用户首先创建用户 有用户则直接添加
	var news = [], images = [], jokes = [];
	for (var i = 0 ; i < 10 ; i ++ ) {
		news.push({
			id:1233314,
			favTime:1231131231233
		});
		images.push({
			url:"http://1111.jpg",
			favTime:1231131231233
		});
		jokes.push({
			comment_ID:1233314,
			favTime:1231131231233
		});
	};
	var fav = new Favorite({
		userId:"bqvSgbP6G",
		favorite:{
			news:news,
			images:images,
			jokes:jokes
		},
		update:new Date()
	});
	fav.save(function(err, doc) {
		if (err) return console.log(err);
		console.log(doc);
	});
});

module.exports = router;