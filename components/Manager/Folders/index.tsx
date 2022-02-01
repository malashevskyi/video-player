import { useDispatch, useSelector } from 'react-redux'
import { managerActions, RootState } from '../../../store'
import { FolderIcon } from '../Icons'
import FolderTitle from './FolderTitle'
import FolderWrap from './FolderWrap'

const Folders = () => {
  const { separator, currentDirectory, folders } = useSelector(
    (state: RootState) => state.manager
  )
  const dispatch = useDispatch()

  const onOpenFolderHandler = (folder: string) => {
    const newDirectory = currentDirectory + folder + separator

    dispatch(managerActions.setNewDirectory(newDirectory))
    dispatch(managerActions.setCurrentDirectory(newDirectory))
  }

  return (
    <>
      {folders.map((folder) => (
        <FolderWrap
          key={folder.name}
          folder={folder}
          onOpen={onOpenFolderHandler}
        >
          <FolderIcon fill="blue.400" />
          <FolderTitle folder={folder} />
        </FolderWrap>
      ))}
    </>
  )
}

export default Folders
