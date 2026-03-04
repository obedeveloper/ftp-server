import { FC } from '@hono/hono/jsx';
import { css, Style } from '@hono/hono/css';

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

const globalCSS = css`
  body {
    margin: 0;
    padding: 1rem;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    background-color: #f7f7f7;
    color: #333;
  }

  a {
    color: #0366d6;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h2 {
    margin-top: 0.5rem;
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    margin: 0.25rem 0;
  }

  li a {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  li a:hover {
    background-color: #e1e4e8;
  }

  li a.file::before {
    content: '📄';
    margin-right: 0.5rem;
  }

  li a.dir::before {
    content: '📁';
    margin-right: 0.5rem;
  }
`;

export const Page: FC<Props> = ({ filesAndDirs, base }) => {
  const hrefBase = base === '/' ? '' : base;

  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>FTP - Server</title>
          <Style>{globalCSS}</Style>
        </head>
        <body>
          <a href="/">Home</a>
          <h2>{base}</h2>
          <ul>
            {filesAndDirs.map(({ name, isDirectory, isFile }) => {
              return (
                <li key={name}>
                  {isFile && (
                    <a
                      class="file"
                      download={name}
                      href={`/file${hrefBase}/${name}`}
                    >
                      {name}
                    </a>
                  )}
                  {isDirectory && (
                    <a class="dir" href={`${hrefBase}/${name}`}>
                      {name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </body>
      </html>
    </>
  );
};
