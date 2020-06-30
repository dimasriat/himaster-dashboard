/**
 * --- MODEL IMPORT ---
 */
const User = require("./User");
const Post = require("./Post");

/**
 * --- MODEL SET RELATIONSHIP ---
 */
User.hasMany(Post, { as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

/**
 * --- EXPORTING ALL MODELS ---
 */
module.exports = { User, Post };
