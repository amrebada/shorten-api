import Controller from "../src/controllers/url.controlller";
import config from "../src/config";
const controller = new Controller();

describe("URL shortening ", () => {
  test("should throw error when pass without url", () => {
    expect(controller.createNewShortURL("")).rejects.toMatch(
      "some parameters is not passed"
    );
  });

  test("should generate 8 characters shorten string", () => {
    expect(controller.generateShortURL()).toHaveLength(8);
  });

  test("should generate 8 alphanumeric shorten string", () => {
    expect(controller.generateShortURL()).toMatch(/[a-zA-Z0-9]{8}/);
  });

  test("should return a correct url format", () => {
    expect(controller.formateShortURL("123qweRT")).toBe("https:///123qweRT");
  });
});
