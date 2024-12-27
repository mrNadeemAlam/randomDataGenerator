const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/employee.js");
const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/company");

app.set("view engine", "ejs");

const getRandom = (arr)=>{
  let rno = Math.floor(Math.random() * (arr.length))
  return arr[rno]
}

app.get("/", (req, res) => {
  res.render("index", { foo: "FOO" });
});

app.get("/generate", async (req, res) => {

  //clear the previous created data if any 
  await Employee.deleteMany({})

  //generate random inputs

  let randomNames = ["Nadeem","Aditya","Ansh","Rahul"]
  let randomLanguage = ["python","C++","java","javascript"]
  let randomCity = ["Delhi","Mumbai", "Bhopal","Noida","Patna"]
  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random()* 100000),
      language: getRandom(randomLanguage),
      city: getRandom(randomCity),
      isManager: Math.random()>0.6?true:false,
    });
    console.log(e)
  }

  res.render("index", { foo: "FOO" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
