const express = require("express");
const router = express.Router();

// Require controller modules.
const genre_controller = require("../controllers/genreController");
const developer_controller = require("../controllers/developerController");
const boardGame_controller = require("../controllers/boardGameController");
const accessory_controller = require("../controllers/accessoryController");

/// GENRE ROUTES ///

// GET catalog home page.
router.get("/", boardGame_controller.index);

// GET request for creating a Genre. NOTE This must come before routes that display Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre items.
router.get("/genres", genre_controller.genre_list);

/// developer ROUTES ///

// GET request for creating developer. NOTE This must come before route for id (i.e. display developer).
router.get("/developer/create", developer_controller.developer_create_get);

// POST request for creating developer.
router.post("/developer/create", developer_controller.developer_create_post);

// GET request to delete developer.
router.get("/developer/:id/delete", developer_controller.developer_delete_get);

// POST request to delete developer.
router.post("/developer/:id/delete", developer_controller.developer_delete_post);

// GET request to update developer.
router.get("/developer/:id/update", developer_controller.developer_update_get);

// POST request to update developer.
router.post("/developer/:id/update", developer_controller.developer_update_post);

// GET request for one developer.
router.get("/developer/:id", developer_controller.developer_detail);

// GET request for list of all developers.
router.get("/developers", developer_controller.developer_list);

/// boardGame ROUTES ///

// GET request for creating a boardGame. NOTE This must come before route that displays boardGame (uses id).
router.get("/boardGame/create", boardGame_controller.boardGame_create_get);

//POST request for creating boardGame.
router.post("/boardGame/create", boardGame_controller.boardGame_create_post);

// GET request to delete boardGame.
router.get("/games/:id/delete", boardGame_controller.boardGame_delete_get);

// POST request to delete boardGame.
router.post("/games/:id/delete", boardGame_controller.boardGame_delete_post);

// GET request to update boardGame.
router.get("/games/:id/update", boardGame_controller.boardGame_update_get);

// POST request to update boardGame.
router.post("/games/:id/update", boardGame_controller.boardGame_update_post);

// GET request for one boardGame.
router.get("/games/:id", boardGame_controller.boardGame_detail);

// GET request for list of all boardGame.
router.get("/games", boardGame_controller.boardGame_list);

/// accessory ROUTES ///

// GET request for creating a accessory. NOTE This must come before route that displays accessory (uses id).
router.get(
  "/accessory/create",
  accessory_controller.accessory_create_get
);

// POST request for creating accessory.
router.post(
  "/accessory/create",
  accessory_controller.accessory_create_post
);

// GET request to delete accessory.
router.get(
  "/accessory/:id/delete",
  accessory_controller.accessory_delete_get
);

// POST request to delete accessory.
router.post(
  "/accessory/:id/delete",
  accessory_controller.accessory_delete_post
);

// GET request to update accessory.
router.get(
  "/accessory/:id/update",
  accessory_controller.accessory_update_get
);

// POST request to update accessory.
router.post(
  "/accessory/:id/update",
  accessory_controller.accessory_update_post
);

// GET request for one accessory.
router.get("/accessory/:id", accessory_controller.accessory_detail);

// GET request for list of all accessory.
router.get("/accessories", accessory_controller.accessory_list);

module.exports = router;
