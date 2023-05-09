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

  static async getTeachersAttendance(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/attendance/teachers`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getKvantumsAttendance(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/attendance/Kvantums`,
      { start_date, end_date },
      ReqConfig()
    );
  }
}
