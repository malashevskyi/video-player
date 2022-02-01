import { NextPage } from 'next'
import { useEffect } from 'react'
import { ManagerProps } from '../../types'
import useSWR from 'swr'
import { useDispatch, useSelector } from 'react-redux'
import { managerActions, RootState } from '../../store'
import useFetch from '../../hooks/useFetch'
import { Box, Flex } from '@chakra-ui/react'
import Folders from './Folders'
import Files from './Files'
import GoBack from './GoBack'

const Manager: NextPage<ManagerProps> = ({ separator, startDirectory }) => {
  const state = useSelector((state: RootState) => state.manager)
  const dispatch = useDispatch()
  // const { data, error } = useSWR('/api/set-directory')
  const [{ response: newDirectoryResponse }, doSetNewDirectory] =
    useFetch('api/set-directory')

  useEffect(() => {
    getVideoFilesOfCurrentDirectory()
  }, [state.files])

  useEffect(() => {
    setStartDirectoryAndSeparator()
  }, [])

  useEffect(() => {
    onNewDirectoryResponseHandler()
  }, [newDirectoryResponse])

  useEffect(() => {
    if (!state.newDirectory) return

    onSetNewDirectoryHandler()
  }, [state.newDirectory])

  const setStartDirectoryAndSeparator = () => {
    dispatch(managerActions.setNewDirectory(startDirectory))
    dispatch(managerActions.setSeparator(separator))
  }

  const getVideoFilesOfCurrentDirectory = () => {}

  const onSetNewDirectoryHandler = () => {
    // console.log('state.newDirectory', state.newDirectory)
    doSetNewDirectory({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          directory: state.newDirectory,
        },
      }),
    })
  }

  const onNewDirectoryResponseHandler = () => {
    if (!newDirectoryResponse) return

    // console.log('response', newDirectoryResponse)
    const { folders, files } = newDirectoryResponse

    dispatch(managerActions.setFolders(folders))
    dispatch(managerActions.setFiles(files))
  }

  return (
    <Box>
      <GoBack />
      <Flex wrap="wrap">
        <Folders />
        <Files />
      </Flex>
    </Box>
  )
}

export default Manager
