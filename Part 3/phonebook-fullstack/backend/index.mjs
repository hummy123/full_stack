import Models from "./models/models.mjs";
import express, {response} from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config() //get environment variables

//store db url from env variable
await Models.setUrl(process.env.MONGODB_URI)

//express server
const app = express()

//middleware used with express
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

//token to get the request body
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

/* token for 'tiny' configuration (as stated on docs) with ':body' appended to show request body
 * not specifying 'tiny' as format because that is incompatible with additional tokens */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', async (request, response) => {
    const contactList = await Models.getAll()
    response.json(contactList)
})

function generateID() {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', async (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'contact name or contact number missing'
        })
    }

    /*
    const exists = contacts.find(contact => contact.name === body.name)

    if (exists) return response.status(400).json
    ({error: 'name must be unique'})*/

    const result = await Models.save(body.name, body.number)
    response.json(result)
})

app.get('/api/persons/:id', async (request, response) => {
    const contact = await Models.find(request.params.id)
    if (contact)
        response.json(contact)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //contacts = contacts.filter(contact => contact.id !== id)
    //response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has entries for ${contacts.length} people.</p>
    <p>${new Date().toString()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
