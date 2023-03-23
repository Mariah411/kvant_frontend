import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import {
  GroupsAllInfo,
  GroupsWithKvantumsAndTeachers,
  IGroup,
} from "./../models/IGroup";

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
}
