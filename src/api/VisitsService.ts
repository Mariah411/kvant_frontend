import axios from "axios";
import { IVisit } from "../models/IVisit";
import { ReqConfig } from "../http";

export class VisitsService {
  static async updateVisit(data: IVisit) {
    return await axios.put(`/visits/`, data, ReqConfig());
  }

  static async createVisit(visit: IVisit) {
    try {
      const response = await axios.post<IVisit[]>(
        "/visits/",
        visit,
        ReqConfig()
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  static async deleteVisit(
    id_student: number | string,
    visit_date: Date | string
  ) {
    //console.log(data);
    return await axios.delete(`/visits/${id_student}/${visit_date}`);
  }
}
