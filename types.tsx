export type ManagerProps = {
  separator: string
  startDirectory: string
}
export type IndexProps = {
  separator: string
  startDirectory: string
}
export type ManagerEntryType = {
  name: string
}
export type FolderWrapType = {
  folder: ManagerEntryType
  onOpen: (folder: string) => void
}
export type FolderTitleType = {
  folder: ManagerEntryType
}
export type FileTitleType = {
  file: ManagerEntryType
}
export type FileWrapType = {
  file: ManagerEntryType
  cursor: string
  onOpen: (file: string) => void
}
export type TimestampType = {
  description: string
  title: string
  fileName: string
  id: string
  time: number
}
export type FetchTimestampsType = {
  onEditTimestampOpen: (timestamp: TimestampType) => void
  scrollEndTrigger: boolean
}
