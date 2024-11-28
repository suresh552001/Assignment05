const asyncHandler=require("express-async-handler");
const Note=require("../models/notesModel");

const createNote=asyncHandler(async(req,res)=>{
  console.log(req.user);
    if(!req.body.title){
      res.status(400);
      throw new Error("please enter all fields");  
    }

      const{title,desc,projectName,assignedTo,task,role,startTime,endTime,status}=req.body;
      const note=await Note.create({
        title,
        desc,
        projectName,
        assignedTo,
        task,
        role,
        startTime,
        endTime,
        status,
        user:req.user.id,

      }) 
         res.status(201).send(note);
})

  const updateNote=asyncHandler(async(req,res)=>{
    const note=await Note.findById(req.params.id);
      if(!note){
        res.status(400);
        throw new Error("Note not found");
      }
      if(!req.user){
        res.status(400);
        throw new Error("User Not found");
      }
      if(note.user.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not Authorized");
      }
      const updateNote=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true,});
      res.status(200).send(updateNote);
  });


  const getNote=asyncHandler(async(req,res)=>{
    const notes=await Note.find({user:req.user.id})
    res.status(200).send(notes)
  });


  const deleteNote=asyncHandler(async(req,res)=>{
     const note=await Note.findById(req.params.id);
      if(!note){
        res.status(400);
        throw new Error("Note not found");
      }
      if(!req.user){
        res.status(400);
        throw new Error("user not found");
      }
      if(note.user.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not Authorized");
      }
      const deleteNote=await Note.deleteOne({_id:req.params.id})
      res.status(200).send({_id:req.params.id})
  })

module.exports={createNote,updateNote,getNote,deleteNote}