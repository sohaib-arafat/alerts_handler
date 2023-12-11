const functions = require('@google-cloud/functions-framework');
const {db} = require('./firebase.cjs')
const {concernReportMatcher, textReportMatcher, concernDataMatcher, numericalTriggerMatcher} = require('./matchers.cjs')
require('dotenv').config();


functions.cloudEvent('alerts_handler', async cloudEvent => {
    const encodedData = cloudEvent.data.message.data;
    let data = JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'));
    // data={"type":"report","concern":"Water Pollution","title":"Water Pollution in Gaza","value":"Report on high water pollution levels in Gaza","owner":"Lina",'date':"17/11/2002"}
    let q = await db.collection('emalis').doc('emails-map').get()
    const emailsIDs = q.data();
    if (data.type === 'report') {
        await concernReportMatcher(data, emailsIDs)
        await textReportMatcher(data, emailsIDs)
    }
    if (data.type === 'data') {
        await concernDataMatcher(data,emailsIDs)
        await numericalTriggerMatcher(data,emailsIDs)
    }
});

