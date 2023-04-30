import {
  AchievementForCreate,
  IAchievement,
  IAchievementForTable,
} from "./../models/IAchievement";
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

  static async getWorkerAchievements(
    id: number | string
  ): Promise<AxiosResponse<IAchievement[]>> {
    const response = await axios.get<IAchievement[]>(
      `/editor/achievement/worker/${id}/`,
      ReqConfig()
    );
    //console.log(response.data);
    return response;
  }

  static async getAllAchivements(): Promise<AxiosResponse<IAchievement[]>> {
    const response = await axios.get<IAchievement[]>(
      `/editor/achievements/`,
      ReqConfig()
    );
    //console.log(response.data);
    return response;
  }

  static async createAchivement(
    data: AchievementForCreate,
    values: AchievementForCreate
  ) {
    const { workers, students } = values;

    console.log(data);
    try {
      const rensonse = await axios.post<IAchievement>(
        "/achievement/",
        data,
        ReqConfig()
      );

      const { id } = rensonse.data;

      // console.log(id);

      for (let w of workers) {
        await axios.post(
          "/achievement/workers/",
          {
            id_worker: w,
            id_achievement: id,
          },
          ReqConfig()
        );
      }
      for (let s of students) {
        await axios.post(
          "/achievement/students/",
          {
            id_student: s,
            id_achievement: id,
          },
          ReqConfig()
        );
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateAchievement(id: number, data: AchievementForCreate) {
    return await axios.put(`/achievement/${id}`, data, ReqConfig());
  }

  static async deleteAchievement(id: number) {
    return await axios.delete(`/achievement/${id}`, ReqConfig());
  }
}
