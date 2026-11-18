const numbers = [
["Duu","1 — Ɗaya"],["Hyaa","2 — Biyu"],["A","3 — Uku"],["Shi","4 — Huɗu"],["Sworu","5 — Biyar"],
["Swodu","6 — Shida"],["Swohyaa","7 — Bakwai"],["Swowa","8 — Takwas"],["Swoshi","9 — Tara"],["Koori","10 — Goma"],
["Koori awere duzo","11 — Goma sha ɗaya"],["Koori awere hyazo","12 — Goma sha biyu"],["Koori awere azo","13 — Goma sha uku"],["Koori awere shizo","14 — Goma sha huɗu"],["Koori awere sworuzo","15 — Goma sha biyar"],
["Koori awere swodu","16 — Goma sha shida"],["Koori awere swohyaa","17 — Goma sha bakwai"],["Koori awere swowa","18 — Goma sha takwas"],["Koori awere swoshi","19 — Goma sha tara"],["Keedu","20 — Ashirin"]
].map((n,i)=>({id:"n"+(i+1),ky:n[0],ha:n[1],en:"Number "+(i+1),type:"number",category:"Lambobi"}));

const phrases = [
{ id:"p1", ky:"Meho ɓah gushane",ha:"Ina gaida kowa",en:"Meaning supplied by the learner: greetings to everyone",type:"phrase",category:"Jimloli"},
{ id:"p2", ky:"Awo barka emenazo",ha:"Barkan mu da wuni",en:"Meaning supplied by the learner: daytime greeting",type:"phrase",category:"Jimloli"},
{ id:"p3", ky:"Laala busa na?",ha:"Yaya gajiya?",en:"Meaning supplied by the learner: asking about tiredness",type:"phrase",category:"Jimloli"},
{ id:"p4", ky:"lala wo iyalina?",ha:"Yaya iyalan mu?",en:"Meaning supplied by the learner: asking about the family",type:"phrase",category:"Jimloli"},
{ id:"p5", ky:"Lala wuni na?",ha:"Yaya matayen mu?",en:"Meaning supplied by the learner; English translation not verified",type:"phrase",category:"Jimloli"},
{ id:"p6", ky:"Laduki na albarkaka watanaro",ha:"Allah ya sanya albarka cikin tafiyar mu",en:"Meaning supplied by the learner: a blessing for the journey",type:"phrase",category:"Jimloli"},
{ id:"p7", ky:"Wa emenade?",ha:"An wuni lafiya?",en:"Meaning supplied by the learner: asking if the day passed peacefully",type:"phrase",category:"Jimloli"},
{ id:"p8", ky:"Busanade?",ha:"Yaya gajiya?",en:"Meaning supplied by the learner: asking about tiredness",type:"phrase",category:"Jimloli"},
{ id:"p9", ky:"Busana wabiiba",ha:"Babu gajiya",en:"Meaning supplied by the learner; English translation not verified",type:"phrase",category:"Jimloli"},
{ id:"p10", ky:"Nuun Shi",ha:"Zo anshi",en:"Meaning supplied by the learner; English translation not verified",type:"phrase",category:"Jimloli"},
{ id:"p11", ky:"Nuuwo ubi",ha:"Zo muci tuwo",en:"Meaning supplied by the learner: come and eat tuwo",type:"phrase",category:"Jimloli"},
{ id:"p12", ky:"Maka",ha:"Na koshi",en:"Meaning supplied by the learner: I am full",type:"phrase",category:"Jimloli"}
];
const basic = [
{ id:"b1",ky:"Mani",ha:"Ni",en:"I / me",type:"basic",category:"Kalmomi"},
{ id:"b2",ky:"Wuni",ha:"Mu",en:"We / us",type:"basic",category:"Kalmomi"},
{ id:"b3",ky:"Ini",ha:"Kai / Ke / Ita (as supplied)",en:"English mapping not verified",type:"basic",category:"Kalmomi"},
{ id:"b4",ky:"Ani",ha:"Ku / Su (as supplied)",en:"English mapping not verified",type:"basic",category:"Kalmomi"},
{ id:"b5",ky:"Inii",ha:"Shi",en:"He / him (mapping not independently verified)",type:"basic",category:"Kalmomi"},
{ id:"b6",ky:"Dzi",ha:"Uba",en:"Father",type:"basic",category:"Kalmomi"},
{ id:"b7",ky:"dbo",ha:"Uwa",en:"Mother",type:"basic",category:"Kalmomi"},
{ id:"b8",ky:"ni",ha:"Yaro",en:"Boy / child (mapping not independently verified)",type:"basic",category:"Kalmomi"},
{ id:"b9",ky:"Nihi",ha:"Yarinya",en:"Girl",type:"basic",category:"Kalmomi"},
{ id:"b10",ky:"Idibi",ha:"Ɗan’uwa",en:"Sibling (mapping not independently verified)",type:"basic",category:"Kalmomi"},
{ id:"b11",ky:"halme",ha:"Yar’uwa",en:"Sister (mapping not independently verified)",type:"basic",category:"Kalmomi"}
];

  
const data = [...numbers, ...phrases, ...basic];
const $ = id => document.getElementById(id);

let filter = "all";
let numberIndex = 0;
let mode = "login";

const getFavs = () => {
  try {
    return JSON.parse(localStorage.getItem("lk-favs") || "[]");
  } catch {
    return [];
  }
};

const setFavs = a =>
  localStorage.setItem("lk-favs", JSON.stringify(a));

const isFav = id => getFavs().includes(id);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));
}

function toast(s) {
  const t = $("toast");
  if (!t) return;
  t.textContent = s;
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(
    () => t.classList.remove("show"), 2200
  );
}

function toggleFav(id) {
  let a = getFavs();
  a = a.includes(id)
    ? a.filter(x => x !== id)
    : [...a, id];
  setFavs(a);
  renderAll();
  toast("An sabunta Favorites");
}

function card(item) {
  return `<article class="word-row">
    <div class="word-main">
      <strong>${escapeHtml(item.ky)}</strong>
      <small>${escapeHtml(item.ha)}<br>${escapeHtml(item.en)}</small>
    </div>
    <span class="tag">${escapeHtml(item.category)}</span>
    <button class="heart ${isFav(item.id) ? "saved" : ""}"
      data-fav="${item.id}">${isFav(item.id) ? "♥" : "♡"}</button>
  </article>`;
}

function renderDictionary() {
  const q = $("searchInput").value.trim().toLowerCase();

  const filtered = data.filter(x =>
    (filter === "all" || x.type === filter) &&
    (!q || [x.ky, x.ha, x.en].some(
      s => s.toLowerCase().includes(q)
    ))
  );

  $("dictionaryList").innerHTML = filtered.map(card).join("");
  $("emptyState").classList.toggle("hidden", filtered.length > 0);
}

function renderFavorites() {
  const favs = data.filter(x => getFavs().includes(x.id));
  $("favoritesList").innerHTML = favs.map(card).join("");
  $("favoritesEmpty").classList.toggle("hidden", favs.length > 0);
}

function renderDashboard() {
  $("wordCount").textContent = data.length;
  $("favCount").textContent = getFavs().length;

  const item = phrases[0];

  $("dailyWord").innerHTML = `
    <div class="wordmeta">
      <div>
        <div class="word">${escapeHtml(item.ky)}</div>
        <div class="meaning">${escapeHtml(item.ha)}</div>
      </div>
      <button class="heart ${isFav(item.id) ? "saved" : ""}"
        data-fav="${item.id}">
        ${isFav(item.id) ? "♥" : "♡"}
      </button>
    </div>`;
}

function renderAll() {
  renderDictionary();
  renderFavorites();
  renderDashboard();
}

function showPage(id) {
  const target = $(id);
  if (!target) {
    console.error("Page not found:", id);
    return;
  }

  document.querySelectorAll(".page").forEach(page =>
    page.classList.remove("active")
  );

  target.classList.add("active");

  document.querySelectorAll(".navitem").forEach(button =>
    button.classList.toggle("active", button.dataset.go === id)
  );

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderNumber() {
  const n = numbers[numberIndex];

  $("numberIndex").textContent =
    `LAMBA ${numberIndex + 1} / ${numbers.length}`;
  $("kyangaWord").textContent = n.ky;
  $("hausaWord").textContent = n.ha;

  $("prevNumber").disabled = numberIndex === 0;
  $("prevNumber").style.opacity =
    numberIndex === 0 ? ".45" : "1";

  $("nextNumber").textContent =
    numberIndex === numbers.length - 1
      ? "Sake farawa ↻"
      : "Na gaba →";
}

// Navigation and favorites
document.addEventListener("click", e => {
  const go = e.target.closest("[data-go]");
  if (go) showPage(go.dataset.go);

  const fav = e.target.closest("[data-fav]");
  if (fav) toggleFav(fav.dataset.fav);

  const f = e.target.closest("[data-filter]");
  if (f) {
    filter = f.dataset.filter;
    document.querySelectorAll(".filter").forEach(b =>
      b.classList.toggle("active", b === f)
    );
    renderDictionary();
  }
});

$("searchInput").addEventListener("input", renderDictionary);

$("clearSearch").onclick = () => {
  $("searchInput").value = "";
  renderDictionary();
  $("searchInput").focus();
};

// Dark mode
function updateThemeButtons() {
  const d = document.body.classList.contains("dark");
  $("themeBtn").textContent = d ? "☀" : "☾";
  $("themeToggle").classList.toggle("on", d);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "lk-dark",
    document.body.classList.contains("dark")
  );
  updateThemeButtons();
}

if (localStorage.getItem("lk-dark") === "true") {
  document.body.classList.add("dark");
}

$("themeBtn").onclick = toggleTheme;
$("themeToggle").onclick = toggleTheme;
updateThemeButtons();

// Number lessons
$("numbersLesson").onclick = () => {
  numberIndex = 0;
  renderNumber();
  showPage("numberLesson");
};

$("nextNumber").onclick = () => {
  numberIndex = numberIndex === numbers.length - 1
    ? 0 : numberIndex + 1;
  renderNumber();
};

$("prevNumber").onclick = () => {
  numberIndex = Math.max(0, numberIndex - 1);
  renderNumber();
};

$("restartNumbers").onclick = () => {
  numberIndex = 0;
  renderNumber();
};

// Premium dialog
function openPremium() {
  const dialog = $("premiumDialog");

  if (!dialog) {
    console.error("Premium dialog not found");
    return;
  }

  if (!dialog.open) dialog.showModal();
}

function closePremium() {
  const dialog = $("premiumDialog");
  if (dialog && dialog.open) dialog.close();
}

$("premiumCourse").onclick = openPremium;
$("subscribeBtn").onclick = openPremium;
$("closeDialog").onclick = closePremium;
$("dialogOk").onclick = closePremium;

// Supabase authentication
(() => {
  const client = window.supabase;
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_PUBLISHABLE_KEY;

  const form = $("authForm");
  const message = $("authMessage");
  const submit = $("authSubmit");
  const emailInput = $("authEmail");
  const passwordInput = $("authPassword");
  const loginBtn = $("showLogin");
  const signupBtn = $("showSignup");
  const signOutBtn = $("signOutBtn");

  const payPremiumBtn = $("payPremiumBtn");
  const paymentMessage = $("paymentMessage");

  if (!client || !url || !key || !form) {
    console.error("Supabase configuration missing");
    message.textContent =
      "Ba a samu saitunan Supabase ba. Duba supabase-config.js.";
    return;
  }

  const db = client.createClient(url, key);

  function say(text) {
    message.textContent = text;
  }

  function setMode(nextMode) {
    mode = nextMode;
    submit.textContent =
      mode === "login" ? "Login" : "Ƙirƙiri asusu";

    passwordInput.autocomplete =
      mode === "login" ? "current-password" : "new-password";

    loginBtn.classList.toggle("primary", mode === "login");
    loginBtn.classList.toggle("outline", mode !== "login");

    signupBtn.classList.toggle("primary", mode === "signup");
    signupBtn.classList.toggle("outline", mode !== "signup");

    say("");
  }

  loginBtn.onclick = () => setMode("login");
  signupBtn.onclick = () => setMode("signup");

  // Signup and login
  form.addEventListener("submit", async event => {
    event.preventDefault();

    submit.disabled = true;
    say("Ana jira...");

    try {
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (mode === "signup") {
        const { error } = await db.auth.signUp({
          email,
          password
        });

        if (error) throw error;

        say("An aika maka imel na tabbatarwa. Ka duba akwatin imel ɗinka.");
      } else {
        const { error } = await db.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        say("Ka shiga asusunka cikin nasara.");
      }

      await updateAuthState();

    } catch (error) {
      console.error("Authentication error:", error);
      say(error.message || "An samu matsala. A sake gwadawa.");
    } finally {
      submit.disabled = false;
    }
  });

  // Update account status
  async function updateAuthState() {
    try {
      const { data, error } = await db.auth.getSession();

      if (error) throw error;

      const user = data.session?.user;

      signOutBtn.classList.toggle("hidden", !user);

      if (user) {
        say("An shiga: " + user.email);
      }

    } catch (error) {
      console.error("Session error:", error);
    }
  }

  // Sign out
  signOutBtn.onclick = async () => {
    signOutBtn.disabled = true;

    try {
      const { error } = await db.auth.signOut();
      if (error) throw error;

      say("Ka fita daga asusunka.");

      if (paymentMessage) {
        paymentMessage.textContent = "Ka shiga asusunka kafin biyan kuɗi.";
      }

      await updateAuthState();

    } catch (error) {
      say(error.message || "An samu matsala.");
    } finally {
      signOutBtn.disabled = false;
    }
  };

  // PAYSTACK: Attach listener ONCE, outside updateAuthState
  payPremiumBtn.addEventListener("click", async () => {
    payPremiumBtn.disabled = true;
    paymentMessage.textContent = "Ana shirya biyan kuɗi...";

    try {
      const { data: sessionData, error: sessionError } =
        await db.auth.getSession();

      if (sessionError) throw sessionError;

      if (!sessionData.session) {
        paymentMessage.textContent =
          "Da fatan za ka shiga asusunka kafin biyan kuɗi.";
        return;
      }

      const { data, error } = await db.functions.invoke(
        "initialize-paystack",
        { body: {} }
      );

      if (error) {
        console.error("Paystack function error:", error);
        throw new Error(
          error.message || "An kasa haɗawa da Paystack."
        );
      }

      if (
        !data ||
        typeof data.authorization_url !== "string" ||
        !data.authorization_url.startsWith(
          "https://checkout.paystack.com/"
        )
      ) {
        throw new Error(
          data?.error || "Ba a samu hanyar biyan kuɗi ba."
        );
      }

      paymentMessage.textContent =
        "Ana kai ka shafin biyan kuɗi...";

      window.location.assign(data.authorization_url);

    } catch (error) {
      console.error("Premium payment error:", error);

      paymentMessage.textContent =
        error.message || "An samu matsala. A sake gwadawa.";

    } finally {
      payPremiumBtn.disabled = false;
    }
  });

  // Listen for login/logout changes
  db.auth.onAuthStateChange(() => {
    updateAuthState();
  });

  updateAuthState();

})();

// Start application
renderAll();
renderNumber();

console.log("Learning Kyangaize app.js loaded successfully");
