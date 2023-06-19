import { Student } from "./student";

describe("Student", () => {
  describe("exception", () => {
    it("should create an instance", () => {
      expect(new Student()).toBeTruthy();
    });

    it("should create a new instance", () => {
      const student = new Student();
      expect(student).toBeTruthy();
    });

    it("should have all properties set correctly", () => {
      const student = new Student();
      student.id = 1;
      student.name = "John Doe";

      expect(student.id).toEqual(1);
      expect(student.name).toEqual("John Doe");
    });
  });
});
