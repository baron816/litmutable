class ISet<T> {
  private initialSet: Set<T>;

  constructor(setOrIterable: Set<T> | T[]) {
    this.initialSet =
      setOrIterable instanceof Set ? setOrIterable : new Set(setOrIterable);
  }

  add(...vals: T[]) {
    const newSet = new Set(this.initialSet);
    for (const val of vals) {
      newSet.add(val);
    }
    return new ISet(newSet);
  }
  remove(...vals: T[]) {
    const newSet = new Set(this.initialSet);
    for (const val of vals) {
      newSet.delete(val);
    }
    return new ISet(newSet);
  }
  has(key: T) {
    return this.initialSet.has(key);
  }
  hasEvery(...keys: T[]) {
    for (const key of keys) {
      if (!this.initialSet.has(key)) {
        return false;
      }
    }
    return true;
  }
  hasAny(...keys: T[]) {
    for (const key of keys) {
      if (this.initialSet.has(key)) {
        return true;
      }
    }
    return false;
  }
  clear() {
    return new ISet(new Set<T>());
  }
  entries() {
    return this.initialSet.entries();
  }

  values() {
    return this.initialSet.values();
  }
  keys() {
    return this.initialSet.keys();
  }

  map<K>(cb: (val: T) => K) {
    const newSet = new Set<K>();
    for (const val of this.initialSet.values()) {
      newSet.add(cb(val));
    }
    return new ISet(newSet);
  }
  filter(cb: (val: T) => boolean) {
    const newSet = new Set<T>();
    for (const val of this.initialSet.values()) {
      if (cb(val)) {
        newSet.add(val);
      }
    }
    return new ISet(newSet);
  }

  /**
   * The number of values in the underlying set
   */
  get size() {
    return this.initialSet.size;
  }
  isEmpty() {
    return this.initialSet.size === 0;
  }
  every(cb: (v: T) => boolean) {
    for (const val of this.initialSet) {
      if (!cb(val)) {
        return false;
      }
    }
    return true;
  }
  some(cb: (v: T) => boolean) {
    for (const val of this.initialSet) {
      if (cb(val)) {
        return true;
      }
    }
    return false;
  }
  [Symbol.iterator]() {
    return this.initialSet.values();
  }
  union<K>(otherSet: ISet<K> | Set<K>) {
    return new ISet(
      new Set<T | K>([...this.initialSet, ...otherSet])
    );
  }
  intersect<K>(otherSet: ISet<K> | Set<K>) {
    const newSet = new Set<K | T>();

    for (const val of this.initialSet) {
      if (otherSet.has(val as any)) {
        newSet.add(val);
      }
    }

    return new ISet(newSet);
  }
  sort(compareFn?: ((a: T, b: T) => number) | undefined) {
    return new ISet([...this.initialSet].sort(compareFn));
  }
  toString() {
    return `iSet(${this.initialSet.size}) <${[...this.initialSet.values()]}>`;
  }
  toJSON() {
    return `${[...this.initialSet.values()]}`;
  }
}

function iSet<T>(setOrIterable: Set<T> | T[]): ISet<T> {
  return new ISet(setOrIterable);
}

module.exports = {
  iSet,
};
