const Note = require('../models/Note');

exports.getAllNotes = async (req,res) =>{
    const {page =1 , limit = 5} = req.query;

    try{
       const notes =  await Note.find()
       .skip((page-1) * limit)
       .limit(limit)

       res.json(notes)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.searchNote = async (req, res)=>{
    const {query} = req.query;
    
    if(!query){
       return res.status(400).json({message : 'Query parameter is required'})
    }
    try{
        const notes = await Note.find({
            $or:[
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
            ]
        })
        if(notes.length === 0 ){
            return res.status(404).json({message: 'No notes found'})
        }
        res.json(notes)
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

exports.createNote = async (req,res) =>{
    try{
        const note = new Note(req.body)
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}
exports.deleteNote = async (req, res) =>{
    try{
        const result = await Note.findByIdAndDelete(req.params.id);
        if(!result) return res.status(404).json({message: 'Note not Found'})
        res.json({message: 'Note deleted'})
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

exports.updateNote = async(req, res) =>{
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, content: req.body.content },
            { new: true } // return updated doc
          );
        if(!updatedNote) return res.status(404).json({message: 'Note not Found'})
        res.json(updatedNote)
    }catch(error){
        res.status(400).json({message : error.message})
    }
}
 







