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
exports.boardGame_list = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame list");
};

// Display detail page for a specific boardGame.
exports.boardGame_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: boardGame detail: ${req.params.id}`);
};

// Display boardGame create form on GET.
exports.boardGame_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame create GET");
};

// Handle boardGame create on POST.
exports.boardGame_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: boardGame create POST");
};

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
