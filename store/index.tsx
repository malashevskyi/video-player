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
}

const initialMangerState: InitialManagerType = {
  files: [],
  folders: [],
  newDirectory: null,
  startDirectory: null,
  currentDirectory: null,
  separator: null,
  isRoot: true,
}

const managerSlice = createSlice({
  name: 'Manager',
  initialState: initialMangerState,
  reducers: {
    setFolders(state, action) {
      state.folders = action.payload
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
}

const initialVideoModalState: InitialVideoModalType = {
  videoPopupIsOpen: false,
}

const videoModalSlice = createSlice({
  name: 'Video Modal',
  initialState: initialVideoModalState,
  reducers: {
    startWatchingVideo(state, action) {
      state.videoPopupIsOpen = true
    },
    closeVideoPopup(state) {
      state.videoPopupIsOpen = false
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
