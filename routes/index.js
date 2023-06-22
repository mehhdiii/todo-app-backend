var express = require('express');
var router = express.Router();


const sequelize = require('../database')
const TodoNote = require('../models/TodoNote'); 


async function initialize(){
  try{

    await sequelize.authenticate();
    console.log("DB connected"); 

    await sequelize.sync(); 
    console.log("All models are sync successfully with DB");

  }
  catch(error){
    console.log("Error occured in index.js", error); 
  }
}

initialize()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get(
  '/api/todoNotes', async function(req, res, next){
    try {
      const todoNotes = await TodoNote.findAll();
      res.json(todoNotes);  
    } catch (error) {
      console.log("error occured in /api/todoNotes: ", error); 
    }

  });   

router.patch(
  '/api/todoNote/:Id', async function(req, res, next){
    try{
      // console.log("received status: ", req.body.isCompleted); 
      const todoNote = await TodoNote.update(
        {isCompleted: req.body.isCompleted}, 
        {where: {Id: req.params.Id}}
      );
      res.json(todoNote); 
      console.log("todoNote patch", todoNote)
    }
    catch(error){
      console.log("error occured in /api/todoNotes/:id"); 
    }
  }
)
router.post(
  '/api/todoNote/add', async function(req, res, next){
    try{
      const todoNote = await TodoNote.create({
        title: req.body.note.title, 
        description: req.body.note.text, 
        isCompleted: req.body.note.isCompleted
      }); 
      // console.log('todoNote', todoNote)
      res.status(201).json(todoNote)
    }
    catch(error){
      console.log("error occured in /api/todoNotes/add"); 
      res.status(400).send('Failed'); 
    }
  }
)

module.exports = router;
