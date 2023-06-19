import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DepartmentComponent } from "./department.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DepartmentService } from "./services/department.service";
import { of } from "rxjs";
import { Department } from "./models/department";

describe("DepartmentComponent", () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;
  let departmentService: DepartmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [DepartmentComponent],
      providers: [HttpClientModule, DepartmentService],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    departmentService = TestBed.inject(DepartmentService);
    fixture.detectChanges();
  });

  describe("functional", () => {
    it("should create the DepartmentComponent", () => {
      expect(component).toBeTruthy();
    });

    it("should have a name input field", () => {
      const nameInput = fixture.nativeElement.querySelector("#name");
      expect(nameInput).toBeTruthy();
    });

    it("should validate the name field as required", () => {
      const nameInput = fixture.nativeElement.querySelector("#name");
      nameInput.value = "";
      nameInput.dispatchEvent(new Event("input"));
      fixture.detectChanges();
      const errorText = fixture.nativeElement.querySelector(".name-error");
      expect(errorText.textContent).toContain("Name is required");
    });

    it("should call createDepartment() method when creating a department", () => {
      const department: Department = {
        id: 1,
        name: "Department 1",
      };
      const createDepartmentSpy = jest
        .spyOn(departmentService, "createDepartment")
        .mockReturnValue(of(department));
      component.saveDepartment();
      expect(createDepartmentSpy).toHaveBeenCalled();
    });

    it("should call updateDepartment() method when updating a department", () => {
      const department = { id: 1, name: "Department 1" };
      const updateDepartmentSpy = jest.spyOn(component, "editDepartment");
      component.editDepartment(department);
      expect(updateDepartmentSpy).toHaveBeenCalledWith(department);
    });

    it("should call deleteDepartment() method when deleting a department", () => {
      const departmentId = 1;
      const deleteDepartmentSpy = jest
        .spyOn(departmentService, "deleteDepartment")
        .mockReturnValue(of(null));
      component.deleteDepartment(departmentId);
      expect(deleteDepartmentSpy).toHaveBeenCalledWith(departmentId);
    });

    it("should call getDepartment() method when fetching a department by ID", () => {
      const departmentId = 1;
      const department = { id: departmentId, name: "Department 1" };
      const getDepartmentSpy = jest
        .spyOn(departmentService, "getDepartmentById")
        .mockReturnValue(of(department));
      component.getDepartmentById(departmentId);
      expect(getDepartmentSpy).toHaveBeenCalledWith(departmentId);
      expect(component.selectedDepartment).toEqual(department);
    });

    it("should call searchDepartments() method when searching for departments", () => {
      const searchQuery = "department";
      const departments = [
        { id: 1, name: "Department 1" },
        { id: 2, name: "Department 2" },
      ];
      const searchDepartmentsSpy = jest
        .spyOn(departmentService, "searchDepartmentsByName")
        .mockReturnValue(of(departments));

      component.searchName = searchQuery;
      component.searchDepartment();
      expect(searchDepartmentsSpy).toHaveBeenCalledWith(searchQuery);
      expect(component.departments).toEqual(departments);
    });
  });
});
