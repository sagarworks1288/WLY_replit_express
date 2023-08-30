const {IncomingForm} = require("formidable");

function formParse(req) {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ body: fields, files });
        });
    });
}

module.exports = { formParse };
