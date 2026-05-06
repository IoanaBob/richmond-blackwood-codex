# Product Offerings, Pricing, And Bundles

Status: provisional.
Imported: 2026-05-05.
Sources: local `my-memory`, local `richmond-blackwood-landing`, local `richmond_blackwood_backend`, DatoCMS landing content read on 2026-05-05, Notion Authority Calling strategy docs, VUN client pointer files.

## Purpose

This is the working catalogue for Richmond Blackwood product offerings, bundles, pricing signals, and historical service positioning.

Use this file for product/service truth. Growth and marketing files should point here when they need an offer, price, package, or service boundary.

## Data Boundary

This file may include company-wide pricing and public/CMS offer copy.

Client-specific pricing should not be duplicated here. When a client record contains private pricing, this file points to the relevant client folder instead.

## Current Evidence Summary

The clearest sources show four product eras or surfaces:

| Surface | Status | Main offer | Pricing evidence |
| --- | --- | --- | --- |
| Q3 2025 pricing draft memory | historical/provisional | Broad residency, structuring, and wealth/tax catalogue | Categories only captured in local memory; actual draft prices not yet found |
| DatoCMS / landing checkout | historical or live public CMS surface, review needed | Initial consult and full managed service | EUR 99 consult-only; EUR 19 full-service consult plus variable fee claim |
| Backend lead calculation | internal pricing/savings model | High-earner limited-company optimisation funnel | EUR 1,000 or EUR 1,500 monthly RB fee assumptions; income qualification logic |
| Authority Calling | emerging/proposed product | Pay-per-request authority liaison | EUR 30 request; EUR 20 POA surcharge; volume discounts |

## Historical Catalogue: Q3 2025 Pricing Draft Memory

Source: `../my-memory/memory/companies/richmond-blackwood/product-services-market.md`.

The memory file refers to a Q3 2025 pricing draft for Nomad Capitalist. The captured import does not include actual prices, but it records a broad service catalogue.

### Residency And Immigration

Observed service themes:

- Visa support.
- Investor immigration advisory.
- Treaty-rights residency.
- Registration support.
- Citizenship or naturalisation file preparation.
- Tax residency advisory.
- Digital nomad or remote-worker strategy.

Pricing status: not imported. Find the original Q3 2025 pricing draft before treating this as a priced product menu.

### Company Formation And Structuring

Observed service themes:

- Irish LTD setup.
- Company secretary services.
- Registered office and mail handling.
- Bank account setup.
- Cross-border structuring and IP planning.
- Nominee director or shareholder services.
- Employer-of-record / contractor hosting.
- Virtual office and phone answering.

Pricing status: not imported. Current evidence supports historical availability as service categories, not final pricing.

### Wealth And Tax Management

Observed service themes:

- International tax optimisation.
- Annual Irish tax / CRO annual return filing.
- Capital gains and crypto tax structuring.
- Pre-residency wealth structuring.
- Trust or foundation setup advisory.
- Non-dom strategy.
- Inheritance / CAT planning.
- Dual-jurisdiction tax compliance.
- Exit or re-domiciliation planning.

Pricing status: not imported. Needs original source review.

## Landing / CMS Product Surface

Source: DatoCMS content read through the local `richmond-blackwood-landing` repo on 2026-05-05.

Status: historical or current public CMS surface; needs user review before treating as current public truth.

### Core Positioning

The DatoCMS landing pages position Richmond Blackwood as:

- A personal financial partner / personal CFO.
- A micro family office.
- A company setup and administration service for people earning through, saving through, or investing through a limited company.
- An alternative to a traditional employee/freelancer setup.

### Public Bundle: Richmond Blackwood Setup

Observed on `your-personal-financial-partner` and content-creator landing pages.

Bundle label:

- Richmond Blackwood Set-up / Limited company.

Included features from CMS:

- Tax optimisation, with an average EUR 10,500 savings claim.
- Legal and compliance support.
- Investments and financial planning.
- Bank account setup.
- Accounting and bookkeeping.
- Filings and payroll.
- Dedicated WhatsApp group.

The comparison target is a traditional freelancer or employee setup, where tax optimisation, legal support, bank setup, accounting/bookkeeping, filings/payroll, and on-demand support are framed as limited, absent, or extra-charge.

### Public Bundle: Micro Family Office

Observed on default `why-us` landing page.

Bundle label:

- Micro Family Office.

Included features from CMS:

- Structuring.
- Legal duties and financial management.
- Investments and financial planning.
- Debt consolidation.
- Online onboarding and online communication with experts.
- Positioning against traditional multi-family-office access.

Pricing / capital-access claim:

- CMS says the RB model is "100x less upfront capital - EUR 10,000."
- Traditional multi-family-office comparison says EUR 25,000,000 upfront capital.

Review status: this is strong positioning copy, but public-use approval is needed before relying on the capital comparison.

### Public Service List

Observed on `why-us` and `german-company-incorporation-in-ireland`.

Service cards in CMS:

- Managed Services: RB oversees the business to mitigate risks and ensure organisational duties are fulfilled.
- Registered office address: operate from business centres while keeping personal address private.
- Tax optimisation, accounting, and filings: accounts, annual accounts, and tax returns.
- Bookkeeping and payroll: reporting duties and payroll execution.
- Business banking: online bank account setup support.
- Company structuring: advise on ideal structure and handle organisation/paperwork.

### Public Bundle: German Company Incorporation In Ireland

Observed on `german-company-incorporation-in-ireland`.

Bundle 1:

- Limited Company formation / Irish LTD.
- Supports operations in Germany and the EEA.
- Identity verification.
- All legal costs included.
- Certificate of incorporation.
- Company constitution.
- Share certificates.
- Registers and minutes.

Bundle 2:

- All-in-one financial management.
- Includes the formation service plus business banking, bookkeeping/payroll, accounting/filings, tax optimisations, complex structuring, directorship/secretarial, and investment management / financial planning.

This appears to be the clearest historical two-tier package: one formation bundle and one continuing financial-management bundle.

## Checkout-Facing Tiers

Source: DatoCMS `leadGenerationForm` content plus local landing code.

Status: historical or current CMS surface; needs review against Stripe and current offer strategy.

### Initial Consult Only

CMS title:

- Initial consult only.

CMS pricing:

- EUR 99 initial consult, excluding VAT.

Included according to CMS checklist:

- Tax optimisation consultation only.

Code path:

- `Service.PARTIAL`.
- Stripe price ID in local landing code: `price_1NoroeGi0Z48K4VqnLfZhJzX`.

Actual Stripe amount status: not fetched from Stripe; CMS copy says EUR 99.

### Full Service Exclusive Discount

CMS title:

- Full Service (exclusive discount).

CMS pricing:

- EUR 19 initial consult, excluding VAT.
- Plus "Free Forever" claim.

CMS disclaimer:

- The "free" claim means RB says it will never charge more than the customer saves by using RB services.
- The service fee is variable and determined by needs.

Included according to CMS checklist:

- Tax optimisation consultation.
- Full incorporation services.
- Business banking.
- Bookkeeping and payroll.
- Accounting and filings.
- Directorship and secretarial.
- Investment management.

Code path:

- `Service.FULL`.
- Stripe price ID in local landing code: `price_1Pv1HgGi0Z48K4VqE2PlaMAX`.

Actual Stripe amount status: not fetched from Stripe; CMS copy says EUR 19 plus variable fee claim.

## Backend Pricing And Savings Model

Source: `../richmond_blackwood_backend/app/models/lead.rb` and `../richmond_blackwood_backend/app/models/lead_calculation.rb`.

Status: internal model, not approved public pricing.

### Lead Qualification

The backend treats leads with income of at least EUR 80,000 as qualified for Facebook/Meta lead events.

Observed work-status options:

- Employee.
- Freelancer.
- Limited company.
- Partnership.
- Other.

### Savings Estimator

The backend simple lead estimator maps annual income to annual savings:

| Annual income band | Monthly savings assumption | Annual savings output |
| --- | ---: | ---: |
| EUR 0 to EUR 100,000 | EUR 600 | EUR 7,200 |
| EUR 100,000 to EUR 120,000 | EUR 800 | EUR 9,600 |
| EUR 120,000 to EUR 150,000 | EUR 1,000 | EUR 12,000 |
| EUR 150,000 to EUR 200,000 | EUR 1,300 | EUR 15,600 |
| Above EUR 200,000 | EUR 3,500 | EUR 42,000 |

Review status: this likely explains why marketing and landing copy use high-earner targeting and savings proof points. It should not be used as a public claim without approval.

### Managed-Service Fee Assumption

The lead-calculation model assumes:

- EUR 1,000 monthly RB fee for a discounted case.
- EUR 1,500 monthly RB fee for a high-earner/permanent-resident case.
- If there are multiple owners and the partner income is above EUR 60,000, the model adds a partner fee using the same EUR 1,000 / EUR 1,500 logic.

High earner in this model means annual income of at least EUR 100,000.

Review status: this is an internal calculator assumption, not confirmed current pricing.

## Client-Specific Pricing Evidence

Do not duplicate private client pricing here.

Client-specific service/pricing examples exist under:

- `clients/Companies/VUN/history.md`
- `clients/Companies/VUN/invoices-payments-expenses.md`
- `clients/Companies/VUN/accounting-bookkeeping-payroll.md`
- `clients/Companies/VUN/personal-tax-returns.md`

Use those files for unsanitised client-level pricing and service context. Treat client-specific pricing as evidence, not as canonical package pricing.

## Emerging Product: Authority Calling / Authority Liaison

Source docs:

- Authority Calling Product Strategy: `https://www.notion.so/34ce41301314810caa51c4eb82ca34f0`
- Authority Liaison Bot project: `https://www.notion.so/34ce4130131480adbf76f90e5fad640f`

Status: proposed or in-progress product. Naming, legal boundaries, and public copy require review.

### Product Definition

Customers or professional firms submit an authority-related issue in English. RB contacts the relevant authority or administrative office where possible, including in the relevant language where supported, then returns a written English outcome summary.

Authorities and offices in scope in the strategy docs include:

- Tax offices and revenue bodies.
- VAT and tax-number status offices.
- Company registries.
- Health insurers.
- Banks.
- Immigration, registration, or other administrative offices where phone support is available.

### B2C Pricing

Proposed launch pricing:

- EUR 30 per call request, paid upfront.
- EUR 20 one-time POA processing surcharge where required.

Optional later add-ons in the strategy doc:

- EUR 15 priority handling.
- EUR 49 complex preparation review.

### B2B Volume Pricing

Proposed volume discount table:

| Monthly volume | Discount | Effective price per call | Monthly minimum |
| --- | ---: | ---: | ---: |
| 1 to 9 calls | 0% | EUR 30 | Pay as used |
| 10 to 24 calls | 10% | EUR 27 | EUR 270 for 10 calls |
| 25 to 99 calls | 20% | EUR 24 | EUR 600 for 25 calls |
| 100+ calls | 30% | EUR 21 | EUR 2,100 for 100 calls |

Unused calls should roll over only if agreed in a B2B pilot or enterprise contract.

Enterprise plans can add:

- Monthly reporting.
- Priority routing.
- Custom intake categories.
- Firm-branded client authorization forms.
- Dedicated intake.
- Account manager.

### Strategic Role

Authority Calling is designed as:

- A paid acquisition channel.
- A structured problem-data intake.
- A lead qualification path for tax filings, VAT, payroll, company administration, company structuring, freelancer setup, cross-border tax, and ongoing financial management.
- A future B2B operations product for accountants, tax advisors, relocation firms, legal practices, back-office providers, and similar firms.

## Product Bundle Map

| Bundle / offer | Components | Pricing signal | Source | Review status |
| --- | --- | --- | --- | --- |
| Initial consult only | Tax optimisation consultation | EUR 99 excl. VAT | DatoCMS + landing code | Confirm live/current |
| Full Service exclusive discount | Consult, incorporation, banking, bookkeeping/payroll, accounting/filings, directorship/secretarial, investment management | EUR 19 excl. VAT consult plus variable fee / "free forever" savings claim | DatoCMS + landing code | Confirm if active or historical |
| Irish LTD formation | Identity verification, legal costs, certificate, constitution, shares, registers/minutes, Germany/EEA operations support | Price not found | DatoCMS | Confirm current offer and price |
| All-in-one financial management | Formation plus banking, bookkeeping/payroll, accounting/filings, tax optimisation, complex structuring, directorship/secretarial, investment management | Price not found; backend assumes EUR 1,000 / EUR 1,500 monthly fee | DatoCMS + backend | Confirm current pricing |
| Managed Services | Business oversight, risk/admin duties, accounting/bookkeeping/payroll/VAT/filings context | Client-specific pricing exists; general canonical price not confirmed | CMS + client records | Keep client details in client folders |
| Micro Family Office | Structuring, legal/financial management, investments, debt consolidation, online onboarding/expert communication | EUR 10,000 upfront-capital positioning, not service fee | DatoCMS | Confirm approved public language |
| Authority Calling B2C | Authority call attempt and written outcome summary | EUR 30 request, EUR 20 POA surcharge | Notion strategy docs | Confirm launch pricing |
| Authority Calling B2B | Volume authority liaison for professional firms | EUR 30 base, EUR 27/EUR 24/EUR 21 volume bands | Notion strategy docs | Confirm pilot terms |

## Product-Lifecycle View

| Product / service | Likely lifecycle |
| --- | --- |
| Broad residency / immigration / wealth/tax advisory catalogue | Historical draft / needs original pricing source |
| High-earner limited-company optimisation | Historical/current funnel; confirm current strategy |
| Irish LTD formation | Historical/current CMS surface; confirm active package |
| All-in-one financial management / managed services | Current operational service, but pricing needs review |
| Micro family office positioning | Historical/current positioning; claims need approval |
| Authority Calling / Authority Liaison | Emerging product |

## Review Needed

- Confirm which products are currently sold, paused, historical, or experimental.
- Find and import the original Q3 2025 pricing draft if it still exists in Drive/Notion.
- Confirm whether the EUR 99 and EUR 19 consult prices are active or legacy.
- Confirm whether the "Free Forever" / "never charge more than savings" claim remains approved.
- Confirm the current package names for Initial Consult, Full Service, Managed Services, Irish LTD Formation, Micro Family Office, and Authority Calling.
- Confirm if investment management and debt consolidation remain offerable services.
- Confirm whether backend EUR 1,000 / EUR 1,500 monthly fee assumptions match current pricing.
- Confirm whether Authority Calling is the final name, and whether EUR 30 / EUR 20 POA pricing is approved for launch.
