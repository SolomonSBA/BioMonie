import { spawn } from 'node:child_process';

const port = 4319;
const child = spawn(process.execPath, ['server/server.js'], {
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
child.stdout.on('data', (d) => process.stdout.write(`[server] ${d}`));
child.stderr.on('data', (d) => process.stderr.write(`[server:err] ${d}`));

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/contact`);
      if (res.ok) return;
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('server did not start');
}

try {
  await waitForServer();
  const paths = [
    '/email/v2/logo-mark.png',
    '/email/v2/logo-wordmark.png',
    '/email/v2/icon-mail.png',
    '/email/v2/social-x.png',
    '/email/v2/banner.gif',
    '/email/v2/banner.png',
  ];
  for (const path of paths) {
    const res = await fetch(`http://127.0.0.1:${port}${path}`, {
      headers: { 'Accept-Encoding': 'gzip, deflate' },
    });
    const body = await res.arrayBuffer();
    console.log(
      [
        path.padEnd(34),
        `status=${res.status}`,
        `type=${res.headers.get('content-type')}`,
        `bytes=${body.byteLength}`,
        `cache=${res.headers.get('cache-control')}`,
        `encoding=${res.headers.get('content-encoding') || 'identity'}`,
      ].join(' '),
    );
  }
} finally {
  child.kill();
}
