const url = require('url');
const path = require('path');
const fs = require('fs');

const getId = url => {
    const lastIndex = url.lastIndexOf('/');

    if (lastIndex !== -1) {
        return url.slice(lastIndex +1);
    }
};

const usersFolder = path.resolve(__dirname, '../../../', 'data/products');

const getProducts = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const id = getId(parsedUrl.path);

    const src = path.resolve(usersFolder, id + '.json');

    fs.readFile(src, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            response.writeHead(404, {"Content-Type": "application/json"});
            response.write(JSON.stringify({
                status: "no products",
                products: []
            }));
            response.end();
            return
        }
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(data);
        //response.write(JSON.stringify(data));
        response.end();
    })

};

module.exports = getProducts;
