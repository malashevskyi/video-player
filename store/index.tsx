import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ManagerEntryType, TimestampType } from '../types'
import { format } from '../utiles'

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
      state.files = action.payload.sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { numeric: true })
      )
    },
    setNewDirectory(state, action) {
      state.newDirectory = action.payload
    },
    setCurrentDirectory(state, action) {
      state.currentDirectory = action.payload
      state.isRoot =
        action.payload.endsWith('file-manager/') ||
        action.payload.endsWith('file-manager\\')
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
  displayTime: string
  displayDuration: string
  currentTime: number
  currentVideoDuration: number | null
  sidebarIsOpen: boolean
  totalDurationOfFolderVideosInFolder: number | null
  totalDurationOfPrevVideosInFolder: number
  timestamps: TimestampType[]
  filteredTimestamps: TimestampType[]
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
  displayTime: '0:0',
  displayDuration: '0:0',
  currentTime: 0,
  currentVideoDuration: null,
  sidebarIsOpen: false,
  totalDurationOfFolderVideosInFolder: null,
  totalDurationOfPrevVideosInFolder: 0,
  timestamps: [],
  filteredTimestamps: [],
}

const videoModalSlice = createSlice({
  name: 'Video Modal',
  initialState: initialVideoModalState,
  reducers: {
    setTimestamps(state, action) {
      state.timestamps = action.payload
    },
    setFilteredTimestamps(state, action) {
      state.filteredTimestamps = action.payload
    },
    setTotalDurationOfFolderVideosInFolder(state, action) {
      state.totalDurationOfFolderVideosInFolder = action.payload
    },
    setTotalDurationOfPrevVideosInFolder(state, action) {
      state.totalDurationOfPrevVideosInFolder = action.payload
    },
    startWatchingVideo(state, action) {
      const { videoUrl, fileName } = action.payload
      state.videoPopupIsOpen = true
      state.videoId = state.videoId + 1
      state.videoUrl = videoUrl
      state.videoDisplay = true
      state.videoLoading = true
      state.videoEnded = false
      state.videoTitle = fileName
    },
    toggleSidebar(state) {
      state.sidebarIsOpen = !state.sidebarIsOpen
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
    setIsPlaying(state, action) {
      state.isPlaying = action.payload
    },
    setTime(state, action) {
      state.displayTime = format(action.payload)
      state.currentTime = action.payload
    },
    setVideoDuration(state, action) {
      state.currentVideoDuration = action.payload
      state.displayDuration = format(action.payload)
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
