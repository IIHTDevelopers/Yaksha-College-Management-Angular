import { Department } from "./department";

describe("Department", () => {
  describe("business", () => {
    it("should create a department instance", () => {
      const department: Department = new Department();
      expect(department).toBeTruthy();
    });

    it("should initialize properties correctly", () => {
      const department: Department = new Department();
      expect(department.id).toBeUndefined();
      expect(department.name).toBeUndefined();
    });

    it("should set properties correctly", () => {
      const department: Department = new Department();
      department.id = 1;
      department.name = "Department 1";

      expect(department.id).toBe(1);
      expect(department.name).toBe("Department 1");
    });
  });
});
