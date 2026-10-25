import { execFileSync } from "node:child_process";

const allowedFiles = new Set([
  ".githooks/pre-commit",
  ".githooks/pre-push",
  ".github/workflows/public-artifact-policy.yml",
  ".github/workflows/secret-scan.yml",
  ".gitignore",
  ".gitleaks.toml",
  ".nojekyll",
  "404.html",
  "SECURITY.md",
  "index.html",
  "kin-fung-chan-headshot.webp",
  "scripts/check-public-artifact.mjs",
  "scripts/check-sensitive-files.mjs",
]);

const trackedFiles = execFileSync("git", ["ls-files"], {
  encoding: "utf8",
  windowsHide: true,
})
  .split(/\r?\n/u)
  .filter(Boolean);

const unexpectedFiles = trackedFiles.filter((file) => !allowedFiles.has(file));
if (unexpectedFiles.length > 0) {
  console.error("Unexpected files would be published by GitHub Pages:");
  for (const file of unexpectedFiles) console.error(`- ${file}`);
  process.exit(1);
}

console.log("Public artifact allowlist passed.");
