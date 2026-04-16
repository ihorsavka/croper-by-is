import { describe, expect, it } from "vitest";
import filters from "../filters.js";

const { grayscalePixels, invertPixels } = filters;

describe("filters", () => {
  it("invertPixels inverts RGB channels", () => {
    const data = new Uint8ClampedArray([0, 10, 255, 128]);
    invertPixels(data);
    expect(Array.from(data)).toEqual([255, 245, 0, 128]);
  });

  it("grayscalePixels sets RGB to average, keeps alpha", () => {
    const data = new Uint8ClampedArray([30, 60, 90, 200]);
    grayscalePixels(data);
    expect(data[0]).toBeCloseTo(60);
    expect(data[1]).toBeCloseTo(60);
    expect(data[2]).toBeCloseTo(60);
    expect(data[3]).toBe(200);
  });
});
