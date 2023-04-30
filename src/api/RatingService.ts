import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { IRating } from "../models/IRating";

export class RatingService {
  static async getRatings(): Promise<AxiosResponse<IRating[]>> {
    const response = await axios.get<IRating[]>("/ratings/", ReqConfig());

    // console.log(response.data);
    return response;
  }

  static async createRating(rating: IRating) {
    try {
      const response = await axios.post<IRating>(
        "ratings/",
        rating,
        ReqConfig()
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  static async deleteRating(id: number | string) {
    return await axios.delete(`ratings/${id}`, ReqConfig());
  }

  static async updateRating(id: number, data: IRating) {
    return await axios.put(`ratings/${id}`, data, ReqConfig());
  }
}
