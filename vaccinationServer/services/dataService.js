const mongoose = require('mongoose')
const db = require('./db')
// const jwt = require('jsonwebtoken')

//get

const getAdmins = () => {
    return db.Admin.find({ username }).then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                admin: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 402,
                message: "Admin Not Found"
            }
        }
    })
}

const getAllHospitals = () => {
    return db.Hospital.find().then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                admin: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 402,
                message: "Hospital Not Found"
            }
        }
    })
}

const getHospitals = () => {
    return db.Hospital.find({ hospitalname }).then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                admin: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 402,
                message: "Hospital Not Found"
            }
        }
    })
}
const getChilds = () => {
    return db.Child.find({ username }).then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                admin: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 402,
                message: "Child Not Found"
            }
        }
    })
}
const getBookings = () => {
    return db.Booking.find({ hospitalname }).then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                admin: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 402,
                message: "Booking Not Found"
            }
        }
    })
}

//push

const adminlo =()=>{
    const username = req.body.username;
    const password = req.body.password;
    db.collection("hospitals").findOne({ hospitalname : username }, (err, user) => {
        if (err) {
          res.status(500).send("Error logging in");
        } else if (!user) {
          res.status(400).send("User not found");
        } else {
          if (user.password === password) {
            res.send("Login successful");
          } else {
            res.status(400).send("Incorrect password");
          }
        }
      });
}

const pushHospital = (hospitalname, email, password) => {

    return db.Hospital.findOne({ "hospitalname": hospitalname })
        .then((hospital) => {
            if (hospital) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Hospital already exists'
                }
            }
            else {
                const newHospital = new db.Hospital({
                    hospitalname,
                    email,
                    password

                })
                newHospital.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Hospital added successfully'
                }
            }
        }
        ).catch(err => { console.log('Failed to register', err); });
}

const pushChild = (username, parentname, password, email, phonenumber, dob) => {

    return db.Child.findOne({ username }).then(
        (result) => {
            if (result) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Username already exists'
                }
            }
            else {
                const newItem = new db.Child({
                    username,
                    parentname,
                    password,
                    email,
                    phonenumber,
                    dob
                })
                newItem.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Child added successfully'
                }
            }
        }
    )
}

const pushBooking = (username, childage, hospitalname, vaccinationname) => {

    return db.Booking.findOne({ username }).then(
        (result) => {
            if (result) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Booking already exists'
                }
            }
            else {
                const newItem = new db.Booking({
                    username,
                    childage,
                    hospitalname,
                    vaccinationname
                })
                newItem.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Child added successfully'
                }
            }
        }
    )
}

//delete

const deleteHospital = (hospitalname) => {

    return db.Hospital.deleteOne({ hospitalname }).then(
        (result) => {
            if (result) {
                // return {
                //     status: true,
                //     statusCode: 200,
                //     message: 'item removedsuccessfully'
                // }
                return db.Hospital.find().then(
                    (result) => {
                        if (result) {
                            return {
                                status: true,
                                statusCode: 200,
                                Wishlist: result,
                                message: 'Hospital removed successfully'
                            }
                        }
                        else {
                            return {
                                status: false,
                                statusCode: 401,
                                message: 'Your Hospital List is empty'
                            }

                        }

                    }
                )
            }
            else {
                return {
                    status: false,
                    statusCode: 404,
                    message: 'Hospital not exist'
                }
            }
        }
    )
}

//login
const adminLogin = (username, password) => {
    return db.Admin.findOne({
        username,
        password
    })
        .then(Admin => {
            if (Admin) {
                // currentUser = User.username;
                //   currentacno = acno;
                //token generate
                const token = jwt.sign({ currentUser: username }, 'superkey2020')
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Login Successfully',
                    currentUser,
                    // currentacno,
                    token
                }

            }
            else {

                return {
                    statusCode: 401,
                    status: false,
                    message: 'incorrect password or username'
                }
            }
        })
}

module.exports = {
    getAdmins, getAllHospitals, getHospitals, getChilds, getBookings,
    pushHospital, pushChild, pushBooking,
    deleteHospital,
    adminLogin,adminlo
}