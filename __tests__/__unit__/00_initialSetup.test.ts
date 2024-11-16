import { AC_LABELS } from '@/constants/AccessibilityLabels';

describe("Accessibility Labels 중복 검사", () => {
  test("중복된 값이 없어야 함", () => {
    const values = Object.values(AC_LABELS);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });
});