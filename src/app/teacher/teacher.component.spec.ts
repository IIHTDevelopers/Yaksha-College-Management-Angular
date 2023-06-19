import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TeacherComponent } from "./teacher.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import { TeacherService } from "./services/teacher.service";
import { of } from "rxjs";
// import { spy } from "jest-mock";

describe("TeacherComponent", () => {
  let component: TeacherComponent;
  let fixture: ComponentFixture<TeacherComponent>;
  let teacherService: TeacherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [HttpClientModule, TeacherService],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherComponent);
    component = fixture.componentInstance;
    component.teacherForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
    });
    teacherService = TestBed.inject(TeacherService);
    fixture.detectChanges();
  });

  describe("boundary", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should have required fields in the form", () => {
      const formElement = fixture.nativeElement.querySelector("form");
      expect(formElement).toBeTruthy();

      const nameInput = formElement.querySelector('input[name="createName"]');
      expect(nameInput).toBeTruthy();
      expect(nameInput.required).toBe(true);

      const departmentIdInput = formElement.querySelector(
        'select[name="createDepartment"]'
      );
      expect(departmentIdInput).toBeTruthy();
      expect(departmentIdInput.required).toBe(true);
    });

    it("should display validation errors for invalid input", () => {
      const formElement = fixture.nativeElement.querySelector("form");
      expect(formElement).toBeTruthy();

      const nameInput = formElement.querySelector('input[name="createName"]');
      nameInput.value = "";
      nameInput.dispatchEvent(new Event("input"));
      fixture.detectChanges();
      expect(nameInput.classList).toContain("ng-invalid");
      expect(formElement.textContent).toContain("Name is required");
    });

    it("should reset the form fields on cancel", () => {
      const formElement = fixture.nativeElement.querySelector("form");
      const nameInput = formElement.querySelector('input[name="createName"]');

      component.newTeacher = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "CS" },
      };
      fixture.detectChanges();
      expect(nameInput.value).toBe("");
      fixture.detectChanges();
      expect(nameInput.value).toBe("");
    });

    it("should call createTeacher() method when form is submitted for a new teacher", () => {
      const formElement = fixture.nativeElement.querySelector("form");
      jest.spyOn(component, "createTeacher");
      formElement.dispatchEvent(new Event("submit"));
      fixture.detectChanges();
      expect(component.createTeacher).toHaveBeenCalled();
    });
  });
});
