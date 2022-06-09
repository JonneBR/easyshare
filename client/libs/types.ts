export interface IFile {
  name: string;
  sizeInBytes: number;
  format: string;
  id?: string;
}

export interface IData {
  id: string;
  message: string;
  downloadPageLink: string;
}
