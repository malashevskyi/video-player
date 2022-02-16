import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../../store'

const SwitchButton = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const dispatch = useDispatch()

  const onToggleSidebarHandler = () => {
    dispatch(videoModalActions.toggleSidebar())
  }

  return (
    <Button
      pos="absolute"
      top={0}
      right="0"
      h="100%"
      borderRadius={0}
      zIndex={1}
      opacity={0.05}
      _hover={{
        opacity: 0.5,
      }}
      onClick={onToggleSidebarHandler}
    >
      {state.sidebarIsOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </Button>
  )
}

export default SwitchButton
