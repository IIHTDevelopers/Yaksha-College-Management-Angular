import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Teacher } from "../models/teacher";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  private baseUrl = "http://localhost:8081/collegemanagement/teachers";

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    const teacherData = {
      name: teacher.name,
      departmentId: teacher.department.id,
    };
    return this.http.post<Teacher>(this.baseUrl, teacherData);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    const url = `${this.baseUrl}/${teacher.id}`;
    const TeacherData = {
      name: teacher.name,
      departmentId: teacher.department.id,
    };

    return this.http.put<Teacher>(url, TeacherData);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchTeachersByName(name: string): Observable<Teacher[]> {
    const params = new HttpParams().set("name", name);
    return this.http.get<Teacher[]>(`${this.baseUrl}/search`, { params });
  }
}
