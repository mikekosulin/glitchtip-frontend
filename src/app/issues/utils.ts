export function urlParamsToObject(url: string | null) {
  return url ? paramsToObject(new URLSearchParams(url.split("?")[1])) : null;
}

export function paramsToObject(entries: URLSearchParams) {
  const result: { [key: string]: string } = {};
  entries.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function normalizeProjectParams(
  projects: string | string[] | undefined
) {
  if (Array.isArray(projects)) {
    return projects;
  }
  if (typeof projects === "string") {
    return [projects];
  }
  return [];
}
