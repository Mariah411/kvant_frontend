import axios from "axios";
import { ReqConfig } from "../http";

export class ReportService {
  static async getGroupsAttendance(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/attendance/groups`,
      { start_date, end_date },
      ReqConfig()
    );
  }
}
