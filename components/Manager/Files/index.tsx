import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../../store'
import GetIcon from '../Icons/GetIcon'
import FileTitle from './FileTitle'
import FileWrap from './FileWrap'

const isVideoFile = (fileName: string) => {
  const ext = fileName.slice(fileName.lastIndexOf('.'))

  if (ext == '.mp4' || ext == '.webm') return true

  return false
}

const Files = () => {
  const state = useSelector((state: RootState) => state.manager)
  const dispatch = useDispatch()

  const onOpenFileHandler = (fileName: string) => {
    if (isVideoFile(fileName)) {
      const videoUrl = state.currentDirectory + fileName
      console.log('video: ' + videoUrl)

      // open modal and start video
      dispatch(videoModalActions.startWatchingVideo({ videoUrl, fileName }))
    }
  }

  return (
    <>
      {state.files.map((file) => {
        return (
          <FileWrap
            key={file.name}
            cursor={isVideoFile(file.name) ? 'pointer' : 'auto'}
            file={file}
            onOpen={onOpenFileHandler}
          >
            <GetIcon file={file} />
            <FileTitle file={file} />
          </FileWrap>
        )
      })}
    </>
  )
}

export default Files
