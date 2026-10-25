import { execFileSync } from "node:child_process";

const trackedFiles = execFileSync("git", ["ls-files"], {
  encoding: "utf8",
  windowsHide: true,
})
  .split(/\r?\n/u)
  .filter(Boolean);

const permittedExamples = new Set([".env.example", ".dev.vars.example"]);
const sensitivePath = /(?:^|\/)(?:\.env(?:\..+)?|\.dev\.vars|\.npmrc|.*\.(?:pem|key|p12|pfx|keystore)|credentials[^/]*\.json|service-account[^/]*\.json)$/iu;
const blockedFiles = trackedFiles.filter(
  (file) => sensitivePath.test(file) && !permittedExamples.has(file),
);

if (blockedFiles.length > 0) {
  console.error("Refusing to continue because sensitive filenames are tracked:");
  for (const file of blockedFiles) console.error(`- ${file}`);
  process.exit(1);
}

console.log("Sensitive filename policy passed.");
