import { Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { FileWrapType } from '../../../types'
import GetIcon from '../Icons/GetIcon'
import FileTitle from './FileTitle'

const FileWrap = ({
  children,
  file,
  cursor,
  onOpen,
}: React.PropsWithChildren<FileWrapType>) => (
  <Box
    key={file.name}
    w="200px"
    cursor={cursor}
    p={3}
    _hover={{ bg: 'blue.100' }}
    onClick={() => onOpen(file.name)}
  >
    {children}
  </Box>
)

export default FileWrap
