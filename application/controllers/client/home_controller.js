class HomeController {
    static async index(req, res) {
        res.send(`
        <p id="demo" >cc</p>
      
        <a href="${"mm"}/migration" > start  5444884</a>`);
    }
    
    static async test(req, res) {
        res.json({code:1,message:"hello world"});
    }
}


module.exports = HomeController;