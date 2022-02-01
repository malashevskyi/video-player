import { Button, HStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { managerActions, RootState } from '../../../store'

const GoBack = () => {
  const { separator, currentDirectory, isRoot } = useSelector(
    (state: RootState) => state.manager
  )
  const dispatch = useDispatch()

  const onBackHandler = () => {
    if (!currentDirectory || !separator) return

    const end = currentDirectory
      .slice(0, currentDirectory.length - 1)
      .lastIndexOf(separator)
    const newDirectory = currentDirectory.slice(0, end) + separator

    dispatch(managerActions.setNewDirectory(newDirectory))
    dispatch(managerActions.setCurrentDirectory(newDirectory))
  }
  return (
    <Button disabled={isRoot} mx={6} mt={3} onClick={() => onBackHandler()}>
      ../
    </Button>
  )
}

export default GoBack
