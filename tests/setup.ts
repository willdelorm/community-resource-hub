import "@testing-library/jest-dom";

// Radix UI components rely on ResizeObserver, which jsdom does not implement.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
