import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ManagerEntryType } from '../types'

type InitialManagerType = {
  files: ManagerEntryType[]
  folders: ManagerEntryType[]
  newDirectory: string
  separator: null | string
  currentDirectory: null | string
}

const initialMangerState: InitialManagerType = {
  files: [],
  folders: [],
  newDirectory: null,
  currentDirectory: '/',
  separator: null,
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
    },
    setSeparator(state, action) {
      state.separator = action.payload
    },
  },
})

const store = configureStore({
  reducer: { manager: managerSlice.reducer },
})

export const managerActions = managerSlice.actions

export default store
export type RootState = ReturnType<typeof store.getState>
