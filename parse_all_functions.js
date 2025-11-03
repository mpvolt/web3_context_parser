import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { spawn } from "child_process";

// 1. Convert GitHub blob URL → raw file URL
function blobToRawUrl(blobUrl) {
  return blobUrl
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
}

// 2. Download Solidity file
async function downloadSolidityFile(githubBlobUrl) {
  const rawUrl = blobToRawUrl(githubBlobUrl);
  console.log(`Downloading Solidity file from: ${rawUrl}`);
  const response = await fetch(rawUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }
  return await response.text();
}

// 3. Extract function names using regex
function extractFunctionNames(solidityCode) {
  // Matches Solidity function definitions (public/private/internal/external optional)
  const regex = /\bfunction\s+([A-Za-z_]\w*)\s*\(/g;
  const names = [];
  let match;
  while ((match = regex.exec(solidityCode)) !== null) {
    names.push(match[1]);
  }
  return [...new Set(names)];
}

// 4. Run function-extractor-main.js for each function
async function runExtractorForFunctions(githubUrl, functionNames, options = {}) {
  const results = [];

  for (const fnName of functionNames) {
    console.log(`\n🔍 Extracting function: ${fnName}`);
    const args = [
      path.join("../evm/function-extractor-main.js"),
      githubUrl,
      fnName,
      JSON.stringify(options)
    ];

    // Spawn a new Node process for each function
    const proc = spawn("node", args, { stdio: ["ignore", "pipe", "pipe"] });

    let output = "";
    for await (const chunk of proc.stdout) output += chunk.toString();
    for await (const errChunk of proc.stderr) output += errChunk.toString();

    const exitCode = await new Promise((resolve) =>
      proc.on("close", resolve)
    );

    results.push({
      function: fnName,
      success: exitCode === 0,
      output,
    });
  }

  return results;
}

// 5. Main function
async function main() {
  const githubBlobUrl = process.argv[2];
  if (!githubBlobUrl) {
    console.error("Usage: node extract_all_functions.js <github_blob_url>");
    process.exit(1);
  }

  const code = await downloadSolidityFile(githubBlobUrl);
  const functionNames = extractFunctionNames(code);

  console.log(`\n🧩 Found ${functionNames.length} functions:`, functionNames);

  const results = await runExtractorForFunctions(githubBlobUrl, functionNames, {
    maxDepth: 2,
    includeModifiers: true,
    includeEvents: false,
    resolveDependencies: true,
    debug: false
  });

  const outputFile = "function_extractor_results.json";
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n✅ Results saved to ${outputFile}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
