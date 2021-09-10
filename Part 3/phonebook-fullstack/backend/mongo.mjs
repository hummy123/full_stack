import mongoose from 'mongoose'

// contact schema and model used for both reading and writing
const contactSchema = new mongoose.Schema({
	name: String,
	number: String,
})
const Contact = mongoose.model('Contact', contactSchema)

// function to connect to db
const connect = async (password) => {
	// url used for accessing read/write from database
	const url = `mongodb+srv://hummy123:${password}@cluster0.wjk1q.mongodb.net/phonebook-app?retryWrites=true&w=majority`
	await mongoose.connect(url)
}

// function to save contact
const save = async (password, name, number) => {
	await connect(password)
	// create note object according to schema
	const note = new Contact({
		name,
		number,
	})
	await note.save()
	console.log(`Added ${name} with number ${number} to phonebook`)
	await mongoose.connection.close()
}

const find = async (password) => {
	await connect(password)
	const result = await Contact.find({})
	result.forEach((contact) => {
		console.log(contact)
	})
	await mongoose.connection.close()
}

// like __init__ in python or main() in java
const main = async () => {
	if (process.argv.length === 5) {
		// store arguments as variables
		const password = process.argv[2]
		const name = process.argv[3]
		const number = process.argv[4]
		await connect(password)
		await save(password, name, number)
	} else if (process.argv.length === 3) {
		const password = process.argv[2]
		await find(password)
	} else {
		console.log(`Please provide the following arguments: node mongo.js <password> <name> <number>
    to add a user or the arguments: node mongo.js <password> to see all users`)
		process.exit(1)
	}
}

const url = process.env.MONGODB_URI
console.log(url)
main() // call this function when program starts
