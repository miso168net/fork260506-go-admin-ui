<!--
SYNC IMPACT REPORT
==================
Version change: (uninitialized template) → 1.0.0
Bump rationale: Initial ratification — first concrete constitution for go-admin-ui.
                MAJOR=1 marks formal adoption; MINOR/PATCH start at 0.

Modified principles: N/A (initial ratification)
Added sections:
  - Core Principles (5 principles)
    I.   Component Reusability First
    II.  Lint & Style Discipline
    III. Test-First for Logic Changes (NON-NEGOTIABLE)
    IV.  Backend API Contract Stability
    V.   Incremental Migration Compatibility (Vue 2 → Vue 3)
  - Technology Stack & Quality Standards
  - Development Workflow & Quality Gates
  - Governance
Removed sections: None

Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check uses runtime
       resolution ("[Gates determined based on constitution file]"); no static
       principle references; no edits required.
  - ✅ .specify/templates/spec-template.md — No principle-specific references;
       no edits required.
  - ✅ .specify/templates/tasks-template.md — Phase model is generic; no edits
       required.
  - ✅ .specify/templates/checklist-template.md — Generic; no edits required.
  - ✅ CLAUDE.md (project) — graphify rules already documented; no edits
       required for initial ratification.

Follow-up TODOs: None.
-->

# go-admin-ui Constitution

## Core Principles

### I. Component Reusability First

Every interactive UI element with non-trivial logic MUST be implemented as a reusable
Vue 3 Single-File Component under `src/components/` before being used in a page view.
Page views (`src/views/`) compose components; they MUST NOT inline complex logic that
could be reused. Components MUST expose explicit `props`, emit explicit `events`, and
avoid reaching into parent state.

**Rationale**: This codebase ships dozens of admin pages (User, Role, Department, Menu,
Dictionary, etc.) that share patterns (CRUD tables, JsonForm builders, pagination,
dialogs). Without disciplined component extraction, these pages diverge and bug fixes
must be repeated N times.

### II. Lint & Style Discipline

All committed JavaScript and Vue files MUST pass `npm run lint` (ESLint with
`eslint-plugin-vue`) without errors. The `husky` + `lint-staged` pre-commit hook is
the enforcement boundary and MUST NOT be bypassed (`--no-verify` is forbidden except
for documented hot-fix scenarios approved by the maintainer). Style mismatches with
the existing codebase (indentation, quote style, import ordering) are treated as
correctness issues, not preferences.

**Rationale**: A Vue codebase of this size accumulates dead code, unused imports, and
template bugs invisibly. Lint at commit time keeps `master` green and prevents
review cycles spent on mechanical fixes.

### III. Test-First for Logic Changes (NON-NEGOTIABLE)

Any change to code under `src/utils/`, `src/store/`, `src/api/`, or shared composables
MUST be accompanied by a Jest unit test that fails before the change and passes after.
For UI-only changes (template/style adjustments without logic), tests are NOT required
but the contributor MUST state this explicitly in the PR description. The full
`npm run test:unit` suite MUST pass before merge.

**Rationale**: Utility functions, the Vuex store, and API wrappers are dependencies of
every page. A regression here breaks the whole admin. Tests pin behavior so refactors
(including the ongoing Vue 3 migration) are safe.

### IV. Backend API Contract Stability

`src/api/*.js` modules are the contract surface with the go-admin Gin backend. Each
endpoint wrapper MUST mirror the backend Swagger contract (path, method, params,
response shape). When a backend route changes, the corresponding frontend wrapper
MUST be updated in the same PR or a tracking issue MUST link the two PRs. Mocks
under `mock/` MUST stay aligned with real responses.

**Rationale**: This UI is a thin client over the Go/Gin/Casbin backend. Silent drift
between `src/api/` and the backend produces runtime errors that bypass type checks
and lint. Treating the API layer as a contract surface forces coordination.

### V. Incremental Migration Compatibility (Vue 2 → Vue 3)

The codebase is mid-migration to Vue 3 + Element Plus (see `UPGRADE_TO_VUE3.md`).
Until the migration is declared complete:

- New code MUST use Vue 3 Composition API and Element Plus components.
- Legacy Options API code MAY remain unchanged unless the file is being modified for
  another reason; in that case, migrate the touched file fully rather than leaving
  it half-converted.
- A change MUST NOT break a working page in service of style alignment alone.
- Removal of legacy patterns is permitted only when no remaining caller depends on them
  (verify via grep / graphify-out before deletion).

**Rationale**: Big-bang rewrites stall. Incremental migration ships value continuously,
but only if each PR leaves the tree in a working state. Half-converted files are
worse than fully-legacy ones because they confuse future contributors.

## Technology Stack & Quality Standards

**Runtime & Build**
- Node.js >= 18 LTS (per `UPGRADE_TO_VUE3.md` aligned target).
- `vue-cli-service` (Webpack 5 under the hood) for `dev` / `build:prod` / `build:stage`.
- Babel via `@babel/core` 7.x with `@vue/babel-preset-app`.

**Framework**
- Vue 3.4+ with Composition API for new code; `<script setup>` SFCs preferred.
- Element Plus 2.8+ for UI primitives (no Element UI / Vue 2 components in new code).
- vue-router 4 for routing; vuex 4 for global state.
- `@vueuse/core` is the preferred source of generic composables.

**Code Health**
- ESLint 7 + `eslint-plugin-vue` 9 enforced via `lint-staged` pre-commit.
- Jest 26 + `@vue/test-utils` 2 for unit tests; tests live alongside or under
  `tests/`.
- SCSS as the styling language; shared variables via `sass-resources-loader`.

**Compatibility**
- Browser targets: `> 1%` and `last 2 versions` (per `package.json` browserslist).
  Changes that drop browsers from this set are MAJOR-level concerns.

**Out of Scope** (until explicitly added by amendment): TypeScript migration,
Vite migration, server-side rendering, mobile-native shells.

## Development Workflow & Quality Gates

**Branching**
- Feature work happens on dedicated branches (Spec Kit's `speckit-git-feature`
  helper is the default path; otherwise `<topic>-<date>` is acceptable).
- `master` is the integration branch; `main` (current default in this fork) tracks
  upstream-aligned state. Direct commits to either are forbidden except for
  trivial typo fixes by maintainers.

**Pre-Merge Gates** (all MUST pass)
1. `npm run lint` — zero errors. Warnings reviewed but not blocking.
2. `npm run test:unit` — full pass.
3. Manual smoke-test of any page touched by the change, in `npm run dev`.
4. PR description cites which Constitution principles the change upholds, and
   declares any deviation under "Complexity Tracking" with justification.

**Spec-Driven Path** (recommended for non-trivial features)
- `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` →
  `/speckit-implement`. Auto-commit hooks (`after_*`) are enabled and SHOULD be
  used to maintain a clean history.
- Hot-fixes and one-line tweaks MAY skip the spec-driven path; document the
  reason in the commit message.

**graphify Hygiene**
- After modifying source files in a session, run `graphify update .` to keep
  `graphify-out/` current. The graph is the canonical entry point for codebase
  questions per the project `CLAUDE.md`.

## Governance

This Constitution supersedes ad-hoc conventions and individual preferences. When a
PR comment, IDE setting, or external tutorial conflicts with this document, this
document wins until amended.

**Amendment Procedure**
1. Open a PR that edits `.specify/memory/constitution.md` with the proposed change.
2. The PR description MUST state the version bump (MAJOR/MINOR/PATCH) and rationale,
   following the rules below.
3. Sync any dependent template changes (plan / spec / tasks / checklist) in the
   same PR; the Sync Impact Report at the top of this file MUST be updated.
4. Maintainer review and merge constitute ratification of the new version.

**Versioning Policy** (Semantic Versioning of governance, not the npm package)
- **MAJOR**: Backward-incompatible removal or redefinition of a principle, or
  change to the amendment / governance procedure itself.
- **MINOR**: New principle added, or material expansion of an existing one.
- **PATCH**: Clarifications, wording fixes, typo corrections, non-semantic
  refinements.

**Compliance Review**
- Reviewers MUST verify PRs against the Core Principles. A PR that violates a
  principle without an explicit, justified exception MUST be requested-changes.
- Exceptions are documented in the PR description under "Complexity Tracking" or
  the equivalent section in plan.md, including the simpler alternative considered
  and why it was rejected.

**Runtime Guidance**
- Day-to-day agent guidance lives in `CLAUDE.md` (project root) and the workspace
  `CLAUDE.md` one level up. Those files MUST defer to this Constitution on any
  conflict.

**Version**: 1.0.0 | **Ratified**: 2026-05-07 | **Last Amended**: 2026-05-07
