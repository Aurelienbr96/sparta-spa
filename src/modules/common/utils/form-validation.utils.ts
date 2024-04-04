export function required(message: string) {
  return (value: string) => {
    if (!value) return message;
    return undefined;
  };
}

export function email(message: string) {
  return (value: string) => {
    if (required(message)(value)) return message;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) return message;

    return undefined;
  };
}

export function equalTo(compare: string, message: string, requiredMessage: string) {
  return (value: string) => {
    if (required(requiredMessage)(value)) return requiredMessage;

    if (value !== compare) return message;

    return undefined;
  };
}
