
/**
 * Utility Class 
 * All function to do something easy :)
 */
class Utility {


    // minimum on array
    // focus on note
    async min(array) {
        let minimum = array[0];

        for (let i = 0; i < array.length; i++) {
            
            if (array[i].note < minimum.note) {
                minimum = array[i];
            }
            
        }

        return minimum;
    }


    // maximum on array
    // focus on note
    async max(array) {
        let maximum = array[0];

        for (let i = 0; i < array.length; i++) {
            
            if (array[i].note > maximum.note) {
                maximum = array[i];
            }
            
        }

        return maximum;
    }


}


module.exports = Utility;