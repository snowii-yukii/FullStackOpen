const mongoose = require('mongoose')
const dns = require('node:dns') 

dns.setServers(['8.8.8.8', '1.1.1.1'])

if(process.argv.length < 3) {
    console.log('Provide password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://carmelinojadulco_db_user:${password}@cluster0.vw0jfel.mongodb.net`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

else if (process.argv.length >= 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(() => {
        console.log(`added ${name} ${number} to the phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Invalid arguments. Usage:')
    console.log('To list: node mongo.js <password>')
    console.log('To add:  node mongo.js <password> <name> <number>')
    mongoose.connection.close()
}
