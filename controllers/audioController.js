
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const Audio = require('../models/Audio');

exports.uploadAudio = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No audio file uploaded' });

    const originalPath = req.file.path;
    const wavPath = originalPath.replace(path.extname(originalPath), '.wav');

    // Convert audio to WAV format using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .toFormat('wav')
        .on('end', resolve)
        .on('error', reject)
        .save(wavPath);
    });

    // Prepare the audio stream for Deepgram
    const audioStream = fs.createReadStream(wavPath);

    // Call Deepgram API with enhanced params
    const response = await axios({
      method: 'POST',
      url: 'https://api.deepgram.com/v1/listen?punctuate=true&model=enhanced',
      headers: {
        'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/wav',
      },
      data: audioStream
    });

    const transcript = response.data.results.channels[0].alternatives[0].transcript;

    const audio = new Audio({
      filename: req.file.filename,
      transcription: transcript,
      user: req.user._id
    });

    await audio.save();

    res.status(200).json({
      message: 'Uploaded & Transcribed',
      transcript,
      file: `/uploads/${req.file.filename}`
    });

  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAudios = async (req, res) => {
  try {
    const audios = await Audio.find({ user: req.user._id }).sort({ timestamp: -1 });

    res.status(200).json(
      audios.map(audio => ({
        id: audio._id,
        filename: audio.filename,
        transcription: audio.transcription,
        timestamp: audio.timestamp,
        url: `/uploads/${audio.filename}`
      }))
    );
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

