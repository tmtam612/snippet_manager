const router = require('express').Router();
const User = require('../models/userModel');
const mongoose = require("mongoose");
const transporter = require("../transporter");
const formidable = require('formidable');
const fs = require('fs');


router.post("/addUser", async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) return err;
            const {first_name, last_name, email, user_name, password, confirm_password, status} = fields;
            if (email === '' || user_name === '' || password === '' || confirm_password === '') {
                let errorField = [];
                errorField = email === '' ? [...errorField, 'email'] : [...errorField];
                errorField = user_name === '' ? [...errorField, 'user_name'] : [...errorField];
                errorField = password === '' ? [...errorField, 'password'] : [...errorField];
                errorField = confirm_password === '' ? [...errorField, 'confirm_password'] : [...errorField];
                return res.send({status: false, 'errorMessage': "Please enter all required fields.", errorField: errorField});
            }
            
            if (status === "") {
                return res.send({status: false, 'errorMessage': "Please check accept checkbox.", errorField: ['status']});
            }
    
            if (password !== confirm_password) {
                return res.send({status: false, 'errorMessage': "Please enter the same twice for verification.", errorField: ['password', 'confirm_password']});
            }
    
            const exisingUser = await User.findOne({$or:[{user_name: user_name}, {email: email}]});
            if (exisingUser) {
                return res.send({status: false, 'errorMessage': "Account has existed.", errorField: ['email', 'user_name']});  
            }
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const user = new User({first_name, last_name, email, user_name, password, confirm_password, status});
                const savedUser = await user.save();console.log(savedUser);
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '<ptansang1997@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "create account", // Subject line
                    text: "Create Account Successfully", // plain text body
                });
                
                if (!fs.existsSync('./uploads/'+ savedUser._id)) {
                    //upload file
                    if (!fs.existsSync('./uploads/')) {
                        fs.mkdirSync('./uploads/');
                    }
                    fs.mkdirSync('./uploads/'+ savedUser._id);
                }
                if (files.image) {
                    const oldpath = files.image.path;
                    const newpath = './uploads/'+ savedUser._id +'/'+ files.image.name;
                    await fs.rename(oldpath, newpath, (err) => {
                        if (err) throw err;
                        res.end();
                    });
                }
                
                await session.commitTransaction();
                session.endSession();
                return res.send({'status': true});
            } catch (err) {
                // If an error occurred, abort the whole transaction and
                // undo any changes that might have happened
                console.log(err);
                await session.abortTransaction();
                session.endSession();
                return res.send({status: false, 'errorMessage': 'There is error in server'});
            }
        })


    } catch(err) {
        console.log(err);
        return res.send({status: false, 'errorMessage': 'There is error in server'});
    }
});

router.get("/getUsers", async (req, res) => {
    try {
        const result = await User.find().select({'password': 0}).then((res) => {
            return res.map((value) => {
                console.log(new Date(value.createdAt).getDate());
                return value.toJSON();
            })
        });
        return res.json({status: true, result: result});
    } catch (err) {
        console.log(err);
        return res.send({status: false, 'errorMessage': 'There is error in server'});
    }
});

module.exports = router;