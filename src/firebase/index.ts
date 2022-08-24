import * as admin from 'firebase-admin';
import coregateAccountCredentials from './coregatekit-ae6264b992e1.json';

const serviceAccount = coregateAccountCredentials as admin.ServiceAccount

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function sendNotificationToSpecificDevice(username: string, token: string) {
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: `Hi! ${username} from coregate node.js`,
      body: 'Testing send a third message notification from coregatekit server.',
      clickAction: 'FLUTTER_NOTIFICATION_CLIK'
    },
  };
  console.log(`Notification has been send to ${username} with ${token}`);
  return firebase.messaging().sendToDevice(token, payload);
}

export {
  sendNotificationToSpecificDevice,
};