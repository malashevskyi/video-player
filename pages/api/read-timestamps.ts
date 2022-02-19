import fs from 'fs'

export default function handler(req, res) {
  const directory = req.body.data.directory
  const path = `${directory}timestamps.json`

  let timestamps = []

  try {
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path).toString()

      timestamps = JSON.parse(data)
    }
  } catch (error) {
    console.log('error', error)
  }

  res.status(200).json([...timestamps])
}
