const Controller = require('../../bin/Controller');
const studentModel = require('../models/Student');
const Utility = require('../../bin/Utility');


/**
 * StudentController Class for all action on Student Entity
 */
class StudentController extends Controller {


    // Create student (insertion in database)
    async create(data) {
        const student = await studentModel.validateAsync(data);
        if (student) {
            
            const studentExist = await this.findByName(data.nom);
            console.log(studentExist);        

            if (studentExist === undefined) {

                const mean = await this.mean(data.modules);

                data.moyenne = mean;

                console.log("dd");
                return this.save(data);

            } 
            return 0;

        } else {

            return -1;
        }
    }


    // find all student in JSON file
    async get() {
        return this.find();     
    }



    // find student by name 
    async getByName(name) {
        return this.findByName(name);
    }
    


    // update student in JSON file
    async update(data) {
        return this.updateByName(data);
    }



    // delete student on JSON file
    async delete(data) {
        return this.deleteByName(data.nom);
    }


    // mean's function
    async mean(modules) {
        let mean = 0;

        for (let i = 0; i < modules.length; i++) {
            mean += modules[i].note;            
        }

        mean = mean / modules.length;

        // console.log(mean);

        return mean;
    }



    // get max mark's and min mark's on modules of each student
    async getMaxMinModule() {
        const data = await this.find();
        let means = [];

        for (let k = 0; k < data.length; k++) {
            
            let student = {
                name: data[k].nom,
                class: data[k].classe,
                modules: []
            };
            
            // console.log(student);
            const min = await new Utility().min(data[k].modules);
            const max = await new Utility().max(data[k].modules);          

           
            Object.assign(min, { status: "Worst"});
            Object.assign(max, { status: "Best"});

            student.modules.push(min);
            student.modules.push(max);


            means.push(student);
            
        }


        return means;

    }



    // find all means of student
    async getAllMeans() {
        const data = await this.find();
        let objects = [];

        for (let j = 0; j < data.length; j++) {
            const student = {
                name: data[j].nom,
                mean: data[j].moyenne
            };
            
            objects.push(student);
        }

        return objects;
    }

}

module.exports = StudentController;