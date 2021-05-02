require("regenerator-runtime/runtime");
const { iSet } = require("../iSet");

describe("iSet", () => {
  test("initialize with set or iterable", () => {
    expect(String(iSet(new Set([1, 2, 3])))).toBe("iSet(3) <1,2,3>");
    expect(String(iSet([1, 2, 3]))).toBe("iSet(3) <1,2,3>");
  });

  test("#add", () => {
    const s = iSet([1, 2, 3]);

    expect(s.add(4)).toStrictEqual(iSet([1, 2, 3, 4]));
    expect(s.add(3, 4)).toStrictEqual(iSet([1, 2, 3, 4]));
    expect(s.add(5, 4)).toStrictEqual(iSet([1, 2, 3, 5, 4]));
  });

  test("#remove", () => {
    const s = iSet([1, 2, 3]);

    expect(s.remove(3)).toStrictEqual(iSet([1, 2]));
    expect(s.remove(2, 3)).toStrictEqual(iSet([1]));
    expect(s.remove(5)).toStrictEqual(iSet([1, 2, 3]));
  });

  test("#has", () => {
    const s = iSet([1, 2, 3]);

    expect(s.has(2)).toBeTruthy();
    expect(s.has(5)).toBeFalsy();
  });

  test("#hasEvery", () => {
    const s = iSet([1, 2, 3]);

    expect(s.hasEvery(1)).toBeTruthy();
    expect(s.hasEvery(1, 2, 3)).toBeTruthy();
    expect(s.hasEvery(1, 2, 3, 4)).toBeFalsy();
  });

  test("#hasAny", () => {
    const s = iSet([1, 2, 3]);

    expect(s.hasAny(1)).toBeTruthy();
    expect(s.hasAny(1, 2)).toBeTruthy();
    expect(s.hasAny(1, 5)).toBeTruthy();
    expect(s.hasAny(4, 5)).toBeFalsy();
  });

  test("#clear", () => {
    const s = iSet([1, 2, 3]);

    expect(s.clear()).toStrictEqual(iSet([]));
  });

  test("#map", () => {
    const s = iSet([1, 2, 3]);

    expect(s.map((v) => v + 3)).toStrictEqual(iSet([4, 5, 6]));
    expect(s.map((v) => `i${v}`)).toStrictEqual(iSet(["i1", "i2", "i3"]));
  });

  test("#filter", () => {
    const s = iSet([1, 2, 3]);

    expect(s.filter((v) => v % 2 !== 0)).toStrictEqual(iSet([1, 3]));
  });

  test("#isEmpty", () => {
    expect(iSet([]).isEmpty()).toBeTruthy();
    expect(iSet([1]).isEmpty()).toBeFalsy();
  });

  test("size", () => {
    expect(iSet([]).size).toBe(0);
    expect(iSet([1]).size).toBe(1);
    expect(iSet([1, 2, 3, 4, 5]).size).toBe(5);
  });

  test("#every", () => {
    const s = iSet([1, 2, 3]);

    expect(s.every((v) => v === 3)).toBeFalsy();
    expect(s.every((v) => v < 4)).toBeTruthy();
  });

  test("#some", () => {
    const s = iSet([1, 2, 3]);

    expect(s.some((v) => v > 3)).toBeFalsy();
    expect(s.some((v) => v === 3)).toBeTruthy();
  });

  test("#union", () => {
    expect(iSet([1, 2, 3]).union(new Set([3, 4, 5]))).toStrictEqual(
      iSet([1, 2, 3, 4, 5])
    );
    expect(iSet([1, 2, 3]).union(iSet([1, 2, 3, 4]))).toStrictEqual(
      iSet([1, 2, 3, 4])
    );
  });

  test("#intersect", () => {
    expect(iSet([1, 2, 3]).intersect(new Set([3, 4, 5]))).toStrictEqual(
      iSet([3])
    );
    expect(iSet([1, 2, 3]).intersect(iSet([2, 3, 4]))).toStrictEqual(
      iSet([2, 3])
    );
    expect(iSet([1, 2, 3]).intersect(iSet([4, 5, 6]))).toStrictEqual(iSet([]));
  });

  test("#sort", () => {
    expect(iSet(["c", "b", "d", "a"]).sort()).toStrictEqual(
      iSet(["a", "b", "c", "d"])
    );
    expect(
      iSet([5, 2, 3, 1, 4]).sort((a, b) => (Number(a) < Number(b) ? -1 : 1))
    ).toStrictEqual(iSet([1, 2, 3, 4, 5]));
  });

  test("#entries", () => {
    expect([...iSet([1, 2, 6, 4]).entries()]).toEqual([
      [1, 1],
      [2, 2],
      [6, 6],
      [4, 4],
    ]);
  });

  test("#values and #keys", () => {
    expect([...iSet([1, 2, 3, 4]).values()]).toEqual([1, 2, 3, 4]);
    expect([...iSet([1, 2, 3, 4]).keys()]).toEqual([1, 2, 3, 4]);
  });

  test("iteratable", () => {
    expect([...iSet([1, 2, 3, 4])]).toEqual([1, 2, 3, 4]);
  });
});
