import { axiosInstance } from "@/axios";
import { ILoginPayload, ILoginResponse, IProfileResponse } from "@/types/auth";
import { IApiResponse } from "@/types/response";

export const authApi = {
  login: (body: ILoginPayload): Promise<IApiResponse<ILoginResponse>> =>
    axiosInstance.post("/auth/login", body),
  getProfile: (): Promise<IApiResponse<IProfileResponse>> =>
    axiosInstance.get("/auth/profile"),
};
