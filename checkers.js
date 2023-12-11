const {db} = require('./firebase')

const axios = require("axios");

const {send} = require("./mailer");
require('dotenv').config();


export async function concernReportMatcher(data, emailsIDs) {
    const q = await db.collection('report-triggers').doc('concern-trigger').get();
    const concernTriggers = q.data();
    let searchResult = await axios.post(process.env.NLP_ENDPOINT, {
        'input_phrase': data['concern'],
        "matchers": concernTriggers
    });
    for (const [key, value] of Object.entries(searchResult['results'])) {
        if (value) {
            await send(emailsIDs[key], `A new report:${data['title']} by ${data['owner']} related to the environmental concern:${data['concern']} was submitted you can review it using Eco Track`)
        }
    }
}

export async function textReportMatcher(data, emailsIDs) {
    const q = await db.collection('report-triggers').doc('text-trigger').get();
    const textTriggers = q.data()
    const searchResult = await axios.post(process.env.NLP_ENDPOINT, {
        'input_phrase': data['concern'],
        "matchers": textTriggers
    });
    for (const [key, value] of Object.entries(searchResult['results'])) {
        if (value) {
            await send(emailsIDs[key], `A new report:${data['title']} by ${data['owner']} related to the environmental concern:${data['concern']} was submitted you can review it using Eco Track`)
        }
    }
}


export async function concernDataMatcher(data, emailsIDs) {
    const q = await db.collection('maps').doc('concern-triggers').get();
    const concernTriggers = q.data()
    const searchResult = await axios.post(process.env.NLP_ENDPOINT, {
        'input_phrase': data['concern'],
        "matchers": concernTriggers
    });
    for (const [key, value] of Object.entries(searchResult['results'])) {
        if (value) {
            await send(emailsIDs[key], `New data:${data['title']} submitted by ${data['owner']} related to the environmental concern:${data['concern']}  value:${data.value} you can review it using Eco Track`)
        }
    }
}

export async function numericalTriggerMatcher(data, emailsIDs) {
    const q = await db.collection('report-triggers').doc('numerical-trigger').get();
    const numericalTriggers = q.data()
    let searchTokens = {}
    for (const [key, value] of Object.entries(numericalTriggers.data())) {
        searchTokens[key] = value.type
    }
    const searchResult = await axios.post(process.env.NLP_ENDPOINT, {
        'input_phrase': data['type'],
        "matchers": searchTokens
    });
    for (const [key, value] of Object.entries(searchResult['results'])) {
        if (value) {
            switch (numericalTriggers.key.op) {
                case '<': {
                    if (numericalTriggers.key < data.value) {
                        await send(emailsIDs[key], `New data:${data['title']} submitted by ${data['owner']} related to the environmental concern:${data['concern']}  value:${data.value} you can review it using Eco Track`)
                    }
                    break
                }
                case '>': {
                    if (numericalTriggers.key > data.value) {
                        await send(emailsIDs[key], `New data:${data['title']} submitted by ${data['owner']} related to the environmental concern:${data['concern']}  value:${data.value} you can review it using Eco Track`)
                    }
                    break
                }
                case '=': {
                    if (numericalTriggers.key === data.value) {
                        await send(emailsIDs[key], `New data:${data['title']} submitted by ${data['owner']} related to the environmental concern:${data['concern']}  value:${data.value} you can review it using Eco Track`)
                    }
                    break
                }

            }
        }
    }
}