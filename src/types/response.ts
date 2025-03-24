import { AxiosResponse } from "axios";

//note: AXIOS RESPONSE INTERFACES
export type IApiResponse<T, D = any> = AxiosResponse<IDataResponse<T>, D>;

export interface IDataResponse<T> {
  data: T;
  message: string;
}

export type IApiPaginateReponse<T, E = any> = AxiosResponse<
  IPaginateDataResponse<T>,
  E
>;

export interface IPaginateDataResponse<T> {
  data: T[];
  metadata: IMetadataResponse;
  message: string;
}

export interface IMetadataResponse {
  total: number;
  page: number;
  pages: number;
  size: number;
}
