const express = require("express");
const router= express.Router()
const {getContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact
}=require("../controllers/contactController")

router.route("/").get(getContacts).post(addContact)
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact)

module.exports = router;