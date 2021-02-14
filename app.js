const yargs = require('yargs');
const { addNote, removeNote, readNote, listNotes, updateNote } = require('./notes.js');
const { commands, commandValid } = require('./utilis.js');

yargs.version('1.1.0');

// Add note
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: addNote
});

// Remove note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: removeNote
});

// Read note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read note.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: readNote
});

// Update note
yargs.command({
    command: 'update',
    describe: 'Change note title and body',
    builder: {
        title: {
            describe: 'Name of note to update',
            demandOption: true,
            type: 'string'
        },
        update_title: {
            describe: 'Change title',
            type: 'string'
        },
        update_body: {
            describe: 'Change note contents',
            type: 'string'
        }
    },
    handler: updateNote
});

// List notes
yargs.command({
    command: 'list',
    describe: 'displays list of notes',
    handler: listNotes
});

if (!commandValid(commands, yargs.argv._)) console.log("No such command");

yargs.parse();