import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoute.js';
import { fileURLToPath } from 'url';
import multer from 'multer'


const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// routes
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use("/images",express.static(path.join(__dirname,"/images")))

//image upload
const storage=multer.diskStorage({
  destination:(req,file,fn)=>{
      fn(null,"images")
  },
  filename:(req,file,fn)=>{
      fn(null,req.body.img)
  }
})

// image route
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!")
})




if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
