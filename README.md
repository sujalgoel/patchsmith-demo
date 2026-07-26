# acme-support-desk

Internal support-desk automation for Acme Corp:

- `src/lib/summarize.ts` — ticket summarization + sentiment (OpenAI)
- `src/lib/assistant.ts` — helpdesk triage assistant
- `src/lib/claude.ts` — agent reply drafting (Anthropic)
- `src/lib/billing.ts` — priority-support billing (Stripe)
- `worker.py` — nightly backlog classification batch

> Demo repository for [Patchsmith](https://github.com/apps/patchsmith-app) — a realistic
> snapshot of a codebase that has quietly fallen behind its API vendors.
