export function getAxiosParams(paramsObject: { [key: string]: any }) {
  const params = new URLSearchParams();

  for (const key in paramsObject) {
    if (paramsObject.hasOwnProperty(key) && paramsObject[key] !== undefined) {
      const value = paramsObject[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(key, item.toString());
        });
      } else if (typeof value === "object" && value !== null) {
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            params.append(`${key}[${subKey}]`, value[subKey].toString());
          }
        }
      } else {
        params.append(key, value.toString());
      }
    }
  }

  return params;
}
