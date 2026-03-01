export async function listFilesAndDir(path?: string | null) {
  const entries: Deno.DirEntry[] = [];

  for await (const entry of Deno.readDir(path || Deno.cwd())) {
    entries.push(entry);
  }

  return entries.map(({ isDirectory, isFile, name }) => ({
    isDirectory,
    isFile,
    name,
  }));
}
