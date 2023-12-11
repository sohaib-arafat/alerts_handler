const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

functions.cloudEvent('alerts_handler', async cloudEvent => {
    const encodedData = cloudEvent.data.message.data;
    const data = JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'));
    {"type":"","concern":"","value":"","notes":"","owner":""}
    const searchResult = await axios.post('https://nlp-matcher-service-55bldnw2za-zf.a.run.app/process', data);
 });

