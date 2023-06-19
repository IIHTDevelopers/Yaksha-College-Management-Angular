import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TeacherService } from "./teacher.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Teacher } from "../models/teacher";

describe("TeacherService", () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;
  const baseUrl = "http://localhost:8081/collegemanagement/teachers";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [HttpClientModule, TeacherService],
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("functional", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should retrieve all teachers", () => {
      const teachers: Teacher[] = [
        {
          id: 1,
          name: "John Doe",
          department: { id: 1, name: "CS" },
        },
        {
          id: 2,
          name: "Jane Smith",
          department: { id: 1, name: "CS" },
        },
      ];

      service.getAllTeachers().subscribe((response) => {
        expect(response).toEqual(teachers);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe("GET");
      req.flush(teachers);
    });

    it("should create a new teacher", () => {
      const newTeacher: Teacher = {
        name: "John Doe",
        department: { id: 1, name: "CS" },
        id: 0,
      };
      const createdTeacher: Teacher = { id: 1, ...newTeacher };

      service.createTeacher(newTeacher).subscribe((response) => {
        expect(response).toEqual(createdTeacher);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe("POST");
      req.flush(createdTeacher);
    });

    it("should update an existing teacher", () => {
      const updatedTeacher: Teacher = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "CS" },
      };

      service
        .updateTeacher(updatedTeacher.id, updatedTeacher)
        .subscribe((response) => {
          expect(response).toEqual(updatedTeacher);
        });

      const req = httpMock.expectOne(baseUrl + `/${updatedTeacher.id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(updatedTeacher);
    });

    it("should delete an existing teacher", () => {
      const teacherId = 1;

      service.deleteTeacher(teacherId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(baseUrl + `/${teacherId}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null);
    });

    it("should search for teachers", () => {
      const searchTerm = "John";
      const searchResults: Teacher[] = [
        {
          id: 1,
          name: "John Doe",
          department: { id: 1, name: "CS" },
        },
        {
          id: 2,
          name: "Johnny Johnson",
          department: { id: 1, name: "CS" },
        },
      ];

      service.searchTeachersByName(searchTerm).subscribe((response) => {
        expect(response).toEqual(searchResults);
      });

      const req = httpMock.expectOne(baseUrl + `/search?name=${searchTerm}`);
      expect(req.request.method).toBe("GET");
      req.flush(searchResults);
    });
  });
});
