(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
    return;
  }
  root.Filters = root.Filters || {};
  Object.assign(root.Filters, factory());
})(typeof window !== "undefined" ? window : globalThis, function () {
  function grayscalePixels(data) {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    return data;
  }

  function invertPixels(data) {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return data;
  }

  return { grayscalePixels, invertPixels };
});
