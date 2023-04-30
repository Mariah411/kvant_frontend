export interface IVisit {
  id_student: number;
  id_type: number;
  visit_date: Date;
  is_visited: boolean;
  points?: number;
}
