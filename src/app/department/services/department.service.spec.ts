import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { DepartmentService } from "./department.service";
import { Department } from "../models/department";

describe("DepartmentService", () => {
  let departmentService: DepartmentService;
  let httpTestingController: HttpTestingController;
  const baseUrl = "http://localhost:8081/collegemanagement/departments";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService],
    });
    departmentService = TestBed.inject(DepartmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe("functional", () => {
    it("should be created", () => {
      expect(departmentService).toBeTruthy();
    });

    it("should retrieve all departments", () => {
      const departments: Department[] = [
        { id: 1, name: "Department 1" },
        { id: 2, name: "Department 2" },
      ];

      departmentService.getAllDepartments().subscribe((data) => {
        expect(data).toEqual(departments);
      });

      const req = httpTestingController.expectOne(baseUrl);
      expect(req.request.method).toBe("GET");
      req.flush(departments);
    });

    it("should create a new department", () => {
      const newDepartment: Department = {
        name: "Department 1",
        id: 0,
      };

      departmentService.createDepartment(newDepartment).subscribe((data) => {
        expect(data).toEqual(newDepartment);
      });

      const req = httpTestingController.expectOne(baseUrl);
      expect(req.request.method).toBe("POST");
      req.flush(newDepartment);
    });

    it("should update an existing department", () => {
      const departmentId = 1;
      const updatedDepartment: Department = {
        id: departmentId,
        name: "Updated Department",
      };

      departmentService
        .updateDepartment(departmentId, updatedDepartment)
        .subscribe((data) => {
          expect(data).toEqual(updatedDepartment);
        });

      const req = httpTestingController.expectOne(baseUrl + "/" + departmentId);
      expect(req.request.method).toBe("PUT");
      req.flush(updatedDepartment);
    });

    it("should delete a department", () => {
      const departmentId = 1;

      departmentService.deleteDepartment(departmentId).subscribe((data) => {
        expect(data).toBe(departmentId);
      });

      const req = httpTestingController.expectOne(baseUrl + "/" + departmentId);
      expect(req.request.method).toBe("DELETE");
      req.flush(departmentId);
    });

    it("should retrieve a department by ID", () => {
      const departmentId = 1;
      const department: Department = {
        id: departmentId,
        name: "Department 1",
      };

      departmentService.getDepartmentById(departmentId).subscribe((data) => {
        expect(data).toEqual(department);
      });

      const req = httpTestingController.expectOne(baseUrl + "/" + departmentId);
      expect(req.request.method).toBe("GET");
      req.flush(department);
    });

    it("should search departments by name", () => {
      const departments: Department[] = [
        { id: 1, name: "Department 1" },
        { id: 2, name: "Department 2" },
        { id: 3, name: "Department 3" },
      ];
      const searchTerm = "Department";

      departmentService
        .searchDepartmentsByName(searchTerm)
        .subscribe((data) => {
          expect(data).toEqual([departments[0]]);
        });

      const req = httpTestingController.expectOne(
        baseUrl + "/search?name=" + searchTerm
      );
      expect(req.request.method).toBe("GET");
      req.flush([departments[0]]);
    });
  });
});
