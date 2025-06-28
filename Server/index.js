const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./employee/Employee.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/employee');

app.post('/login', (req,res) =>{
  const {email, password} = req.body;
  EmployeeModel.findOne({email: email})
  .then(user => {
    if(user){
      if(user.password === password){
        res.json("Successfully Logged In");
      } else{
        res.json("password is incorrect");
      }
    } else{
      res.json("User does not exist");
    }
  })
})

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});