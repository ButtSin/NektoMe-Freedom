import { spawn } from 'child_process';

const browser = process.argv[2] || 'chromium';

const configs = [
  { name: 'pages', file: 'vite.config.pages.js' },
  { name: 'background', file: 'vite.config.background.js' },
  { name: 'content', file: 'vite.config.content.js' },
];

const processes = [];

for (const cfg of configs) {
  const proc = spawn('npx', ['vite', 'build', '--watch', '--config', cfg.file], {
    stdio: 'inherit',
    shell: true,
  });

  processes.push(proc);
}

const rewriteManifest = () => {
  spawn('node', ['scripts/build-manifest.js', browser], {
    stdio: 'ignore',
    shell: true,
  });
};

rewriteManifest();

const manifestTimer = setInterval(rewriteManifest, 1000);

process.on('SIGINT', () => {
  console.log('\nОстановка всех процессов...');

  clearInterval(manifestTimer);

  processes.forEach((p) => p.kill('SIGINT'));
  process.exit();
});
