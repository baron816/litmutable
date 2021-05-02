class IMap<K, V> {
  private initialMap: Map<K, V>;

  constructor(mapOrIterable: Map<K, V> | [K, V][]) {
    this.initialMap =
      mapOrIterable instanceof Map ? mapOrIterable : new Map(mapOrIterable);
  }

  set(key: K, val: V) {
    const newMap = new Map(this.initialMap);
    newMap.set(key, val);
    return new IMap(newMap);
  }

  setAll(...entries: [K, V][]) {
    const newMap = new Map(this.initialMap);
    for (const [key, val] of entries) {
      newMap.set(key, val);
    }
    return new IMap(newMap);
  }

  setOrUpdate(key: K, updater: (prevVal: V) => V, settingVal: V) {
    const newMap = new Map(this.initialMap);
    if (newMap.has(key)) {
      newMap.set(key, updater(newMap.get(key) as V));
    } else {
      newMap.set(key, settingVal);
    }

    return iMap(newMap);
  }

  toString() {
    const formatEntries = [...this.initialMap]
      .map((entry) => `{ ${entry.join(": ")} }`)
      .join(", ");
    return `iMap(${this.initialMap.size}) <${formatEntries}>`;
  }

  toJSON() {
    return `[${Array.from(this.initialMap, (entry) => JSON.stringify(entry))}]`;
  }

  [Symbol.iterator]() {
    return this.initialMap.entries();
  }

  entries() {
    return this.initialMap.entries();
  }

  values() {
    return this.initialMap.values();
  }

  keys() {
    return this.initialMap.keys();
  }

  has(key: K) {
    return this.initialMap.has(key);
  }

  hasEvery(...keys: K[]) {
    for (const key of keys) {
      if (!this.initialMap.has(key)) {
        return false;
      }
    }
    return true;
  }

  hasAny(...keys: K[]) {
    for (const key of keys) {
      if (this.initialMap.has(key)) {
        return true;
      }
    }
    return false;
  }

  get(key: K) {
    return this.initialMap.get(key);
  }

  get size() {
    return this.initialMap.size;
  }

  delete(...keys: K[]) {
    const newMap = new Map(this.initialMap);

    for (const key of keys) {
      newMap.delete(key);
    }

    return new IMap(newMap);
  }

  map<T>(cb: (val: V, key: K) => T) {
    const newMap = new Map<K, T>();

    for (const [key, val] of this.initialMap) {
      newMap.set(key, cb(val, key));
    }

    return new IMap(newMap);
  }

  filter(cb: (val: V, key: K) => boolean) {
    const newMap = new Map<K, V>();

    for (const [key, val] of this.initialMap) {
      if (cb(val, key)) {
        newMap.set(key, val);
      }
    }

    return new IMap(newMap);
  }

  some(cb: (val: V, key: K) => boolean) {
    for (const [key, val] of this.initialMap) {
      if (cb(val, key)) {
        return true;
      }
    }

    return false;
  }

  every(cb: (val: V, key: K) => boolean) {
    for (const [key, val] of this.initialMap) {
      if (!cb(val, key)) {
        return false;
      }
    }

    return true;
  }

  clear() {
    return new IMap([]);
  }

  sort(compareFn?: ((a: [K, V], b: [K, V]) => number) | undefined) {
    return new IMap([...this.initialMap].sort(compareFn));
  }
}

function iMap<K, V>(mapOrIterable: Map<K, V> | [K, V][]) {
  return new IMap(mapOrIterable);
}

module.exports = {
  iMap,
};
