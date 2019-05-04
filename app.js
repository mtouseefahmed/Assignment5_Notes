const yargs = require('yargs');
const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes.js');
const validator = require('validator');
// const S = require('string');
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't',
    type: 'string'
  };
  const authorOptions = {
    describe: 'Name of Author note',
    demand: true,
    alias: 'a',
    type: 'string'
  };
  const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b',
    type: 'string'
  }
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    author: authorOptions,
    body: bodyOptions
  })
  .command('list', 'list all notes')
  .command('read', 'read a note', {
    title: titleOptions
  })
  .command('remove', 'remove a note', {
    title: titleOptions
  })
  .help().argv;
  var command = argv._[0];

  if (command === 'add') {
      var title = argv.title.trim();
      var author = argv.author.trim();
      var body = argv.body.trim();
      if(!validator.isEmpty(title) && !validator.isEmpty(author) && !validator.isEmpty(body)){
        var note = notes.addNote(argv.title, argv.author, argv.body);
        if (note) {
        console.log('Note created');
        notes.logNote(note);
        } else {
        console.log('Note title taken');
        }
      }else{
          console.log("Not valid");
      }
    
  } else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    
    allNotes.forEach((note) => notes.logNote(note));
  
  } else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
      console.log('Note found');
      notes.logNote(note);
    } else {
      console.log('Note not found');
    }
  
  } else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    
    var message = noteRemoved ? 'Note removed' : 'Note not found';
    console.log(message);
  } else {
    console.log('Command not recognized');
  }

