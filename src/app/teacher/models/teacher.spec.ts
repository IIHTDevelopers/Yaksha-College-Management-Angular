import { Teacher } from "./teacher";

describe("Teacher", () => {
  describe("exception", () => {
    it("should create a new instance", () => {
      const teacher = new Teacher();
      expect(teacher).toBeTruthy();
    });

    it("should have all properties set correctly", () => {
      const teacher = new Teacher();
      teacher.id = 1;
      teacher.name = "Jane Smith";

      expect(teacher.id).toEqual(1);
      expect(teacher.name).toEqual("Jane Smith");
    });
  });
});
