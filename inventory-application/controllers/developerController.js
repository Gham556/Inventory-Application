const Developer = require("../models/developers");

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
exports.developer_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: developer detail: ${req.params.id}`);
};

// Display developer create form on GET.
exports.developer_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: developer create GET");
};

// Handle developer create on POST.
exports.developer_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: developer create POST");
};

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
