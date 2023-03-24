import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { Ikvantum } from "./../models/IKvamtum";
export class KvantumsService {
  static async getKvantums(): Promise<AxiosResponse<Ikvantum[]>> {
    const response = await axios.get<Ikvantum[]>("kvantums/", ReqConfig());

    // console.log(response.data);
    return response;
  }

  static async createKvantum(kvantum: Ikvantum) {
    try {
      const response = await axios.post<Ikvantum>(
        "kvantums/",
        kvantum,
        ReqConfig()
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  static async deleteKvantum(id: number | string) {
    return await axios.delete(`kvantums/${id}`, ReqConfig());
  }

  static async updateKvantum(id: number, data: Ikvantum) {
    return await axios.put(`kvantums/${id}`, data, ReqConfig());
  }
}
