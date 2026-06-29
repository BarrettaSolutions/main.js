// RAW-Link deiner verschlüsselten main.js
const MAIN_JS_URL = "https://raw.githubusercontent.com/BarrettaSolutions/main.js/main/main.js";

// URL zu deinem Key-Server (Apps Script)
const KEY_SERVER_URL = "https://script.google.com/macros/s/AKfycbyEJTzvf0Kcn2EOStFICnF3b_yLdwohKdTyATsCcphRD7M_x4MNC-m9MMzsTN_sjrwt/exec?action=getKey";

// Lade den Key vom Server
async function getKey() {
  const response = await fetch(KEY_SERVER_URL);
  const data = await response.json();
  return data.key;
}

// Lade die verschlüsselte main.js
async function loadEncryptedScript() {
  const response = await fetch(MAIN_JS_URL);
  return await response.text();
}

// Entschlüsseln (AES)
async function decryptScript(encrypted, key) {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}

// Script ausführen
function executeScript(code) {
  const script = document.createElement("script");
  script.textContent = code;
  document.body.appendChild(script);
}

// Hauptfunktion
(async () => {
  try {
    const key = await getKey();
    const encrypted = await loadEncryptedScript();
    const decrypted = await decryptScript(encrypted, key);
    executeScript(decrypted);
  } catch (e) {
    console.error("Fehler beim Laden:", e);
  }
})();
