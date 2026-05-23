import { describe, it, expect } from "vitest";
import { parseChannelReference, normalizeChannelUrl } from "./client.js";

describe("YouTube URL Normalization", () => {
  it("should normalize @handle input", () => {
    expect(normalizeChannelUrl("@TED")).toBe("https://www.youtube.com/@TED");
  });

  it("should normalize youtube.com domain input", () => {
    expect(normalizeChannelUrl("youtube.com/@TED")).toBe(
      "https://youtube.com/@TED",
    );
  });

  it("should parse @handle references", () => {
    expect(parseChannelReference("@TED")).toEqual({
      kind: "handle",
      value: "@TED",
    });
    expect(parseChannelReference("https://www.youtube.com/@TED")).toEqual({
      kind: "handle",
      value: "@TED",
    });
  });

  it("should parse /channel/ ID references", () => {
    const url = "https://www.youtube.com/channel/UC1234567890";
    expect(parseChannelReference(url)).toEqual({
      kind: "id",
      value: "UC1234567890",
    });
  });

  it("should parse /c/ custom URL references", () => {
    expect(parseChannelReference("https://www.youtube.com/c/TED")).toEqual({
      kind: "query",
      value: "TED",
    });
  });

  it("should parse /user/ username references", () => {
    expect(parseChannelReference("https://www.youtube.com/user/TED")).toEqual({
      kind: "username",
      value: "TED",
    });
  });

  it("should parse legacy direct paths as query", () => {
    expect(parseChannelReference("https://youtube.com/TED")).toEqual({
      kind: "query",
      value: "TED",
    });
  });

  it("should throw for invalid or reserved URLs", () => {
    expect(() =>
      parseChannelReference("https://youtube.com/watch?v=123"),
    ).toThrow();
  });
});
