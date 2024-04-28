import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote } from './notes.js'
import { removeNote } from './notes.js'
import { listNotes } from './notes.js'
import { readNote } from './notes.js'
const argv = yargs(process.argv.slice(2)).argv

yargs(hideBin(process.argv))
    .command('add', 'Add a new note', {        // This Is The Builder
        title: {
            describe: 'The title of your note',
            default: 'Untitled',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'The main body of your note',
            demandOption: true,
            type: 'string'
        }
    },
        // And This Is The Handler
        argv => {
            addNote(argv.title, argv.body)
        })
    .command('remove', 'Remove a note',
        { // Another Builder
            title: {
                describe: 'The title of the note that you want to remove.',
                demandOption: true,
                type: 'string'
            }
        },
        argv => {
            removeNote(argv.title)
        }
    )
    .command('list', 'Lists all notes', () => {
        console.log(chalk.bgWhiteBright('Listing all notes...'))
        listNotes()
    })
    .command('read', 'reads notes(?)', {
        // yet another builder
       title: {
        describe: 'The title of the note that you want to be printed.',
        demandOption: true,
        type: 'string'
       }
    },
    // and the handler
        argv => {
            readNote(argv.title)
        }
    )
    .parse()