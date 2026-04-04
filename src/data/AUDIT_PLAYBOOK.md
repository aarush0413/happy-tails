# Happy Tails — editorial audit playbook (Pune metro)

Audits are **editorial judgments** based on publicly visible information (Google Business Profile, Practo, JustDial, news, and when possible on-site observation). They are **not** legal advice or a guarantee of outcomes. **Do not** rely on automated mass-scraping of Google Reviews (ToS and reliability issues); use documented manual research with dates.

## Per-provider checklist (before LEGIT / CAUTION / WEAK / BLACKLISTED)

1. **Identity & location**
   - Business name matches the **branch** you list (chains: separate rows per branch where possible).
   - Address and pincode are plausible; coordinates are approximate centroids or geocoded from address.

2. **Google Business / Maps (public)**
   - Star rating and order-of-magnitude review count (note if **chain-wide** counts are misleading).
   - Read enough reviews to see **themes**: billing, hygiene, outcomes, staff, wait times.

3. **Cross-platform sanity**
   - Practo / JustDial / other aggregators: flag **large mismatches** vs Google (e.g. 2.5 vs 4.5).
   - Record sources in `audits.json` style fields (`rating`, `reviewCount` as strings with caveats).

4. **Non-review signals (when relevant)**
   - News, police/court mentions, consumer forums — only with **citable** public references.
   - Use sparingly; serious claims need proportionate sourcing.

5. **Verdict mapping → `trustVerdict` in `providers.json`**
   - **LEGIT** / **LEGIT with NOTES** → `legit` (notes go in `trustDetailedNotes`).
   - **CAUTION** / **LEGIT but VERIFY** → `caution`.
   - **AVOID** / **WEAK** → `weak` (or `blacklisted` only for severe, documented harm patterns).
   - **BLACKLIST** → `blacklisted`.

6. **Ship**
   - Update `providers.json` (`trustSummary`, `trustDetailedNotes`, `trustRedFlags`, `verifiedDate`).
   - Add or update matching row in `audits.json` (`businessName` must match `name` for `getAuditForProvider()` lookups).
   - Bump `LAST_VERIFIED` in `src/lib/constants.ts` when a tranche is published.

## Red-flag categories (non-exhaustive)

- Hygiene / odour / misleading photos (boarding, grooming).
- Billing opacity, cash-only surgery pressure, refund disputes.
- Outcomes: repeated serious clinical complaints (verify sourcing).
- Chain-wide review counts presented as local.
- **Fringe areas**: confirm **emergency plan** (boarding/walking) in writing where relevant.

## Disclaimer

Copy on `/disclaimer` and category pages should remind users that listings are **curated opinions at a point in time** and that they should call ahead and use their own judgment for medical decisions.
