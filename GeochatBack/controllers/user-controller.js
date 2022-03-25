const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../config.json");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.getAllUsers = async (req, res) => {
    const users = await User.find({}).populate("chats likes");

    if (users) {
        res.status(200).send({ users, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.signup = async (req, res) => {
    const { email, password, firstname, lastname, age, sexe, isVerified } = req.body;

    const verifUser = await User.findOne({ email });
    if (verifUser) {
        console.log("user already exists")
        res.status(403).send({ message: "User already exists !" });
    } else {
        console.log("Success")

        const newUser = new User();

        mdpEncrypted = await bcrypt.hash(password, 10);

        newUser.email = email;
        newUser.password = mdpEncrypted;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.age = age;
        newUser.sexe = sexe;
        newUser.location = location;
        newUser.isVerified = true;


        newUser.save();

        // token creation
        token = jwt.sign({ _id: newUser._id }, config.token_secret, {
            expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
        });

        sendConfirmationEmail(email, token);
        res.status(201).send({ message: "success", user: newUser, "token": token });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const freelancer = await Freelancer.findOne({ email });

    if (freelancer && (await bcrypt.compare(password, freelancer.password))) {

        // token creation
        token = jwt.sign({ _id: freelancer.id, email: freelancer.email }, config.token_secret, {
            expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
        })

        if (!freelancer.isVerified) {
            res.status(200).send({ message: "email not verified" });
        } else {
            res.status(200).send({ token, freelancer, message: "success" });
        }

    } else {
        res.status(403).send({ message: "email or password incorrect" });
    };
}

exports.loginWithSocialApp = async (req, res) => {

    const { email, firstname, lastname } = req.body;

    if (email == "") {
        res.status(403).send({ message: "error please provide an email" });
    } else {
        var user = await User.findOne({ email });
        if (user) {
            console.log("user exists, loging in")
        } else {
            console.log("user does not exists, creating an account")

            user = new User();

            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.isVerified = true;

            user.save();
        }

        // token creation
        token = jwt.sign({ _id: user.id, email: user.email }, config.token_secret, {
            expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
        })

        res.status(201).send({ message: "success", user: user, "token": token });
    }
}


exports.getUserFromToken = async (req, res) => {

    const { userToken } = req.body;

    if (userToken == "") {
        res.status(403).send({ message: "No token provided" });
    } else {
        var user

        try {
            user = await User.findById(jwt.verify(userToken, config.token_secret)["_id"]);
        } catch (error) {
            console.log("Error : token invalid")

            return res.status(403).send({ message: "Token invalid" });
        }

        if (user) {
            console.log("User extracted from token")

            res.status(200).send({ user: user });
        } else {
            console.log("Can't find user with this token")

            res.status(403).send({ message: "Token invalid" });
        }
    }
}

exports.resendConfirmation = async (req, res) => {
    const user = await User.findOne({ "email": req.body.email });

    if (user) {
        // token creation
        const token = jwt.sign({ _id: user._id, email: user.email }, config.token_secret, {
            expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
        });

        sendConfirmationEmail(req.body.email, token);

        res.status(200).send({ "message": "Confirmation email has been sent to " + user.email })
    } else {
        res.status(404).send({ "message": "User not found" })
    }
};

exports.confirmation = async (req, res) => {

    var tokenValue;
    try {
        tokenValue = jwt.verify(req.params.token, config.token_secret);
    } catch (e) {
        return res.status(400).send({ message: 'The confirmation link expired, please reverify.' });
    }

    User.findById(tokenValue._id, function (err, user) {
        if (!user) {
            return res.status(401).send({ message: 'User not found, please sign up.' });
        }
        else if (user.isVerified) {
            return res.status(200).send({ message: 'This mail has already been verified, please log in' });
        }
        else {
            user.isVerified = true;
            user.save(function (err) {
                if (err) {
                    return res.status(500).send({ message: err.message });
                }
                else {
                    return res.status(200).send({ message: 'Your account has been verified' });
                }
            });
        }
    });
}

exports.forgotPassword = async (req, res) => {
    const resetCode = req.body.resetCode
    const user = await User.findOne({ "email": req.body.email });

    if (user) {
        // token creation
        const token = jwt.sign({ _id: user._id, email: user.email }, config.token_secret, {
            expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
        });

        sendPasswordResetEmail(req.body.email, token, resetCode);

        res.status(200).send({ "message": "Reset email has been sent to " + user.email })
    } else {
        res.status(404).send({ "message": "User not found" })
    }
};

exports.editPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    newEncryptedPassword = await bcrypt.hash(newPassword, 10);

    let user = await User.findOneAndUpdate(
        { email: email },
        {
            $set: {
                password: newEncryptedPassword
            }
        }
    );

    res.send({ user });
};

// method added to modify X et Y



exports.setPosition = async (req, res) => {
    const { email, latitude , longitude } = req.body;

    let user = await User.findOneAndUpdate(
        { email: email },
        {
            $set: {
                latitude: latitude,
                longitude: longitude,
            }
        }
    );

    res.send({ user });
};


// end 


exports.editProfile = async (req, res) => {
    const { email, firstname, lastname, age, sexe, location, isVerified , latitude , longitude} = req.body;

    let user = await User.findOneAndUpdate(
        { email: email },
        {
            $set: {
                latitude: latitude,
                longitude: longitude,
                firstname: firstname,
                lastname: lastname,
                age: age,
                sexe: sexe,
                location: location,
                isVerified: isVerified
            }
        }
    );

    res.send({ user });
};

exports.deleteOne = async (req, res) => {
    console.log(req.body)

    const user = await User.findById(req.body._id).remove()

    res.send({ user })
}

exports.deleteAll = async (req, res) => {
    User.remove({}, function (err, user) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ message: "No element" });
    })
}

///// FUNCTIONS ---------------------------------------------------------

async function sendPasswordResetEmail(email, token, resetCode) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'esprit.geochat.app@gmail.com',
            pass: 'geochat-cred'
        }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            console.log("Server not ready");
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: 'esprit.geochat.app@gmail.com',
        to: email,
        subject: 'Reset your password',
        html: "<h2>Use this as your reset code : " + resetCode + "</h2>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function sendConfirmationEmail(email, token) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'esprit.geochat.app@gmail.com',
            pass: 'geochat-cred'
        }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            console.log("Server not ready");
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const urlDeConfirmation = "http://localhost:3000/api/user/confirmation/" + token;

    const mailOptions = {
        from: 'esprit.geochat.app@gmail.com',
        to: email,
        subject: 'Please confirm your email',
        html: "<h4>Please confirm your email using this link : </h4><a href='" + urlDeConfirmation + "'>Confirmation</a>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function configurerDossierUtilisateur(id) {
    const dir = `./uploads/utilisateurs/utilisateur-${id}`

    fs.mkdir(dir, function () {
        fs.exists(dir, function (exist, err) {
            if (exist) {
                const dir2 = `./uploads/developers/developer-${id}/profile-pic`
                fs.mkdir(dir2, function () {
                    console.log("folder created")
                })
            }
        })
    })
}