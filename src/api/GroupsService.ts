import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import {
  GroupsAllInfo,
  GroupsWithKvantumsAndTeachers,
  IGroup,
} from "./../models/IGroup";
import { StudentWithRating, StudentWithVisits } from "../models/IStudent";

export class GroupsService {
  static async getGroups(): Promise<AxiosResponse<IGroup[]>> {
    const response = await axios.get<IGroup[]>("groups/", ReqConfig());

    // console.log(response.data);
    return response;
  }

  static async getGroupsWithKvantumsAndTeachers(): Promise<
    AxiosResponse<GroupsWithKvantumsAndTeachers[]>
  > {
    const response = await axios.get<GroupsWithKvantumsAndTeachers[]>(
      "editor/groups/",
      ReqConfig()
    );

    // console.log(response.data);
    return response;
  }

  static async createGroup(group: IGroup) {
    try {
      const response = await axios.post<GroupsWithKvantumsAndTeachers[]>(
        "groups/",
        group,
        ReqConfig()
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateGroup(id: number, data: IGroup) {
    return await axios.put(`groups/${id}`, data, ReqConfig());
  }

  static async deleteGroup(id: number) {
    return await axios.delete(`groups/${id}`, ReqConfig());
  }

  static async getGroupInfo(
    id: number | string
  ): Promise<AxiosResponse<GroupsAllInfo>> {
    return await axios.get<GroupsAllInfo>(`/groups/${id}`, ReqConfig());
  }

  static async getWorkerGroups(
    id: number | string
  ): Promise<AxiosResponse<IGroup[]>> {
    return await axios.get<IGroup[]>(`/groups/worker/${id}`, ReqConfig());
  }

  static async getGroupsVisits(
    id: number | string,
    start_date: Date | string,
    end_date: Date | string
  ): Promise<AxiosResponse<StudentWithVisits[]>> {
    return await axios.post<StudentWithVisits[]>(
      `/groups/${id}/visits`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getGroupsAttestation(
    id: number | string,
    start_date: Date | string,
    end_date: Date | string
  ): Promise<AxiosResponse<StudentWithVisits[]>> {
    return await axios.post<StudentWithVisits[]>(
      `/groups/${id}/attestation`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getGroupRating(
    id: number | string,
    start_date: Date | string,
    end_date: Date | string
  ): Promise<AxiosResponse<StudentWithRating[]>> {
    return await axios.post<StudentWithRating[]>(
      `/reports/raiting/group/${id}`,
      { start_date, end_date },
      ReqConfig()
    );
  }
}
