import { Box, Progress } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../store'
import { CancelablePromise } from 'cancelable-promise'

const VideoProgressBar = () => {
  const state = useSelector((state: RootState) => state.manager)
  const videoState = useSelector((state: RootState) => state.videoModal)
  const dispatch = useDispatch()
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    let videoPromises = []
    let allVideoPromisesResolvedPromise
    // write in state total duration of all prev videos after change a video
    if (videoState.currentVideoDuration) {
      const uri = state.currentDirectory.slice(
        state.currentDirectory.indexOf('file-manager')
      )

      videoPromises = state.videoFilesOfCurrentDir.map((name) => {
        return new CancelablePromise((resolve) => {
          const video = document.createElement('video')
          video.src = `/${uri}${name}`

          video.onloadedmetadata = function () {
            resolve(video.duration)
          }
        })
      })
      allVideoPromisesResolvedPromise = CancelablePromise.all(videoPromises)
        .then((result) => {
          if (result.includes(videoState.currentVideoDuration)) {
            const totalVideosDuration = result.reduce(
              (acc: number, item: number) => acc + item,
              0
            ) as number

            dispatch(
              videoModalActions.setTotalDurationOfFolderVideosInFolder(
                totalVideosDuration
              )
            )
            const currentVideoIndex = result.indexOf(
              videoState.currentVideoDuration
            )
            const prevVideoDurations = result
              .slice(0, currentVideoIndex)
              .reduce((acc: number, item: number) => acc + item, 0) as number
            dispatch(
              videoModalActions.setTotalDurationOfPrevVideosInFolder(
                prevVideoDurations
              )
            )

            setProgressValue(
              +(prevVideoDurations / totalVideosDuration).toFixed(2) * 100
            )
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    return () => {
      for (const promise of videoPromises) {
        promise.cancel()
        allVideoPromisesResolvedPromise.cancel()
      }
    }
  }, [videoState.videoId, videoState.currentVideoDuration])

  useEffect(() => {
    // find current progress
    // add current time to total duration of all prev videos
    const progress =
      +(
        (videoState.totalDurationOfPrevVideosInFolder +
          videoState.currentTime) /
        videoState.totalDurationOfFolderVideosInFolder
      ).toFixed(2) * 100

    setProgressValue(progress)
  })

  return (
    <Box>
      <Progress value={progressValue} size="xs" />
    </Box>
  )
}

export default VideoProgressBar
