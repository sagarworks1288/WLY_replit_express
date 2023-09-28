
const Countries = require("../../models/countries_model");
const States = require("../../models/states_model");
const UsersModel = require("../../models/users_model");
const AssetsModel = require("../../models/assets_model");
const UserImagesModel = require("../../models/user_images_model");
const { faker } = require('@faker-js/faker');
const axios = require('axios');


const HomeController = {}



HomeController.index = async (req, res) => {
    res.send(`
        <p id="demo" >cc</p>
      
        <a href="${"mm"}/migration" > start  5444884</a>`);
}
HomeController.test = async (req, res) => {
    
    
    for (let index = 0; index < 100; index++) {
        const randUsr = await createRandomUser();
        const user = await UsersModel.create({name:randUsr.username,email:randUsr.email})
    const asset  = await AssetsModel.create({userId:user._id,url:randUsr.avatar})
    const UserImages = await UserImagesModel.create({userId:user._id,assetId:asset._id})
        
    }
    
    
    res.json({ code: 1, message: "hello world"});
}


function createRandomUser() {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }

module.exports = HomeController;