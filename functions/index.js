
const functions = require('firebase-functions')
const admin=require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.countDocument = functions.firestore.document('magazinePost/{magazinePost}')
    .onWrite((change, context) => {
    if (!change.before.exists) {
        db.doc(docRef).update({numberOfDocs: FieldValue.increment(1)});
    } else if (change.before.exists && change.after.exists) {
    } else if (!change.after.exists) {
        db.doc(docRef).update({numberOfDocs: FieldValue.increment(-1)});
    }
return;
});