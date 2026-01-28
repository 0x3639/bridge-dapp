# Zenon Network Bridge dApp

A React-based decentralized application for bridging tokens between Zenon Network and Ethereum/BSC. Enables token wrapping/unwrapping and liquidity staking.

## Technology Stack

- React 18 + TypeScript
- Redux Toolkit (state management)
- Web3.js + Ethers (blockchain interaction)
- WalletConnect v2 + Web3Modal (wallet connections)
- znn-ts-sdk (Zenon Network SDK)
- Sass/SCSS (styling)

## Available Scripts

### Development

```bash
npm run start-dev      # Local/development network
npm run start-test     # Testnet
npm run start-staging  # Staging
npm run start-prod     # Mainnet
```

Runs the app at [http://localhost:3000](http://localhost:3000) with hot reloading.

### Production Builds

```bash
npm run build-dev      # Build for development network
npm run build-test     # Build for testnet
npm run build-staging  # Build for staging
npm run build-prod     # Build for mainnet
```

Builds are output to the `build/` folder, minified and optimized for production.

### Supernova Network Variants

```bash
npm run start-supernova-test    # Supernova testnet dev server
npm run start-supernova-staging # Supernova staging dev server
npm run start-supernova-prod    # Supernova mainnet dev server
npm run build-supernova-test    # Build for Supernova testnet
npm run build-supernova-staging # Build for Supernova staging
npm run build-supernova-prod    # Build for Supernova mainnet
```

### Other Commands

```bash
npm test               # Run test suite
npm run encode-env     # Encode .env file to base64 for CI/CD
npm run clean-restart  # Clean install and start dev
```

## Environment Variables

The application uses environment variables to configure network-specific settings. All variables use the `REACT_APP_` prefix and are defined in `src/utils/constants.tsx`.

### How Default Values Work

- **Production/Mainnet**: Most contract addresses are **hardcoded** in `constants.tsx`. Only Supernova-specific values need environment variables.
- **Testnet/Devnet/Supernova**: All contract addresses use environment variables with **placeholder defaults** (`0x0000...` or `zts0000...`) that won't work without proper configuration.

### Core Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_NETWORK_ENV` | Active network environment | Set by npm scripts |

Valid values: `production`, `staging`, `development`, `test`, `supernova-production`, `supernova-staging`, `supernova-test`

### Production/Mainnet

**Hardcoded values** (no env vars needed):
| Token/Contract | Address |
|----------------|---------|
| wZNN (Ethereum) | `0xb2e96a63479C2Edd2FD62b382c89D5CA79f572d3` |
| wQSR (Ethereum) | `0x96546afe4a21515a3a30cd3fd64a70eb478dc174` |
| Bridge Contract | `0xa98706106f7710d743186031be2245f33acea106` |
| LP Token/Pair | `0xdac866A3796F85Cb84A914d98fAeC052E3b5596D` |
| WETH | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| Uniswap V2 Router | `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D` |

**Environment variables** (for Supernova features):
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_MAINNET_CHAIN_ID` | `0` | Supernova mainnet chain ID |
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_MAINNET_ETH_XZNN_ADDRESS` | `0x0000000000000000000000000000000000000000` | xZNN token address |

### Testnet

All values require environment variables. Defaults are placeholders that won't work.

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_TESTNET_CHAIN_ID` | `0` | Supernova testnet chain ID |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_ETH_WZNN_ADDRESS` | `0x0000000000000000000000000000000000000000` | wZNN token address |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_ETH_WQSR_ADDRESS` | `0x0000000000000000000000000000000000000000` | wQSR token address |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_ZNN_ETH_LP_ADDRESS` | `zts000000000000000000000000` | ZNN/ETH LP token (Zenon) |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_QSR_ETH_LP_ADDRESS` | `zts000000000000000000000000` | QSR/ETH LP token (Zenon) |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_LIQUIDITY_EXTERNAL_NETWORK_ETH_ADDRESS` | `0x0000000000000000000000000000000000000000` | Bridge contract |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_LIQUIDITY_DEFAULT_PAIRS_WETH_ADDRESS` | `0x0000000000000000000000000000000000000000` | WETH address |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_LIQUIDITY_DEFAULT_PAIRS_LP_TOKEN_ADDRESS` | `0x0000000000000000000000000000000000000000` | LP token address |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_LIQUIDITY_DEFAULT_PAIRS_PAIR_TOKEN_ADDRESS` | `0x0000000000000000000000000000000000000000` | Pair address |
| `REACT_APP_PUBLIC_CONSTANTS_TEST_LIQUIDITY_DEFAULT_PAIRS_ROUTER_CONTRACT_ADDRESS` | `0x0000000000000000000000000000000000000000` | Router contract |

### Development/Devnet

All values require environment variables. Defaults are placeholders that won't work.

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_DEVNET_CHAIN_ID` | `0` | Supernova devnet chain ID |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_ETH_WZNN_ADDRESS` | `0x0000000000000000000000000000000000000000` | wZNN token address |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_ETH_WQSR_ADDRESS` | `0x0000000000000000000000000000000000000000` | wQSR token address |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_ZNN_ETH_LP_ADDRESS` | `zts000000000000000000000000` | ZNN/ETH LP token (Zenon) |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_QSR_ETH_LP_ADDRESS` | `zts000000000000000000000000` | QSR/ETH LP token (Zenon) |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_LIQUIDITY_EXTERNAL_NETWORK_ETH_ADDRESS` | `0x0000000000000000000000000000000000000000` | Bridge contract |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_LIQUIDITY_DEFAULT_PAIRS_WETH_ADDRESS` | `0x0000000000000000000000000000000000000000` | WETH address |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_LIQUIDITY_DEFAULT_PAIRS_LP_TOKEN_ADDRESS` | `0x0000000000000000000000000000000000000000` | LP token address |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_LIQUIDITY_DEFAULT_PAIRS_PAIR_TOKEN_ADDRESS` | `0x0000000000000000000000000000000000000000` | Pair address |
| `REACT_APP_PUBLIC_CONSTANTS_DEV_LIQUIDITY_DEFAULT_PAIRS_ROUTER_CONTRACT_ADDRESS` | `0x0000000000000000000000000000000000000000` | Router contract |

### Supernova Testnet

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_TESTNET_ETH_XZNN_ADDRESS` | `0x0000000000000000000000000000000000000000` | xZNN token address |
| `REACT_APP_PUBLIC_CONSTANTS_SUPERNOVA_TESTNET_LIQUIDITY_EXTERNAL_NETWORK_ETH_ADDRESS` | `0x0000000000000000000000000000000000000000` | Bridge contract |

## GitHub Actions CI/CD

### Required Secrets

Configure these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret | Required For | Description |
|--------|--------------|-------------|
| `BRIDGE_VARIABLES` | testnet, devnet, supernova | Base64-encoded `.env` file containing all `REACT_APP_*` variables |
| `STAGING_TOKEN` | all deployments | GitHub Personal Access Token with repo permissions for deploying to external GitHub Pages repositories |

**Note:** `BRIDGE_VARIABLES` is **optional** for `production` and `staging` builds because these environments use hardcoded values in `constants.tsx`. The workflow will skip decoding if the secret is not set.

### Creating the BRIDGE_VARIABLES Secret

The `BRIDGE_VARIABLES` secret contains all environment variables as a base64-encoded `.env` file.

**Step 1: Create a `.env` file**

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

See `.env.example` for all available variables with descriptions and default values.

**Step 2: Encode to base64**

```bash
npm run encode-env
# or manually:
base64 -i .env
```

**Step 3: Add to GitHub**

1. Go to your repository on GitHub
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `BRIDGE_VARIABLES`
5. Value: Paste the base64-encoded output
6. Click **Add secret**

### How Variables Are Used in CI/CD

The GitHub Actions workflows decode `BRIDGE_VARIABLES` and export each line as an environment variable:

```yaml
- name: Decode Environment Variables
  run: |
    echo "${{ secrets.BRIDGE_VARIABLES }}" | base64 -d > .env
    while IFS= read -r line; do
      if [[ -z "$line" || "$line" =~ ^# ]]; then
        continue
      fi
      export "$line"
    done < .env
```

### Deployment Workflows

| Workflow | Trigger | Target |
|----------|---------|--------|
| `build-to-mainnet.yml` | Git tag matching `v*.*.*` (SemVer) | Production |
| `build-to-staging.yml` | Manual (`workflow_dispatch`) | Staging |
| `build-to-testnet.yml` | Manual (`workflow_dispatch`) | Testnet |
| `build-to-testnet-supernova.yml` | Manual (`workflow_dispatch`) | Supernova Testnet |

### GitHub Environments

The mainnet workflow uses the `production` GitHub environment. You can configure environment-specific secrets there for additional security (requiring approvals before deployment).

## Changing Hardcoded Production Values

To change the hardcoded production contract addresses, edit `src/utils/constants.tsx`:

```typescript
// Lines 54-77: Token addresses
ethWznnTokenInfo: {
  symbol: "wZNN",
  decimals: 8,
  address: "0xYOUR_NEW_ADDRESS_HERE",
},

// Lines 102-121: Liquidity contracts
defaultLiquidityExternalNetworkDetails: {
  ETH: {
    contractAddress: "0xYOUR_NEW_BRIDGE_ADDRESS",
  },
},
defaultLiquidityPairsDetails: {
  ETH: {
    wethTokenAddress: "0xYOUR_WETH_ADDRESS",
    lpTokenAddress: "0xYOUR_LP_TOKEN_ADDRESS",
    pairAddress: "0xYOUR_PAIR_ADDRESS",
    routerContract: "0xYOUR_ROUTER_ADDRESS",
  },
},
```
