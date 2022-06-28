const { getComment, getComments, updateComment, deleteComment, createComment } = require("../controllers/comment.controllers");
const {
    createStory,
    getStory,
    getStories,
    updateStory,
    deleteStory,
    publishStory,
} = require("../controllers/story.controllers");
const storyModel = require("../models/story.models");
const router = require("express").Router();

router.param("story", async(req, res, next, id) => {
    try {
        const story = await storyModel.findById(id);

        if (!story) {
            return res.status(404).json("story not found");
        }

        req.story = story;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/", createStory);
router.get("/", getStories);
router.get("/:story", getStory);
router.put("/:story", updateStory);
router.delete("/:story", deleteStory);
router.post(":story/comments", createComment);
router.get(":story/comments", getComments);
router.get(":story/comments/:comment", getComment);
router.get(":story/comments/:comment/replies", getComment);
router.put(":story/comments/:comment", updateComment);
router.delete(":story/comments/:comment", deleteComment);



module.exports = router;