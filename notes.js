import chalk from 'chalk'
import { debug } from 'console'
import * as fs from 'fs'
    
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( note =>  note.title === title )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Duplicate title detected!'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const noteToRemove = notes.find(note => note.title === title)

    if (noteToRemove) {
        const updatedNotes = notes.filter(note => note.title !== title)
        saveNotes(updatedNotes)
        console.log(chalk.bgGreenBright(`Note: ${title} was successfully removed.`))
    } else {
        console.log(chalk.bgRedBright('No such note exists.'))
    }
}

const listNotes = () => {
    console.log(chalk.bgBlackBright.whiteBright('Your Notes:'))
    const notes =  loadNotes()
    for (let i = 1; i <= notes.length; i++) {
        console.log(notes[i-1].title)
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)
    if (noteToRead) {
        console.log('Title: ' + chalk.bgBlackBright.inverse(noteToRead.title) + '\n' + 'body: ' + noteToRead.body)
        
    } else {
        console.log(chalk.redBright('No such note exists.'))
    }
}

export {readNote, listNotes, removeNote, addNote, loadNotes as default }