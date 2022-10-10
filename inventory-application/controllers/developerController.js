const Developer = require("../models/developers");
const BoardGame = require("../models/boardGames");
const { body, validationResult } = require('express-validator');

const async = require("async");

// Display list of all developer.
exports.developer_list = (req, res, next) => {
    Developer.find({}, "name").sort({name: 1}).exec((err, results) => {
        if(err) {
            return next(err);
        }
        res.render("developer_list", {
            title: "Developer List",
            err: err,
            developer_list: results
        });
    });
};

// Display detail page for a specific developer.
exports.developer_detail = (req, res, next) => {
    async.parallel({
        developer(callback) {
            Developer.findById(req.params.id).exec(callback);
        },
        developer_games(callback) {
            BoardGame.find({developer: req.params.id}, "title price").exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.developer === null) {
            const err = new Error("Developer Not Found");
            err.status= 404;
            return next(err);
        }
        res.render("developer_detail", {
            title: "Developer Details",
            developer: results.developer,
            developer_games: results.developer_games
        });
    });
};

// Display developer create form on GET.
exports.developer_create_get = (req, res) => {
  res.render("developer_form", { title: "Create Developer"});
};

// Handle developer create on POST.
exports.developer_create_post = [
    body("name").trim().isLength({ min: 1 }).escape().withMessage("Name Must Be Specified"),
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render("developer_form", {
                title: "Create Developer",
                developer: req.body,
                errors: errors.array(),
            });
            return;
        }

        const developer = new Developer({
            name: req.body.name,
        });
        developer.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect(developer.url);
        });
    }
]

// Display developer delete form on GET.
exports.developer_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: developer delete GET");
};

// Handle developer delete on POST.
exports.developer_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: developer delete POST");
};

// Display developer update form on GET.
exports.developer_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: developer update GET");
};

// Handle developer update on POST.
exports.developer_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: developer update POST");
};
