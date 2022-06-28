const blogModels = require("../models/blog.models");
const userModels = require("../models/user.models");

const createBlog = async(req, res) => {
    const newBlog = new blogModels({
        name: req.body.name,
        owners: [req.verifiedUser._id],
    });
    try {
        const savedBlog = await newBlog.save();
        return res.status(200).json(savedBlog);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getBlogs = async(req, res) => {
    try {
        const blogs = await blogModels.find();
        return res.status(200).json(blogs);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getBlog = async(req, res) => {
    const blog = req.blog;
    await blog.populate({
        path: "owners",
        select: "firstName lastName email username",
    });
    try {
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteBlog = async(req, res) => {
    const id = req.blog._id;
    try {
        const blog = await blogModels.findByIdAndDelete(id);
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateBlog = async(req, res) => {
    const id = req.blog._id;
    try {
        const blog = await blogModels.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getOwnedBlogs = async(req, res) => {
    try {
        const blogs = await blogModels.find({
            owners: { $in: [req.verifiedUser._id] },
        });
        return res.status(200).json(blogs);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const addOwnerToBlog = async(req, res) => {
    const blog = req.blog;

    try {
        const existUser = await userModels.findOne({ email: req.body.email });
        if (!existUser) {
            const newUser = new userModels({
                email: req.body.email,
            });
            const savedUser = await newUser.save();
            await blog.addOwner(savedUser._id);
        } else {
            await blog.addOwner(existUser._id);
        }
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const removeOwnerFromBlog = async(req, res) => {
    const blog = req.blog;

    try {
        const existUser = await userModels.findOne({ email: req.body.email });
        if (!existUser) {
            return res.status(400).json("User is not a member of this blog");
        } else {
            await blog.removeOwner(existUser._id);
        }
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.updateBlog = updateBlog;
module.exports.getOwnedBlogs = getOwnedBlogs;
module.exports.addOwnerToBlog = addOwnerToBlog;
module.exports.removeOwnerFromBlog = removeOwnerFromBlog;