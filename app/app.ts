import express = require('express');
import bodyParser = require('body-parser');
// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

const extractInfo = (data: string) => {
    let lastNameIndex: number = data.indexOf('0000');
    lastNameIndex += 4; // should include '0000'

    let firstName: string = data.substring(0, lastNameIndex);
    let clientIndex: number = data.lastIndexOf('000');
    clientIndex += 3; // should include '000'

    let lastName: string = data.substring(lastNameIndex, clientIndex);
    let clientId: string = data.substr(clientIndex);

    return { firstName, lastName, clientId };
}
const countCharacters = (char: string, str: string) => {
    return str.split('').reduce((acc, ch) => ch == char ? acc + 1 : acc, 0);
}
const isValidInput = (input: string) => {
    if (countCharacters('0', input) == 7
        && (input.indexOf('0000') < input.lastIndexOf('000')) // 
        && input.substring(input.lastIndexOf('000') + 3).length == 7) { // clientId must be 7 chars
        return true;
    }
    return false;
}

app.post('/api/v1/parse', (req: express.Request, res: express.Response) => {
    let body: { data: string } = req.body;

    if (isValidInput(body.data)) {
        let data = extractInfo(body.data);
        res.status(200).json({ statusCode: 200, data });
    } else {
        res.status(400).json({ statusCode: 400 });
    }
});

app.post('/api/v2/parse', (req: express.Request, res: express.Response) => {
    let body: { data: string } = req.body;
    if (isValidInput(body.data)) {
        let data = extractInfo(body.data);
        data.firstName = data.firstName.substring(0, data.firstName.length - 4); // remove 4 trailing zero's
        data.lastName = data.lastName.substring(0, data.lastName.length - 3); // remove 3 trailing zero's
        data.clientId = `${data.clientId.slice(0, 3)}-${data.clientId.slice(3)}`;

        res.status(200).json({ statusCode: 200, data });
    } else {
        res.status(400).json({ statusCode: 400 });
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});