const els = {
  loadingScreen: document.getElementById("loadingScreen"),
  onboardingScreen: document.getElementById("onboardingScreen"),
  dashboardScreen: document.getElementById("dashboardScreen"),
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  city: document.getElementById("city"),
  state: document.getElementById("state"),
  zip: document.getElementById("zip"),
  profileUrl: document.getElementById("profileUrl"),
  providersList: document.getElementById("providersList"),
  providersEmptyState: document.getElementById("providersEmptyState"),
  logEmptyState: document.getElementById("logEmptyState"),
  providerSearch: document.getElementById("providerSearch"),
  providerCount: document.getElementById("providerCount"),
  selectedCount: document.getElementById("selectedCount"),
  navDashboard: document.getElementById("navDashboard"),
  navProviders: document.getElementById("navProviders"),
  navActivity: document.getElementById("navActivity"),
  dashboardView: document.getElementById("dashboardView"),
  providersView: document.getElementById("providersView"),
  activityView: document.getElementById("activityView"),
  providerDrawer: document.getElementById("providerDrawer"),
  closeDrawerBtn: document.getElementById("closeDrawerBtn"),
  drawerProviderName: document.getElementById("drawerProviderName"),
  drawerProviderDomain: document.getElementById("drawerProviderDomain"),
  drawerWebsiteLink: document.getElementById("drawerWebsiteLink"),
  drawerOptOutLink: document.getElementById("drawerOptOutLink"),
  drawerNotes: document.getElementById("drawerNotes"),
  statTotalProviders: document.getElementById("statTotalProviders"),
  statSelectedProviders: document.getElementById("statSelectedProviders"),
  statAutoFriendly: document.getElementById("statAutoFriendly"),
  statManualRequired: document.getElementById("statManualRequired"),
  selectAllBtn: document.getElementById("selectAllBtn"),
  selectNoneBtn: document.getElementById("selectNoneBtn"),
  onboardingContinueBtn: document.getElementById("onboardingContinueBtn"),
  editProfileBtn: document.getElementById("editProfileBtn"),
  resetOnboardingBtn: document.getElementById("resetOnboardingBtn"),
  startBtn: document.getElementById("startBtn"),
  stopBtn: document.getElementById("stopBtn"),
  exportBtn: document.getElementById("exportBtn"),
  log: document.getElementById("log")
};

let providers = [];
let latestResults = [];
let providerSearchTerm = "";
const selectedProviderIds = new Set();
const STORAGE_KEY = "stopcalls.profile.v1";
const ONBOARDING_KEY = "stopcalls.onboarding.complete.v1";
const VIEW_IDS = ["dashboard", "providers", "activity"];

function appendLog(text) {
  els.logEmptyState.classList.add("hidden");
  const line = `[${new Date().toLocaleTimeString()}] ${text}`;
  els.log.textContent += `${line}\n`;
  els.log.scrollTop = els.log.scrollHeight;
}

function getProviderIcon(provider) {
  const tags = provider.tags || [];
  if (tags.some((tag) => tag.includes("phone") || tag.includes("call"))) return "📞";
  if (tags.some((tag) => tag.includes("email"))) return "✉️";
  if (tags.some((tag) => tag.includes("captcha"))) return "🧩";
  if (tags.some((tag) => tag.includes("search"))) return "🔍";
  if (provider.approach === "form-url-email-confirmation") return "🤖";
  return "🌐";
}

function getUrlForProvider(provider) {
  return provider.optOutUrl || provider.website || "";
}

function getDomain(urlLike) {
  try {
    return new URL(urlLike).hostname.replace(/^www\./, "");
  } catch (_error) {
    return "";
  }
}

function getFaviconUrl(provider) {
  const target = getUrlForProvider(provider);
  if (!target) return "";
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(target)}`;
}

function showScreen(screenName) {
  const all = [els.loadingScreen, els.onboardingScreen, els.dashboardScreen];
  for (const el of all) el.classList.remove("active");
  if (screenName === "loading") els.loadingScreen.classList.add("active");
  if (screenName === "onboarding") els.onboardingScreen.classList.add("active");
  if (screenName === "dashboard") els.dashboardScreen.classList.add("active");
}

function setView(viewId) {
  if (!VIEW_IDS.includes(viewId)) return;
  const navMap = {
    dashboard: els.navDashboard,
    providers: els.navProviders,
    activity: els.navActivity
  };
  const panelMap = {
    dashboard: els.dashboardView,
    providers: els.providersView,
    activity: els.activityView
  };
  for (const id of VIEW_IDS) {
    navMap[id].classList.toggle("active", id === viewId);
    panelMap[id].classList.toggle("active", id === viewId);
  }
}

function openProviderDrawer(provider) {
  const notes = provider.notes?.length
    ? provider.notes
    : ["No additional notes yet. Use website and opt-out page links for details."];
  const domain = getDomain(getUrlForProvider(provider));
  els.drawerProviderName.textContent = provider.name;
  els.drawerProviderDomain.textContent = domain ? `Website: ${domain}` : "Website unavailable";
  els.drawerWebsiteLink.href = provider.website || "#";
  els.drawerOptOutLink.href = provider.optOutUrl || provider.website || "#";
  els.drawerWebsiteLink.style.pointerEvents = provider.website ? "auto" : "none";
  els.drawerOptOutLink.style.pointerEvents = provider.optOutUrl || provider.website ? "auto" : "none";
  els.drawerNotes.innerHTML = notes.map((note) => `<li>${note}</li>`).join("");
  els.providerDrawer.classList.add("open");
}

function closeProviderDrawer() {
  els.providerDrawer.classList.remove("open");
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

function applyProfile(profile = {}) {
  els.firstName.value = profile.firstName || "";
  els.lastName.value = profile.lastName || "";
  els.email.value = profile.email || "";
  els.phone.value = profile.phone || "";
  els.city.value = profile.city || "";
  els.state.value = profile.state || "";
  els.zip.value = profile.zip || "";
  els.profileUrl.value = profile.profileUrl || "";
}

function renderProviders() {
  els.providersList.innerHTML = "";
  const filtered = providers.filter((provider) => {
    const haystack =
      `${provider.name} ${(provider.tags || []).join(" ")} ${provider.optOutUrl || provider.website || ""}`.toLowerCase();
    return haystack.includes(providerSearchTerm.toLowerCase());
  });

  els.providerCount.textContent = `${filtered.length} providers available`;
  els.providersEmptyState.classList.toggle("hidden", filtered.length > 0);

  for (const provider of filtered) {
    const row = document.createElement("article");
    row.className = "provider-row";
    row.setAttribute("data-provider-id", provider.id);
    row.innerHTML = `
      <input type="checkbox" data-provider-id="${provider.id}" ${
        selectedProviderIds.has(provider.id) ? "checked" : ""
      } />
      <div>
        <div class="title-line">
          <img class="provider-favicon" src="${getFaviconUrl(provider)}" alt="${provider.name} favicon" onerror="this.style.display='none'" />
          <span class="provider-icon">${getProviderIcon(provider)}</span>
          <strong>${provider.name}</strong>
          <button type="button" class="details-btn" data-details-id="${provider.id}">Details</button>
        </div>
        <div class="meta">${getUrlForProvider(provider)}</div>
        <div class="meta">${(provider.tags || []).join(", ")}</div>
      </div>
    `;
    els.providersList.appendChild(row);
  }
  updateStats();
  updateSelectedCount();
}

function updateSelectedCount() {
  const count = getSelectedProviderIds().length;
  els.selectedCount.textContent = `${count} selected`;
  els.statSelectedProviders.textContent = String(count);
}

function updateStats() {
  const autoFriendly = providers.filter(
    (provider) => provider.approach === "form-url-email-confirmation" || provider.approach === "search-and-remove"
  ).length;
  const manualRequired = Math.max(0, providers.length - autoFriendly);
  els.statTotalProviders.textContent = String(providers.length);
  els.statAutoFriendly.textContent = String(autoFriendly);
  els.statManualRequired.textContent = String(manualRequired);
}

function getSelectedProviderIds() {
  return Array.from(selectedProviderIds);
}

function getProfile() {
  return {
    firstName: els.firstName.value,
    lastName: els.lastName.value,
    email: els.email.value,
    phone: els.phone.value,
    city: els.city.value,
    state: els.state.value,
    zip: els.zip.value,
    profileUrl: els.profileUrl.value
  };
}

async function init() {
  showScreen("loading");
  await new Promise((resolve) => setTimeout(resolve, 900));
  providers = await window.suppressionApi.listProviders();
  renderProviders();
  updateStats();
  setView("dashboard");
  window.suppressionApi.onLog((line) => appendLog(line));

  const profile = loadProfile();
  if (profile) applyProfile(profile);
  const onboardingComplete = localStorage.getItem(ONBOARDING_KEY) === "true";
  showScreen(onboardingComplete ? "dashboard" : "onboarding");
}

els.selectAllBtn.addEventListener("click", () => {
  for (const provider of providers) {
    const haystack =
      `${provider.name} ${(provider.tags || []).join(" ")} ${provider.optOutUrl || provider.website || ""}`.toLowerCase();
    if (haystack.includes(providerSearchTerm.toLowerCase())) {
      selectedProviderIds.add(provider.id);
    }
  }
  renderProviders();
  updateSelectedCount();
});

els.selectNoneBtn.addEventListener("click", () => {
  for (const provider of providers) {
    const haystack =
      `${provider.name} ${(provider.tags || []).join(" ")} ${provider.optOutUrl || provider.website || ""}`.toLowerCase();
    if (haystack.includes(providerSearchTerm.toLowerCase())) {
      selectedProviderIds.delete(provider.id);
    }
  }
  renderProviders();
  updateSelectedCount();
});

els.providersList.addEventListener("change", () => {
  for (const cb of els.providersList.querySelectorAll("input[type='checkbox']")) {
    const providerId = cb.getAttribute("data-provider-id");
    if (!providerId) continue;
    if (cb.checked) selectedProviderIds.add(providerId);
    else selectedProviderIds.delete(providerId);
  }
  updateSelectedCount();
});

els.providersList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const detailsId = target.getAttribute("data-details-id");
  if (!detailsId) return;
  const provider = providers.find((item) => item.id === detailsId);
  if (!provider) return;
  openProviderDrawer(provider);
});

els.providerSearch.addEventListener("input", () => {
  providerSearchTerm = els.providerSearch.value || "";
  renderProviders();
});

els.navDashboard.addEventListener("click", () => setView("dashboard"));
els.navProviders.addEventListener("click", () => setView("providers"));
els.navActivity.addEventListener("click", () => setView("activity"));

els.closeDrawerBtn.addEventListener("click", () => closeProviderDrawer());

els.startBtn.addEventListener("click", async () => {
  const selectedProviderIds = getSelectedProviderIds();
  const profile = getProfile();
  saveProfile(profile);
  appendLog(`Start clicked. Selected ${selectedProviderIds.length} providers.`);
  const result = await window.suppressionApi.startRunner({ selectedProviderIds, profile });
  if (!result.ok) {
    appendLog(`Error: ${result.error}`);
    return;
  }
  latestResults = result.results || [];
  appendLog("Run data captured.");
  setView("activity");
});

els.stopBtn.addEventListener("click", async () => {
  await window.suppressionApi.stopRunner();
});

els.exportBtn.addEventListener("click", async () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    profile: getProfile(),
    results: latestResults
  };
  const result = await window.suppressionApi.exportJson(payload);
  if (result.ok) appendLog(`Saved results to ${result.filePath}`);
});

els.onboardingContinueBtn.addEventListener("click", () => {
  const profile = getProfile();
  saveProfile(profile);
  localStorage.setItem(ONBOARDING_KEY, "true");
  showScreen("dashboard");
  appendLog("Onboarding complete.");
});

els.editProfileBtn.addEventListener("click", () => {
  showScreen("onboarding");
});

els.resetOnboardingBtn.addEventListener("click", () => {
  localStorage.removeItem(ONBOARDING_KEY);
  showScreen("onboarding");
});

init();
