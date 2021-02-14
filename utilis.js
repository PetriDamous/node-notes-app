// List of commands
const commands = ['add', 'remove', 'read', 'update', 'list'];

// Checks to see if command is valid
const commandValid = (array, command) => {
    return array.some(arrayValue => (
        command.some(commandVal => arrayValue === commandVal)
        )
    );    
};

// Checks for empty string
const isEmptyStr = str => str.trim().length === 0 ? true : false;

module.exports = {
    commands: commands,
    commandValid: commandValid,
    isEmptyStr: isEmptyStr  
};