var mongoose = require('mongoose');

var genre_schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now
    }},
    {collection: 'genres'
}); 

var Genres = module.exports = mongoose.model('Genres',genre_schema);

//get Genre

module.exports.getGenres = function(limit) {
    return Genres.find().limit(limit).exec();
};

module.exports.addGenre = function(body) {
    return Genres.create(body);
};

module.exports.updateGenre = function(id, genrebody ,options) {
    var query = {_id: id};
    var update = {
        name: genrebody.name
    };
    return Genres.findOneAndUpdate(query,update,options);
};
