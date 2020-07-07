/**
 * --- MODEL IMPORT ---
 */
const Admin = require("./admin.model");
const About = require("./about.model");
const Event = require("./event.model");
// const Photo = require("./photo.model");
const Team = require("./team.model");
const Person = require("./person.model");
// const Gallery = require("./gallery.model");

/**
 * --- MODEL SET RELATIONSHIP ---
 */
// User.hasMany(Post);
// Post.belongsTo(User);
Admin.hasOne(About);
About.belongsTo(Admin);

Admin.hasMany(Event);
Event.belongsTo(Admin);

Team.hasMany(Person);
Person.belongsTo(Team);

Admin.hasMany(Team);
Team.belongsTo(Admin);


/**
 * --- EXPORTING ALL MODELS ---
 */
module.exports = { Admin, About, Event, Person, Team };
