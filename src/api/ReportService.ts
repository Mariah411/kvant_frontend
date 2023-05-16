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
      `/reports/attendance/kvantums`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getGroupsAchievements(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/achievements/groups`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getTeachersAchievements(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/achievements/teachers`,
      { start_date, end_date },
      ReqConfig()
    );
  }

  static async getKvantumsAchievements(
    start_date: Date | string,
    end_date: Date | string
  ) {
    return await axios.post(
      `/reports/achievements/kvantums`,
      { start_date, end_date },
      ReqConfig()
    );
  }
}
