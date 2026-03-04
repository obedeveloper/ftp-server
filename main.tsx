import { listFilesAndDir } from './utils.tsx';
import { Hono } from '@hono/hono';
import { Page } from './utils.tsx';

const app = new Hono();

app.get('/file/*', async (c) => {
  const relative = c.req.path.replace(/^\/file/, '');
  const file = await Deno.open('.' + relative);
  return c.body(file.readable);
});

app.get('/*', async (c) => {
  const path = c.req.path;
  const entries = await listFilesAndDir('.' + path);

  return c.html(<Page filesAndDirs={entries} base={path}></Page>);
});

Deno.serve(app.fetch);
