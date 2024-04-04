export function flatten(o: string | Record<string, unknown>, prefix = '', result: Record<string, string> = {}) {
  if (typeof o === 'string') {
    result[prefix] = o;
    return result;
  }

  for (const i in o) {
    let pref = prefix;

    if (prefix === '') {
      pref = i;
    } else {
      pref = prefix + '.' + i;
    }

    flatten(o[i] as string | Record<string, unknown>, pref, result);
  }

  return result;
}
