import { Component, OnInit } from "@angular/core";
import { Teacher } from "./models/teacher";
import { Department } from "../department/models/department";
import { TeacherService } from "./services/teacher.service";
import { DepartmentService } from "../department/services/department.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"],
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  filteredTeachers: Teacher[];
  searchName: string;
  newTeacher: Teacher = {
    id: 0,
    name: "",
    department: {
      id: 0,
      name: "",
    },
  };
  teacherForm: FormGroup;
  departments: Department[];

  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getDepartments();
    this.initializeForm();
  }

  initializeForm(): void {
    this.teacherForm = this.formBuilder.group({
      name: ["", Validators.required],
      department: ["", Validators.required],
    });
  }
  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
      this.filteredTeachers = teachers;
    });
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.newTeacher).subscribe((teacher) => {
      console.log("Teacher created:", teacher);
      // Clear the form after successful creation
      this.newTeacher = {
        id: 0,
        name: "",
        department: {
          id: 0,
          name: "",
        },
      };
      // Refresh the teacher list
      this.getTeachers();
    });
  }

  editTeacher(teacher: Teacher): void {
    this.selectedTeacher = { ...teacher };
  }

  updateTeacher(): void {
    if (this.selectedTeacher) {
      this.teacherService
        .updateTeacher(this.selectedTeacher.id, this.selectedTeacher)
        .subscribe((updatedTeacher) => {
          this.selectedTeacher = null;
          this.getTeachers();
        });
    }
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      console.log("Teacher deleted:", id);
      // Remove the deleted teacher from the array
      this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
    });
  }

  searchTeacher(): void {
    this.teacherService
      .searchTeachersByName(this.searchName)
      .subscribe((teachers) => (this.teachers = teachers));
  }
}
