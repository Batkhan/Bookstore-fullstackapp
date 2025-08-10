var mongoose = require('mongoose');

const book_schema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true
    },
    genre: { 
        type:String,
        required:true 
    },
    description: String,
    author: {
        type:String,
        required:true
    },
    publisher: String,
    pages: Number,
    image_url: String,
    price: { 
        type: Number,
        required:true
    },
    publisher_name: String,
    publisher_year: Number,
    create_date: {
        type: Date,
        default: Date.now
    }},
    {collection: 'books'}
);

var Books = module.exports = mongoose.model('whatever',book_schema);

module.exports.getBooks = function(limit) {
    return Books.find().limit(limit).exec();
};


module.exports.addBook = function(bookbody) {
    return Books.create(bookbody);
};
module.exports.deleteBook = function(id) {
    return Books.deleteOne({_id: id});
}
//sort by author

module.exports.sortAuthor = function(query,sortBy,page,limit) {
    return Books
    .find(query)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .exec();
}