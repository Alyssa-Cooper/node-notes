const fs = require('fs'); //third party npm module
const _ = require('lodash'); //third party npm module
const yargs = require('yargs');
const notes = require('./notes.js'); //files I've written
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};
const argv = yargs.command('add', 'adds a note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Reads a note', {
  title: titleOptions
})
.command('remove', 'removes a note', {
  title: titleOptions
})
.help().argv;
var command = argv._[0];
switch(command) {
  case 'add':
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  }
  else {
    console.log("Name in use.")
  }
  break;
  case 'list':
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
  break;
  case 'read':
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
  break;
  case 'remove':
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
  break;
  default:
  console.log('Command not recognized');
}
