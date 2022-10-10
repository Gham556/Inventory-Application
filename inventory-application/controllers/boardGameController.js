const BoardGame = require("../models/boardGames");
const Genre = require("../models/genres");
const Developer = require("../models/developers");
const Accessory = require("../models/accessories");

const async = require("async");

exports.index = (req, res) => {
    async.parallel(
        {
            boardGame_count(callback) {
                BoardGame.countDocuments({}, callback);//pass empty object to find all documents of this collection
            },
            genre_count(callback) {
                Genre.countDocuments({}, callback);
            },
            developer_count(callback) {
                Developer.countDocuments({}, callback);
            },
            accessory_count(callback) {
                Accessory.countDocuments({}, callback);
            } 
        },
        (err, results) => {
            res.render("index", {
                title: "Inventory Home",
                error: err,
                data: results
            });
        }
    );
};

// Display list of all boardGame.
exports.boardGame_list = (req, res, next) => {
  BoardGame.find({}, "title price").sort({title: 1}).exec(function (err, results) {
    if (err) {
        return next (err);
    }
    res.render("boardGame_list", {title: "Board Games", boardGame_list: results});
  });
};

// Display detail page for a specific boardGame.
exports.boardGame_detail = (req, res, next) => {
    BoardGame.findById(req.params.id).populate('genre').populate('developer').exec((err, results) => {
        if(err) {
            return next(err);
        }
        if (results === null) {
            const err = new Error("Board Game Not Found");
            err.status = 404;
            return next(err);
        }
        res.render("boardGame_detail", {
            title: "Book Detail",
            boardGame_detail: results
        });
    });
};

// Display boardGame create form on GET.
exports.boardGame_create_get = (req, res) => {
    async.parallel({
        devloper(callback) {
            Developer.find(callback);
        },
        genre(callback){
            Genre.find(callback)
        },
    }, (err, results) => {
        if(err) {
            return next(err);
        }
    res.render("boardGame_form", 
    { title: "Create Board Game",
      developer: results.devloper,
      genre: results.genre,  
     });

    })
 
};

// Handle boardGame create on POST.
exports.boardGame_create_post = [
    //convert genre to array
    (req, res, next) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = 
                typeof req.body.genre === "undefined" ? [] : [req.body.genre]
        }
        next();
    },

    body("title").trim().isLength({ min: 1 }).escape().withMessage("Title Must Be Specified"),
    body("playerCount").trim().isLength({ min: 1 }).escape().withMessage("Player Count Must Be Specified"),
    body("playTime").trim().isLength({ min: 1 }).escape().withMessage("Play Time Must Be Specified"),
    body("developer").trim().isLength({ min: 1 }).escape().withMessage("Developer Must Be Specified"),
    body("genre.*").escape(),
    body("price").trim().isLength({ min: 1}).escape(),

    //proccess req after validation and sanitation
    (req, res, next) => {
        const errors = validationResult(req);

        const boardGame = new BoardGame({
            title: req.body.title,
            playerCount: req.body.playerCount,
            playTime: req.body.playTime,
            developer: req.body.developer,
            genre: req.body.genre,
            price: req.body.price,
        });

        if(!errors.isEmpty()) {
            async.parallel({
                devloper(callback) {
                    Developer.find(callback);
                },
                genre(callback){
                    Genre.find(callback)
                },
            }, (err, results) => {
                if(err) {
                    return next(err);
                }

            for(const genre of results.genres) {
                if(boardGame.genre.includes(genre._id)){
                    genre.checked = "true";
                }
            }
            res.render("boardGame_form", 
            { title: "Create Board Game",
              developer: results.devloper,
              genre: results.genre,
              boardGame, 
              errors: errors.array(),  
             });
            })
            return;
        }

        boardGame.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect(boardGame.url);
        });
    },
]

// Display boardGame delete form on GET.
exports.boardGame_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame delete GET");
};

// Handle boardGame delete on POST.
exports.boardGame_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame delete POST");
};

// Display boardGame update form on GET.
exports.boardGame_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame update GET");
};

// Handle boardGame update on POST.
exports.boardGame_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame update POST");
};
