# Web3 Context Parser

A suite of Node.js tools for analyzing Solidity smart contracts from GitHub — extracting functions, building call trees, and enriching datasets with detailed function contexts.

## 📦 Tools Overview

### 1. Solidity Analyzer
Analyzes Solidity contracts directly from GitHub. Extracts functions, state variables, modifiers, events, and resolves imports automatically.
```bash
# Analyze a single contract
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol
```

### 2. Function Extractor
Extracts a specific function and its full call tree, including dependencies, modifiers, and events.
```bash
# Extract a function and its call tree
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol requestRandomness

# With options
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol transfer --max-depth=5 --include-events
```

### 3. Parse All Functions
Automatically extracts all functions in a Solidity file and runs the Function Extractor on each. Useful for batch analysis.
```bash
node parse_all_functions.js https://github.com/owner/repo/blob/main/Contract.sol
```

### 4. Add AST to Contexts
Reads JSON vulnerability reports (recursively in subfolders), finds each context entry, and runs Function Extractor for each.
Adds the extracted call tree as a new field `AST` in the context.
```bash
node add_ast_to_contexts.js
```

## ✨ Features

- 🧠 **Automatic Dependency Resolution** — fetch and analyze imports
- 🔍 **Call Tree Generation** — visualize function relationships
- 📊 **Structured JSON Output** — ready for programmatic use
- ⚙️ **Configurable Depth & Options** — customize extraction behavior
- 💬 **AST Integration** — attach parsed call trees to context data

## 🧰 Installation
```bash
npm install axios @solidity-parser/parser
```

## 💡 Use Cases

- 🔐 **Security Auditing** — analyze function call relationships
- 🧱 **Dataset Enrichment** — add AST data to audit contexts
- 📘 **Documentation Generation** — extract function metadata automatically
- ⚙️ **Testing Scope Mapping** — identify all dependent functions

## 📄 Example Output
```json
{
  "metadata": {
    "targetFunction": "requestRandomness",
    "functionsExtracted": 8,
    "maxCallDepth": 3
  },
  "callTree": {
    "name": "requestRandomness",
    "calls": ["getDrandOracle", "getCurrentRound"]
  },
  "functions": [
    {
      "name": "requestRandomness",
      "sourceCode": "function requestRandomness() {...}"
    }
  ]
}
```

## ⚠️ Limitations

- Only supports public GitHub repositories
- Requires valid Solidity syntax
- Large-scale analysis may hit GitHub rate limits

## 🤝 Contributing

Pull requests welcome. Please follow the existing code style and include error handling where appropriate.

## 📜 License

MIT