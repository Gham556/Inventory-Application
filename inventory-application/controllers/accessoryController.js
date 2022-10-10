const Accessory = require("../models/accessories");

// Display list of all accessory.
exports.accessory_list = (req, res, next) => {
    Accessory.find({}, "name description price").sort({name: 1}).exec((err, results) => {
        if(err) {
            return next (err);
        }
        res.render("accessory_list", {
            title: "All Accessories",
            err: err,
            accessory_list: results
        });
    });
};

// Display detail page for a specific accessory.
exports.accessory_detail = (req, res, next) => {
    Accessory.findById(req.params.id, "name description price").sort({name: 1}).exec((err, results) => {
        if (err) {
            return next(err);
        }
        if (results === null) {
            const err = new Error("Acessory Not Found");
            err.status = 404;
            return next(err);
        }
        res.render('accessory_detail', {
            title: "Accessory Detail",
            accessory: results
        })
    })
};

// Display accessory create form on GET.
exports.accessory_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory create GET");
};

// Handle accessory create on POST.
exports.accessory_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory create POST");
};

// Display accessory delete form on GET.
exports.accessory_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory delete GET");
};

// Handle accessory delete on POST.
exports.accessory_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory delete POST");
};

// Display accessory update form on GET.
exports.accessory_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory update GET");
};

// Handle accessory update on POST.
exports.accessory_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: accessory update POST");
};
