//js 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();


app.set("views", ejs);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://rahul:23129680@cluster0.dyipg.mongodb.net/collegeDB?retryWrites=true&w=majority", { useNewUrlparser: true });

const collegeSchema = {
  collegeName: String,
  collegeCode: String,
};


const College = mongoose.model("College", collegeSchema);

/////////////////////////////////////////////////request targetting all the articles ///////////////

app
  .route("/colleges")
  .get(function (req, res) {
    College.find(function (err, foundCollege) {
      if (!err) {
        res.send(foundCollege);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const newCollege = new College({
      collegeName: req.body.name,
      collegeCode: req.body.code,
    });
    newCollege.save(function (err) {
      if (!err) {
        res.send("Successfully added to the database");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted all articials");
      } else {
        res.send(err);
      }
    });
  });

/////////////////////////////////////////////////request targetting spectific the articles ///////////////

// app
//   .route("/articles/:articleTitle")
//   .get(function (req, res) {
//     Article.findOne(
//       { title: req.params.articleTitle },
//       function (err, foundArticle) {
//         if (foundArticle) {
//           res.send(foundArticle);
//         } else {
//           res.send("No article match found");
//         }
//       }
//     );
//   })

//   .put(function (req, res) {
//     Article.replaceOne(
//       { title: req.params.articleTitle },
//       { title: req.body.title, content: req.body.content },
//       { overwrite: true },
//       function (err) {
//         if (!err) {
//           res.send("Successfully updated");
//         }
//       }
//     );
//   })

//   .patch(function(req,res){
//     Article.updateOne(
//       {title: req.params.articleTitle},
//       {$set: req.body},
//       function(err){
//         if(!err){
//           res.send("successfully updated");
//         }else{
//           res.send(err);
//         }
//       }
//     );
//   })

//   .delete(function(req,res){
//     Article.deleteOne(
//       {title:req.params.articleTitle},
//       function(err){
//         if(!err){
//           res.send("Successfully deleted");
//         }else{
//           res.send(err);
//         }
//       }
//     );
//   });



let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000
}


app.listen(port, function () {
    console.log("app started in local host 3000");
  });
  