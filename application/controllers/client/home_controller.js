
const Countries = require("../../models/countries_model");
const States = require("../../models/states_model");

const HomeController = {}

HomeController.index = async (req, res) => {
    res.send(`
        <p id="demo" >cc</p>
      
        <a href="${"mm"}/migration" > start  5444884</a>`);
}
HomeController.test = async (req, res) => {
    const country = await Countries.create({ name: "usa" })
    const states = await States.create({ name: "newyork", countryId: country._id })
    res.json({ code: 1, message: "hello world", country, states });
}

module.exports = HomeController;