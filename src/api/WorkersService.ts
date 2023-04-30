import { ITeacher, IUser, IUserRegistration } from "./../models/IUser";
import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import jwt_decode from "jwt-decode";

export class WorkersService {
  static async getTeachers(): Promise<AxiosResponse<ITeacher[]>> {
    const response = await axios.get<ITeacher[]>(
      "editor/teachers/",
      ReqConfig()
    );
    // console.log(response.data);
    return response;
  }

  static async getWorkers(): Promise<AxiosResponse<IUser[]>> {
    const response = await axios.get<IUser[]>("/workers/", ReqConfig());
    return response;
  }

  static async registration(
    FIO: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<{ token: string }>> {
    const response = await axios.post<{ token: string }>("auth/registration", {
      FIO,
      email,
      password,
    });
    return response;
  }

  static async deleteWorker(id: number | string) {
    return await axios.delete(`workers/${id}`, ReqConfig());
  }

  static async createWorker(data: {
    FIO: string;
    email: string;
    password: string;
    roles: any[];
  }) {
    const { FIO, email, password, roles } = data;
    try {
      const { data } = await this.registration(FIO, email, password);

      const worker: IUser = jwt_decode(data.token);

      console.log(worker);

      for (let role of roles) {
        const response = await axios.post(
          "workers/roles/",
          { id: worker.id, value: role },
          ReqConfig()
        );
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateWorker(id: number | string, data: IUser) {
    return await axios.put(`workers/${id}`, data, ReqConfig());
  }
}
