const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
    
    //body-parser로 인해서 바로 req를 json형식으로 받을 수 있음

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            // 그 다음에 프론트에 다시 숫자 정보를 보내주기
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })

})

router.post("/removeFromFavorite", (req, res) => {
    
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    })
    .exec((err , doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, doc })
    })

})

router.post("/addToFavorite", (req, res) => {
    
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({
            success: true
        })
    })

})

router.post("/favorited", (req, res) => {
    
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            // 그 다음에 프론트에 다시 숫자 정보를 보내주기
            let result = false;
            if(info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
})

router.post("/getFavoredMovie", (req, res) => {
    
  Favorite.find({ 'userFrom': req.body.userFrom })
  .exec((err, favorites) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, favorites})
  })
})

router.get("/test", function(req, res, next) {
    res.status(200).json({
        success: true
    });
});

module.exports = router;
