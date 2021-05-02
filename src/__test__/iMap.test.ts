require("regenerator-runtime/runtime");
const { iMap } = require("../iMap");

describe("iMap", () => {
  test("initialize with map or iterable", () => {
    expect(
      String(
        iMap(
          new Map([
            ["a", 1],
            ["b", 2],
          ])
        )
      )
    ).toBe("iMap(2) <{ a: 1 }, { b: 2 }>");
    expect(
      String(
        iMap([
          ["a", 1],
          ["b", 2],
        ])
      )
    ).toBe("iMap(2) <{ a: 1 }, { b: 2 }>");
    expect(String(iMap([[iMap([["a", 1]]), 1]]))).toBe(
      "iMap(1) <{ iMap(1) <{ a: 1 }>: 1 }>"
    );
  });

  test("#set", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.set("c", 3)).toStrictEqual(
      iMap([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ])
    );

    expect(m.set("b", 3)).toStrictEqual(
      iMap([
        ["a", 1],
        ["b", 3],
      ])
    );
  });

  test("#setAll", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.setAll(["a", 2], ["c", 3])).toStrictEqual(
      iMap([
        ["a", 2],
        ["b", 2],
        ["c", 3],
      ])
    );

    expect(
      m.setAll(
        ...iMap([
          ["c", 3],
          ["d", 4],
        ])
      )
    ).toStrictEqual(
      iMap([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["d", 4],
      ])
    );
  });
  test("#setOrUpdate", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.setOrUpdate("b", (prevVal) => prevVal + 1, 1)).toStrictEqual(
      iMap([
        ["a", 1],
        ["b", 3],
      ])
    );

    expect(m.setOrUpdate("c", (prevVal) => prevVal + 1, 1)).toStrictEqual(
      iMap([
        ["a", 1],
        ["b", 2],
        ["c", 1],
      ])
    );
  });

  test("#get", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.get("a")).toBe(1);
  });

  test("#size", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.size).toBe(2);
  });

  test("#entries", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect([...m.entries()]).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });
  test("#values", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect([...m.values()]).toEqual([1, 2]);
  });
  test("#keys", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect([...m.keys()]).toEqual(["a", "b"]);
  });
  test("#has", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.has("a")).toBeTruthy();
    expect(m.has("c")).toBeFalsy();
  });
  test("#hasEvery", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.hasEvery("a", "b")).toBeTruthy();
    expect(m.hasEvery("a")).toBeTruthy();
    expect(m.hasEvery("a", "b", "c")).toBeFalsy();
  });
  test("#hasAny", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.hasAny("a", "b")).toBeTruthy();
    expect(m.hasAny("a")).toBeTruthy();
    expect(m.hasAny("a", "b", "c")).toBeTruthy();
    expect(m.hasAny("c", "d", "e")).toBeFalsy();
  });

  test("#delete", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.delete("a")).toStrictEqual(iMap([["b", 2]]));
    expect(m.delete("a", "b")).toStrictEqual(iMap([]));
  });
  test("#map", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.map((val) => val + 10)).toStrictEqual(
      iMap([
        ["a", 11],
        ["b", 12],
      ])
    );

    expect(m.map((val, key) => val + key)).toStrictEqual(
      iMap([
        ["a", "1a"],
        ["b", "2b"],
      ])
    );
  });
  test("#filter", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.filter((val) => val === 1)).toStrictEqual(iMap([["a", 1]]));
    expect(m.filter((val, key) => key === "b")).toStrictEqual(iMap([["b", 2]]));
  });
  test("#some", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.some((val) => val > 1)).toBeTruthy();
    expect(m.some((val) => val > 50)).toBeFalsy();
    expect(m.some((val, key) => key === "b")).toBeTruthy();
  });
  test("#every", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.every((val) => val > 1)).toBeFalsy();
    expect(m.every((val) => val < 50)).toBeTruthy();
    expect(m.every((val, key) => ["a", "b"].includes(key))).toBeTruthy();
  });
  test("clear", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(m.clear()).toStrictEqual(iMap([]));
  });
  test("#sort", () => {
    const m = iMap([
      ["b", 3],
      ["c", 8],
      ["a", 42],
      ["d", -9],
      ["m", 1],
      ["e", 8],
    ]);

    expect(
      m.sort((a, b) => {
        return a[0] < b[0] ? -1 : 1;
      })
    ).toStrictEqual(
      iMap([
        ["a", 42],
        ["b", 3],
        ["c", 8],
        ["d", -9],
        ["e", 8],
        ["m", 1],
      ])
    );
    expect(
      m.sort((a, b) => {
        return a[1] < b[1] ? -1 : 1;
      })
    ).toStrictEqual(
      iMap([
        ["d", -9],
        ["m", 1],
        ["b", 3],
        ["c", 8],
        ["e", 8],
        ["a", 42],
      ])
    );
  });

  test("#toJSON", () => {
    const m = iMap([
      ["a", 1],
      ["b", 2],
    ]);
    const m2 = iMap([
      [1, "a"],
      [2, "b"],
    ]);

    expect(m.toJSON()).toBe('[["a",1],["b",2]]');
    expect(JSON.parse(m.toJSON())).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
    expect(m2.toJSON()).toBe('[[1,"a"],[2,"b"]]');
  });
});
