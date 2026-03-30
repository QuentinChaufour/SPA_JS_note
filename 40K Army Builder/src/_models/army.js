
export default class Army {
  
    /**
     * Builder for an army with a name, an array of characters and a maximum point value.
     * @param {Number} id 
     * @param {String} name 
     * @param {Array[Character]} units 
     * @param {Number} points 
     */
    constructor(id, name, units, points) {
        this.id = id;
        this.name = name;
        this.units = units;
        this.points = points;
    }

    addUnit(character) {
        this.units.push(character);
    }

    removeUnit(character) {
        this.savedCharacters = this.savedCharacters.filter(characterElem => characterElem.id != character.id); 
    }

    /**
     * Calculates the total points of the army
     * @returns {Number} the total points of the army
     */
    ["armyPoints"](){
        let points = 0;
        this.units.forEach(character => {
            points += character.points;
        });
        return points;
    }
}