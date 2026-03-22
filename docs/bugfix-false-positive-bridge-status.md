# Bugfix: False-Positive Bridge Status Toasts

## Bug Description

When connecting a wallet (Syrius extension or WalletConnect), the app displays persistent error toasts:

- "Bridge might be down and unable to process Wrap requests! Please be patient."
- "Bridge might be down and unable to process Unwrap transactions! Please be patient."

These appear even when the bridge is fully operational and the user can bridge tokens successfully.

## Root Cause

The function `checkIfBridgeCanProcessRequests` in `src/utils/utils.tsx` used a **traffic-based heuristic** to infer bridge health:

1. Queried the first 100 blocks from the bridge contract account
2. Filtered for wrap requests (data prefix `1LsRw`) and unwrap requests (data prefix `tgaUAQ`)
3. Checked if any matched request was acknowledged within 8640 momentums (~24 hours)
4. If no recent activity was found, it concluded the bridge "might be down"

**Why this fails:** On a low-traffic bridge, there may be no wrap/unwrap activity in 24 hours even though the bridge is fully operational. The heuristic equates "no recent activity" with "bridge is down" — a false positive.

Additional issues:
- Toast used `autoClose: false` and `type: "error"` — extremely intrusive for a heuristic warning
- Only sampled 100 blocks — if those blocks contain mostly other transaction types, wrap/unwrap requests may not appear at all
- Used `.map()` for side effects instead of `.some()` or `.forEach()`
- No error handling — SDK call failures could disrupt the wallet connection flow

## Fix Applied

### 1. Removed the false-positive heuristic

- **Deleted** `checkIfBridgeCanProcessRequests` function from `src/utils/utils.tsx`
- **Removed** the call site and both toast blocks from `src/pages/wizardSteps/extensionConnect/extensionConnect.tsx`

### 2. Existing authoritative check retained

The app already has a proper bridge status check via `zenon.embedded.bridge.getBridgeInfo()` in the `updateGlobalConstantsWithBridgeInfo` function (same file, called ~30 lines later in the same connection flow). This check:

- Queries the bridge contract directly for its `halted` flag
- Detects `allowKeyGen` state (bridge performing key generation)
- Shows appropriate UI feedback and blocks the user when the bridge is actually down

This authoritative check is **not affected** by this fix and continues to protect users from actual bridge outages.

### 3. Added resilience to the authoritative check

Wrapped `getBridgeInfo()` in a try/catch so that transient RPC errors don't block wallet connection. Halted and KeyGen errors still correctly block the user.

## Files Changed

| File | Change |
|------|--------|
| `src/utils/utils.tsx` | Deleted `checkIfBridgeCanProcessRequests` function |
| `src/pages/wizardSteps/extensionConnect/extensionConnect.tsx` | Removed import, call, and toast blocks; added try/catch around `getBridgeInfo()` |

## Verification

1. `npm run build-prod` — confirm no build errors or missing references
2. Connect wallet via Syrius extension — verify no false-positive bridge status toasts appear
3. If bridge is actually halted (`getBridgeInfo.halted = true`), the "Bridge is currently unavailable!" spinner should still display
4. If `getBridgeInfo()` RPC call fails transiently, wallet connection should proceed without blocking
