const { chromium } = require("playwright");

function safe(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function fillFirstVisible(page, selectors, value) {
  const text = safe(value);
  if (!text) return false;
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      try {
        await locator.fill(text, { timeout: 1500 });
        return true;
      } catch (_error) {
        // Try next selector
      }
    }
  }
  return false;
}

async function genericPrefill(page, profile) {
  const fullName = [safe(profile.firstName), safe(profile.lastName)].filter(Boolean).join(" ");
  await fillFirstVisible(
    page,
    ["input[name*=first i]", "input[id*=first i]", "input[placeholder*=first i]"],
    profile.firstName
  );
  await fillFirstVisible(
    page,
    ["input[name*=last i]", "input[id*=last i]", "input[placeholder*=last i]"],
    profile.lastName
  );
  await fillFirstVisible(
    page,
    ["input[name*=name i]", "input[id*=name i]", "input[placeholder*=name i]"],
    fullName
  );
  await fillFirstVisible(
    page,
    ["input[type='email']", "input[name*=email i]", "input[id*=email i]"],
    profile.email
  );
  await fillFirstVisible(
    page,
    ["input[type='tel']", "input[name*=phone i]", "input[id*=phone i]"],
    profile.phone
  );
  await fillFirstVisible(
    page,
    ["input[name*=city i]", "input[id*=city i]", "input[placeholder*=city i]"],
    profile.city
  );
  await fillFirstVisible(
    page,
    ["input[name*=state i]", "input[id*=state i]", "input[placeholder*=state i]"],
    profile.state
  );
  await fillFirstVisible(
    page,
    ["input[name*=zip i]", "input[id*=zip i]", "input[placeholder*=zip i]"],
    profile.zip
  );
  await fillFirstVisible(
    page,
    ["input[name*=url i]", "input[id*=url i]", "input[placeholder*=url i]"],
    profile.profileUrl
  );
}

function inferManualReason(provider) {
  const tags = provider.tags || [];
  if (tags.includes("captcha") || tags.includes("captcha-possible") || tags.includes("captcha-heavy")) {
    return "Likely captcha challenge; manual solve required.";
  }
  if (tags.includes("email-confirmation") || tags.includes("email-verify")) {
    return "Email confirmation link likely required.";
  }
  if (tags.includes("phone-verification") || tags.includes("call-code")) {
    return "Phone/call verification likely required.";
  }
  return "Provider requires guided manual completion.";
}

async function runSuppressionFlow({ provider, profile, onLog, shouldStop }) {
  const browser = await chromium.launch({ headless: false, slowMo: 120 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const notes = [];

  try {
    const destination = provider.optOutUrl || provider.website;
    onLog(`Opening: ${destination}`);
    await page.goto(destination, { waitUntil: "domcontentloaded", timeout: 45000 });

    if (shouldStop()) {
      notes.push("Stopped before form interaction.");
      return {
        providerId: provider.id,
        providerName: provider.name,
        status: "failed",
        notes
      };
    }

    await genericPrefill(page, profile);
    onLog("Attempted field prefill.");

    if (provider.approach === "form-url-email-confirmation") {
      if (safe(profile.profileUrl)) {
        const urlFilled = await fillFirstVisible(
          page,
          ["input[name*=url i]", "input[id*=url i]", "input[placeholder*=url i]"],
          profile.profileUrl
        );
        if (urlFilled) onLog("Filled profile URL.");
      }
      notes.push("Check your email inbox to confirm the suppression request.");
      onLog("Action required: email confirmation likely needed.");
      return {
        providerId: provider.id,
        providerName: provider.name,
        status: "manual-required",
        notes
      };
    }

    if (provider.approach === "search-and-remove") {
      notes.push("Use the opened page to identify your listing, then click remove/opt-out.");
      notes.push(inferManualReason(provider));
      onLog("Guided search/remove flow opened.");
      return {
        providerId: provider.id,
        providerName: provider.name,
        status: "manual-required",
        notes
      };
    }

    notes.push(inferManualReason(provider));
    if (provider.notes?.length) notes.push(...provider.notes);
    onLog("Manual-guided provider opened with prefilled basics.");
    return {
      providerId: provider.id,
      providerName: provider.name,
      status: "manual-required",
      notes
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    notes.push(message);
    return {
      providerId: provider.id,
      providerName: provider.name,
      status: "failed",
      notes
    };
  } finally {
    // Keep browser open briefly so user can complete interactive steps.
    await page.waitForTimeout(1500);
    await context.close();
    await browser.close();
  }
}

module.exports = { runSuppressionFlow };
