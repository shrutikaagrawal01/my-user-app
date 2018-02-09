var express = require('express');
var router = express.Router();
// mongodb declaration 
// Connection URL 
var url = 'mongodb://localhost:27017/user-db';
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
/* GET users listing. */
router.get('/list', function(req, res, next) {
    // Use connect method to connect to the Server 
    MongoClient.connect(url, function(err, db) {
        // defining one collection named users under user-db
        var Users = db.collection('users');
        // calling collection.find() to get all the users
        if (!err) {
            if (req.query.userId) {
                req.query.userId = new ObjectID.createFromHexString(req.query.userId);
                Users.findOne({
                    _id: req.query.userId
                }, function(err, result) {
                    if (!err && result) {
                        res.json({
                            data: result
                        });
                    } else {
                        res.json({
                            data: null
                        });
                    }
                })
            } else {
                Users.find({}).toArray(function(err, users) {
                    if (!err) {
                        // sending response
                        res.json(users);
                    }
                });
            }
        }
    });
});

// Insert new user
router.post('/new', function(req, res, next) {
    console.log(req.body);
    if (req.body.name && req.body.email) {
        // Use connect method to connect to the Server 
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                // defining one collection named users under user-db
                var Users = db.collection('users');
                // calling collection.insert () to insert the dummy data defined above
                Users.insert({
                        name: req.body.name,
                        email: req.body.email,
                        country: (req.body.country) ? req.body.country : null
                    },
                    function(err, result) {
                        if (!err) {
                            // sending response
                            res.json({
                                success: true,
                                insertedUserId: result.insertedIds[0]
                            });
                        } else {
                            res.json({
                                success: false
                            })
                        }
                    })
            } else {
                res.json({
                    success: false,
                    err_msg: 'Error while connecting to database'
                })

            }
        });
    } else {
        res.json({
            success: false,
            err_msg: 'Required parameters not sent.'
        })
    }
});
// delete the user
router.delete('/remove', function(req, res) {
    if (req.query.userId) {
        MongoClient.connect(url, function(err, db) {
            // defining one collection named users under user-db
            var Users = db.collection('users');
            // calling collection.find() to get all the users

            if (!err) {
                req.query.userId = new ObjectID.createFromHexString(req.query.userId);
                Users.findOne({
                    _id: req.query.userId
                }, function(err, result) {
                    if (!err && result) {
                        Users.remove({
                            _id: req.query.userId
                        }, function(err, result) {
                            if (!err) {
                                res.json({
                                    success: true
                                })
                            }
                        })
                    } else {
                        res.json({
                            success: false,
                            err_msg: 'User not found with this id'
                        });
                    }
                })
            } else {
                res.json({
                    success: false,
                    err_msg: 'Error while connecting to database'
                })
            }
        });
    } else {
        res.json({
            success: false,
            err_msg: 'Required parameters not sent.'
        })
    }
});
// update the user
router.put('/update', function(req, res) {
    if (req.query.userId) {
        MongoClient.connect(url, function(err, db) {
            // defining one collection named users under user-db
            var Users = db.collection('users');
            // calling collection.find() to get all the users
            if (!err) {
                req.query.userId = new ObjectID.createFromHexString(req.query.userId);
                Users.findOne({
                    _id: req.query.userId
                }, function(err, result) {
                    if (!err && result) {
                        var tmpUser = {};
                        if (req.body.name) {
                            tmpUser.name = req.body.name;
                        }
                        if (req.body.country) {
                            tmpUser.country = req.body.country;
                        }
                        if (req.body.email) {
                            tmpUser.email = req.body.email;
                        }
                        Users.update({
                            _id: req.query.userId
                        }, {
                            $set: tmpUser
                        }, function(err, result) {
                            if (err) {
                                console.error('Error updating data in database ' + err.toString());
                                res.json({
                                    success: false,
                                    err_msg: 'Error on updating data in database'
                                });
                            } else {
                                res.json({
                                    success: true
                                })
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            err_msg: 'User not found with this id'
                        });
                    }
                })
            } else {
                res.json({
                    success: false,
                    err_msg: 'Error while connecting to database'
                })
            }
        });
    } else {
        res.json({
            success: false,
            err_msg: 'Required parameters not sent.'
        })
    }
});
module.exports = router;
