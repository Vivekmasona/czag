const express = require('express');
const ytdl = require('@distube/ytdl-core');
const app = express();
const PORT = 3000;

app.get('/play', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('कृपया YouTube वीडियो URL प्रदान करें: ?url=YOUR_YOUTUBE_URL');
  }

  try {
    res.setHeader('Content-Type', 'audio/mp3');
    ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    }).pipe(res);
  } catch (error) {
    res.status(500).send('ऑडियो स्ट्रीमिंग में त्रुटि: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`ऑडियो स्ट्रीमिंग सर्वर चल रहा है: http://localhost:${PORT}/play?url=YOUR_YOUTUBE_URL`);
});
