const file = require("../datas/students.json");
const fs = require('fs');


/**
 * Controller Class
 * Each basic action CRUD (Create Read Update Delete)
 */
class Controller {

    // READ
    async find() {
        return file
    }



    // READ BY NAME
    async findByName(name) {
        let obj = {};
        for (let i = 0; i < file.length; i++) {
            
            if (file[i]["nom"] === name) {
                return file[i];

            }
            
        }

        // return null;
    }



    // CREATE
    async save(data) {
        file.push(data);
        console.log(file);

        fs.writeFileSync("./datas/students.json", JSON.stringify(file), 'utf-8');
        return true;
    }



    // UPDATE
    async updateByName(data) {
        let obj = await this.findByName(data.nom);

        if (obj !== undefined) {

            for (let j = 0; j < file.length; j++) {
                
                if (file[j]['nom'] === data.nom) {
                    file[j]['classe'] = data.classe;
                    file[j]['modules'] = data.modules;
                    file[j]['moyenne'] = data.moyenne;
                }
                
            }

            fs.writeFileSync("./datas/students.json", JSON.stringify(file), 'utf-8');
            return true; 
        }

        return false;        
    }



    // DELETE 
    async deleteByName(name) {
        let obj = await this.findByName(name);
        
        

        if (obj !== undefined) {
            let new_file = file.filter((obj) => obj.nom !== name);

            // console.log(new_file);
            fs.writeFileSync("./datas/students.json", JSON.stringify(new_file), 'utf-8');
            return true;    
        }
        return false;
        
    }

}



module.exports = Controller;