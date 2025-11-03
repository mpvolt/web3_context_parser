#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// --- Load CommonJS module dynamically ---
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const FunctionExtractor = require("./evm/function-extractor-main.js");

// --- Setup paths and options ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetDir = path.join(__dirname, "test_dataset");

const extractor = new FunctionExtractor();

const extractorOptions = {
  maxDepth: 5,
  includeModifiers: true,
  includeEvents: false,
  resolveDependencies: true,
  debug: false
};

// --- Recursively list all JSON files ---
async function getAllJsonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await getAllJsonFiles(fullPath));
    } else if (entry.name.endsWith(".json")) {
      results.push(fullPath);
    }
  }

  return results;
}

// --- Process each JSON file ---
async function processFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  let jsonData;
  try {
    const raw = await fs.readFile(filePath, "utf8");
    jsonData = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse ${filePath}: ${err.message}`);
    return;
  }

  let modified = false;

  for (const obj of jsonData) {
    if (!Array.isArray(obj.context)) continue;

    for (const ctx of obj.context) {
      if (!ctx.source || !Array.isArray(ctx.functions)) continue;

      for (const func of ctx.functions) {
        const funcName = func.name;
        if (!funcName) continue;

        console.log(`  ↳ Extracting AST for ${funcName} (${ctx.source})`);
        try {
          const report = await extractor.extractFunction(
            ctx.source,
            funcName,
            extractorOptions
          );
          func.AST = report;
          modified = true;
        } catch (err) {
          console.error(`  ⚠️ Error extracting ${funcName}: ${err.message}`);
        }
      }
    }
  }

  if (modified) {
    const outputPath = filePath.replace(/\.json$/, "_with_ast.json");
    await fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2));
    console.log(`✅ Wrote: ${outputPath}`);
  } else {
    console.log("⚠️ No ASTs added — skipping write.");
  }
}

// --- Main ---
async function main() {
  console.log("🔍 Searching for JSON files under test_dataset/");
  const files = await getAllJsonFiles(datasetDir);
  console.log(`Found ${files.length} JSON files.`);

  for (const file of files) {
    await processFile(file);
  }

  console.log("\n✅ All files processed!");
}

main().catch((err) => console.error("Fatal error:", err));
