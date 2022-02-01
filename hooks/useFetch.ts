import { useEffect, useState } from 'react'

export default (url: string) => {
  const responseObject = {
    folders: [],
    files: [],
  }

  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [response, setResponse] = useState<typeof responseObject>(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})

  const baseUrl = 'http://localhost:8000/'

  useEffect(() => {
    if (!isLoading) return

    fetch(`${url}`, options)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setIsLoading(false)
        setResponse(data)
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error)
      })
  }, [isLoading])

  const doFetch = (options = {}) => {
    setIsLoading(true)
    setOptions(options)
  }

  return [{ isLoading, response, error }, doFetch] as const
}
