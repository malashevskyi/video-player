import fs from 'fs'

export default function handler(req, res) {
  const { id, title, description, directory } = req.body.data
  const path = `${directory}timestamps.json`

  try {
    if (!fs.existsSync(path)) return

    const data = fs.readFileSync(path).toString()
    const timestamps = JSON.parse(data)

    for (let i = 0; i < timestamps.length; i++) {
      if (timestamps[i].id === id) {
        timestamps[i].title = title
        timestamps[i].description = description
        break
      }
    }

    fs.writeFileSync(path, JSON.stringify(timestamps))

    res.status(201).json(timestamps)
  } catch (error) {
    console.log('error', error)
  }
}
