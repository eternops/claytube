import { describe, it, expect } from "vitest";
import { parseConfig } from "./config.js";

describe("parseConfig", () => {
  it("should load a valid config", () => {
    const yaml = `
site:
  title: My Hub
channels:
  - https://www.youtube.com/@cable8mm
`;
    const config = parseConfig(yaml);
    expect(config.site.title).toBe("My Hub");
    expect(config.channels).toContain("https://www.youtube.com/@cable8mm");
  });

  it("should throw error on missing channels", () => {
    const yaml = `
site:
  title: My Hub
channels: []
`;
    expect(() => parseConfig(yaml)).toThrow("Missing channels");
  });

  it("should throw error on invalid channel URL", () => {
    const yaml = `
site:
  title: My Hub
channels:
  - https://not-youtube.com/user
`;
    expect(() => parseConfig(yaml)).toThrow("Invalid channel URL");
  });
});
