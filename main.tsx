import { listFilesAndDir } from './utils.tsx';
import { Hono } from '@hono/hono';
import { Page } from './utils.tsx';

const app = new Hono();

app.get('/*', async (c) => {
  const path = c.req.path;
  const entries = await listFilesAndDir('.' + path);

  return c.html(<Page filesAndDirs={entries} base={c.req.url}></Page>);
});

Deno.serve(app.fetch);
