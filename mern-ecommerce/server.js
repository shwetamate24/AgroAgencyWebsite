const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
var nodemailer = require('nodemailer');
const { sendMail } = require('./utils/sendMail');

// app
const app = express();

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

connectDB();

// sendMail();

//nodemailer API
// app.post('/api/mail', (req, res) => {
//   let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           type: 'OAuth2', 
//           user: 'XXX@gmail.com',
//           clientId: 'XXX-XXX.apps.googleusercontent.com',
//           clientSecret: 'SY0-XXXX',
//           refreshToken: '1/XXX_XXX',
//           accessToken: 'ya29.XXX-XXX-XXX-XXX'
//       }
//   })

//   let mailOptions = {
//       from: 'FReyes <XXX@gmail.com>',
//       to: req.body.to,
//       subject: req.body.subject,
//       text: req.body.txt
//   }

//   transporter.sendMail(mailOptions, function (err, res) {
//       if(err){
//           console.log('Error');
//       } else {
//           console.log('Email Sent');
//       }
//   })
// });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
