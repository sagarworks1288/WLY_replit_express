class AuthController {
    static async signUp(req, res) {
        res.json({code:1,message:"hello world"});
    }
    
    static async test(req, res) {
        res.json({code:1,message:"hello world"});
    }
}


module.exports = AuthController;