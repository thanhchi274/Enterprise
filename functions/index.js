
const functions = require('firebase-functions')
const admin=require('firebase-admin');
const nodemailer =require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;
exports.sendNotification=functions.firestore.document('user_data/{user_data}')
.onCreate((snap,ctx)=>{
    const data=snap.data();
    let authData=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        }
    });
authData.sendMail({
from :'info.truly@makethatapp.com',
to:`${data.email}`,
subject:'Your submission Info',
text:`${data.email}`,
html:`${data.email}`,
}).then(res=>console.log('successfully sent that mail')).catch(err=>console.log(err));

});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onUserCreate = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
    const values = snap.data();

    // send email
    await db.collection('logging').add({ description: `Email was sent to user with username:${values.username}` });
})

exports.onUserUpdate = functions.firestore.document('users/{userId}').onUpdate(async (snap, context) => {
    const newValues = snap.after.data();

    const previousValues = snap.before.data();

    if (newValues.username !== previousValues.username) {
        const snapshot = await db.collection('reviews').where('username', '==', previousValues.username).get();

        let updatePromises = [];
        snapshot.forEach(doc => {
            updatePromises.push(db.collection('reviews').doc(doc.id).update({ username: newValues.username }));
        });

        await Promise.all(updatePromises);
    }
})

exports.onPostDelete = functions.firestore.document('posts/{postId}').onDelete(async (snap, context) => {
    const deletedPost = snap.data();

    let deletePromises = [];
    const bucket = admin.storage().bucket();

    deletedPost.images.forEach(image => {
        deletePromises.push(bucket.file(image).delete());
    });

    await Promise.all(deletePromises);
});