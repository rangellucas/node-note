var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/notes");

var noteSchema = new mongoose.Schema({
	titulo:{type: String},
	texto: {type:String},
	user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //Edit: I'd put the schema. Silly me.
    }],
});

var Note = mongoose.model("note", noteSchema);
module.exports = Note;