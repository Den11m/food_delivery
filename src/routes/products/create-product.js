const fs = require('fs');
const path = require('path');
const util = require('util');

const productsFolder = path.resolve(__dirname, '../../../', 'data/products');

const writeFile = util.promisify(fs.writeFile);

const saveNewProduct = (fileName, data) => {
    const src = path.resolve(productsFolder, fileName + '.json');
    const dataStr = JSON.stringify(data);

    //returning promise
    return writeFile(src, dataStr);
};

const createProduct = (request, response) => {
    const body = [];

    const handleDataLoad = () => {
        const data = Buffer.concat(body).toString();

        let fileStream = fs.createWriteStream(path.join(__dirname, 'product-buffer.json'));
        fileStream.write(body.toString());
        fileStream.end();

        fileStream.on('data', chunk => console.log('chunk', chunk));

        const productData = Object.assign({}, JSON.parse(data), { id: Date.now(), created: `${Date.now()}`, modified: "" });

        const fileName = `${productData.id}`;

        const sendResponse = () => {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify({status: "success", ...productData}));
            response.end();
        };

        saveNewProduct(fileName, productData)
            .then(sendResponse)
            .catch(console.log)

    };

    request
        .on('data', chunk => body.push(chunk))
        .on('end', handleDataLoad)
};

module.exports = createProduct;
