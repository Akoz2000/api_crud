const express= require('express');
const router= express.Router();
const ObjectId = require('mongoose').Types.ObjectId;  

const { Employee }= require('../models/employee');






router.get('/api/employees', (req, res) => {
    Employee.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

router.get('/api/employee/:id', (req, res) => {
    //var query  = Employee.where({ employeeId: req.params.employeeId }); 
    //Employee.findById(req.params.id, (err, data) => {
    //query.findOne(function (err, employee){  
        //let num = 15;
        //let text = num.toString();
    Employee.findOne({ employeeId: parseInt(req.params.id) }, function(err, data) {
    if(!err) {
             res.send(data);
         } else {
            console.log(err);
         }
     });
     

    // var query  = Employee.where({ _id: req.params.employeeId }); // <-- Use the correct param name
    // query.findOne(function (err, employee) {
    //     if (err)
    //         return res.send(err)
    //     res.json(employee);
    //     });

});

router.put('/api/employee/update/:id', (req, res) => {


    const emp = {
        name: req.body.name,
        email: req.body.email,
       
       // salary: req.body.salary
    };
    Employee.findOneAndUpdate({ employeeId: parseInt(req.params.id) }, { $set: emp }, { new: true }, (err, data) => {
        //Employee.findOne({ employeeId: parseInt(req.params.id) }, function(err, data) {  
    if(!err) {
            res.status(200).json({code: 200, message: 'Employee Updated Successfully', updateEmployee: data})
        } else {
            console.log(err);
        }
    });
});





router.post('/api/employee/add', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        //salary: req.body.salary
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Employee Added Successfully', addEmployee: data})
        } else {
           console.log(err);
        }
    });
});

router.delete('/api/employee/:id', (req, res) => {

    //Employee.findByIdAndRemove(req.params.id, (err, data) => {
        Employee.findOneAndRemove({ employeeId: parseInt(req.params.id) }, function(err, data) {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Employee deleted', deleteEmployee: data})
        } else {
            console.log(err);
        }
    });
});



module.exports=router;
