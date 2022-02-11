import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ManagerEntryType } from '../types'

type InitialManagerType = {
  files: ManagerEntryType[]
  folders: ManagerEntryType[]
  newDirectory: string
  separator: null | string
  startDirectory: string
  currentDirectory: null | string
  isRoot: boolean
  videoFilesOfCurrentDir: string[]
}

const initialMangerState: InitialManagerType = {
  files: [],
  folders: [],
  newDirectory: null,
  startDirectory: null,
  currentDirectory: null,
  separator: null,
  isRoot: true,
  videoFilesOfCurrentDir: [],
}

const managerSlice = createSlice({
  name: 'Manager',
  initialState: initialMangerState,
  reducers: {
    setFolders(state, action) {
      state.folders = action.payload
    },
    setVideoFilesOfCurrentDirectory(state, action) {
      state.videoFilesOfCurrentDir = action.payload
    },
    setFiles(state, action) {
      state.files = action.payload
    },
    setNewDirectory(state, action) {
      state.newDirectory = action.payload
    },
    setCurrentDirectory(state, action) {
      state.currentDirectory = action.payload
      state.isRoot = !!action.payload.match(/file-manager\/$/)
    },
    setStartDirectory(state, action) {
      state.startDirectory = action.payload
    },
    setSeparator(state, action) {
      state.separator = action.payload
    },
  },
})

type InitialVideoModalType = {
  videoPopupIsOpen: boolean
  isPlaying: boolean
  videoId: number
  videoUrl: string
  videoDisplay: boolean
  videoLoading: boolean
  videoEnded: boolean | null
  videoTitle: string | null
  startTime: number
  videoSpeed: number
  videoHeight: number
  videoWidth: number
}

const initialVideoModalState: InitialVideoModalType = {
  videoPopupIsOpen: false,
  isPlaying: false,
  videoId: 0,
  videoUrl: null,
  videoDisplay: false,
  videoLoading: true,
  videoEnded: null,
  videoTitle: null,
  startTime: 0,
  videoSpeed: 1,
  videoWidth: 1280,
  videoHeight: 720,
}

const videoModalSlice = createSlice({
  name: 'Video Modal',
  initialState: initialVideoModalState,
  reducers: {
    startWatchingVideo(state, action) {
      const { videoUrl, fileName } = action.payload
      state.videoPopupIsOpen = true
      state.videoId = state.videoId + 1
      console.log('videoUrl', videoUrl)
      state.videoUrl = videoUrl
      state.videoDisplay = true
      state.videoLoading = true
      state.videoEnded = false
      console.log('fileName', fileName)
      state.videoTitle = fileName
      // if (startTime) {
      //   state.startTime = startTime
      // } else {
      //   state.startTime = 0
      // }
    },
    closeVideoPopup(state) {
      state.videoPopupIsOpen = false
      state.isPlaying = false
    },
    setVideoIsLoaded(state) {
      state.videoLoading = false
      state.isPlaying = true
    },
    displayVideo(state) {
      state.videoDisplay = false
    },
    setVideoIsEnded(state) {
      state.videoEnded = true
      state.isPlaying = false
    },
    changeVideoSpeed(state, action) {
      state.videoSpeed = action.payload
    },
    setVideoSize(state, action) {
      state.videoHeight = action.payload.h
      state.videoWidth = action.payload.w
    },
  },
})

const store = configureStore({
  reducer: {
    manager: managerSlice.reducer,
    videoModal: videoModalSlice.reducer,
  },
})

export const managerActions = managerSlice.actions
export const videoModalActions = videoModalSlice.actions

export default store
export type RootState = ReturnType<typeof store.getState>
