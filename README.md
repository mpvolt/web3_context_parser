# Web3 Context Parser

A collection of scripts for parsing the full function context of Web3 files like Solidity smart contracts.

---

## 📦 EVM Parsers

### 1. Solidity Analyzer

A powerful Node.js tool for analyzing Solidity smart contracts directly from GitHub repositories. It parses contract code, extracts comprehensive information about functions, state variables, modifiers, events, and automatically resolves dependencies.

### 2. Function Extractor

A specialized tool that extracts a specific function and its complete call tree from a Solidity contract. Perfect for understanding function dependencies, creating focused documentation, or analyzing specific contract flows.

## ✨ Features

### Solidity Analyzer Features

- 📝 **Direct GitHub Integration** - Analyze contracts directly from GitHub URLs
- 🔍 **Deep Dependency Resolution** - Automatically fetches and analyzes imported contracts
- 📊 **Comprehensive Analysis** - Extracts functions, state variables, modifiers, events, and function calls
- 🔗 **Cross-Reference Mapping** - Tracks internal and external function calls
- 📦 **Common Library Support** - Recognizes and resolves popular libraries (OpenZeppelin, Solady, etc.)
- 💾 **Source Code Extraction** - Optionally includes original source code in analysis output
- 🎯 **Multiple File Support** - Analyze multiple contracts simultaneously
- 📈 **Detailed Reporting** - Generates JSON reports with extensive metadata

### Function Extractor Features

- 🎯 **Targeted Extraction** - Extract a specific function and all its dependencies
- 🌳 **Call Tree Visualization** - Generate complete call trees showing function relationships
- 🔎 **Deep Call Analysis** - Traverse function calls up to configurable depth
- 📑 **Focused Reports** - Get only the functions you need, not the entire contract
- 🔧 **Customizable Output** - Include/exclude modifiers, events, and source code
- 🐛 **Debug Mode** - Detailed output for troubleshooting and understanding extraction
- 📊 **Depth Analysis** - Understand the complexity of function call chains

## 📥 Installation

```bash
npm install axios @solidity-parser/parser
```

## 🚀 Usage

### Solidity Analyzer

#### Basic Usage

Analyze a single contract:

```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol
```

#### Multiple Files

Analyze multiple contracts at once:

```bash
node solidity-analyzer.js "https://github.com/.../Contract1.sol,https://github.com/.../Contract2.sol"
```

### Function Extractor

#### Basic Usage

Extract a specific function and its call tree:

```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol requestRandomness
```

#### With Options

```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol transfer --max-depth=5 --output=transfer-analysis.json
```

#### Debug Mode

See detailed information about interface detection and function resolution:

```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol myFunction --debug
```

## ⚙️ Options

### Solidity Analyzer Options

```bash
node solidity-analyzer.js <github-url> [output-file] [options]
```

| Option | Description |
|--------|-------------|
| `--no-deps` | Disable automatic dependency resolution |
| `--max-depth=N` | Set maximum recursion depth for dependencies (default: 3) |
| `--no-common-libs` | Skip resolving common libraries for faster analysis |
| `--libs-only` | Only resolve common libraries, skip local dependencies |
| `--no-source` | Exclude source code from output (smaller file size) |
| `--include-source` | Include source code in output (default) |

### Function Extractor Options

```bash
node function-extractor-main.js <github-url> <function-name> [options]
```

| Option | Description |
|--------|-------------|
| `--output=FILE` | Output file for JSON report (default: function-extraction.json) |
| `--max-depth=N` | Maximum call tree depth (default: 10) |
| `--no-deps` | Skip dependency resolution (faster) |
| `--no-modifiers` | Exclude modifiers from extraction |
| `--include-events` | Include events in extraction |
| `--tree-only` | Only print call tree, don't save report |
| `--debug` | Enable debug output to diagnose interface detection |

## 📝 Examples

### Solidity Analyzer Examples

**Analyze with custom output file:**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol output.json
```

**Analyze without dependencies:**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-deps
```

**Custom dependency depth:**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --max-depth=2
```

**Skip common libraries (faster):**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-common-libs
```

**Security-focused analysis (libraries only):**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --libs-only
```

**Smaller output without source code:**
```bash
node solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-source
```

### Function Extractor Examples

**Extract a function with its complete call tree:**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Token.sol transfer
```

**Extract with limited call depth:**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol stake --max-depth=5
```

**Extract without dependency resolution (faster):**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol mint --no-deps
```

**Show only the call tree without saving:**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol swap --tree-only
```

**Include events in the extraction:**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol processPayment --include-events
```

**Debug interface detection issues:**
```bash
node function-extractor-main.js https://github.com/owner/repo/blob/main/Contract.sol requestRandomness --debug
```

## 📊 Output Format

### Solidity Analyzer Output

The analyzer generates a comprehensive JSON report containing:

### Metadata
- Analysis timestamp
- Total files analyzed
- File names
- Repository information

### Dependencies
- Found dependencies
- Successfully resolved dependencies
- Failed dependencies (external and unreachable)

### State Variables
- Name, type, and visibility
- Constants and immutables
- File location
- Optional source code

### Modifiers
- Name and parameters
- File location
- Optional source code

### Functions
- Function signatures
- Visibility and state mutability
- Parameters and return values
- Applied modifiers
- Function calls (internal and external)
- Optional source code

### Events
- Event definitions
- Parameters (indexed and non-indexed)

### Summary Statistics
- Total counts for all components
- Dependency resolution success rate
- Function call analysis

### Function Extractor Output

The function extractor generates a focused JSON report containing:

#### Metadata
- Extraction timestamp
- Target function information
- Original analysis summary
- Extraction statistics (functions extracted, max call depth, files involved)

#### Call Tree
- Hierarchical visualization of function calls
- Call depth information
- Parent-child relationships

#### Extracted Functions
- All functions in the call tree
- Complete source code for each function
- Function signatures and parameters
- Modifiers and events (if included)

#### Summary
- Target function details
- Total extracted functions
- Functions grouped by file
- Call depth analysis

## 📄 Example Output

### Solidity Analyzer Output

```json
{
  "metadata": {
    "analyzedAt": "2025-10-12T10:30:00.000Z",
    "totalFiles": 3,
    "fileNames": ["Contract.sol", "Library.sol", "Interface.sol"]
  },
  "dependencies": {
    "found": ["./Library.sol", "@openzeppelin/contracts/token/ERC20/ERC20.sol"],
    "resolved": ["./Library.sol"],
    "failed": ["@openzeppelin/contracts/token/ERC20/ERC20.sol"]
  },
  "functions": [{
    "name": "transfer",
    "signature": "transfer(address to, uint256 amount) public returns (bool)",
    "visibility": "public",
    "parameters": [
      {"name": "to", "type": "address"}, 
      {"name": "amount", "type": "uint256"}
    ],
    "calls": [{"name": "balanceOf", "arguments": 1}]
  }],
  "summary": {
    "totalFunctions": 15,
    "totalStateVariables": 5,
    "dependencySuccessRate": 0.75
  }
}
```

### Function Extractor Output

```json
{
  "metadata": {
    "extractedAt": "2025-10-12T10:30:00.000Z",
    "targetFunction": "requestRandomness",
    "targetSignature": "requestRandomness() external returns (bytes32)",
    "extraction": {
      "functionsExtracted": 8,
      "maxCallDepth": 3,
      "filesInvolved": ["Contract.sol", "DrandOracle.sol", "IDrand.sol"]
    }
  },
  "callTree": {
    "name": "requestRandomness",
    "depth": 0,
    "calls": [
      {
        "name": "getDrandOracle",
        "depth": 1,
        "calls": []
      },
      {
        "name": "requestRandomness",
        "depth": 1,
        "calls": [
          {
            "name": "getCurrentRound",
            "depth": 2,
            "calls": []
          }
        ]
      }
    ]
  },
  "functions": [
    {
      "name": "requestRandomness",
      "signature": "requestRandomness() external returns (bytes32)",
      "sourceCode": "function requestRandomness() external returns (bytes32) {...}",
      "calls": ["getDrandOracle", "requestRandomness"]
    }
  ],
  "summary": {
    "totalExtractedFunctions": 8,
    "functionsByFile": {
      "Contract.sol": ["requestRandomness", "getDrandOracle"],
      "IDrand.sol": ["getCurrentRound", "requestRandomness"]
    }
  }
}
```

## 🎯 Use Cases

### Solidity Analyzer Use Cases

- **Security Auditing** - Understand contract structure and dependencies
- **Documentation Generation** - Extract comprehensive contract information
- **Code Analysis** - Track function calls and contract interactions
- **Dependency Mapping** - Visualize contract dependency trees
- **Migration Planning** - Analyze legacy contracts before upgrades

### Function Extractor Use Cases

- **Function Documentation** - Generate focused docs for specific functions
- **Code Review** - Understand the complete flow of critical functions
- **Testing Scope** - Identify all functions that need testing when modifying a target function
- **Impact Analysis** - See what breaks if you modify a function
- **Learning & Education** - Study how specific functions work in complex contracts
- **Gas Optimization** - Identify the full call chain for optimization opportunities

## 💻 Programmatic Usage

### Solidity Analyzer

```javascript
const GitHubSolidityAnalyzer = require('./solidity-analyzer');

const analyzer = new GitHubSolidityAnalyzer({
  includeSourceCode: true
});

const report = await analyzer.analyzeSingleFile(
  'https://github.com/owner/repo/blob/main/Contract.sol',
  true,  // resolveDependencies
  3      // maxDepth
);

console.log(report.summary);
```

### Function Extractor

```javascript
const FunctionExtractor = require('./function-extractor-main');

const extractor = new FunctionExtractor();

const report = await extractor.extractFunction(
  'https://github.com/owner/repo/blob/main/Contract.sol',
  'requestRandomness',
  {
    maxDepth: 10,
    includeModifiers: true,
    includeEvents: false,
    resolveDependencies: true,
    debug: false
  }
);

console.log(report.callTree);
console.log(report.summary);
```

## ⚠️ Limitations

- Only supports publicly accessible GitHub repositories
- External dependencies (npm packages) are identified but not fully resolved
- Requires valid Solidity syntax (does not handle compilation errors)
- GitHub rate limits may affect large-scale analysis

## 🤝 Contributing

Contributions are welcome! Please ensure your code follows the existing style and includes appropriate error handling.

## 📜 License

MIT

---

**Built with ❤️ for the Web3 community**
