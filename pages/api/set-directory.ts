import fs from 'fs'

export default function handler(req, res) {
  const { directory } = req.body.data

  let entries = []

  try {
    entries = fs.readdirSync(directory)
  } catch (error) {
    console.log(error)
  }

  const folders = []
  const files = []

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]

    const isDirectory = fs.statSync(`${directory}/${entry}`).isDirectory()

    if (isDirectory) {
      folders.push({
        name: entry,
      })
    } else {
      files.push({
        name: entry,
      })
    }
  }
  res.status(200).send({
    folders,
    files,
  })
}
