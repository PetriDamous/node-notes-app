const fs = require("fs");
const { isEmptyStr } = require('./utilis.js');
const chalk = require('chalk');
const { array } = require("yargs");

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (err) {
        const emptyJSON = JSON.stringify([]);
        fs.writeFileSync('notes.json', emptyJSON);
        return JSON.parse(fs.readFileSync('notes.json').toString());
    }    
};

const saveNote = note => fs.writeFileSync('notes.json', JSON.stringify(note));

const noteExists = (notes, argv) => notes.some(note => note.title === argv.title);


const addNote = argv => {
    const notes = fetchNotes();

    if (noteExists(notes, argv)) return console.log('Note already exists');

    const { title, body } = argv;

    if (isEmptyStr(title)) return console.log('Title cannot be empty');

    notes.push({
        title: title,
        body: body
    });

    saveNote(notes);

    console.log('Note added');
};

const removeNote = argv => {
    const notes = fetchNotes();

    if (!noteExists(notes, argv)) return console.log('No such note');

    const filteredNotes = notes.filter(elm => elm.title !== argv.title); 

    saveNote(filteredNotes);

    console.log('Note removed.');  
};

const readNote = argv => {
    const notes = fetchNotes();

    if (!noteExists(notes, argv)) return console.log('No such note');

    const filteredNote = notes.filter(elm => elm.title === argv.title)[0]; 

    console.log(filteredNote.body);
};

const updateNote = argv => {
    const notes = fetchNotes();

    if (!noteExists(notes, argv)) return console.log('No such note');

    const {title, update_title, update_body} = argv;

    if (isEmptyStr(update_title)) return console.log('Title cannot be empty');

    newNotes = notes.reduce((acc, curr) => {
        
        if (curr.title === title) {
            if (update_title) {
                curr.title = update_title;
                console.log('Title updated');
            }

            if (update_body) {
                curr.body = update_body;
                console.log('Content updated');
            }
        }

        acc.push(curr);
        return acc;

    }, []);
    
    saveNote(newNotes);

    console.log('Note Saved');
};

const listNotes = () => {
    const notes = fetchNotes();

    notes.forEach(elm => console.log(elm.title));
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    updateNote: updateNote,
    listNotes: listNotes
};