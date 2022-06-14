const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const postModel = require('../models/post.models');

// get post
router.get('/', postController.readPost);

// création de post sans fichier
router.post('/noFile/', postController.createPost);

// modification de post
router.put('/:id', postController.updatePost);

// suppression de post
router.delete('/:id', postController.deletePost);

// liker ou disliker
router.put('/liker-unliker/:id', postController.likePost_unlikePost);


// création de post sans fichier
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads/posts");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});
router.post("/",upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            throw Error("FILE_MISSING");
        } else {
            const newPost = new postModel({
                idOfPoster: req.body.idOfPoster,
                description: req.body.description,
                picture: "./uploads/posts/" + req.file.originalname,
                likers: [],
                commentaires: [],
            });
            try {
                const post = await newPost.save();
                return res.status(201).json(post);
            } catch (err) {
                console.log(err);
            }
        }        
    } catch (err) {
        return res.status(201).json(err)   
    }
});



// commenter un post
router.patch('/comment-post/:id', postController.commentPost);

// modifier son commentaire
router.patch('/edit-comment-post/:id', postController.editCommentPost);

//supprimer son commentaire
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;