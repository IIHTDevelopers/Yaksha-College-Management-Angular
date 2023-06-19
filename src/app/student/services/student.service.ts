import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../models/student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private baseUrl = "http://localhost:8081/collegemanagement/students";

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    const studentData = {
      name: student.name,
      departmentId: student.department.id,
    };

    return this.http.post<Student>(this.baseUrl, studentData);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.baseUrl}/${student.id}`;
    const studentData = {
      name: student.name,
      departmentId: student.department.id,
    };

    return this.http.put<Student>(url, studentData);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchStudents(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search?name=${name}`);
  }
}
