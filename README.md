# Bharat View

A local-first newsroom and claim review interface. **The bundled stories are sample content, not verified reporting.** The project currently has no news feed ingestion or independent source-checking integration. The research-cycle button intentionally returns no stories until real feeds are connected.

## Run locally without a paid AI API

1. Install [Ollama](https://ollama.com/download) on the same computer that will run this app.
2. Download a model once, for example `ollama run qwen3:4b`. This model is about 2.5 GB; choose a smaller model if your computer has limited memory.
3. Install the project dependencies with `npm install`.
4. Copy `.env.example` to `.env` if you need to change the defaults.
5. Start the app with `npm run dev` and open the local address printed by the server.

Ollama runs inference on your own computer, so the app makes no per-request model API charges. You still need storage, suitable computer hardware, electricity, and internet once to download the model. Local models can also produce incorrect answers; they do not verify news unless the app retrieves and checks actual sources.

The server calls Ollama at `OLLAMA_BASE_URL` (default `http://127.0.0.1:11434`) using `OLLAMA_MODEL` (default `qwen3:4b`). The app listens on `127.0.0.1` by default. Do not expose it publicly as-is; public deployments need authentication and abuse/cost controls.

## NVIDIA options

Ollama can use a supported NVIDIA GPU on the local computer; this keeps inference local. NVIDIA-hosted NIM/API access is a different service: NVIDIA lists hosted free endpoints, but quotas and terms can change, so hosted inference cannot be promised as free forever.

## Current limitations

- No RSS, news API, official-source retrieval, URL validation, or evidence archive is configured.
- Model output is analysis of user-provided text only, never an independent fact-check.
- “Re-verify” does not change a verdict because the app has no verification source configured.
- Approval is a local UI status; this project does not publish posts to X.
- Old seed-story fixtures remain in the source file for reference but are no longer loaded into the newsroom.
