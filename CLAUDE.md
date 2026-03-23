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

# Testing (minimal coverage — only App.test.tsx exists)
npm test

# Linting
npx eslint src/        # ESLint with @typescript-eslint, react-hooks plugin

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
- Create React App with custom Webpack config (`webpack.config.ts` provides Node.js polyfills for Buffer, crypto, stream)

### Key Directories
- `src/pages/wizardSteps/` — Multi-step wizard flows (swap, wrap, unwrap, liquidity)
- `src/services/redux/` — Redux slices for all app state
- `src/services/hooks/` — Context providers for network connections
- `src/utils/constants.tsx` — Network configs, token addresses, ABIs (616 lines, central config file)
- `src/utils/abi.tsx` — Contract ABIs
- `src/layouts/` — Main layout and wizard layout components
- `src/models/` — TypeScript interfaces and types

### App Structure & Provider Nesting

The app has a single route (`App.tsx` → `MainLayout`). `MainLayout` nests providers in this order (outermost first):
1. GTM (Google Tag Manager)
2. SpinnerProvider (global loading state)
3. InternalNetworkProvider (Zenon)
4. ExternalNetworkProvider (Ethereum/BSC)
5. WizardLayout (step orchestration)

### Wizard Flows

The app is driven by two wizard flows controlled by `wizardLayout.tsx`. Each flow is a sequence of numbered steps defined by enums.

**Swap Flow** (`swapFlowSteps`): Welcome → Agreement → Connect Wallets → Swap/Bridge → Request History → Success

**Liquidity Staking Flow** (`liquidityFlowSteps`): Welcome → Agreement → Connect Wallets → Overview → Add Liquidity → Bridge LP Tokens → Bridge History → Stake → Success → Staking History

Step components live in `src/pages/wizardSteps/` with subdirectories per step (e.g., `swapStep/`, `extensionConnect/`, `liquidityStakingStep/`).

### Redux State Slices

Located in `src/services/redux/`:
- `walletSlice` — Wallet connection & account state (zenonInfo, ercInfo)
- `internalNetworkConnectionSlice` — Zenon Network chain ID and node URL
- `externalNetworkConnectionSlice` — Ethereum/BSC chain ID and node URL
- `requestsSlice` — Wrap/unwrap request tracking
- `wizardStatusSlice` — Wizard flow progress (current step, flow type, meta flow)
- `liquidityStakingEntriesSlice` — LP staking entries
- `globalConstantsSlice` — Runtime network configs (initialized from constants.tsx)
- `referralSlice` — Referral code handling

### Network Providers

Two context providers handle blockchain connections:
- `src/services/hooks/internalNetwork-provider/` — Zenon Network (Syrius extension or WalletConnect)
- `src/services/hooks/externalNetwork-provider/` — Ethereum/BSC (MetaMask or WalletConnect)

Each provider directory contains: context definition, WalletConnect wrapper, extension wrapper, and a `useXNetwork` hook.

### Multi-Network Support

The app connects to multiple blockchains simultaneously:
- **Internal**: Zenon Network (mainnet, testnet, supernova variants)
- **External**: Ethereum mainnet, Sepolia testnet, BSC testnet

Network configuration is controlled by `REACT_APP_NETWORK_ENV` and constants in `src/utils/constants.tsx`. Production addresses are hardcoded; testnet/dev addresses come from environment variables (see `.env.example`).

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- `build-to-mainnet.yml` — Triggered by SemVer tags (`v*.*.*`)
- `build-to-staging.yml` / `build-to-testnet.yml` / `build-to-testnet-supernova.yml` — Manual trigger
- Deploys built artifacts to external GitHub Pages repository (`0x3639/bridge.0x3639.com`)
- Requires `STAGING_TOKEN` secret (GitHub PAT) and optionally `BRIDGE_VARIABLES` (base64-encoded .env)
