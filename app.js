const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: 'Enter command [options] to continue. See '--help' for more info>'
// });

const notes = require("./notes.js");

// var username = rl.question();

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
  }
const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
  }
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', "List all notes")
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', "Remove a note", {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];
console.log(command);

if (command === 'add') {
  note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Your note has been created:");
    notes.logNote(note);
  } else {
    console.log("A note with that title already exists. Unable to save.")
  }
} 

else if (command === 'list') {
  var allNotes = notes.getNotes();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} 

else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if (note) {
    console.log("Note found:");
    notes.logNote(note);
  } else {
    console.log("Note not found.")
  }
} 

else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? "Note was Removed" : "Note not found";
  console.log(message);
} 

else {
  console.log("Command not recognized");
}