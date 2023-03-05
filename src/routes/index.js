const router = require('express').Router();
const StudentController = require('../controllers/StudentControllers');

const StudentClass = new StudentController();


/**
 * GET all student
 */
router.get("/", async (req,res) => {
    const student = await StudentClass.get();
    res.status(200).send({ data: student });
});


/**
 * GET student by name
 */
router.get("/:name", async (req,res) => {
    const student = await StudentClass.findByName(req.params.name);
    console.log(student);
    res.status(200).send(student);
});


/**
 * POST insert student 
 */
router.post("/create", async (req,res) => {
   const student = await StudentClass.create(req.body);

   if (student === 0) {
    res.status(403).send({ message: "Student already exist !"});
   } else if (student === -1) {
    res.status(500).send({ message: "Format JSON not correct !"});
   } else {
    res.status(200).send({ data: student });
   }   
});


/***
 * UPDATE student data
 */
router.post("/update", async(req,res) => {
    const student = await StudentClass.update(req.body);
    if (student) {
        res.status(200).send({ student });
    } else {
        res.status(500).send({ student});
    }
});



/**
 * DELETE student
 */
router.post("/delete", async (req,res) => {
    const student = await StudentClass.delete(req.body);
    if (student) {
        res.status(200).send({ student });
    } else {
        res.status(500).send({ student });
    }
});


module.exports = router;
