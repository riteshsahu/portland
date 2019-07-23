class State{
    constructor(obj){
        this.id = ( obj && obj.id ) ? obj.id : null;
        this.name = ( obj && obj.name ) ? obj.name : null;
        this.country_id = ( obj && obj.country_id ) ? obj.country_id : null;
    }
}

module.exports = State;