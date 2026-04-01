#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(projectRoot, "dist", "slides-pdf");
const printCssPath = "scripts/reveal-print.css";

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function resolveInputPath() {
  const input = getArgValue("--input");
  if (!input) return undefined;
  return path.resolve(projectRoot, input);
}

function resolvePrintSize() {
  return getArgValue("--print-size") ?? "A3";
}

function discoverSlidesFiles() {
  const entries = readdirSync(projectRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("module-"))
    .map((entry) => path.join(projectRoot, entry.name, "slides.md"))
    .filter((candidate) => existsSync(candidate));
}

function toOutputPath(slidesPath) {
  const moduleDir = path.basename(path.dirname(slidesPath));
  return path.join(outputRoot, `${moduleDir}.pdf`);
}

function renderPdf(slidesPath) {
  const outputPath = toOutputPath(slidesPath);
  const printSize = resolvePrintSize();
  mkdirSync(path.dirname(outputPath), { recursive: true });

  const result = spawnSync(
    "npx",
    [
      "reveal-md",
      slidesPath,
      "--disable-auto-open",
      "--css",
      printCssPath,
      "--print-size",
      printSize,
      "--print",
      outputPath
    ],
    {
      cwd: projectRoot,
      stdio: "inherit"
    }
  );

  if (result.status !== 0) {
    throw new Error(`PDF export failed for ${slidesPath}`);
  }
}

function main() {
  mkdirSync(outputRoot, { recursive: true });
  const inputPath = resolveInputPath();
  const slidesPaths = inputPath ? [inputPath] : discoverSlidesFiles();

  if (slidesPaths.length === 0) {
    throw new Error("No slides.md files found.");
  }

  for (const slidesPath of slidesPaths) {
    if (!existsSync(slidesPath) || !statSync(slidesPath).isFile()) {
      throw new Error(`Invalid slides path: ${slidesPath}`);
    }
    console.log(`Exporting ${path.relative(projectRoot, slidesPath)}...`);
    renderPdf(slidesPath);
  }

  console.log(`\nDone. PDFs written to ${path.relative(projectRoot, outputRoot)}`);
}

main();
