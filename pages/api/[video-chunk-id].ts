import fs from 'fs'

const getFileSizeAndResolvedPath = (filePath) => {
  const resolvedPath = `${filePath}`

  const stat = fs.statSync(resolvedPath)
  return { fileSize: stat.size, resolvedPath: resolvedPath }
}

const getChunkProps = (range, fileSize) => {
  const parts = range.replace(/bytes=/, '').split('-')

  const start = parseInt(parts[0], 10)
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
  const chunkSize = end - start + 1

  return {
    start,
    end,
    chunkSize,
  }
}

export default function handler(req, res) {
  if (!global.videoUrl) return

  const { fileSize, resolvedPath } = getFileSizeAndResolvedPath(global.videoUrl)
  const requestRangeHeader = req.headers.range

  if (!requestRangeHeader) {
    res.writeHead(206, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    })

    global.videoStream = fs.createReadStream(resolvedPath).pipe(res)
  } else {
    const { start, end, chunkSize } = getChunkProps(
      requestRangeHeader,
      fileSize
    )

    // Read only part of the file from "start" to "end"
    const readStream = fs.createReadStream(resolvedPath, { start, end })
    const range = `bytes ${start}-${end}/${fileSize}`

    res.writeHead(206, {
      'Content-Range': range,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize.toString(),
      // 'Content-Type': '*',
      'Content-Type': 'video/mp4',
      // 'Content-Type': 'video/webm',
    })
    global.videoStream = readStream.pipe(res)
  }
}
