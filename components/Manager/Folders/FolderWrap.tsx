import { Box } from '@chakra-ui/react'
import { FolderWrapType } from '../../../types'

const FolderWrap = ({
  children,
  folder,
  onOpen,
}: React.PropsWithChildren<FolderWrapType>) => {
  return (
    <Box
      key={folder.name}
      w="200px"
      minH="100px"
      p={3}
      _hover={{ bg: 'blue.100' }}
      onClick={(event) => {
        onOpen(folder.name)
      }}
    >
      {children}
    </Box>
  )
}

export default FolderWrap
