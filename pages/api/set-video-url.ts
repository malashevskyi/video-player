import fs from 'fs'

export default function handler(req, res) {
  const videoUrl = req.body.data.videoUrl

  global.videoUrl = videoUrl

  if (global.videoStream) {
    global.videoStream.destroy()
  }

  res.status(201).send(['ok'])
}
