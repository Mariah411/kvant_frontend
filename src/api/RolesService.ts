import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { IRole } from "../models/IRole";

export class RolesService {
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    const response = await axios.get<IRole[]>("roles/", ReqConfig());
    return response;
  }
}
