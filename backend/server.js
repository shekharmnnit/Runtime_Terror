const express = require('express')
const config = require('./config/default.json')
// const connectDB = require('./config/db');
const db = config.mongoURI
const path = require('path');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const app = express();

const conn = mongoose.createConnection(db);
conn.on('error', e => {
    throw e;
})
let gfs;
conn.once('open', () => {
    // Init stream
    console.log("MongoDB connected...")
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
});
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = Date.now() + path.extname(file.originalname);
        const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
    }
});

const upload = multer({ storage: storage });

// Init Middleware
app.use(express.json());
app.use(express.static('uploads'));


// To be commented, route to handle file upload

app.post('/upload', upload.single('postfile'), (req, res) => {
    res.json({file: req.file})
})

app.get('/files', (req,res) => {
    console.log("reached get files route")
    gfs.files.find().toArray((err,files) => {
        if(!files || files.length === 0){
            return re.status(404).json({
                err:"No files exist"
            });
        }
        return res.json(files);
    })
})


// app.get('/',(req,res) => res.send('API running'))
app.use('/api/register', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));