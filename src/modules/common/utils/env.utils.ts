export function getEnv(name: string) {
  return import.meta.env[name] as string;
}
