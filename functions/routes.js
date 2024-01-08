const express = require('express');
const router = express.Router();
const { db } = require('./firebase');
const { YoutubeTranscript } = require('youtube-transcript');
const {
  info,
  error,
} = require("firebase-functions/logger");

const collectionName = 'transcripts_test3'; // Adjust the collection name

router.get('/transcripts/search-word-in-random-video', async (req, res) => {
    try {
      const searchTerm = req.query.term.toLowerCase(); // Extract search term from query parameters
      const page = req.query.page || 1; // Extract page number from query parameters, default to 1
      const pageSize = 100; // Set your desired page size
      
      info(`Search term: ${searchTerm} was used for "search-word-in-random-video`);

      const matchingClips = await findMatchingClipsInFirestore(searchTerm, page, pageSize);
      res.json(matchingClips);

    } catch (error) {
      console.error(error);
      error(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/transcripts/search-word-in-specific-video', async (req, res) => {
    try {
      const searchWord = req.query.word.toLowerCase(); 
      const searchUrl = req.query.url; 

      info(`Search word: ${searchWord} was used for video with this ID:${searchUrl} `);
  
      // Check if searchUrl is provided
      if (!searchUrl) {
        return res.status(400).json({ error: 'Missing required parameter: url' });
      }
  
      // Use try-catch to handle errors during transcript fetching
      try {
        const data = await YoutubeTranscript.fetchTranscript(searchUrl);
  
        // Filter the data to only include entries where the word is used
        const filteredData = data.filter(entry => entry.text.toLowerCase().split(' ').includes(searchWord));
  
        // Map the data to remove the 'offset' field
        const responseData = filteredData.map(({ text, offset }) => ({ 
          text, 
          offset: Math.floor(offset / 1000)
        }));
  
        res.json(responseData);
      } catch (fetchError) {
        console.error(fetchError);
        error(fetchError);
        res.status(500).json({ error: 'Error fetching transcript data' });
      }
    } catch (error) {
      console.error(error);
      error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // Function to find matching clips in Firestore with pagination
  const findMatchingClipsInFirestore = async (searchTerm, page, pageSize) => {
    try {
      const matchingClips = [];
  
      // Calculate the start index based on the page size and page number
      const startIndex = (page - 1) * pageSize;
  
      const doc = await db.collection(collectionName).doc(searchTerm).get();
  
      if (doc.exists) {
        const clips = doc.data()[searchTerm];
        for (let i = startIndex; i < clips.length && i < startIndex + pageSize; i++) {
          matchingClips.push(clips[i]);
        }
      }
  
      return matchingClips;
    } catch (error) {
      throw error;
    }
  };

module.exports = router;
