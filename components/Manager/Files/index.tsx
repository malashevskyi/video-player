import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import GetIcon from '../Icons/GetIcon'
import FileTitle from './FileTitle'
import FileWrap from './FileWrap'

const isVideoFile = (file: string) => {
  const ext = file.slice(file.lastIndexOf('.'))

  if (ext == '.mp4' || ext == '.webm') return true

  return false
}

const Files = () => {
  const state = useSelector((state: RootState) => state.manager)

  const onOpenFileHandler = (file: string) => {
    if (isVideoFile(file)) {
      // playVideo
    }
  }

  return (
    <>
      {state.files.map((file) => {
        console.log(file)

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
