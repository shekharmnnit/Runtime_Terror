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

const connectDB = async () => {
    try {
      await mongoose.connect(db);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
    }
  };

connectDB();

const conn = mongoose.createConnection(db);
conn.on('error', e => {
    throw e;
})
let gfs, gridfsBucket;
conn.once('open', () => {
    // Init stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
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

app.use('/api/user', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'));
// To be commented, route to handle file upload

app.post('/upload', upload.single('postfile'), (req, res) => {
    res.json({file: req.file})
})

app.get('/getfiles/:filename', async (req,res) => {
    console.log("reached route");
    const file = await gfs.files.findOne({filename:req.params.filename});
    if (!file || file.length === 0) {
        return res.status(404).json({
            err: 'No file exists'
        });
    }

    if(file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    } else {
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
        // res.json('yet to be handled')
    }

})



// app.get('/',(req,res) => res.send('API running'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));