const fs = require("fs");
const { isEmptyStr, statusClr, highLite } = require('./utilis.js');

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

const noteExists = (notes, argv) => notes.find(note => note.title === argv.title);


const addNote = argv => {
    const notes = fetchNotes();

    const { title, body } = argv;

    if (isEmptyStr(title)) {
        return console.log(statusClr('Title cannot be empty', 'danger'));
    }

    if (noteExists(notes, argv)) {
        return console.log(statusClr('Note already exists', 'danger'));
    } 

    notes.push({
        title: title,
        body: body
    });

    saveNote(notes);

    console.log(statusClr('Note added', 'success'));
};

const removeNote = argv => {
    const notes = fetchNotes();

    const { title } = argv;

    if (isEmptyStr(title)) {
        return console.log(statusClr('Title cannot be empty', 'danger'));
    } 

    if (!noteExists(notes, argv)) {
        return console.log(statusClr('No such note', 'danger'));
    }    

    const filteredNotes = notes.filter(elm => elm.title !== title); 

    saveNote(filteredNotes);

    console.log(statusClr('Note removed.', 'success'));  
};

const readNote = argv => {
    const notes = fetchNotes();

    const { title } = argv;

    if (isEmptyStr(title)) {
        return console.log(statusClr('Title cannot be empty', 'danger'));
    } 

    if (!noteExists(notes, argv)) {
        return console.log(statusClr('No such note', 'danger'));
    }    

    const filteredNote = notes.find(elm => elm.title === title); 

    console.log(highLite(`${filteredNote.title}: `));
    console.log(filteredNote.body);
};

const updateNote = argv => {
    const notes = fetchNotes();

    const {title, update_title, update_body} = argv;

    if (isEmptyStr(title)) {
        return console.log(statusClr('Title cannot be empty', 'danger'));
    } 

    if (!noteExists(notes, argv)) {
        return console.log(statusClr('No such note', 'danger'));
    } 

    newNotes = notes.reduce((acc, curr) => {
        
        if (curr.title === title) {
            if (update_title) {
                curr.title = update_title;
                console.log(statusClr('Title updated', 'success'));
            }

            if (update_body) {
                curr.body = update_body;
                console.log(statusClr('Content updated', 'success'));
            }
        }

        acc.push(curr);
        return acc;

    }, []);
    
    saveNote(newNotes);

    console.log(statusClr('Note Saved', 'success'));
};

const listNotes = () => {
    const notes = fetchNotes();

    console.log(highLite('Here are your notes: '));

    notes.forEach(elm => {
        
        console.log(elm.title)
    });
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    updateNote: updateNote,
    listNotes: listNotes
};