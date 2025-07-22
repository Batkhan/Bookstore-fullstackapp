require('dotenv').config();

var express = require('express');

var app = new express();

var mongoose = require('mongoose');

Genres = require('./Models/genres');

Books = require('./Models/book');

login = require('./Models/login');

const jwt = require('jsonwebtoken');

bcrypt = require('bcrypt')

const authenticateToken = require('./Models/auth')

mongoose.connect('mongodb://localhost/bookstore');
db = mongoose.connection;

app.use(express.json());

//middleware to allow access to only admins
function requireRole(role) {
    return function (req,res,next) {
        if(req.user && req.user.role==role) {
            next();
        }
        else {
            res.status(403).json({message: "Forbidden: Insufficient Role...Only Admins are allowed"})
        } 
    };
}

app.get('/', function(req,res){
    res.send('Please api/books or api/genres');
});
//get all Genres
app.get('/api/genres', authenticateToken,  async function(req,res) {
        try {
            const genres = await Genres.getGenres(10);
            res.json(genres);
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    });

//create a genre
app.post('/api/genres', authenticateToken, requireRole('admin'), async function(req,res) {
    var body = req.body;
        try {
            const genresadd = await Genres.addGenre(body);
            res.json(genresadd);
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    });
//update a genre
app.put('/api/genres/:id', authenticateToken, requireRole('admin'), async function(req,res) {
var id = req.params.id;
var genrebody = req.body;
    try {
        const genreupdate = await Genres.updateGenre(id,genrebody,{});
        res.json(genreupdate);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

//get all books and filtering
app.get('/api/books', async function(req,res){
    try{
        const {author,genre,title,sort,order='asc',page = 1,limit = 10} = req.query;
        query = {};
        if(author) {
            query.author = new RegExp(`^${author}$`, 'i');
        }
        if (genre) query.genre = new RegExp(`^${genre}$`, 'i');
        if (title) query.title = new RegExp(`^${title}$`, 'i');
        const sortBy = {};
        if(sort) {
            sortBy[sort] = order === 'desc' ? -1:1;
        }
        let run = await Books.sortAuthor(query,sortBy,page,limit);
        res.json(run);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

//get specific book by id
app.get('/api/books/:id',async function(req,res){
    try{
        const book = await Books.getBookById(req.params.id);
        res.json(book);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

//create a book
app.post('/api/books', authenticateToken, requireRole('admin'), async function(req,res) {
    var bookbody = req.body;
        try {
            const bookadd = await Books.addBook(bookbody);
            res.json(bookadd);
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    });
//delete a book
app.delete('/api/books/:id', authenticateToken, requireRole('admin'), async function(req,res) {
        try {
            const bookdelete = await Books.deleteBook(req.params.id);
            res.json(bookdelete);
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    });


//In login page create a user and if email already exists,send back an error
app.post('/api/register',async function(req,res) {
    var registerBody = req.body;
    //password hashing before going into the database
    var password = req.body.password;
    try{
        const createLogin = await login.userRegister(registerBody);
        res.json(createLogin);
    }
    catch(err){
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        throw err;
    }
    });

//To login as existing user
app.post('/api/login',async function(req,res) {
    var {email,password,username} = req.body;
    try{
        var {userbyEmail, userbyusername} = await login.userLogin(email, password, username);
        var existingLogin = userbyEmail || userbyusername
        if(!existingLogin) {
            return res.status(400).json({message:"User not Found"});
        }
        //hashed password comapred with userinput password
        var isMatch = await bcrypt.compare(password,existingLogin.password);
        if(!isMatch) {
            return res.status(400).json({message:"Invalid Password"})
        }
        //JWT TOKEN creation
        const token = jwt.sign({id: existingLogin._id, username: existingLogin.username, role: existingLogin.role }, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({
            message: "Login successful",
            token,
            user: {
                username: existingLogin.username,
                role: existingLogin.role
            }
        });
}
    catch(err) {
        res.status(500).json({message:err.message});
    }
    });

app.listen(3000);
console.log('Running on Port 3000');