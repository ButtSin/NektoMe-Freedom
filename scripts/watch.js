import { spawn } from "child_process";

const configs = [
  { name: "pages", file: "vite.config.pages.js" },
  { name: "background", file: "vite.config.background.js" },
  { name: "content", file: "vite.config.content.js" },
];

const processes = [];

for (const cfg of configs) {
  const proc = spawn(
    "npx",
    ["vite", "build", "--watch", "--config", cfg.file],
    {
      stdio: "inherit",
      shell: true,
    },
  );
  processes.push(proc);
}

process.on("SIGINT", () => {
  console.log("\nОстановка всех процессов...");
  processes.forEach((p) => p.kill("SIGINT"));
  process.exit();
});
