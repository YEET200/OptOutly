# OptOutly Suppression Assistant

Desktop Electron app to automate data-broker suppression request workflows and guide manual completion steps.

## What it does

- Loads a large provider list (including the brokers you requested).
- Opens each provider opt-out/removal page in automated browser sessions.
- Attempts safe generic prefill for common fields (name, email, phone, city/state/ZIP, profile URL).
- Marks providers that require manual steps (captcha, email verify, phone call code, right-to-know flow).
- Exports run results to JSON.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start app:

```bash
npm start
```

## Notes

- Full end-to-end automation is intentionally limited for sites with anti-bot checks, captchas, phone verification, and email confirmation links.
- Use real data only on pages where you have legal right to request suppression.
- Verify each site result manually and keep exported evidence.
