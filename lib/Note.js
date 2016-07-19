var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/nodeNote");

var noteSchema = new mongoose.Schema({
	titulo:{type: String},
	texto: {type:String},
	user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

var Note = mongoose.model("note", noteSchema);
module.exports = Note;