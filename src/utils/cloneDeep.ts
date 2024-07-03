export function cloneDeep<T>(obj: T, hash = new WeakMap<object, any>()): T {
  // Return non-objects as is
  if (Object(obj) !== obj) return obj;

  // Handle Date
  if (obj instanceof Date) return new Date(obj) as any;

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj) as any;

  // Handle cyclic structures
  if (hash.has(obj as object)) return hash.get(obj as object);

  // Handle Array and Object
  const result: any = Array.isArray(obj) ? [] : {};

  // Set the result in the hash map before the recursive call
  hash.set(obj as object, result);

  // Recursively copy properties
  for (const key in obj) {
    //@ts-ignore
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneDeep((obj as any)[key], hash);
    }
  }

  // Handle Symbol properties
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const symbolKey of symbolKeys) {
    result[symbolKey] = cloneDeep((obj as any)[symbolKey], hash);
  }

  return result;
}
