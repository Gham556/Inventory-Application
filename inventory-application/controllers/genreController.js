const Genre = require("../models/genres");
const { body, validationResult} = require("express-validator");

const BoardGame = require("../models/boardGames");
const async = require("async"); 

// Display list of all Genre.
exports.genre_list = (req, res) => {
  Genre.find({}, "name").sort({name: 1}).exec((err, results) => {
    res.render("genre_list", {
        title: "All Genres",
        err: err,
        genre_list: results
    });
  });
};

// Display detail page for a specific Genre.
exports.genre_detail = (req, res, next) => {
    async.parallel(
        {
            genre(callback) {
                Genre.findById(req.params.id).exec(callback);
            },
            genre_boardGames(callback) {
                BoardGame.find({genre: req.params.id}).exec(callback);
            }
        }, (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.genre === null) {
                const err= new Error("Genre Not Found");
                err.status= 404;
                return next(err);
            }
            res.render("genre_detail", {
                title: "Genre Detail", 
                genre: results.genre,
                genre_boardGames: results.genre_boardGames
            });
        }
    );
};

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render("genre_form", { title: "Create Genre"});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    body("name", "Genre name required").trim().isLength({ min: 1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({ name: req.body.name });

        if(!errors.isEmpty()){
            res.render("genre_form", {
                title: "Create Genre",
                genre,
                errors: errors.array()
            });
            return;
        } else {
            Genre.findOne({ name: req.body.name }).exec((err, results) => {
                if (err) {
                    return next(err);
                }
                if (results) {
                    res.redirect(results.url)
                } else {
                    genre.save((err) => {
                        if(err) {
                            return next(err);
                        }
                        res.redirect(genre.url);
                    })
                }
            })
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
