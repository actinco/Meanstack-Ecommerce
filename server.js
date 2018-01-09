'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
// var csurf = require('csurf')
var Checkout= require('./schema2.js');
var Product= require('./schema.js');

var app = express();
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
app.use(express.static('public'))
app.use( express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(csurf());
// var checkout= require('/schema2');




app.get('/',function(req,res){
  // res.send({fgg:"jkgj"});
	res.sendFile('index.html',{'root':__dirname });
})


// app.post('/product/add',function(req,res){
// 	// res.sendFile('index.html',{'root':__dirname });
//   console.log(req.body);
//   var product;
//   product = new ProductsModel({
// 		  itemname:req.body.itemname,
// 		  price:req.body.price,
//       image:req.body.img1,
// 	});
//   product.save(function (err) {
// 		if (!err) {
// 			return console.log("created");
// 		} else {
//
// 			return console.log(err);
// 		}
// 	});
// })
app.post('/checkout',function(req,res){
  // res.sendFile('index.html',{'root':__dirname });
    cart = new cartModel({
      itemname:req.body.itemname,
		  price:req.body.price,
      });

})

// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		callback(null, './uploads')
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
// 	}
// })
app.post('/profile', upload.single('newProfilePicture'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  console.log('body', req.body);
  var prodName= new Product(req.body);
  prodName.img1= req.file.destination + req.file.originalname;
  console.log('product', prodName);
  prodName.save(function (err) {
		if (!err) {
      res.jsonp(prodName)
		} else {

			return res.jsonp(err);
		}
    // $scope.product = response.data;
	});

});
// var cpUpload = upload.fields([{ name: 'newProfilePicture', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

app.get('/services',function(req, res, next){
   Product.find(function (err, docs) {
     if(err) {
            console.log('Error Happened'  + err);
            return res.redirect('/');
        }
        else {
          res.jsonp(docs)
        }
   })
})
app.listen('3333', function(){
	console.log('Server running at http://localhost:3333 !!')
})
