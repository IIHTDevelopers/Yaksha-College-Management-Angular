import { Component, OnInit } from "@angular/core";
import { Department } from "./models/department";
import { Student } from "../student/models/student";
import { Teacher } from "../teacher/models/teacher";
import { DepartmentService } from "./services/department.service";
import { StudentService } from "../student/services/student.service";
import { TeacherService } from "../teacher/services/teacher.service";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  selectedDepartment: Department | null;
  students: Student[];
  teachers: Teacher[];
  searchName: string;
  newDepartment: Department = {
    id: 0,
    name: "",
  };
  editForm: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.editForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
    });
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      },
      (error) => {
        console.log("Error occurred while loading departments: ", error);
      }
    );
  }

  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  viewDepartment(department: Department): void {
    this.selectedDepartment = department;
    this.students = null;
    this.teachers = null;
  }

  listStudents(): void {
    if (this.selectedDepartment) {
      this.studentService.getAllStudents().subscribe((students) => {
        // this.selectedDepartment.id
        this.students = students;
      });
    }
  }

  saveDepartment(): void {
    if (this.newDepartment.id === 0) {
      this.departmentService
        .createDepartment(this.newDepartment)
        .subscribe((department) => {
          this.departments.push(department);
          this.clearForm();
        });
    } else {
      this.departmentService
        .updateDepartment(this.newDepartment.id, this.newDepartment)
        .subscribe((department) => {
          console.log("Department updated:", department);
          const index = this.departments.findIndex(
            (d) => d.id === department.id
          );
          if (index !== -1) {
            this.departments[index] = department;
          }
          this.clearForm();
        });
    }
  }

  listTeachers(): void {
    if (this.selectedDepartment) {
      this.teacherService.getAllTeachers().subscribe((teachers) => {
        let filteredTeachers = teachers.filter((teacher) => {
          return teacher.department.id === this.selectedDepartment.id * 1;
        });
        this.teachers = filteredTeachers;
      });
    }
  }

  editDepartment(department: Department): void {
    this.newDepartment = { ...department };
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.departments = this.departments.filter(
        (department) => department.id !== id
      );
    });
  }

  searchDepartment(): void {
    if (this.searchName) {
      this.departmentService
        .searchDepartmentsByName(this.searchName)
        .subscribe((departments) => {
          this.departments = departments;
        });
    }
  }

  clearForm(): void {
    this.newDepartment = {
      id: 0,
      name: "",
    };
  }

  clearSearch(): void {
    this.searchName = "";
    this.getDepartments();
  }

  getDepartmentById(departmentId: number): void {
    this.departmentService
      .getDepartmentById(departmentId)
      .subscribe((department: any) => {
        this.selectedDepartment = department;
      });
  }
}
