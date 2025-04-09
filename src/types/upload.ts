//note: FILES UPLOAD INTERFACES
export interface IUploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  extension: string;
  url: string;
}
