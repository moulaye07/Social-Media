const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multer = require('multer');
const { Router } = require('express');
const UserModel = require('../models/user.model');

//inscription
router.post("/signup", authController.signUp);

//connexion
router.post("/signin", authController.signIn);

//deconnexion
router.get("/logout", authController.logout);



// get all users
router.get('/', userController.getAllUsers);

//get a user
router.get('/:id', userController.userData);

//modifier sa bio
router.put('/:id', userController.updateUserData);

// follow user
router.put('/follow/:id', userController.follow);

// unfollow user
router.put('/unfollow/:id', userController.unfollow);


//profil picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads/profil");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    },
});
 upload = multer({storage});
router.post("/upload",upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            throw Error("FILE_MISSING");
        } else {
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    $set : { picture: "./uploads/profil/" + req.file.originalname}
                },
                { new: true, upsert: true, setDefaultsOnInsert: true},
                (err, docs) => {
                    if (!err) return;
                    else return res.status(500).send({message: err});
                }
            );
        }        
    } catch (err) {
        return res.status(201).json(err)   
    }
});

module.exports = router;