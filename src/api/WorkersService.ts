import { ITeacher } from "./../models/IUser";
import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";

export class WorkersService {
  static async getTeachers(): Promise<AxiosResponse<ITeacher[]>> {
    const response = await axios.get<ITeacher[]>(
      "editor/teachers/",
      ReqConfig()
    );
    // console.log(response.data);
    return response;
  }
}
