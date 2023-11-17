const express = require('express')
const config = require('./config/default.json')
const cors = require('cors')
// const connectDB = require('./config/db');
const db = config.mongoURI
// const path = require('path');
// const multer = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const connectMySQL = require('./mySQL/connectMySQL');

const app = express();

// Export the 'app' object
module.exports = { app };

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

async function setupDatabase() {
  try {
    await connectMySQL.createDatabase();
    await connectMySQL.createTable();
    console.log('Database and table created successfully');

    // Start your server here
    // const PORT = process.env.PORT || 5050;
    // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error('Error setting up the database:', err);
  }
}

// Call the function to set up the database
setupDatabase();

// const conn = mongoose.createConnection(db);
// conn.on('error', e => {
//     throw e;
// })
// let gfs, gridfsBucket;
// conn.once('open', () => {
//     // Init stream
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'uploads'
//     });
//     console.log("MongoDB connected...")
//     gfs = Grid(conn.db, mongoose.mongo);  
//     gfs.collection('uploads');
// });
// const storage = new GridFsStorage({
//     url: db,
//     file: (req, file) => {
//     return new Promise((resolve, reject) => {
//         const filename = Date.now() + path.extname(file.originalname);
//         const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//     });
//     }
// });

// const upload = multer({ storage: storage });

// Init Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods:'*',
  credentials:true,
  allowedHeaders:'*'
}))


app.use('/api/user', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/auth'))
app.use('/api/secureLogin', require('./routes/api/authMySQL'))
app.use('/api/posts', require('./routes/api/posts'));
// To be commented, route to handle file upload

app.post('/upload', (req, res) => {
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
