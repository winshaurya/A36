Absolutely. We’ll do **exactly 5 large parts**, one response at a time.

This is **PART 1/5**. It establishes the product, repo structure, stack, installation commands, engineering rules, contract workspace, data model, and the foundation the later UI/contract prompts will build on.

I checked the current official docs before writing the setup section: Hardhat 3 is current and its recommended initialization supports a `node-test-runner-viem` template; Avalanche C-Chain is EVM/Solidity compatible; Fuji is chain ID `43113`; Motion installs as `motion` and uses `motion/react`; and shadcn's current default for new projects is Base UI. ([Hardhat][1])

# MASTER BUILD PROMPT

# PART 1 OF 5

# PRODUCT FOUNDATION, REPOSITORY ARCHITECTURE, SETUP, DESIGN PHILOSOPHY AND ENGINEERING RULES

You are the principal product designer, senior frontend engineer, interaction designer, Web3 UX designer, and smart-contract-aware architect working on a real production product.

You are not building a coding exercise.

You are not building a generic Reddit clone.

You are not building a crypto dashboard.

You are building a premium consumer social platform whose defining feature is:

# MEME PROVENANCE

The product allows people to share memes socially while recording a canonical content fingerprint and registration event on Avalanche so the application can show which wallet/version was **registered first by this protocol**.

The product's emotional idea is:

> **THE INTERNET FORGETS. THE CHAIN REMEMBERS.**

The product's practical question is:

> **WHO REGISTERED THIS MEME FIRST?**

The entire interface should make that question beautiful, understandable, and useful.

---

# 1. ABSOLUTE INSTRUCTIONS

Follow these rules throughout the entire implementation.

Do not treat this prompt as a loose suggestion.

Treat it as the product specification.

Do not simplify the design merely because a simpler implementation is easier.

Do not replace a distinctive interaction with a generic component without a strong technical reason.

Do not fill the interface with random animation.

Do not produce fake blockchain claims.

Do not fabricate transaction hashes, wallet addresses, block numbers, contract addresses, user counts, partnerships, or on-chain records and present them as real.

Mock data is allowed for the initial frontend.

Mock data MUST be explicitly structured as mock/demo data in the code and UI environment so it can later be replaced with real data.

The application must be architected so the eventual Avalanche integration does not require rebuilding the UI from scratch.

Do not tightly couple components to mock data.

Do not hard-code important business logic inside visual components.

Do not put blockchain logic throughout the entire React component tree.

Separate:

* UI
* domain logic
* blockchain clients
* contract ABIs
* API/data adapters
* state
* mock providers
* wallet providers
* storage providers

The product should be capable of running in a purely mocked/demo mode before deployment.

---

# 2. FIRST PRODUCT PRINCIPLE

This is a social product first.

Blockchain is the provenance layer.

A normal person should be able to:

* open the site
* browse memes
* search
* join communities
* view profiles
* understand posts
* comment
* save
* share
* upload
* understand whether something was registered earlier

without knowing what an RPC is.

The blockchain details should progressively reveal themselves.

Think:

### Layer 1 — human language

"First registered"

"Earlier registration found"

"Registered 2 hours ago"

"3 remixes"

"Original registration"

### Layer 2 — provenance details

"Registered by"

"Wallet"

"Timestamp"

"Block"

"Transaction"

"Content fingerprint"

### Layer 3 — technical verification

Contract address

Transaction hash

Block number

Network

Chain ID

Explorer link

Content hash/fingerprint

The interface should never force Layer 3 onto somebody who only wants to look at a meme.

---

# 3. IMPORTANT CLAIM LANGUAGE

The product must NOT claim that the chain proves who created a meme first across the entire internet.

There can be:

* screenshots
* off-chain posts
* deleted posts
* previous versions
* private communities
* other platforms
* edits
* compression
* cropped versions
* modified images

The smart contract only records what the protocol receives and records.

Therefore the product language should be based on:

**registration provenance**

rather than absolute authorship.

Preferred language:

* First registered
* Earliest registration
* First registration found by this protocol
* Registered on-chain
* Earlier registration
* Provenance record
* Registered version
* Protocol registration
* Registration history

Avoid careless language such as:

* World's original creator
* Proven owner
* True creator
* First person to ever make this meme
* Guaranteed original

unless future evidence systems genuinely justify such a statement.

The design can still be emotionally powerful.

Accuracy comes first.

---

# 4. PRODUCT NAME

Use a temporary internal working name until branding is finalized:

# ORIGIN

The codebase should therefore be able to refer to:

* origin
* provenance
* registration
* meme
* post
* community
* remix
* repost

Do not permanently hard-code "Origin" into every visible string.

Create central brand/content constants so the name can be changed later.

Potential positioning language:

> memes have receipts

> see who got there first

> every meme has a history

> the internet forgets. the chain remembers.

> post it. register it. keep the receipt.

These are product-writing directions, not all mandatory slogans.

---

# 5. PRODUCT PERSONALITY

The interface should feel:

* internet-native
* sharp
* witty
* premium
* slightly chaotic
* visually confident
* technical underneath
* simple on top
* editorial
* tactile
* fast

It should NOT feel:

* corporate
* institutional
* overly serious
* childish
* casino-like
* NFT-bro
* DeFi
* generic AI
* SaaS-template
* overly futuristic
* filled with glowing crypto coins

The product can be playful without becoming visually immature.

The memes provide chaos.

The interface provides structure.

The blockchain provides credibility.

---

# 6. DESIGN NORTH STAR

Use this mental model:

# REDDIT × INTERNET CULTURE × PROVENANCE RECEIPTS × PREMIUM MOTION DESIGN

But do not visually copy Reddit.

Do not copy:

* Reddit's exact card layout
* Reddit's exact typography
* Reddit's exact vote controls
* Reddit's exact navigation
* Reddit's exact colors
* Reddit's visual language

Borrow the conceptual social mechanics:

* communities
* posts
* votes
* comments
* feeds
* profiles
* moderation
* discovery

Build a completely different visual identity.

---

# 7. TECHNOLOGY STACK

Use the following baseline architecture.

## Frontend

Next.js

TypeScript

React

Tailwind CSS

shadcn/ui

Motion

Lucide icons or equivalent clean icon system

---

# 8. WEB3 STACK

Use:

Solidity for smart contracts.

Hardhat 3 for contract development, compilation, testing, and deployment orchestration.

Viem for low-level TypeScript/EVM interaction.

Wagmi for React wallet/account/contract interaction.

Do not introduce multiple competing Web3 libraries unless there is a concrete requirement.

The preferred mental architecture is:

UI

↓

React hooks / application services

↓

Wagmi

↓

Viem

↓

Avalanche C-Chain

The frontend should not directly contain random `window.ethereum` calls scattered through components.

Keep blockchain access centralized.

---

# 9. AVALANCHE NETWORK TARGET

The initial deployment target is:

# Avalanche C-Chain

Avalanche C-Chain is EVM-compatible and supports Solidity smart contracts. ([Avalanche Builder Hub][2])

Development should start on:

# Avalanche Fuji C-Chain

Current Fuji details:

Network:

Avalanche Fuji C-Chain

Chain ID:

43113

RPC:

[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)

Native currency:

AVAX

Mainnet later:

Chain ID:

43114

RPC:

[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)

These network values are from Avalanche's current Builder Hub documentation. ([Avalanche Builder Hub][3])

Do not begin by deploying directly to mainnet.

The intended sequence is:

local development

↓

local contract testing

↓

Fuji deployment

↓

real wallet interaction

↓

real end-to-end provenance registration

↓

contract verification

↓

security review

↓

mainnet deployment

---

# 10. DO NOT CREATE AN AVALANCHE L1 FOR THIS MVP

Do not create a custom Avalanche L1 merely because this is an Avalanche product.

Use the existing Avalanche C-Chain first.

Do not introduce:

* custom subnet
* custom validator network
* custom VM
* tokenomics
* custom gas token
* unnecessary infrastructure

unless a later product requirement specifically demands it.

The MVP is an application deployed against Avalanche C-Chain.

---

# 11. REPOSITORY ARCHITECTURE

Prefer a clean repository that can contain both frontend and contracts.

Use a structure conceptually similar to:

```text
origin/
  apps/
    web/
  contracts/
  packages/
    shared/
    blockchain/
    config/
  docs/
  scripts/
  .env.example
  package.json
  README.md
```

The exact implementation can differ if there is a strong technical reason.

The separation is important.

---

# 12. WEB APP RESPONSIBILITY

`apps/web`

Own:

* landing page
* feed
* explore
* communities
* profile
* meme details
* search
* notifications
* posting UI
* provenance UI
* wallet UX
* mobile navigation
* animations
* responsive layouts
* application state
* mocked data adapters
* API-facing code

The web application should not own the actual Solidity source.

---

# 13. CONTRACTS RESPONSIBILITY

`contracts`

Own:

* Solidity source
* Hardhat configuration
* deployment configuration
* Ignition modules
* tests
* contract deployment records
* ABI generation/export process
* verification configuration
* contract documentation

Hardhat 3 currently supports TypeScript configuration and provides first-class Solidity and TypeScript testing, with Hardhat Ignition available for deployments. ([Hardhat][1])

---

# 14. DO NOT WRITE SMART CONTRACTS INSIDE THE NEXT.JS PROJECT

Do NOT put:

`contract.sol`

inside:

`app/`

Do not mix Solidity with React.

Keep contracts independently buildable.

The web app should be able to run even if contracts have not yet been deployed, using the mock blockchain adapter.

---

# 15. CONTRACT INITIALIZATION COMMANDS

When creating the contract workspace, use Hardhat 3.

The current official Hardhat initialization command is:

```bash
npx hardhat --init
```

Hardhat also provides a non-interactive template intended for automation/AI-agent workflows:

```bash
npx hardhat --init --template node-test-runner-viem
```

Use the latter when it works cleanly for the project because the frontend integration is TypeScript/Viem-oriented. Hardhat documents this template specifically for non-interactive initialization. ([Hardhat][1])

After initialization, verify:

```bash
npx hardhat --help
```

and:

```bash
npx hardhat test
```

Do not proceed while the basic contract workspace is broken.

The current Hardhat 3 project structure includes:

* `hardhat.config.ts`
* `contracts/`
* `test/`
* `ignition/modules/`
* `scripts/`

which is exactly the separation we want here. ([Hardhat][1])

---

# 16. NEXT.JS INITIALIZATION

For a new frontend project, use the official Next.js scaffolding route.

Start with:

```bash
npx create-next-app@latest
```

Use:

* TypeScript
* ESLint
* Tailwind
* App Router
* `@/*` import alias
* source directory only if it makes the repository cleaner

shadcn's current Next.js documentation also recommends the standard Next.js setup and then its CLI initialization. ([shadcn/ui][4])

If starting the frontend directly from the shadcn CLI, the current CLI supports:

```bash
pnpm dlx shadcn@latest init -t next
```

For this project, use npm if the existing environment is npm-oriented; otherwise keep the repository consistently on one package manager.

DO NOT mix npm, pnpm, and yarn lockfiles.

---

# 17. SHADCN SETUP

After Next.js is initialized, initialize shadcn.

Use the current CLI:

```bash
npx shadcn@latest init
```

Or the project-preferred equivalent through the package manager.

New shadcn projects currently default to Base UI, while Radix is still supported through an explicit option. ([shadcn/ui][5])

For this project:

Prefer Base UI for a new project unless a specific component integration requires Radix.

Do not blindly install every shadcn component.

Install only what is required.

Likely initial component set:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add tabs
npx shadcn@latest add tooltip
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add sheet
npx shadcn@latest add command
npx shadcn@latest add toast
```

Do not install components that are not actually needed.

shadcn's current CLI supports adding individual components through the CLI. ([shadcn/ui][4])

---

# 18. MOTION INSTALLATION

Motion is a core requirement.

Install:

```bash
npm install motion
```

Motion's current React package uses:

```text
motion/react
```

for React components and hooks. ([Motion][6])

Do not use outdated Framer Motion instructions when the current Motion package is sufficient.

Use Motion for:

* gestures
* layout animation
* shared element transitions
* spring interactions
* scroll-linked effects
* presence/enter/exit
* drag
* animated values
* sophisticated microinteractions
* page transitions
* image transitions

CSS transitions remain appropriate for tiny static effects.

Do not use Motion for every color transition.

Use the simplest correct tool.

---

# 19. MOTION+ / MOTION EXAMPLES

The supplied Motion example catalogue is a major reference source.

Use the supplied examples as a pattern library.

Especially study/adapt:

* Shared Layout Animation
* Shared View Animation
* Modal Shared Layout
* Layout Animation
* Scroll Zoom Hero
* Scroll Word Reveal
* Scroll Text Lines
* Scroll Direction: Hide Header
* Scroll Image Reveal
* Scroll-linked animations
* Scroll-linked spring
* Path Drawing
* Path Morphing
* Physical Stagger
* Stagger
* Spring
* Press
* Multi State Badge
* Hold to Confirm
* Create Button
* Copy Button
* Number Counter
* Number Formatting
* Engagement Stats
* Smooth Tabs
* Tab Select
* Sheet Modal
* Lightbox
* Carousel Free Scroll
* Carousel Parallax
* Image Reveal Slider
* Command Palette
* Notifications Stack
* Skeleton Shimmer
* Loading Progress
* Loading Ripple
* Cursor Magnetic Target
* Cursor Image Hover
* Adaptive Caret
* Parallax

These are references.

Do not mechanically paste hundreds of patterns into the application.

Select patterns based on interaction purpose.

---

# 20. MOTION HIERARCHY

Every animation belongs to one of three levels.

## LEVEL A — MICRO

Used constantly.

Examples:

button press

tab indicator

bookmark

vote

copy feedback

focus ring

tooltip

menu

count update

Duration should be very short.

It should disappear into normal interaction.

---

## LEVEL B — PRODUCT

Used for meaningful interaction.

Examples:

meme card opening

bottom sheet

provenance receipt

duplicate detection

comment expansion

image lightbox

timeline selection

wallet connection

This animation can be more noticeable.

---

## LEVEL C — CINEMATIC

Rare.

Examples:

landing hero

major provenance reveal

registration success

major origin discovery

These moments can have stronger choreography.

But they must remain performant.

---

# 21. MOTION RULE

Every animation needs a reason.

Allowed reasons:

* state
* hierarchy
* continuity
* feedback
* orientation
* discovery
* delight

If an animation does none of these:

REMOVE IT.

Do not use:

* random particle effects
* random floating blobs
* excessive cursor trails
* constant pulsing
* infinite glowing borders
* excessive parallax
* everything sliding in from random directions

This product needs a motion identity, not animation spam.

---

# 22. THE CORE MOTION METAPHOR

The product is about:

# ORIGIN → PROPAGATION → HISTORY

Motion should continuously reinforce that.

Example:

A meme card expands.

Its provenance badge follows it.

The provenance line draws outward.

Versions appear chronologically.

The user sees the meme propagate through the network.

This should feel like:

**watching cultural history form in real time.**

That is much stronger than:

“a blockchain record loaded.”

---

# 23. DATA ARCHITECTURE

Separate the social data domain from the blockchain domain.

Social data includes:

* post
* title
* caption
* author
* community
* votes
* comments
* reposts
* remixes
* createdAt
* media
* tags

Blockchain/provenance data includes:

* fingerprint
* registration transaction
* registeredBy
* blockNumber
* chainId
* contractAddress
* registrationTimestamp
* provenance status
* parent fingerprint if derived
* relation type

Do not mix these into one giant object.

Create domain boundaries.

---

# 24. POST MODEL CONCEPT

Each post should conceptually have:

identity

content

author

community

engagement

provenance

relationships

UI state

Do not make blockchain metadata mandatory for every post during mocked frontend development.

Posts may exist in states such as:

```text
unregistered
registration_pending
registered
earlier_registration_found
repost
remix
registration_failed
```

The UI must support all of them.

---

# 25. PROVENANCE STATUS MODEL

Create a centralized provenance status system.

Potential values:

```text
UNREGISTERED
REGISTERING
REGISTERED_FIRST
REGISTERED_LATER
EARLIER_FOUND
REPOST
REMIX
DUPLICATE
FAILED
UNKNOWN
```

The exact final model can be adjusted after contract design in Part 4.

Do not scatter strings like:

`"first"`

`"original"`

`"duplicate"`

throughout random components.

Centralize status definitions.

---

# 26. RELATIONSHIP MODEL

The product should distinguish:

### FIRST REGISTRATION

The earliest registration for a matching content fingerprint under the protocol.

### REPOST

The same meme/content is shared again without meaningful modification.

### REMIX

A derivative version that differs from the registered source while retaining a relationship to it.

### DUPLICATE

Same normalized fingerprint or exact matching content according to protocol rules.

### NEW

No existing matching registration is found.

The final smart contract design should support provenance relationships without pretending the contract can semantically understand memes.

The application layer can provide higher-level classification.

---

# 27. CONTENT FINGERPRINT CONCEPT

The contract should NOT store large meme files on-chain.

The product should never attempt to put arbitrary image bytes directly into a standard registration transaction.

Instead think:

media storage

↓

content normalization

↓

cryptographic fingerprint

↓

registration metadata

↓

on-chain registration

The exact fingerprinting strategy must be designed carefully in Part 4.

For now create an abstraction:

`ContentFingerprint`

The frontend should not care whether the implementation is:

* SHA-256
* Keccak
* normalized image hash
* perceptual hash
* composite fingerprint
* another mechanism

until the provenance protocol is finalized.

---

# 28. IMPORTANT DIFFERENCE: CRYPTOGRAPHIC HASH VS PERCEPTUAL HASH

The eventual architecture must recognize that:

A cryptographic hash can detect exact bytes.

It generally does not tell you that:

* compressed JPEG
* resized image
* cropped image
* edited image

is “the same meme.”

A perceptual similarity mechanism can identify visually related content but introduces different semantics, collisions, and trust assumptions.

Therefore do not pretend one hash automatically solves meme identity.

The protocol should eventually distinguish:

**exact content registration**

from:

**application-level similarity / possible derivative**

This is a critical architecture decision.

Do not hide it.

---

# 29. STORAGE ARCHITECTURE

Do not store large media files directly on-chain.

Use an appropriate media/content storage layer.

The frontend should use an abstraction such as:

```text
MediaStorage
```

instead of hard-coding one provider across all components.

The eventual implementation can support a content-addressed system or another durable storage mechanism.

Blockchain stores provenance facts.

Storage stores media.

Application backend/indexer stores social/query-friendly information.

---

# 30. INDEXING ARCHITECTURE

Do not design the feed as:

“read every post directly from the blockchain.”

That will be inefficient and unnecessarily expensive/slow.

The product should conceptually have:

## Blockchain

source of truth for registration events.

## Indexer / data layer

turns events into queryable social/provenance data.

## Frontend

queries an application-friendly interface.

The eventual architecture can be:

```text
Avalanche
    ↓
Contract Events
    ↓
Indexer
    ↓
Database / Query Layer
    ↓
Next.js Application
    ↓
UI
```

For early development:

```text
Mock blockchain events
    ↓
Mock adapter
    ↓
UI
```

This allows the design to be built before all backend infrastructure exists.

---

# 31. EVENT-DRIVEN DESIGN

The smart contract should eventually emit events for important state transitions.

Potential conceptual events:

* registration
* relationship registration
* provenance update if needed
* administrative configuration changes if any

Do not over-event everything.

Events should exist because the indexer needs them.

Part 4 will define exact contract event design.

---

# 32. NO CENTRALIZED ADMIN CONTROL OVER PROVENANCE

Do not design the core provenance mechanism so an administrator can arbitrarily rewrite:

“who was first.”

The point of the protocol is that the earliest registration should be anchored to blockchain history.

Administrative controls may exist for:

* emergency pause
* protocol migration
* configuration
* versioning

but should not allow arbitrary silent rewriting of historical registrations.

Any privileged functionality must be explicit and minimized.

---

# 33. CONTRACT SECURITY MINDSET

Contracts will eventually be treated as production financial/security code even if no token is involved.

Do not write:

* unnecessary payable functions
* unnecessary upgradeability
* unnecessary admin privileges
* arbitrary fund custody
* unrestricted setters
* unsafe external calls
* loops over unbounded user-generated data
* huge on-chain strings
* unnecessary storage

Prefer:

* minimal storage
* immutable configuration when practical
* events
* clear access controls only where necessary
* custom errors
* explicit invariants
* comprehensive testing

The exact implementation belongs in Part 4.

---

# 34. DO NOT INTRODUCE A TOKEN

There is no requirement for:

* `$ORIGIN`
* meme token
* governance token
* staking
* yield
* rewards token
* NFT collection

Do not invent tokenomics.

The product's value proposition is provenance and community.

---

# 35. DO NOT MAKE EVERYTHING AN NFT

A meme registration is NOT automatically an NFT.

Do not force:

ERC-721

ERC-1155

marketplaces

minting

royalties

sales

auctions

into the MVP.

The initial primitive is a provenance registration record.

If tokenization becomes useful later, it can be designed independently.

---

# 36. WALLET UX

Wallet connection is infrastructure.

It is not the hero.

Do not show:

“CONNECT WALLET”

as the first thing a user sees.

Users should be able to:

* browse
* explore
* understand the product

before connecting.

Wallet connection should become relevant when the user wants to:

* register
* post as a wallet identity
* manage identity
* inspect personal registrations

Use Wagmi + Viem as the application interaction layer.

Wagmi is currently TypeScript-focused and built on Viem, with connectors for common browser/mobile wallet ecosystems. ([Wagmi][7])

---

# 37. NETWORK STATE

The UI must support:

correct chain

wrong chain

connecting

connected

disconnected

switching

transaction pending

transaction confirmed

transaction failed

wallet rejected

unsupported wallet

RPC unavailable

contract unavailable

Do not let these errors become raw developer messages.

Translate them into normal human UI.

Example:

Instead of:

`ChainMismatchError`

show:

> You are connected to another network.
>
> Switch to Avalanche Fuji to continue.

Technical information can be available under:

**View technical details**

---

# 38. WALLET IDENTITIES

Do not require users to understand long hexadecimal addresses.

Display:

avatar / identicon

display name where available

short wallet address

and expandable full address.

Example:

`0x7d91...8A2F`

with:

copy

view on explorer

full address

The full address is secondary information.

---

# 39. EXPLORER LINKS

Technical provenance details should eventually include a link to the appropriate Avalanche explorer.

Do not invent explorer links in mock mode.

Create an explorer-link utility based on:

chain ID

transaction hash

contract address

wallet

block

so mainnet/Fuji switching does not require rewriting components.

---

# 40. ENVIRONMENT VARIABLES

Create a `.env.example`.

Never commit:

* private keys
* seed phrases
* wallet secrets
* API keys
* production RPC secrets
* deployer credentials

Never place a private key in:

* React components
* public environment variables
* client bundles
* Git
* README files
* screenshots

The frontend must only receive values safe for the browser.

---

# 41. PUBLIC VS SECRET ENVIRONMENT VARIABLES

Browser-safe configuration may include things like:

public chain ID

public RPC endpoint where appropriate

public contract address

public explorer URL

Public application configuration

Private configuration must stay server-side or in deployment secrets.

Never expose:

deployer private key

server signing key

administrative secret

database service key

indexer signing credential

---

# 42. INITIAL PACKAGE INSTALLATION PLAN

The frontend dependency direction should be approximately:

Next.js

React

TypeScript

Tailwind

shadcn

Motion

Wagmi

Viem

TanStack Query where needed

icons

image/media handling

form validation

Do not blindly install libraries because an AI-generated template uses them.

For Web3, the base installation is conceptually:

```bash
npm install wagmi viem @tanstack/react-query
```

Viem is specifically designed as a typed TypeScript interface for EVM interactions and exposes chain definitions and contract actions. ([Viem][8])

---

# 43. IMPORTANT: DO NOT USE ETHERS UNNECESSARILY

Use Viem as the primary EVM TypeScript layer.

Do not simultaneously use:

ethers

viem

web3.js

thirdweb SDK

wagmi

and several wallet SDKs

unless there is a concrete reason.

A clean architecture is:

Wagmi

↓

Viem

↓

Avalanche

This keeps the TypeScript surface coherent.

---

# 44. ABI ARCHITECTURE

Once contracts are compiled, the frontend needs:

ABI

contract address

network metadata

TypeScript-safe contract interface

Do not manually copy huge ABI arrays around the application.

Create one contract client/configuration layer.

Conceptually:

```text
packages/blockchain/
    chains/
    contracts/
    abis/
    clients/
    provenance/
    explorer/
```

Exact folder names may change.

The principle must not.

---

# 45. CONTRACT ADDRESS MANAGEMENT

Never write:

`0xABC...`

directly into fifteen React components.

Have one deployment configuration source.

Example conceptual mapping:

```text
fuji:
  provenanceRegistry: ...
mainnet:
  provenanceRegistry: ...
```

This should be generated/updated as part of deployment.

---

# 46. MOCK MODE

This is mandatory.

The entire social interface should function without a wallet.

Create a mode:

# DEMO / MOCK

This allows:

* landing page development
* feed development
* responsive testing
* animation testing
* screenshot testing
* UX testing
* empty/error states
* provenance visual design

without requiring:

* wallet
* AVAX
* deployed contract
* indexer

The transition later should be:

```text
MockProvenanceProvider
```

→

```text
AvalancheProvenanceProvider
```

without rewriting the UI.

---

# 47. DOMAIN PROVIDERS

Create abstractions conceptually for:

IdentityProvider

MediaProvider

PostProvider

CommunityProvider

ProvenanceProvider

SearchProvider

NotificationProvider

The initial implementations can be mock implementations.

Later implementations can use real API/indexer/database/blockchain infrastructure.

The UI talks to the domain interface.

The UI does not directly care whether the data came from:

* mock JSON
* database
* RPC
* indexed events

---

# 48. PAGE ARCHITECTURE

The eventual application will have:

## Marketing

`/`

## Social

`/home`

`/explore`

`/communities`

`/communities/[slug]`

`/post/[id]`

`/profile/[username]`

## Creation

`/create`

## Search

`/search`

## Notifications

`/notifications`

## Provenance

Could be integrated into:

`/post/[id]`

or have:

`/post/[id]/provenance`

Choose the architecture that produces the smoothest shared-layout experience.

Do not force full navigations where a modal/overlay/shared view is better.

---

# 49. LANDING PAGE IS NOT AN AFTERTHOUGHT

The landing page must feel like a product launch.

Not:

Navbar

Hero

Three cards

Pricing

Footer

Instead the story should be:

# MEME

↓

# WHO GOT THERE FIRST?

↓

# SEE THE RECEIPT

↓

# SEE THE HISTORY

↓

# SEE THE REMIXES

↓

# JOIN THE CULTURE

↓

# REGISTER YOURS

This is the conceptual narrative.

Part 2 will expand this into the full page specification.

---

# 50. APPLICATION SHELL

Desktop concept:

left navigation

main feed

optional right rail

Mobile:

top bar

main content

bottom navigation

The desktop interface can be information-dense.

The mobile interface must prioritize thumb reach and content.

Never shrink the desktop layout onto mobile.

---

# 51. MOBILE-FIRST RULE

Every significant screen must be explicitly designed for:

320px

375px

390px

430px

768px

1024px

1280px

1440px

1920px

Do not wait until the end to check mobile.

Every component should be tested during development.

Pay special attention to:

* browser chrome
* safe areas
* keyboard appearance
* bottom sheets
* sticky headers
* bottom navigation
* image aspect ratios
* long captions
* long usernames
* long wallet addresses
* transaction metadata
* horizontal overflow

---

# 52. TOUCH DESIGN

No essential mobile action should require tiny tapping.

Use comfortable touch targets.

Hover must never be required to understand functionality.

Anything that works through:

hover

should have a corresponding:

tap

or:

long press

or:

sheet

interaction.

---

# 53. ACCESSIBILITY BASELINE

All components must support:

keyboard navigation

visible focus

reasonable contrast

screen-reader semantics

reduced motion

touch accessibility

logical tab order

semantic headings

accessible labels

Do not use color as the only indicator.

For example:

First registered

must not be communicated purely through a green color.

Use:

icon

label

shape

metadata

or typography.

---

# 54. REDUCED MOTION

Support `prefers-reduced-motion`.

When enabled:

reduce or disable:

* parallax
* large transforms
* elaborate transitions
* cursor effects
* excessive spring movement

But do not destroy the whole interface.

Preserve basic:

* state changes
* feedback
* hierarchy
* visible UI changes

Motion itself should remain accessible.

Motion supports modern gesture and animation patterns across devices; use those features deliberately rather than relying exclusively on desktop hover behavior. ([Motion][9])

---

# 55. PERFORMANCE RULE

The application will ultimately deploy on Vercel.

Performance is part of design.

Do not:

* ship huge assets unnecessarily
* render huge images without optimization
* run unnecessary animation frames
* attach dozens of listeners to every card
* turn every card into a WebGL scene
* use giant videos for decorative purposes
* load every component eagerly

Lazy-load expensive experiences.

Use image optimization.

Use server/client boundaries deliberately.

Use client components only where interaction actually requires them.

---

# 56. NEXT.JS SERVER/CLIENT BOUNDARY

Do not turn the entire application into a client component.

Static content and server-capable UI should remain server-rendered when possible.

Use client components for:

* Motion interactions requiring client execution
* wallet interaction
* live UI state
* gestures
* browser APIs
* interactive forms

Do not put `"use client"` at the highest possible level just to make errors disappear.

---

# 57. DATA FETCHING

Keep data fetching separate from visual composition.

Do not make a meme card fetch its own entire universe of information.

Prefer:

page/container

↓

data loading

↓

typed model

↓

presentational components

This improves:

* performance
* testing
* reuse
* loading states
* mockability

---

# 58. COMPONENT PHILOSOPHY

Build reusable primitives.

Important future primitives:

OriginBadge

ProvenanceReceipt

ProvenanceTimeline

MemeCard

MemeMedia

MemeActions

VoteControl

CreatorIdentity

CommunityChip

WalletIdentity

TransactionStatus

ChainIndicator

RegistrationStatus

RegistrationButton

DuplicateComparison

RemixRelationship

OriginGraph

CommentThread

PostComposer

ShareButton

CopyButton

MobileSheet

DesktopPanel

---

# 59. COMPONENT OWNERSHIP

Each component should have one clear responsibility.

Bad:

`MegaMemeCardThatFetchesWalletAndBlockchainAndCommentsAndShares`

Good:

MemeCard

↓

MemeHeader

MemeMedia

MemeCaption

MemeActions

ProvenanceBadge

Each can compose.

Do not over-fragment tiny elements into useless files.

Use judgment.

---

# 60. DESIGN TOKENS

Before building dozens of screens, define:

spacing

radius

font sizes

line heights

surface colors

text colors

borders

shadows

accent

motion durations

easing/spring definitions

breakpoints

z-index layers

The product should have one coherent visual grammar.

Do not independently choose values for every page.

---

# 61. COLOR PHILOSOPHY

Start with a restrained dark-first design language.

Base:

near-black / charcoal / graphite

Surfaces:

multiple subtle levels

Text:

high contrast primary

muted secondary

Technical metadata:

monospace

Accent:

one signature provenance accent

Do not use five competing neon colors.

Do not use rainbow gradients.

Do not use purple/blue Web3 defaults simply because they look "crypto."

---

# 62. TYPOGRAPHY

Use an elegant modern UI typeface.

Geist or a comparable contemporary grotesk is suitable.

Use monospace sparingly.

Monospace is for:

wallets

hashes

blocks

transactions

technical identifiers

not normal social content.

Meme captions should have strong readability and personality.

---

# 63. BORDER PHILOSOPHY

Borders should create hierarchy.

Do not put a thick border around every card.

Use:

subtle borders

surface changes

spacing

typography

shadows

to establish hierarchy.

---

# 64. SURFACE SYSTEM

Establish at least:

base background

secondary surface

elevated surface

overlay surface

interactive surface

accent surface

Do not make every surface opaque white/black rectangles.

Layering should feel intentional.

---

# 65. RADIUS SYSTEM

Use a limited radius scale.

Do not have:

12px

13px

15px

17px

19px

21px

randomly throughout the code.

Use a coherent scale.

Some elements can intentionally be square/editorial.

Do not force every component into a giant rounded pill.

---

# 66. ICONOGRAPHY

Use a clean icon set.

Icons should be:

* simple
* legible
* consistent
* accessible

Do not use random SVG icons from multiple icon sets.

Do not use emojis as the primary navigation iconography.

Memes can obviously contain emojis.

---

# 67. IMAGE HANDLING

The meme itself is sacred content.

Do not crop a meme awkwardly simply to fit a design template.

Support appropriate aspect ratios.

Consider:

1:1

4:5

16:9

9:16

wide

long screenshots

Image viewer should preserve the important content.

Use object-fit intelligently.

---

# 68. IMAGE PREVIEW

The user should be able to see the meme prominently before submitting it.

Creation flow:

select/upload

↓

preview

↓

caption

↓

community

↓

provenance detection

↓

register

Do not hide the actual meme under an enormous form.

---

# 69. DESIGN FOR FAILURE FROM DAY ONE

Every significant feature must have:

default

loading

success

error

empty

disabled

pending

mobile

desktop

state

For blockchain interactions additionally:

wallet rejected

wrong network

transaction pending

transaction failed

contract unavailable

RPC unavailable

earlier registration

already registered

unknown result

---

# 70. NO GENERIC SPINNERS

Do not have one spinner component solve every loading state.

Use different loading metaphors.

Content:

skeleton

Media:

image placeholder/reveal

Provenance:

record resolving

Blockchain:

transaction progress

Search:

results resolving

Registration:

registration state

The user should understand what is happening.

---

# 71. NO FAKE LOADING

Do not make the interface pretend something is happening for 3 seconds just to show animation.

Animation duration should correspond to actual interaction.

Perceived performance can be improved through:

* immediate optimistic UI where safe
* skeletons
* progressive loading
* clear state
* preserving previous content

---

# 72. ERROR UX

Errors must tell users:

what happened

what it means

what they can do next

Technical details should be expandable.

Example:

Primary:

> Registration couldn't be completed.

Secondary:

> Your wallet rejected the transaction. No registration was recorded.

Technical details:

transaction/request information

The primary UI should never show raw RPC stack traces.

---

# 73. DEVELOPMENT COMMAND DISCIPLINE

The agent MUST actually run commands during implementation.

Do not merely describe commands.

After setup, run the relevant commands and inspect their output.

At minimum:

```bash
npm run dev
```

for the web app.

For contracts:

```bash
npx hardhat test
```

and later:

```bash
npx hardhat compile
```

Use:

```bash
git status
```

frequently.

Use:

```bash
npm run lint
```

when configured.

Use:

```bash
npm run build
```

before claiming production readiness.

If a command fails:

DO NOT hide the failure.

Diagnose it.

Fix it.

Run it again.

---

# 74. WINDOWS DEVELOPMENT

Assume the developer may be running Windows/PowerShell.

Avoid commands that unnecessarily depend on Linux-specific shell behavior.

Do not assume:

bash-only syntax

`rm`

`sed`

`grep`

Unix-only scripts

unless the command is being run in a known compatible environment.

Prefer cross-platform npm scripts.

When PowerShell syntax is appropriate, make it clear.

---

# 75. PACKAGE MANAGER DISCIPLINE

Pick one package manager.

Prefer npm if the current repository is already npm-based.

Do not end up with:

package-lock.json

pnpm-lock.yaml

yarn.lock

at the same time.

Keep the repository reproducible.

---

# 76. NODE VERSION

Before installing the stack, inspect the current Node version:

```bash
node --version
```

Do not blindly downgrade or upgrade.

For Hardhat 3 specifically, the current documentation lists Node.js `v22.13.0` or later as a prerequisite. ([Hardhat][1])

If the existing environment does not meet the tool's supported runtime requirements, resolve that deliberately before continuing.

---

# 77. INITIAL REPOSITORY CHECK

Before creating files, inspect the repository.

Run:

```bash
pwd
```

or the platform equivalent.

Then:

```bash
ls
```

or on PowerShell:

```powershell
Get-ChildItem
```

Determine whether this is:

* empty repo
* existing Next.js app
* existing monorepo
* existing contracts
* existing package manager
* existing deployment configuration

Do NOT destroy existing code without understanding it.

---

# 78. IF STARTING FROM EMPTY REPO

Recommended conceptual sequence:

```text
create repository
        ↓
initialize root package/workspace structure
        ↓
create Next.js web application
        ↓
initialize shadcn
        ↓
install Motion
        ↓
install Wagmi/Viem
        ↓
create contracts workspace
        ↓
initialize Hardhat 3
        ↓
verify contract workspace
        ↓
verify frontend
        ↓
establish shared configuration
        ↓
begin UI implementation
```

Do not start with random page components.

---

# 79. INITIAL CONTRACT DIRECTORY

The contracts workspace should eventually resemble:

```text
contracts/
  contracts/
    ProvenanceRegistry.sol
  test/
  ignition/
    modules/
  scripts/
  artifacts/
  cache/
  hardhat.config.ts
  package.json
```

Do not commit generated artifacts unless there is a deliberate repository reason.

The exact generated structure can follow the current Hardhat template. Hardhat's current default template already organizes contracts, tests, Ignition modules, and scripts separately. ([Hardhat][1])

---

# 80. CONTRACT NAME

Use a descriptive internal name:

# ProvenanceRegistry

The contract is conceptually responsible for:

* registering content fingerprints
* recording the registering address
* recording registration history
* identifying earliest registration
* emitting indexable events
* optionally storing lightweight relationship metadata

Do not make the contract responsible for:

* rendering memes
* ranking posts
* comments
* voting
* recommendation algorithms
* image storage
* user profiles
* community moderation

Those belong elsewhere.

---

# 81. CONTRACT DESIGN PHILOSOPHY

The contract should be intentionally boring.

This is a good thing.

No fancy:

* tokenomics
* NFTs
* speculative mechanics
* unnecessary upgrade proxies
* complex inheritance tree

A strong provenance contract should be:

small

auditable

predictable

event-driven

cheap

hard to misuse

The intelligence belongs in the application/indexing layer.

The blockchain should anchor the important fact.

---

# 82. THE CORE ON-CHAIN FACT

At the heart of the protocol is something conceptually similar to:

> For fingerprint X, the earliest valid registration was submitted by address Y in blockchain transaction Z at blockchain time/block context W.

This is the fact the product cares about.

The exact schema will be specified in Part 4.

---

# 83. BLOCKCHAIN TIME VS FRONTEND TIME

Never assume the frontend's local clock is the authoritative provenance timestamp.

For provenance:

use blockchain-derived data where applicable.

The UI may show relative time:

"12 minutes ago"

but the underlying event should preserve a canonical timestamp/block/transaction reference.

---

# 84. TRANSACTION ORDERING

The product's concept of "first registered" must be determined by blockchain state/order, not:

* browser timestamp
* database insertion order
* API arrival order
* client clock
* upload timestamp

If two transactions interact around the same period, the canonical ordering mechanism must rely on chain transaction/block semantics.

The indexer must preserve enough information to reconstruct ordering.

---

# 85. DUPLICATE CHECK FLOW

Eventually the user experience should be:

User uploads meme

↓

client/server computes candidate fingerprint

↓

application checks existing provenance

↓

if absent:

show:

**READY TO REGISTER**

↓

wallet confirmation

↓

transaction

↓

contract registration

↓

confirmation

↓

**FIRST REGISTERED**

If an existing matching registration exists:

**EARLIER REGISTRATION FOUND**

Then show:

earlier registrant

timestamp

transaction

relationship

and offer the user the appropriate social action.

The exact protocol behavior comes in Part 4.

---

# 86. IMPORTANT UX RULE FOR DUPLICATES

Do not make duplicate discovery feel like punishment.

Bad:

❌ ERROR

Bad:

❌ DUPLICATE MEME — CANNOT POST

Better:

> We found an earlier registration.

Then:

> Your version can still be shared.

Then explain:

repost

remix

reference

or other supported relationship.

The platform is about culture spreading.

A previous registration should not prevent community participation.

---

# 87. SOCIAL GRAPH VS PROVENANCE GRAPH

These are different systems.

Social graph:

who follows whom

who comments

who votes

who joins communities

Provenance graph:

which registered version came first

which version references another

which versions are derivatives

which registration happened earlier

Do not accidentally use follower/social logic to determine provenance.

---

# 88. COMMUNITY MODEL

Communities are social constructs.

They should NOT be stored on-chain in the MVP.

A community can contain:

name

slug

description

avatar

banner

rules

members

moderators

posts

tags

first registrations

trending content

Keep chain interactions focused on provenance.

---

# 89. USER PROFILE MODEL

A user profile can contain:

username

display name

avatar

bio

wallet identity

joined communities

posts

comments

registrations

remixes

reposts

provenance history

Do not make wallet addresses the entire profile identity.

This is a social app.

---

# 90. FEED RANKING

Do not make the smart contract determine the feed.

Feed ranking can eventually consider:

* recency
* engagement
* communities
* user interest
* following
* freshness
* first registrations
* remixes
* trending

The blockchain merely supplies provenance facts.

---

# 91. "FIRSTS" FEED

One of the product's distinctive feeds should be:

# FIRSTS

This is not:

"first posts in the app"

It means:

posts recently registered as the earliest known protocol registration for that content fingerprint.

This becomes an important part of the product identity.

---

# 92. PROVENANCE LANGUAGE SYSTEM

Create reusable semantic labels.

Examples:

FIRST REGISTERED

EARLIER REGISTRATION

REGISTERED

REPOST

REMIX

NEW REGISTRATION

PROVENANCE VERIFIED

REGISTRATION PENDING

NOT YET REGISTERED

REGISTRATION FAILED

These labels should eventually have consistent icons, motion, and typography.

---

# 93. DESKTOP/MOBILE INFORMATION DENSITY

Desktop:

show more metadata.

Mobile:

show the important human information first.

Technical provenance can become a sheet.

Example desktop:

FIRST REGISTERED

@creator

18 min ago

Block 123...

Tx 0x...

Mobile:

FIRST REGISTERED

@creator

18 min ago

tap for receipt

The mobile version should not become visually cluttered.

---

# 94. DESIGN THE PROVENANCE RECEIPT AS A BRAND ASSET

Do not treat the receipt as a random dialog.

It should eventually become one of the platform's most recognizable visual components.

Concept:

A beautifully designed digital receipt.

It contains:

MEME

FIRST REGISTERED

REGISTERED BY

TIMESTAMP

BLOCK

TRANSACTION

FINGERPRINT

RELATED VERSIONS

The receipt can use subtle technical typography.

It should feel like:

evidence

archive

history

verification

not:

crypto UI.

---

# 95. DESIGN SYSTEM BEFORE PAGE SPAM

Do not immediately generate:

20 pages

100 components

500 animations

First establish:

typography

colors

surfaces

buttons

cards

tabs

navigation

badges

avatars

meme card

provenance badge

receipt

sheets

modals

toast

loading

errors

Then compose pages from them.

---

# 96. DO NOT CREATE RANDOM COMPONENT VARIANTS

Variants should have a reason.

For example:

Button:

primary

secondary

ghost

destructive

not:

button-rainbow

button-glow

button-neon

button-3d

button-floating

button-futuristic

unless the design system genuinely needs them.

---

# 97. VISUAL HIERARCHY RULE

Every screen must have:

one primary visual focus

one primary action

clear secondary actions

clear metadata hierarchy

Do not make every element equally loud.

Meme media is usually the primary focus.

Provenance becomes the primary focus when the user explicitly explores origin.

---

# 98. BRAND SIGNATURE

The most important repeated visual motif should be:

# THE ORIGIN SIGNAL

This might be:

* a tiny chronological marker
* a vertical line
* a registration pulse
* a timestamp marker
* a receipt edge
* an animated origin dot

Choose one coherent visual language.

Repeat it across:

feed

meme detail

search

profile

community

landing

notifications

registration flow

This is what makes the product recognizable.

---

# 99. AVOID OVER-CRYPTOFICATION

Never put:

coin icon

wallet icon

chain icon

transaction icon

block icon

on every card.

Blockchain context should appear when relevant.

A meme card should primarily look like a meme card.

A provenance receipt should look technical.

Context determines visual complexity.

---

# 100. THE PRODUCT SHOULD PASS THIS TEST

Ask a random person:

> What does this website do?

After looking at the landing page for five seconds, the expected understanding is approximately:

> "It's a meme-sharing platform where you can see who registered a meme first."

Not:

> "It is some Web3 social app."

That distinction is crucial.

---

# 101. ANTI-AI-GENERATED-AESTHETIC RULE

Before approving any screen, ask:

> Could this exact screen be generated for any random SaaS startup?

If yes:

redesign it.

Examples of generic AI-generated patterns to avoid:

* centered hero with purple gradient
* giant glowing orb
* three glass cards
* floating dashboard
* random blobs
* giant "AI-powered" typography
* meaningless metrics
* excessive rounded boxes
* gradient text everywhere
* generic testimonial carousel

The visual story must be about:

MEMES

ORIGIN

HISTORY

PROPAGATION

COMMUNITY

---

# 102. REAL CONTENT OVER PLACEHOLDER CRAP

When using mock content:

Use realistic meme titles, captions, usernames, communities and metadata.

Do not populate the UI with:

Lorem ipsum

Test User 1

Test User 2

0x123

ABC123

random fake nonsense

unless explicitly marked as technical placeholder data.

The application should feel alive.

But do not present mock blockchain records as real blockchain records.

---

# 103. MOCK CONTENT STRATEGY

Create a small coherent fictional dataset with relationships.

For example:

Meme A

↓

registered first

↓

Meme B = repost

↓

Meme C = remix

↓

Meme D = popular derivative

This makes the provenance graph and timeline believable.

The exact content can be invented for the prototype.

The chain metadata must be clearly mock.

---

# 104. TEST DATA MUST SUPPORT EDGE CASES

Create mock states for:

normal post

first registration

duplicate

repost

remix

pending transaction

failed transaction

no comments

many comments

long caption

no avatar

very long username

long wallet

empty feed

loading feed

RPC error

wrong network

wallet rejected

This should be built into development fixtures.

---

# 105. UI TESTABILITY

Important UI state should be deterministically reproducible.

Do not make it impossible to reach:

duplicate state

transaction failure

empty state

loading state

wrong-network state

in development.

Create controlled mock fixtures.

---

# 106. ROUTING TRANSITIONS

Routing should support smooth shared transitions later.

Meme card:

feed

→

detail

should visually retain the meme identity.

Therefore use stable IDs and consistent layout identifiers.

Do not build the feed and detail page as two visually unrelated worlds.

---

# 107. IMAGE IDENTITY

The same meme appearing in:

feed

search

profile

community

detail

should retain:

same media crop behavior

same origin indicator

same identity

This enables shared layout animation.

---

# 108. UI STATE MACHINE MINDSET

Treat important flows as state machines.

Example registration:

IDLE

↓

CHECKING

↓

EARLIER_FOUND

OR

READY

↓

WALLET_CONFIRMATION

↓

SUBMITTING

↓

PENDING

↓

CONFIRMED

↓

FIRST_REGISTERED

OR

FAILED

Do not implement these as random booleans that can contradict each other.

Avoid impossible states such as:

`isPending=true`

and:

`isConfirmed=true`

at the same time.

Use one coherent state model.

---

# 109. SAME RULE FOR WALLET

Possible wallet state:

DISCONNECTED

CONNECTING

CONNECTED

WRONG_NETWORK

SWITCHING_NETWORK

ERROR

The rest of the app should consume that state.

---

# 110. SAME RULE FOR MEDIA

Possible media state:

EMPTY

SELECTED

PREPARING

UPLOADING

READY

FAILED

Do not let the submit button accidentally fire when the media upload is incomplete.

---

# 111. CREATE FLOW SHOULD FEEL LIKE AN ACTION, NOT A FORM

The user is not filling out an enterprise workflow.

They are:

posting a meme.

The UI should therefore emphasize:

media

caption

community

registration

not:

twenty fields.

---

# 112. SOCIAL EXPERIENCE MUST REMAIN FAST

Blockchain transactions can be slow relative to UI interactions.

Never block the entire application while a registration transaction is pending.

A transaction pending on one meme should not freeze:

feed scrolling

comments

navigation

search

other content

The transaction state belongs to that action.

---

# 113. OPTIMISTIC UI

Use optimistic UI only where safe.

Examples:

vote

bookmark

follow

comment draft

Do NOT falsely show:

"FIRST REGISTERED"

before the chain has confirmed the registration.

For blockchain provenance, confidence must match actual state.

---

# 114. REGISTRATION CONFIRMATION

Only mark:

# FIRST REGISTERED

when the contract/indexing layer provides sufficient confirmation according to the protocol's chosen finality/confirmation strategy.

The UI may show:

Pending

Submitting

Confirmed

but should not falsely represent an unconfirmed transaction as permanent history.

---

# 115. CONTRACT FINALITY ABSTRACTION

Do not hard-code a random number of confirmations across UI components.

Create one blockchain configuration concept:

confirmation policy

Later this can be tuned for the chosen Avalanche deployment architecture.

---

# 116. RPC ABSTRACTION

Do not directly instantiate RPC clients in random UI files.

Centralize:

chain configuration

transport

public client

wallet client strategy

contract addresses

explorer links

This allows:

Fuji

↓

Mainnet

without rewriting application components.

---

# 117. BLOCKCHAIN READS VS WRITES

Separate:

reads

from:

writes

Reads:

public client

indexer/API

Writes:

wallet

user signature

transaction

confirmation

This will make the UI easier to reason about.

---

# 118. SECURITY RULE FOR CLIENT

Never assume the client can be trusted.

Frontend code can be modified.

The smart contract must enforce the actual provenance invariant.

The backend/indexer should validate data.

The frontend merely presents it.

Never rely on a JavaScript condition to enforce:

"only first user"

The chain must enforce the fundamental registration rule.

---

# 119. DATA CONSISTENCY

If frontend says:

First registered by Alice

while the contract says:

First registered by Bob

the frontend is wrong.

The indexer/application must reconcile against the authoritative on-chain record.

---

# 120. THE CONTRACT IS NOT THE DATABASE

Do not attempt to store every:

comment

vote

profile

caption

community

on-chain.

This would be a poor product architecture.

Store only what is genuinely valuable to anchor on-chain.

---

# 121. WHAT SHOULD EVENTUALLY BE ON-CHAIN

Core candidate:

content fingerprint

registrant address

registration event

block/transaction context is inherently available

optional relationship reference

protocol version if needed

Potential lightweight metadata only where justified.

Everything else should be off-chain/application-layer unless there is a very good reason.

---

# 122. WHAT SHOULD STAY OFF-CHAIN

Likely:

image bytes

video

large media

caption

comments

votes

followers

community information

feed rank

notifications

search index

recommendations

moderation records

analytics

Most UI metadata.

---

# 123. CONTRACT COST MINDSET

Every byte written on-chain costs money.

Do not store:

full URLs

long usernames

full descriptions

huge metadata

large strings

image content

just because Solidity allows strings.

Prefer compact identifiers.

The application can resolve identifiers off-chain.

---

# 124. PROVENANCE RELATIONSHIP STRATEGY

The contract should not need to understand whether something is:

"funny"

"gaming"

"anime"

or:

"shitpost."

It only needs to preserve relationships and registration records.

Social semantics belong to the application.

---

# 125. VERSIONING

Because the protocol may evolve:

include a conceptual protocol-version mechanism.

Do not design the initial contract so a future fingerprinting change makes all historical data impossible to interpret.

The contract should make it clear which registration scheme/version produced a given record if multiple schemes become necessary.

Part 4 will specify the practical schema.

---

# 126. DEPLOYMENT ARTIFACTS

After deployment, maintain machine-readable deployment information.

Conceptually:

```text
deployments/
  fuji/
  mainnet/
```

with:

contract address

chain ID

deployment transaction

deployment block if available

ABI reference/version

Do not manually type these into multiple places.

---

# 127. EXPLORER VERIFICATION

After Fuji deployment, verify the contract using the appropriate Avalanche-supported process.

Do not merely say:

"deployment successful"

without recording:

network

chain ID

contract address

transaction hash

verification status

The full deployment/verification process will be covered later.

---

# 128. LOCAL CONTRACT DEVELOPMENT

Use Hardhat's local environment for:

* contract development
* tests
* simulated transactions
* debugging
* gas investigation

Hardhat 3 supports Solidity testing, TypeScript testing, and deployment through Ignition. ([Hardhat][1])

Do not use Fuji for every tiny code change.

---

# 129. TESTING PHILOSOPHY

Contracts need more than:

"does deploy?"

Test:

first registration

second registration

duplicate behavior

ordering

different users

event emission

invalid input

access restrictions if any

edge cases

gas behavior

unexpected states

fuzzing where useful

Part 4 will specify the exact test matrix.

---

# 130. APPLICATION TESTING

Frontend should eventually test:

landing behavior

responsive layouts

meme card

provenance receipt

duplicate state

registration flow

wallet state

wrong network

loading

error

empty

navigation

mobile navigation

keyboard behavior

reduced motion

---

# 131. DESIGN REVIEW LOOP

After building a screen:

Do not immediately move to the next screen.

Review:

hierarchy

spacing

alignment

responsive behavior

interaction states

animation

accessibility

performance

visual uniqueness

Then revise.

The objective is not maximum number of screens.

The objective is maximum quality.

---

# 132. IMPLEMENTATION ORDER

Do NOT build randomly.

Use this order for the foundation:

## PHASE 1

Repository

Next.js

TypeScript

Tailwind

shadcn

Motion

Wagmi

Viem

Hardhat

---

## PHASE 2

Design tokens

fonts

surfaces

button system

card system

navigation

mobile navigation

---

## PHASE 3

MemeCard

ProvenanceBadge

ProvenanceReceipt

CreatorIdentity

WalletIdentity

Status system

---

## PHASE 4

Landing page

---

## PHASE 5

Application shell

---

## PHASE 6

Feed

---

## PHASE 7

Meme details

---

## PHASE 8

Create flow

---

## PHASE 9

Mock provenance provider

---

## PHASE 10

Real Avalanche contract integration

This ordering should be followed unless technical dependencies make another order clearly superior.

---

# 133. WHAT THE AGENT MUST NOT DO

Do NOT:

* write all pages in one enormous file
* create a generic dashboard
* use random animation libraries
* install 50 UI libraries
* introduce tokenomics
* introduce NFTs
* create an Avalanche L1
* hard-code blockchain data everywhere
* put secrets in frontend code
* store images on-chain
* use fake on-chain claims
* make wallet connection the homepage
* sacrifice mobile design
* make desktop hover mandatory
* use animation purely for spectacle
* make every card glow
* turn every element into glass
* clone Reddit
* clone a Web3 template
* claim absolute meme authorship
* treat a perceptual similarity match as mathematical identity
* let frontend code enforce blockchain invariants
* deploy to mainnet before serious testing
* skip contract verification
* skip error states
* skip accessibility
* skip reduced motion
* skip production build

---

# 134. WHAT THE AGENT MUST DO

Do:

* inspect the repository before modifying it
* use current official documentation when a package/API has changed
* run setup commands
* verify installations
* keep TypeScript strict
* keep architecture modular
* establish a real design system
* make mobile first-class
* use Motion purposefully
* build the provenance concept deeply
* model blockchain state explicitly
* maintain a mock mode
* keep contract logic isolated
* test the contract
* test the UI
* run lint/build
* inspect responsive behavior
* handle every failure state
* optimize for Vercel
* preserve accessibility
* use realistic mock content
* keep blockchain claims technically accurate

---

# 135. AGENT WORKING STYLE

Work incrementally.

After each meaningful milestone:

1. inspect the result
2. run the relevant command
3. fix issues
4. review responsive behavior
5. continue

Do not generate 10,000 lines of code and only then discover the architecture is broken.

Do not claim success from static reasoning.

Actually run the project.

Actually build it.

Actually inspect errors.

Actually fix them.

---

# 136. WHEN USING EXTERNAL COMPONENT EXAMPLES

You may adapt patterns from:

Motion

Motion+

shadcn

React Bits

Aceternity UI

other high-quality open-source UI patterns

But the final product must have one unified design system.

Never create:

Motion component A

shadcn component B

Aceternity component C

React Bits component D

all visibly unrelated.

Every imported pattern must be restyled and integrated into the system.

---

# 137. MOTION SOURCE RULE

For any sophisticated interaction, first consider whether Motion already provides a suitable primitive/example.

Do not reinvent:

shared layout

presence

spring

drag

scroll-linked behavior

gesture handling

when Motion already solves it well.

Current Motion supports React through `motion/react`, including cross-device gesture handling and production-focused animation APIs. ([Motion][6])

---

# 138. SHADCN SOURCE RULE

Use shadcn for accessible base primitives.

Then visually customize them.

Do not leave default generated component appearance untouched everywhere.

The components are a foundation.

The product design is ours.

---

# 139. CONTRACT SOURCE RULE

Use official Avalanche documentation for:

network configuration

RPC

deployment

verification

and current hardfork/EVM compatibility requirements.

This matters because Avalanche's current documentation notes EVM-version considerations for smart contracts, including an explicit Cancun target for Avalanche C-Chain/L1 configurations when relevant to newer Solidity compiler defaults. Do not blindly assume the compiler's default EVM target is correct; configure it deliberately for the target environment. ([Avalanche Builder Hub][10])

---

# 140. NETWORK CONFIGURATION MUST BE EXPLICIT

Create clear network names:

LOCAL

FUJI

MAINNET

Never infer mainnet because a variable is missing.

Never default an accidental production deployment.

Development should default to local/Fuji.

Mainnet must require explicit configuration.

---

# 141. DEPLOYMENT SAFETY

The agent must never automatically deploy to mainnet merely because deployment works.

Mainnet deployment should require:

explicit mainnet environment

explicit deployer credentials

explicit target network

explicit contract review

explicit confirmation in the deployment workflow

and production-ready test status.

---

# 142. WALLET SAFETY

Never request a user's seed phrase.

Never ask the user to paste a private key into chat.

Never print private keys.

Never store wallet secrets in repository files.

Use environment-secret mechanisms where a deployer account is needed.

For real user interaction, use browser/mobile wallet signing.

---

# 143. FOLDER OWNERSHIP RULE

Before creating a file, decide which domain owns it.

Examples:

visual primitive → UI

provenance visualization → provenance UI

blockchain call → blockchain package/service

post data model → domain/data

contract → contracts

deployment → contracts deployment

static marketing content → marketing/content

Do not create a file in the nearest folder just because it is convenient.

---

# 144. TYPESCRIPT RULE

Use strict TypeScript.

Avoid:

`any`

unless there is a genuinely unavoidable third-party boundary.

Do not use type assertions to silence architectural problems.

Blockchain addresses, hashes, statuses and transaction states should have explicit types where practical.

---

# 145. STATE MANAGEMENT RULE

Do not introduce a giant global state store automatically.

Start with:

React state

context where appropriate

server data/cache layer

Wagmi state

domain services

Only introduce a global store where actual cross-cutting state requires it.

---

# 146. FORM VALIDATION

Use a typed validation layer for user input.

Validate:

caption

community

tags

file metadata

acceptable media

wallet/network state

Do not trust client-side validation as security.

---

# 147. ROUTE DATA

Route pages should consume typed models.

Do not pass huge opaque JSON blobs through ten levels of props.

Use clear domain models.

---

# 148. THE FIRST REAL COMPONENTS TO PERFECT

Before building the whole site, perfect these:

# 1. MemeCard

# 2. ProvenanceBadge

# 3. ProvenanceReceipt

# 4. Shared Meme → Detail transition

# 5. Origin Timeline

# 6. Create/Register interaction

If these six things are excellent, the rest of the product will have a strong foundation.

---

# 149. QUALITY BAR FOR MEME CARD

The card should support:

default

hover

pressed

upvoted

downvoted

saved

shared

loading

failed media

first registration

repost

remix

duplicate

mobile

desktop

The meme image should remain the dominant visual object.

The provenance information should be visible but not annoying.

---

# 150. QUALITY BAR FOR PROVENANCE

The provenance badge should answer:

"What is this?"

The receipt should answer:

"Who registered it?"

The timeline should answer:

"What happened afterward?"

The duplicate comparison should answer:

"Was this already registered?"

The explorer link should answer:

"Can I independently inspect it?"

These are separate UX jobs.

Do not force one component to answer all four.

---

# 151. PRODUCT LOOP

The core user loop is:

discover meme

↓

laugh

↓

inspect origin

↓

discover history

↓

discover community

↓

post meme

↓

check provenance

↓

register

↓

receive receipt

↓

share

↓

others remix/repost

↓

history becomes richer

This loop should influence both product design and motion design.

---

# 152. CORE PRODUCT MAGIC

The moment a user sees:

> **EARLIER REGISTRATION FOUND**

and then watches the earlier meme/registration slide into position alongside their upload,

that should be one of the platform's magic moments.

The application should make provenance feel tangible.

Not abstract.

Not technical.

Tangible.

---

# 153. SECOND MAGIC MOMENT

When a user genuinely becomes the earliest registration:

the application should say:

# FIRST REGISTERED

Then reveal:

who

when

where

transaction

fingerprint

This should feel like receiving a permanent digital receipt.

---

# 154. THIRD MAGIC MOMENT

When someone opens a popular meme months later and sees:

FIRST REGISTERED

→

repost

→

remix

→

viral version

→

current version

the user should understand that the platform has turned a meme into a small piece of cultural history.

That is the product's long-term reason to exist.

---

# 155. DEVELOPMENT CHECKPOINT BEFORE PART 2

Before moving into the full visual/landing implementation, verify:

## Frontend

Next.js runs

TypeScript works

Tailwind works

shadcn works

Motion works

Wagmi installed

Viem installed

---

## Contracts

Hardhat 3 initializes

Hardhat config exists

contracts folder exists

test folder exists

Ignition exists

Hardhat test command works

---

## Architecture

mock mode exists conceptually

provenance provider is isolated conceptually

chain config is centralized conceptually

contract address configuration is centralized

wallet state is centralized

---

## Design

typography selected

surface system defined

spacing system defined

color system defined

motion hierarchy defined

MemeCard concept defined

ProvenanceBadge concept defined

ProvenanceReceipt concept defined

---

# 156. STOP CONDITION

Do not proceed into detailed page implementation if:

the project does not build

the package manager is inconsistent

the Next.js app is broken

Hardhat cannot compile/test

TypeScript has unresolved architectural errors

the design system is not established

or the repository is full of duplicate/conflicting component systems.

Fix foundation problems first.

---

# 157. FINAL COMMAND CHECKLIST FOR THIS PART

For a fresh repository, the agent should use the appropriate equivalent of:

```bash
node --version
npm --version
```

Then create the Next.js application using the current official scaffolding:

```bash
npx create-next-app@latest
```

Initialize shadcn:

```bash
npx shadcn@latest init
```

Install Motion:

```bash
npm install motion
```

Install Web3 dependencies:

```bash
npm install wagmi viem @tanstack/react-query
```

Create/enter the contracts workspace and initialize Hardhat 3:

```bash
npx hardhat --init --template node-test-runner-viem
```

Verify Hardhat:

```bash
npx hardhat --help
```

Run contract tests:

```bash
npx hardhat test
```

Run the frontend:

```bash
npm run dev
```

Then eventually:

```bash
npm run lint
npm run build
```

The exact commands may be adjusted to the repository/package-manager structure, but the agent must preserve the same setup intent.

---

# 158. CURRENT OFFICIAL NETWORK REFERENCE

Use Avalanche's current C-Chain configuration rather than stale blog posts.

Fuji:

Chain ID `43113`

RPC:

`https://api.avax-test.network/ext/bc/C/rpc`

Mainnet:

Chain ID `43114`

RPC:

`https://api.avax.network/ext/bc/C/rpc`

Avalanche's current Builder Hub lists these values. ([Avalanche Builder Hub][3])

---

# 159. PART 1 END STATE

At the end of this part of the work, the project should NOT yet be considered visually finished.

Instead it should have a strong foundation:

## Architecture

clean

typed

modular

testable

---

## Blockchain

isolated

Avalanche-ready

Fuji-first

Hardhat-based

Viem-compatible

---

## Frontend

Next.js

TypeScript

Tailwind

shadcn

Motion

Wagmi

Viem

---

## Product

provenance-first

social-first

mobile-first

motion-first

---

## UX principle

The blockchain should disappear when the user does not need it.

The provenance should become highly visible when the user wants to know:

# WHO REGISTERED THIS FIRST?

---

# 160. THE ONE SENTENCE EVERY IMPLEMENTATION DECISION SHOULD PASS

Before implementing anything, ask:

> **Does this make meme provenance more understandable, more delightful, more trustworthy, or easier to use?**

If yes:

continue.

If no:

question whether it belongs.

Do not add complexity merely because modern Web3 tooling makes it possible.

Build the product around the idea.

Not around the technology.

# END OF PART 1 OF 5

### What Part 1 establishes

The important architectural decision here is that **the social platform and the provenance protocol are separate layers**. That lets you make the UI extremely rich without forcing every feed interaction through Avalanche.

I’ve also deliberately chosen **Hardhat 3 + Solidity + Viem + Wagmi** rather than mixing several competing EVM stacks. Hardhat 3 currently recommends a Viem-oriented project template and supports TypeScript tests; Avalanche C-Chain is EVM/Solidity-compatible; Fuji is `43113`. ([Hardhat][1])

**Part 2/5 is the monster visual section:** the complete landing page, every section, exact component behavior, Motion choreography, scroll storytelling, hero, provenance visualization, responsive behavior, typography, and the specific Motion patterns to use where.

[1]: https://hardhat.org/docs/getting-started "Getting started with Hardhat 3 | Hardhat 3"
[2]: https://build.avax.network/docs/dapps?utm_source=chatgpt.com "Primary Network | Avalanche Builder Hub"
[3]: https://build.avax.network/docs/primary-network?utm_source=chatgpt.com "Primary Network | Avalanche Builder Hub"
[4]: https://ui.shadcn.com/docs/installation/next?utm_source=chatgpt.com "Next.js - shadcn/ui"
[5]: https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default?utm_source=chatgpt.com "July 2026 - Base UI as the Default - shadcn/ui"
[6]: https://motion.dev/docs/react-installation?utm_source=chatgpt.com "How to install Motion for React | Motion for React"
[7]: https://wagmi.sh/?utm_source=chatgpt.com "Wagmi | Reactivity for Ethereum apps"
[8]: https://viem.sh/docs/getting-started?utm_source=chatgpt.com "Getting Started · Viem"
[9]: https://motion.dev/docs/react?utm_source=chatgpt.com "Motion for React: Get started - React Animation Library | Motion for React"
[10]: https://build.avax.network/docs/avalanche-l1s/add-utility/deploy-smart-contract?utm_source=chatgpt.com "Deploy a Smart Contract | Avalanche Builder Hub"
