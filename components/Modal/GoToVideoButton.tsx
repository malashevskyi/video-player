import { Button } from '@chakra-ui/button'
import { Icon } from '@chakra-ui/icons'
import { IconType } from 'react-icons/lib'

type GoToVideoButtonType = {
  onClick: () => void
  icon: IconType
}

const GoToVideoButton = ({ onClick, icon }: GoToVideoButtonType) => {
  return (
    <Button
      onClick={onClick}
      p={0}
      h="35px"
      bg="white"
      boxShadow="none"
      _hover={{ bg: 'white' }}
      _focus={{ bg: 'white', boxShadow: 'none' }}
    >
      <Icon color="blue.500" w="50px" h="30px" as={icon} />
    </Button>
  )
}

export default GoToVideoButton
