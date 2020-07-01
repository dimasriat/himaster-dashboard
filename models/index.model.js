/**
 * --- MODEL IMPORT ---
 */
const User = require("./user.model");
const Post = require("./post.model");

/**
 * --- MODEL SET RELATIONSHIP ---
 */
User.hasMany(Post);
Post.belongsTo(User);

/**
 * --- EXPORTING ALL MODELS ---
 */
module.exports = { User, Post };
