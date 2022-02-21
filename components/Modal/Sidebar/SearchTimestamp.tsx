import { Input } from '@chakra-ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { RootState, videoModalActions } from '../../../store'

const SearchTimestamp = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const dispatch = useDispatch()

  const onFilterHandler = useDebouncedCallback((event) => {
    const value = event.target.value
    const filteredTimestamps = state.timestamps.filter((timestamp) => {
      return timestamp.title.includes(value)
    })

    dispatch(videoModalActions.setFilteredTimestamps(filteredTimestamps))
  }, 500)

  return <Input placeholder="Search" onChange={onFilterHandler} />
}

export default SearchTimestamp
