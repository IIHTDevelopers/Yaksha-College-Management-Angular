import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from "./models/student";
import { Department } from "../department/models/department";
import { StudentService } from "./services/student.service";
import { DepartmentService } from "../department/services/department.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  departments: Department[] = [];
  selectedStudent: Student | undefined;
  studentForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private departmentService: DepartmentService
  ) {
    this.studentForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      department: [null, Validators.required],
    });

    this.searchForm = this.fb.group({
      searchName: [""],
    });
  }

  ngOnInit(): void {
    this.getStudents();
    this.getDepartments();
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
    this.searchForm.reset();
  }

  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
    this.searchForm.reset();
  }

  createStudent(): void {
    if (this.studentForm.valid) {
      const newStudent: Student = {
        id: this.students.length + 1,
        name: this.studentForm.value.name,
        department: {
          id: this.studentForm.value.department,
          name: "",
        },
      };
      this.studentService.createStudent(newStudent).subscribe(() => {
        this.getStudents();
        this.studentForm.reset();
      });
      this.clearForm();
    }
  }

  updateStudent(): void {
    if (this.studentForm.invalid || !this.selectedStudent) {
      return;
    }

    const updatedStudent: Student = {
      id: this.selectedStudent.id,
      name: this.studentForm.value.name,
      department: this.studentForm.value.department,
    };

    this.studentService.updateStudent(updatedStudent).subscribe(() => {
      this.getStudents();
      this.studentForm.reset();
      this.selectedStudent = null;
    });

    this.clearForm();
  }

  getStudentById(id: number): void {
    this.studentService.getStudentById(id).subscribe((student) => {
      this.selectedStudent = student;
      this.studentForm.patchValue({
        id: student.id,
        name: student.name,
        department: student.department,
      });
    });
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student.id).subscribe(() => {
      this.getStudents();
    });
  }

  searchStudents(): void {
    const searchName = this.searchForm.value.searchName;
    if (!searchName) {
      this.getStudents();
      return;
    }

    this.studentService.searchStudents(searchName).subscribe((students) => {
      this.students = students;
    });
  }

  clearForm(): void {
    this.selectedStudent = undefined;
    this.studentForm.reset();
  }
}
