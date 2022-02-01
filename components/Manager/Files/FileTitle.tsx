import { Heading } from '@chakra-ui/react'
import { FileTitleType } from '../../../types'

const FileTitle = ({ file }: React.PropsWithChildren<FileTitleType>) => {
  return (
    <>
      <Heading as="h3" fontSize="18" fontWeight="normal" textAlign="center">
        {file.name}
      </Heading>
    </>
  )
}

export default FileTitle
