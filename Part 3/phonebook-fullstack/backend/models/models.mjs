import mongoose from "mongoose"
import dotenv from "dotenv";

class Models {
    //schema model
    static Contact = mongoose.model('Contact', new mongoose.Schema({
        name: String,
        number: String
    }).set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    }))

    static url = ""

    static async setUrl (url) {
        this.url = url
    }

    static async connect () {
        //connect to db
        try {
            await mongoose.connect(this.url)
            console.log('connected to db')
        } catch (err) {
            console.log('error connecting to db:', err.message)
        }
    }

    //function to save contact
    static async save (name, number) {
        //connect to db
        await this.connect()

        //create contact object according to schema
        const contact = new this.Contact({
            name: name,
            number: number
        })

        //save
        const result = await contact.save()
        await this.close()
        return result
    }

    //function to get all
    static async getAll() {
        await this.connect()
        const result = await this.Contact.find({})
        await this.close()
        return result
    }

    //function to get single contact by id
    static async find(id) {
        await this.connect()
        const result = await this.Contact.findById(id)
        await this.close()
        return result
    }

    //function to close db
    static async close() {
        await mongoose.connection.close()
    }

    static async delete(id) {
        await this.connect()
        const result = this.Contact.findByIdAndRemove(id)
        await this.close()
        return result
    }

    static async update(id, number) {
        await this.connect()

        const result = await this.Contact.findByIdAndUpdate(id,
            {number: number},
            {new: true})

        await this.close()
        return result
    }
}

export default Models
