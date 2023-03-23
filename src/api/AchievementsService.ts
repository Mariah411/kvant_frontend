import { IAchievement } from "./../models/IAchievement";
import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";

export class AchievementService {
  static async getStudentAchievements(
    id: number | string
  ): Promise<AxiosResponse<IAchievement[]>> {
    const response = await axios.get<IAchievement[]>(
      `/editor/achievement/student/${id}/`,
      ReqConfig()
    );
    //console.log(response.data);
    return response;
  }
}
