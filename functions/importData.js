const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin.json');
const readline = require('readline');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const wordClipsData = require('./YoutubeTranscripts.json');
const collectionName = 'transcripts_test3';

const importData = async () => {
  try {
    for (const word in wordClipsData) {
      const clips = wordClipsData[word];
      const formattedData = {
        [word]: clips.map(clip => ({
          videoId: clip.videoId,
          start: clip.start,
        })),
      };
      await db.collection(collectionName).doc(word).set(formattedData);
    }
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    console.error(error.stack);
  } finally {
    // Ensure to close the Firebase Admin app to avoid memory leaks
    admin.app().delete();
  }
};

importData();
