import fs from 'fs'
const { v4: uuidv4 } = require('uuid')

export default function handler(req, res) {
  const { title, description, time, directory, fileName } = req.body.data
  const path = `${directory}timestamps.json`

  try {
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path).toString()
      const timestamps = JSON.parse(data)

      const newTimestamp = {
        id: uuidv4(),
        fileName,
        title,
        description,
        time,
      }

      timestamps.push(newTimestamp)

      fs.writeFileSync(path, JSON.stringify(timestamps))

      res.status(201).json(timestamps)
    } else {
      const newTimestamp = [
        {
          id: uuidv4(),
          fileName,
          title,
          description,
          time,
        },
      ]

      fs.appendFileSync(path, JSON.stringify(newTimestamp))

      res.status(201).json(newTimestamp)
    }
  } catch (error) {
    console.log('error', error)
  }
}
