var express = require("express");
var router = express.Router();
const Validator = require('fastest-validator')
const v = new Validator()
const { Notes } = require("../models")

//GET
router.get("/", async (req, res, next) => {
    const note = await Notes.findAll();
    return res.json({ 
        ststus: 200,
        message: "Success Get All Data", 
        data: note,
    });
});

//GET By ID
router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    let note = await Notes.findByPk(id);
    if (!note) {
        return res.status(404).json({ status: 404, message: "Data Not Found" });
    }else{
        return res.json({ status: 200, message: "Success Get Data By Id", data:note, });
    }
});

//POST
router.post("/", async (req, res, next) => {
    //validasi
    const schema = {
        title : "string",
        description: "string|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.lenght){
        return res.status(400).json(validate);
    }
    // prosses create
    const note = await Notes.create(req.body);
    res.json({
        status: 200,
        message: "Success Create Data",
        data: note,
    });
});

//PUT
router.put("/:id", async (req, res, next) => {
    const id = req.params.id
    let note = await Notes.findByPk(id);
    if (!note) {
        return res.status(404).json({ status: 404, message: "Data Not Found" });
    }
    //validation
    const schema = {
        title: "string|optional",
        description: "string|optional"
    };
    const validate = v.validate(req.body, schema);
    if (validate.lenght) {
        return res.status(400).json(validate);
    }
    //prosses update
    note = await note.update(req.body);
    res.json({
        status: 200,
        message: "Success Update Data",
        data: note,
    });
});

//DELETE
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    let note = await Notes.findByPk(id);
    if (!note) {
        return res.status(404).json({ status: 404, message: "Data Not Found" });
    }
    //prosses delete
    await note.destroy();
    res.json({
        status: 200,
        message: "Success Delete Data",
    });
});

module.exports = router;