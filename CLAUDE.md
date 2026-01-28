# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **znn-bridge-react**, a React-based dApp for the Zenon Network that enables token wrapping/unwrapping between Zenon and Ethereum/BSC, plus liquidity staking.

## Build & Development Commands

All commands use environment-specific suffixes: `-dev`, `-test`, `-staging`, `-prod`, or `-supernova-*` variants.

```bash
# Development (runs on localhost:3000)
npm run start-dev      # Local Zenon network
npm run start-test     # Testnet
npm run start-staging  # Staging
npm run start-prod     # Mainnet

# Production builds (outputs to build/)
npm run build-dev
npm run build-test
npm run build-staging
npm run build-prod

# Testing
npm test

# Utilities
npm run clean-restart  # Clean install and start dev
npm run encode-env     # Encode .env to base64 for CI/CD
```

## Architecture

### Tech Stack
- React 18 + TypeScript (strict mode)
- Redux Toolkit for state management
- Web3.js + Ethers for blockchain interaction
- WalletConnect v2 + Web3Modal for wallet connections
- znn-ts-sdk for Zenon Network SDK
- Sass/SCSS for styling
- Create React App with custom Webpack config

### Key Directories
- `src/pages/wizardSteps/` - Multi-step wizard flows (swap, wrap, unwrap, liquidity)
- `src/services/redux/` - Redux slices for all app state
- `src/services/hooks/` - Context providers for network connections
- `src/utils/constants.tsx` - Network configs, token addresses, ABIs
- `src/layouts/` - Main layout and wizard layout components

### Redux State Slices
Located in `src/services/redux/`:
- `walletSlice` - Wallet connection & account state
- `internalNetworkConnectionSlice` - Zenon Network connection
- `externalNetworkConnectionSlice` - Ethereum/BSC connection
- `requestsSlice` - Wrap/unwrap request tracking
- `wizardStatusSlice` - Wizard flow progress
- `liquidityStakingEntriesSlice` - LP staking entries
- `globalConstantsSlice` - Runtime network configs

### Network Providers
The app uses two context providers for blockchain connections:
- `src/services/hooks/internalNetwork-provider/` - Zenon Network (via Syrius extension)
- `src/services/hooks/externalNetwork-provider/` - Ethereum/BSC (via MetaMask/WalletConnect)

### Multi-Network Support
The app connects to multiple blockchains simultaneously:
- **Internal**: Zenon Network (mainnet, testnet, supernova)
- **External**: Ethereum mainnet, Goerli, Sepolia, BSC testnet

Network configuration is controlled by `REACT_APP_NETWORK_ENV` and constants in `src/utils/constants.tsx`.

### Webpack Polyfills
`webpack.config.ts` provides Node.js polyfills (Buffer, crypto, stream) required for web3 libraries in the browser.

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- Triggered by tags (SemVer `v*.*.*`) for mainnet
- Manual trigger for staging/testnet
- Deploys built artifacts to external GitHub Pages repository
