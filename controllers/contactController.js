const asyncHandler=require("express-async-handler");
const Contact= require("../models/contactModel")

//@desc GET all contacts
//@route GET /api/contacts
//@access public

const getContacts= asyncHandler(async (req,res)=>{
    const contacts = await Contact.find()
    res.status(200).send(contacts)
})

//@desc GET particular contact
//@route GET /api/contacts
//@access public
const getContact= asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).send(contact)
})

//@desc update particular contact
//@route PUT /api/contacts
//@access public
const updateContact= asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).send(updatedContact)
})

//@desc ADD a contact
//@route POST /api/contacts
//@access public
const addContact= asyncHandler(async (req,res)=>{
    const{name,email,phone}=req.body;
    if (!name || !email || !phone) {
        res.status(404)
        throw new Error("All fields are mandatory !");
    }
    const contact=await Contact.create({
        name, email, phone
    })
    res.status(201).send(contact)
})

//@desc DELETE a particular contact
//@route DELETE /api/contacts
//@access public
const deleteContact= asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact) {
        console.log("not found");
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).send("done")
})

module.exports ={
    getContacts,
    getContact,
    updateContact,
    addContact,
    deleteContact
}