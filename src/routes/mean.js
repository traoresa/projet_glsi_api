const router = require('express').Router();
const StudentController = require('../controllers/StudentControllers');

const StudentClass = new StudentController();

/**
 * GET for each student the worst and the best mark in modules
 */
router.get("/module", async (req,res) => {
    // console.log("sd");
    const m = await StudentClass.getMaxMinModule();
    res.status(200).send({ data: m });
});


/**
 * GET all mean for each student
 */
router.get("/get-all", async (req,res) => {
    const means = await StudentClass.getAllMeans();
    res.status(200).send({ data: means });
});

module.exports = router;
