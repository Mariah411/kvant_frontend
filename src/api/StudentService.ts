import { IStudent, StudentsWithGroups } from "./../models/IStudent";
import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";

export class StudentService {
  static async getStutentsWithGroup(): Promise<
    AxiosResponse<StudentsWithGroups[]>
  > {
    const response = await axios.get<StudentsWithGroups[]>(
      "editor/students/",
      ReqConfig()
    );
    //console.log(response.data);
    return response;
  }

  static async createSudent(student: IStudent) {
    try {
      const response = await axios.post<StudentsWithGroups[]>(
        "students/",
        student,
        ReqConfig()
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  static async deleteStudent(id: number) {
    return await axios.delete(`students/${id}`, ReqConfig());
  }
}
