import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { Ikvantum } from "./../models/IKvamtum";
export class KvantumsService {
  static async getKvantums(): Promise<AxiosResponse<Ikvantum[]>> {
    const response = await axios.get<Ikvantum[]>("kvantums/", ReqConfig());

    // console.log(response.data);
    return response;
  }
}
