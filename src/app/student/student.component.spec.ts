import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StudentComponent } from "./student.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentService } from "../student/services/student.service";
import { of } from "rxjs";
import { Student } from "../student/models/student";

describe("StudentComponent", () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let studentService: StudentService;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [StudentService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    studentService = TestBed.inject(StudentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("boundary", () => {
    it("should create the student component", () => {
      expect(component).toBeTruthy();
    });

    it("should add a new student to the students array when createStudent is called", waitForAsync(() => {
      const initialStudentsLength = component.students.length;
      const newStudent = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "Department 1" },
      };

      component.studentForm.patchValue({
        name: "John Doe",
        department: { id: 1, name: "Department 1" },
      });
      component.createStudent();

      setTimeout(() => {
        expect(component.students.length).toBe(initialStudentsLength + 1);
        expect(component.students[initialStudentsLength]).toEqual(newStudent);
      }, 2000);
    }));

    it("should get a student by id when getStudentById is called", () => {
      const studentId = 1;
      const student = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "Department 1" },
      };

      component.getStudentById(studentId);

      setTimeout(() => {
        expect(component.selectedStudent).toEqual(student);
      }, 2000);
    });

    it("should update the selected student when updateStudent is called", () => {
      const updatedStudent = {
        id: 1,
        name: "John Smith",
        department: { id: 2, name: "Department 2" },
      };

      component.studentForm.patchValue({
        id: 1,
        name: "John Smith",
        department: { id: 2, name: "Department 2" },
      });
      component.selectedStudent = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "Department 1" },
      };
      component.updateStudent();

      setTimeout(() => {
        expect(component.students[0]).toEqual(updatedStudent);
      }, 2000);
    });

    it("should delete the selected student when deleteStudent is called", () => {
      const studentId = 1;

      component.selectedStudent = {
        id: 1,
        name: "John Doe",
        department: { id: 1, name: "Department 1" },
      };
      component.deleteStudent(component.selectedStudent);

      setTimeout(() => {
        expect(component.students.length).toBe(0);
        expect(component.selectedStudent).toBeNull();
      }, 2000);
    });

    it("should search for students when searchStudents is called", () => {
      const searchName = "John";
      const matchingStudents = [
        {
          id: 1,
          name: "John Doe",
          department: { id: 1, name: "Department 1" },
        },
        {
          id: 2,
          name: "John Smith",
          department: { id: 2, name: "Department 2" },
        },
      ];

      component.searchForm.patchValue({ searchName });
      component.searchStudents();
      setTimeout(() => {
        expect(component.students).toEqual(matchingStudents);
      }, 2000);
    });
  });
});
