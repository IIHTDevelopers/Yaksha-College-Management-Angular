import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";


describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  describe("boundary", () => {
    it("should create the app", () => {
      expect(component).toBeTruthy();
    });

    it("should render the app title", () => {
      const appTitle = fixture.nativeElement.querySelector("h1").textContent;
      expect(appTitle).toContain("College Management");
    });

    it("should have Students link", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll("a")[0].textContent).toContain(
        "Students"
      );
    });

    it("should have /students routerLink on Student anchor tag", () => {
      const anchorElement: HTMLAnchorElement =
        fixture.nativeElement.querySelectorAll("a")[0];
      expect(anchorElement.getAttribute("routerLink")).toBe("/students");
    });

    it("should have /teachers routerLink on Teacher anchor tag", () => {
      const anchorElement: HTMLAnchorElement =
        fixture.nativeElement.querySelectorAll("a")[1];
      expect(anchorElement.getAttribute("routerLink")).toBe("/teachers");
    });

    it("should have /departments routerLink on Department anchor tag", () => {
      const anchorElement: HTMLAnchorElement =
        fixture.nativeElement.querySelectorAll("a")[2];
      expect(anchorElement.getAttribute("routerLink")).toBe("/departments");
    });

    it("should have Teachers link", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll("a")[1].textContent).toContain(
        "Teachers"
      );
    });

    it("should have Departments link", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll("a")[2].textContent).toContain(
        "Departments"
      );
    });
  });
});
