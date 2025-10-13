A collection of scripts for parsing the full function context of Web3 Files like Solidity Smart Contracts

EVM-Parsers

solidity-analyzer.js
A Node.js tool for analyzing Solidity smart contracts directly from GitHub repositories. It parses contract code, extracts comprehensive information about functions, state variables, modifiers, events, and automatically resolves dependencies.
Features

📝 Direct GitHub Integration - Analyze contracts directly from GitHub URLs
🔍 Deep Dependency Resolution - Automatically fetches and analyzes imported contracts
📊 Comprehensive Analysis - Extracts functions, state variables, modifiers, events, and function calls
🔗 Cross-Reference Mapping - Tracks internal and external function calls
📦 Common Library Support - Recognizes and resolves popular libraries (OpenZeppelin, Solady, etc.)
💾 Source Code Extraction - Optionally includes original source code in analysis output
🎯 Multiple File Support - Analyze multiple contracts simultaneously
📈 Detailed Reporting - Generates JSON reports with extensive metadata

Installation
bashnpm install axios @solidity-parser/parser
Usage
Basic Usage
Analyze a single contract:
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol
Multiple Files
Analyze multiple contracts at once:
bashnode solidity-analyzer.js "https://github.com/.../Contract1.sol,https://github.com/.../Contract2.sol"
Options
bashnode solidity-analyzer.js <github-url> [output-file] [options]
Available Options:

--no-deps - Disable automatic dependency resolution
--max-depth=N - Set maximum recursion depth for dependencies (default: 3)
--no-common-libs - Skip resolving common libraries for faster analysis
--libs-only - Only resolve common libraries, skip local dependencies
--no-source - Exclude source code from output (smaller file size)
--include-source - Include source code in output (default)

Examples
Analyze with custom output file:
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol output.json
Analyze without dependencies:
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-deps
Custom dependency depth:
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --max-depth=2
Skip common libraries (faster):
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-common-libs
Security-focused analysis (libraries only):
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --libs-only
Smaller output without source code:
bashnode solidity-analyzer.js https://github.com/owner/repo/blob/main/Contract.sol --no-source
Output Format
The analyzer generates a comprehensive JSON report containing:
Metadata

Analysis timestamp
Total files analyzed
File names
Repository information

Dependencies

Found dependencies
Successfully resolved dependencies
Failed dependencies (external and unreachable)

State Variables

Name, type, and visibility
Constants and immutables
File location
Optional source code

Modifiers

Name and parameters
File location
Optional source code

Functions

Function signatures
Visibility and state mutability
Parameters and return values
Applied modifiers
Function calls (internal and external)
Optional source code

Events

Event definitions
Parameters (indexed and non-indexed)

Summary Statistics

Total counts for all components
Dependency resolution success rate
Function call analysis

Example Output
json{
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
    "parameters": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "calls": [{"name": "balanceOf", "arguments": 1}]
  }],
  "summary": {
    "totalFunctions": 15,
    "totalStateVariables": 5,
    "dependencySuccessRate": 0.75
  }
}
