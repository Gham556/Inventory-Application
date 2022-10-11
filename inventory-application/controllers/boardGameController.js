const BoardGame = require("../models/boardGames");
const Genre = require("../models/genres");
const Developer = require("../models/developers");
const Accessory = require("../models/accessories");

const { body, validationResult } = require('express-validator');
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
exports.boardGame_create_get = (req, res, next) => {
    async.parallel({
        devloper(callback) {
            Developer.find(callback);
        },
        genre(callback){
            Genre.find(callback)
        },
    }, (err, results) => {
        if(err) {
            console.log(err, "at catalog")
            return next(err);
        }
    res.render("boardGame_form", 
    { title: "Create Board Game",
      developer: results.devloper,
      genres: results.genre,  
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

    body("title").trim().isLength({ min: 1 }).escape().withMessage(`Title Must Be Specified`),
    body("playerCount").trim().isLength({ min: 1 }).escape().withMessage("Player Count Must Be Specified"),
    body("playTime").trim().isLength({ min: 1 }).escape().withMessage("Play Time Must Be Specified"),
    body("developer").trim().isLength({ min: 1 }).escape().withMessage("Developer Must Be Specified"),
    body("genre.*").escape(),
    body("price").trim().isLength({ min: 1}).escape().withMessage("Price Must Be Specified"),

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
                genres(callback){
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
            console.log(req.body)
            res.render("boardGame_form", 
            { title: "Create Board Game",
              developer: results.devloper,
              genres: results.genres,
              game: req.body,
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
exports.boardGame_update_get = (req, res, next) => {
    async.parallel(
      {
        boardGame(callback) {
          BoardGame.findById(req.params.id)
            .populate("developer")
            .populate("genre")
            .exec(callback);
        },
        developers(callback) {
          Developer.find(callback);
        },
        genres(callback) {
          Genre.find(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.boardGame == null) {
          // No results.
          const err = new Error("Game not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        // Mark our selected genres as checked.
        for (const genre of results.genres) {
          for (const boardGameGenre of results.boardGame.genre) {
            if (genre._id.toString() === boardGameGenre._id.toString()) {
              genre.checked = "true";
            }
          }
        }
        console.log(results)
        res.render("boardGame_form", {
          title: "Update BoardGame",
          developer: results.developers,
          genres: results.genres,
          boardGame: results.boardGame,
        });
      }
    );
  };
  

// Handle boardGame update on POST.
exports.boardGame_update_post = [
    // Convert the genre to an array
    (req, res, next) => {
      if (!Array.isArray(req.body.genre)) {
        req.body.genre =
          typeof req.body.genre === "undefined" ? [] : [req.body.genre];
      }
      next();
    },
  
    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("playerCount", "playerCount must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("playTime", "playTime must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("developer", "Developer must not be empty").trim().isLength({ min: 1 }).escape(),
    body("genre.*").escape(),
    body("price", "Price Must Not Be Empty").trim().isLength({ min: 1 }).escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Book object with escaped/trimmed data and old id.
      const boardGame = new BoardGame({
        title: req.body.title,
        playerCount: req.body.playerCount,
        playTime: req.body.playTime,
        developer: req.body.developer,
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
        price: req.body.price,
        _id: req.params.id, //This is required, or a new ID will be assigned!
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        // Get all authors and genres for form.
        async.parallel(
          {
            developer(callback) {
              Developer.find(callback);
            },
            genres(callback) {
              Genre.find(callback);
            },
          },
          (err, results) => {
            if (err) {
              return next(err);
            }
  
            // Mark our selected genres as checked.
            for (const genre of results.genres) {
              if (boardGame.genre.includes(genre._id)) {
                genre.checked = "true";
              }
            }
            res.render("boardGame_form", {
              title: "Update Game",
              developer: results.developer,
              genres: results.genres,
              boardGame,
              errors: errors.array(),
            });
          }
        );
        return;
      }
  
      // Data from form is valid. Update the record.
      BoardGame.findByIdAndUpdate(req.params.id, boardGame, {}, (err, theBoardGame) => {
        if (err) {
          return next(err);
        }
  
        // Successful: redirect to book detail page.
        res.redirect(theBoardGame.url);
      });
    },
  ];
  
