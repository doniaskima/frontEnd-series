const followModels = require("../models/follow.models");

const createFollow = async(req, res) => {
    const newFollow = new followModels({
        follower: req.body.follower,
        following: req.body.following
    });
    try {
        const savedFollow = await newFollow.save();
        return res.status(200).json(savedFollow);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getFollows = async(req, res) => {
    try {
        const follows = await followModels.find();
        return res.status(200).json(follows);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getFollow = async(req, res) => {
    const id = req.params.followId;

    try {
        const follow = await followModels.findById(id);
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteFollow = async(req, res) => {
    const id = req.params.followId;
    try {
        const follow = await followModels.findByIdAndDelete(id);
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateFollow = async(req, res) => {
    const id = req.params.followId;
    try {
        const follow = await followModels.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createFollow = createFollow;
module.exports.getFollows = getFollows;
module.exports.getFollow = getFollow;
module.exports.deleteFollow = deleteFollow;
module.exports.updateFollow = updateFollow;