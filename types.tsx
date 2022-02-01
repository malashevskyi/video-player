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
