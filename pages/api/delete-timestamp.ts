import fs from 'fs'

export default function handler(req, res) {
  const { id, directory } = req.body.data
  const path = `${directory}timestamps.json`

  try {
    if (!fs.existsSync(path)) return

    const data = fs.readFileSync(path).toString()

    const timestamps = JSON.parse(data)
    const newTimestamps = timestamps.filter(({ id: tId }) => tId !== id)

    fs.writeFileSync(path, JSON.stringify(newTimestamps))

    console.log('here')
    res.status(204).send()
  } catch (error) {
    console.log('error', error)
  }
}
