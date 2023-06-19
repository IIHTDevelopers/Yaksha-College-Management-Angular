import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StudentService } from "./student.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Student } from "../models/student";

describe("StudentService", () => {
  let service: StudentService;
  let httpMock: HttpTestingController;
  const baseUrl = "http://localhost:8081/collegemanagement/students";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [HttpClientModule, StudentService],
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("functional", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should retrieve all students", () => {
      const students: Student[] = [
        { id: 1, name: "John Doe", department: { id: 1, name: "CS" } },
        { id: 2, name: "Jane Smith", department: { id: 1, name: "CS" } },
      ];

      service.getAllStudents().subscribe((response) => {
        expect(response).toEqual(students);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe("GET");
      req.flush(students);
    });

    it("should retrieve a student by ID", () => {
      const studentId = 1;
      const student: Student = {
        id: studentId,
        name: "Department 1",
        department: {
          id: 1,
          name: "CS",
        },
      };

      service.getStudentById(studentId).subscribe((data) => {
        expect(data).toEqual(student);
      });

      const req = httpMock.expectOne(baseUrl + "/" + studentId);
      expect(req.request.method).toBe("GET");
      req.flush(student);
    });

    it("should create a new student", () => {
      const newStudent: Student = {
        name: "John Doe",
        department: { id: 1, name: "CS" },
        id: 0,
      };
      const createdStudent: Student = { id: 1, ...newStudent };

      service.createStudent(newStudent).subscribe((response) => {
        expect(response).toEqual(createdStudent);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe("POST");
      req.flush(createdStudent);
    });

    it("should update an existing student", () => {
      const updatedStudent: Student = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "CS" },
      };

      service.updateStudent(updatedStudent).subscribe((response) => {
        expect(response).toEqual(updatedStudent);
      });

      const req = httpMock.expectOne(baseUrl + `/${updatedStudent.id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(updatedStudent);
    });

    it("should delete an existing student", () => {
      const studentId = 1;

      service.deleteStudent(studentId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(baseUrl + `/${studentId}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null);
    });

    it("should search for students", () => {
      const searchTerm = "John";
      const searchResults: Student[] = [
        { id: 1, name: "John Doe", department: { id: 1, name: "CS" } },
        { id: 2, name: "Johnny Johnson", department: { id: 1, name: "CS" } },
      ];

      service.searchStudents(searchTerm).subscribe((response) => {
        expect(response).toEqual(searchResults);
      });

      const req = httpMock.expectOne(baseUrl + `/search?name=${searchTerm}`);
      expect(req.request.method).toBe("GET");
      req.flush(searchResults);
    });
  });
});
