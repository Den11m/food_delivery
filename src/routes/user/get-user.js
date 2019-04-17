const url = require('url');
const path = require('path');
const fs = require('fs');


const getId = url => {
    const lastIndex = url.lastIndexOf('/');

    if (lastIndex !== -1) {
        return url.slice(lastIndex +1);
    }
};

const usersFolder = path.resolve(__dirname, '../../../', 'data/users');

const getUser = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const id = getId(parsedUrl.path);

    const src = path.resolve(usersFolder, id + '.json');

    fs.readFile(src, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            response.writeHead(404, {"Content-Type": "application/json"});
            response.write(JSON.stringify({
                status: "no user"
            }));
            response.end();
            return
        }

        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(data);
        response.end();
    });

};

module.exports = getUser;
