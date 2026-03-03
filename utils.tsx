import { FC } from '@hono/hono/jsx';

export async function listFilesAndDir(path?: string | null) {
  const entries: Deno.DirEntry[] = [];

  for await (const entry of Deno.readDir(path || Deno.cwd())) {
    entries.push(entry);
  }

  return entries;
}

interface Props {
  filesAndDirs: Deno.DirEntry[];
  base: string;
}

export const Page: FC<Props> = ({ filesAndDirs, base }) => (
  <>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FTP - Server</title>
      </head>
      <body>
        <a href="/">Home</a>
        <h2>{base}</h2>
        <ul>
          {filesAndDirs.map(({ name, isDirectory, isFile }) => {
            return (
              <li key={name}>
                {isFile && `📄 ${name}`}
                {isDirectory && <a href={`${base}/${name}`}>📁 {name}</a>}
              </li>
            );
          })}
        </ul>
      </body>
    </html>
  </>
);
