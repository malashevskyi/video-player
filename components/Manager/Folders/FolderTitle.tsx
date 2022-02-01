import { Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { managerActions, RootState } from '../../../store'
import { FolderTitleType } from '../../../types'
import { FolderIcon } from '../Icons'
import FolderWrap from './FolderWrap'

const FolderTitle = ({ folder }: FolderTitleType) => {
  return (
    <Heading as="h3" fontSize="18" fontWeight="normal" textAlign="center">
      {folder.name.length > 17 ? `${folder.name.slice(0, 17)}...` : folder.name}
    </Heading>
  )
}

export default FolderTitle
