import axios from "axios";
import { IVisit } from "../models/IVisit";
import { ReqConfig } from "../http";

export class VisitsService {
  static async updateVisit(data: IVisit) {
    return await axios.put(`/visits/`, data, ReqConfig());
  }
}
