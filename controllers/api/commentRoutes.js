const router = require('express').Router();
const { Comment } = require ('../../models');
const Auth = require("../../utils/auth");

// Create a post route for comments to be created on a respective post. Maybe add delete route?

router.post('/', Auth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
        console.log(commentData);
       

    } catch (err) {
        res.status(404).json(commentData);
    }
});




module.exports = router;


