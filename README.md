# 📵 StopCalls  
**Automate your removal from data broker lists & stop unwanted calls**

StopCalls is a privacy-focused Electron app that helps users automatically opt out of data broker databases, reducing spam calls, robocalls, and unwanted marketing outreach.

---

## 🚀 Features

- 🔍 **Data Broker Scanner**  
  Detects which major data brokers may have your information.

- 🤖 **Automated Opt-Out Requests**  
  Submits removal requests to supported data brokers automatically.

- 📬 **Email Verification Handling**  
  Guides users through confirmation emails required for opt-outs.

- ⏱ **Automation Scheduling**  
  Re-run opt-outs weekly/monthly to stay off lists.

- 🔐 **Privacy-First Design**  
  - No tracking  
  - No data selling  
  - All data stored locally (or optionally encrypted)

- 📊 **Dashboard**  
  View:
  - Requests sent  
  - Pending verifications  
  - Successfully removed brokers  

---

## 🖥️ Tech Stack

- **Frontend:** Electron + HTML/CSS (Tailwind optional)  
- **Backend Logic:** Node.js  
- **Automation:** Puppeteer / Playwright  
- **Storage:** Local JSON / SQLite  
- **Email Parsing (optional):** IMAP integration  

---

## 📦 Installation

```bash
git clone https://github.com/YEET200/OptOutly.git
cd OptOutly
npm install
npm start
```

---

## 🔄 How It Works
User enters personal info
App scans supported data brokers
Automations:
Fill out opt-out forms
Submit requests
User confirms emails (if required)
App tracks completion status

---
## 🧠 Supported Data Brokers (Example)
Spokeo
Whitepages
BeenVerified
PeopleFinder
TruthFinder

(More integrations coming soon)
---

## 🔐 Security & Privacy
Data never leaves your device (unless required for opt-out requests)
No analytics or tracking
Optional encryption for stored user data

---
## ⚠️ Disclaimer

StopCalls automates public opt-out processes.

Some data brokers may:

Require manual identity verification
Re-list data over time

This app does not guarantee full removal, but significantly reduces exposure.

---
##📌 Roadmap
 AI-powered broker detection
 One-click email verification
 Cloud sync (optional, encrypted)
 Mobile companion app
 API for integrations

