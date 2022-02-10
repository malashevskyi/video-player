import { NextPage } from 'next'
import { useEffect } from 'react'
import { ManagerProps } from '../../types'
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
  const [{ response: newDirectoryResponse }, doSetNewDirectory] =
    useFetch('api/set-directory')

  useEffect(() => {
    // set startDirectory, separator, currentDirectory
    dispatch(managerActions.setNewDirectory(startDirectory))
    dispatch(managerActions.setCurrentDirectory(startDirectory))
    dispatch(managerActions.setSeparator(separator))
  }, [])

  useEffect(() => {
    if (!newDirectoryResponse) return

    const { folders, files } = newDirectoryResponse
    // update folders and files in state after directory has been changed
    dispatch(managerActions.setFolders(folders))
    dispatch(managerActions.setFiles(files))
  }, [newDirectoryResponse])

  useEffect(() => {
    if (!state.newDirectory) return
    // read files and folders form new directory
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
  }, [state.newDirectory])

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
