/* CONFIG */
const MAKE_WEBHOOK_URL =
  "https://hook.eu2.make.com/1v066xzbjheuecr4tsq28v2tns8kbrdq";
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4S1EwWYzyhm_9e_qRvFbzVIxfcvrurLzJ1er6t__DlSrs8NHFOOZk48q04VS3L2fW/exec";
let AKTIVES_TABELLENBLATT = "Speisekarte";
let globalRowsData = [];
/* FELDDEFINITIONEN PRO BLATT (Sichtbarkeit) */
const FORM_FELDER = {
  "Speisekarte": [
    "editGruppe","editName","editBeschreibung","editAllergene","editTyp",
    "editExtras","editEssenGetraenk","editPreis1","editSize1","editNr1",
    "editPreis2","editSize2","editNr2","editPreis3","editSize3","editNr3",
    "editPreis4","editSize4","editNr4","editPreis5","editSize5","editNr5",
    "editAusverkauft","editPfand"
  ],
  "Extras": ["editGruppeExtras","editArtikelTypExtras","editExtraName","editAufpreis1","editExtraArtikelnr1","editAufpreis2","editExtraArtikelnr2","editAufpreis3","editExtraArtikelnr3","editAufpreis4","editExtraArtikelnr4","editAufpreis5","editExtraArtikelnr5"],
  "USER-ID": ["editBenutzername","editPasswort"],
  "Liefergebiete": ["editPLZ","editOrt","editMindesteuro","editAnfahrteuro","editAnfahrtfreieuro","editZusatztext"],
  "Restaurant-Daten": ["editFirmenname","editAnrede","editVorname","editNachname","editStrasseHausnr","editPLZrd","editOrtrd","editOrtZusatz","editBundesland","editGeschaeftsfuehrer","editSteuernummer","editUstID","editHRNr","editAmtsgericht","editTelefon1","editTelefon2","editTelefon3","editMobil","editFehlerSMS","editWhatsApp","editFax","editEmail"],
  "Admin&Bonus": ["editZeitangabe","editZeitangabe2","editLieferart","editZustellung","editAbholrabatt","editLieferrabatt"],
  "Allergeneliste": ["editKrz","editAllergeneBeschreibung"],  
  "Artikelgruppen-Sperren": ["editArtikelgruppeSperren","editArtikelgruppeAusverkauft","editArtikelgruppeSperrgrund"],
  "Öffnungszeiten-Bestellsystem": ["editWochentagBS","editvon1","editbis1","editvon2","editbis2","editschichtfreiBS","editStatusoezbs","editBSclosenam","editschließenvon1","editschließenbis1","editschließenvon2","editschließenbis2","editschichtfreiBS2","editschließgrund","editUrlaubBS","editUrlaubBSvon1","editUrlaubBSbis1","editurlaubhinweisBS","editschließgrundUrlaubBS"],
  "Öffnungszeiten-Bestellsystem": ["editWochentagTR","editvon1TR","editbis1TR","editvon2TR","editbis2TR","editschichtfreiTR","editStatusoezTR","editTRclosenam","editschließenvon1TR","editschließenbis1TR","editschließenvon2TR","editschließenbis2TR","editschichtfreiTR2","editschließgrundTR","editUrlaubTR","editUrlaubTRvon1","editUrlaubTRbis1","editurlaubhinweisTR","editschließgrundUrlaubTR"],
  "Zahlungsart": ["editZahlungsartakt","editZahlungsartwählen","editPaypalls","editPaypalclientid","editPaypalclientsecret","editPaypalhinweis","editMolliekey","editMolliehinweis"],
  "Kundennummer-Liste-nur-für-CallAgent": [,"editKundendatenName","editKundendatenHinweis"]
};
/* Mapping von Sheet-Spaltennamen zu Feld-IDs (hilft beim Befüllen) */
const FIELD_MAP_BY_SHEET = {
  "Extras": {
    "Gruppe": "editGruppeExtras",
    "ArtikelTyp": "editArtikelTypExtras",
    "ExtraName": "editExtraName",
    "Aufpreis1": "editAufpreis1",
    "ExtraArtikelnr1": "editExtraArtikelnr1",
    "Aufpreis2": "editAufpreis2",
    "ExtraArtikelnr2": "editExtraArtikelnr2",
    "Aufpreis3": "editAufpreis3",
    "ExtraArtikelnr3": "editExtraArtikelnr3",
    "Aufpreis4": "editAufpreis4",
    "ExtraArtikelnr4": "editExtraArtikelnr4",
    "Aufpreis5": "editAufpreis5",
    "ExtraArtikelnr5": "editExtraArtikelnr5"
  },
  "USER-ID": {
    "Benutzername": "editBenutzername",
    "Username": "editBenutzername",
    "user": "editBenutzername",
    "Passwort": "editPasswort",
    "Password": "editPasswort",
    "password": "editPasswort"
  },
  "Liefergebiete": {
    "PLZ": "editPLZ",
    "Ort": "editOrt",
    "Mindestbestellung Euro": "editMindesteuro",
    "Anfahrtspauschale Euro": "editAnfahrteuro",
    "Anfahrtspauschale frei ab Euro": "editAnfahrtfreieuro",
    "Zusatztext für TelefonAssistenten": "editZusatztext",
  },
  "Restaurant-Daten": {
  "Firmenname": "editFirmenname",
  "Anrede": "editAnrede",
  "Vorname": "editVorname",
  "Nachname": "editNachname",
  "StrHausnr": "editStrasseHausnr",
  "PLZ": "editPLZrd",
  "Ort": "editOrtrd",
  "OrtZusatz": "editOrtZusatz",
  "Bundesland": "editBundesland",
  "eingestellter Geschäftsführer": "editGeschaeftsfuehrer",
  "Steuernummer": "editSteuernummer",
  "UstID": "editUstID",
  "HRNr": "editHRNr",
  "Zuständiges Amtsgericht": "editAmtsgericht",
  "Telefon1": "editTelefon1",
  "Telefon2": "editTelefon2",
  "Telefon3": "editTelefon3",
  "Mobil": "editMobil",
  "FehlerSMS": "editFehlerSMS",
  "WhatsApp": "editWhatsApp",
  "Fax": "editFax",
  "EMail": "editEmail"
},
  "Admin&Bonus": {
    "Wie lang soll KIAgent sagen bei Abholung Min": "editZeitangabe",
    "Wie lang soll KIAgent sagen bei Lieferung Min": "editZeitangabe2",
    "Lieferarten": "editLieferart",
    "Zustellung Bestellung an Gastro": "editZustellung",
    "Abholrabatt in Prozent": "editAbholrabatt",    
    "Lieferrabatt in Prozent": "editLieferrabatt"        
  },
  "Artikelgruppen-Sperren": {
    "Sperren": "editArtikelgruppeSperren",
    "Welche Artikelgruppen möchten Sie sperren oder sind ausverkauft": "editArtikelgruppeAusverkauft",
    "Grund": "editArtikelgruppeSperrgrund"    
  },  
    "Allergeneliste": {
    "Kürzel": "editKrz",
    "Beschreibung": "editAllergeneBeschreibung"
  },
    "Öffnungszeiten-Bestellsystem": {
    "Wochentag": "editWochentagBS",
    "von1": "editvon1",   
    "bis1": "editbis1", 
    "von2": "editvon2", 
    "bis2": "editbis2",
    "Status": "editStatusoezbs"
  },
    "Öffnungszeiten-Tischreservierung": {
    "Wochentag": "editWochentagTR",
    "von1": "editvon1TR",   
    "bis1": "editbis1TR", 
    "von2": "editvon2TR", 
    "bis2": "editbis2TR",
    "Status": "editStatusoezTR"
  },
    "Zahlungsart": {
    "Zahlungsart aktivieren": "editZahlungsartakt",
    "Welche Zahlungen soll der TelefonAssistent anbieten": "editZahlungsartwählen",
    "Paypal Plus Modus live sandbox": "editPaypalls",
    "Paypal Plus Client ID": "editPaypalclientid",
    "Paypal Plus Client Secret": "editPaypalclientsecret",
    "Mollie Key": "editMolliekey",
  },
    "Kundennummer-Liste-nur-für-CallAgent": {
    "Name": "editKundendatenName",
  },
  "Speisekarte": {
    "Artikelgruppe": "editGruppe",
    "Artikelname": "editName",
    "ArtikelbeschreibungZutaten": "editBeschreibung",
    "AllergeneZusatzstoffe": "editAllergene",
    "ArtikelTyp": "editTyp",
    "ExtrasGruppe": "editExtras",
    "EssenGetraenk": "editEssenGetraenk",
    "Preis1": "editPreis1",
    "Size1": "editSize1",
    "Artikelnr1": "editNr1",
    "Preis2": "editPreis2",
    "Size2": "editSize2",
    "Artikelnr2": "editNr2",
    "Preis3": "editPreis3",
    "Size3": "editSize3",
    "Artikelnr3": "editNr3",
    "Preis4": "editPreis4",
    "Size4": "editSize4",
    "Artikelnr4": "editNr4",
    "Preis5": "editPreis5",
    "Size5": "editSize5",
    "Artikelnr5": "editNr5",
    "Artikel ausverkauft": "editAusverkauft",
    "PFAND für Getränk": "editPfand"
  }
};
/* NEW ROW BUTTON VISIBILITY */
const NEW_ROW_WHITELIST = ["Speisekarte", "Extras", "Liefergebiete", "Artikelgruppen-Sperren","Allergeneliste"];
function updateNewRowButtonVisibility() {
  const btn = document.getElementById("newRowBtn");
  if (!btn) return;
  btn.style.display = NEW_ROW_WHITELIST.includes(AKTIVES_TABELLENBLATT)
    ? "inline-block"
    : "none";
}
/* INLINE-FORM HELPERS */
function showEditFormBox() {
  const formBox = document.getElementById("editFormBox");
  const wrapper = document.querySelector(".pizza-admin-wrapper");
  if (wrapper) wrapper.classList.add("with-reserved-space");
  if (formBox) {
    formBox.classList.add("visible");
    const first = formBox.querySelector("input:not([disabled]), select:not([disabled])");
    if (first) first.focus();
  }
}
function closeEditForm() {
  const formBox = document.getElementById("editFormBox");
  const wrapper = document.querySelector(".pizza-admin-wrapper");
  if (formBox) formBox.classList.remove("visible");
  if (wrapper) wrapper.classList.remove("with-reserved-space");
  // Löschbutton wieder verstecken
  const deleteBtn = document.getElementById("deleteBtn");
  if (deleteBtn) deleteBtn.style.display = "none";
}
/* Loader-Helfer */
function showTableLoader(message = "Lade Daten ...") {
  const container = document.getElementById("realtime-table-container");
  if (!container) return;
  container.setAttribute("aria-busy", "true");
  container.innerHTML = `
    <div class="realtime-loader" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <div class="loader-text">${message}</div>
    </div>
  `;
}
function hideTableLoader() {
  const container = document.getElementById("realtime-table-container");
  if (!container) return;
  container.removeAttribute("aria-busy");
}
/* FORM VISIBILITY & LABELS */
function updateFormVisibility() {
  const alleFelder = [
    "editGruppe","editName","editBeschreibung","editAllergene","editTyp",
    "editExtras","editEssenGetraenk","editPreis1","editSize1","editNr1",
    "editPreis2","editSize2","editNr2","editPreis3","editSize3","editNr3",
    "editPreis4","editSize4","editNr4","editPreis5","editSize5","editNr5",
    "editAusverkauft","editPfand",
    "editBenutzername","editPasswort","editFirmenname","editAnrede","editVorname","editNachname","editStrasseHausnr","editPLZrd","editOrtrd","editOrtZusatz","editBundesland","editGeschaeftsfuehrer","editSteuernummer","editUstID","editHRNr","editAmtsgericht","editTelefon1","editTelefon2","editTelefon3","editMobil","editFehlerSMS","editWhatsApp","editFax","editEmail",
    "editZeitangabe","editZeitangabe2","editLieferart","editZustellung","editAbholrabatt","editLieferrabatt",
    "editArtikelgruppeSperren","editArtikelgruppeAusverkauft","editArtikelgruppeSperrgrund",
    "editKrz","editAllergeneBeschreibung",   
    "editWochentagBS","editvon1","editbis1","editvon2","editbis2","editStatusoezbs","editBSclosenam","editschließenvon1","editschließenbis1","editschließenvon2","editschließenbis2","editschließgrund","editUrlaubBS","editUrlaubBSvon1","editUrlaubBSbis1","editschließgrundUrlaubBS",
    "editWochentagTR","editvon1TR","editbis1TR","editvon2TR","editbis2TR","editStatusoezTR","editTRclosenam","editschließenvon1TR","editschließenbis1TR","editschließenvon2TR","editschließenbis2TR","editschließgrundTR","editUrlaubTR","editUrlaubTRvon1","editUrlaubTRbis1","editschließgrundUrlaubTR",
    "editZahlungsartakt","editZahlungsartwählen","editPaypalls","editPaypalclientid","editPaypalclientsecret","editMolliekey",
    "editKundendatenName","editKundendatenHinweis",
    "editPLZ","editOrt","editMindesteuro","editAnfahrteuro","editAnfahrtfreieuro","editZusatztext","editGruppeExtras","editArtikelTypExtras","editExtraName","editAufpreis1","editExtraArtikelnr1","editAufpreis2","editExtraArtikelnr2","editAufpreis3","editExtraArtikelnr3","editAufpreis4","editExtraArtikelnr4","editAufpreis5","editExtraArtikelnr5"
  ];
  const erlaubteFelder = FORM_FELDER[AKTIVES_TABELLENBLATT] || [];
  alleFelder.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const wrapper = el.closest(".form-group");
    if (!wrapper) return;
    wrapper.style.display = erlaubteFelder.includes(id) ? "flex" : "none";
  });
}
function updateLabels() {
  const nameInput = document.getElementById("editName");
  const beschrInput = document.getElementById("editBeschreibung");
  if (nameInput) {
    const nameLabel = nameInput.closest(".form-group")?.querySelector("label");
    if (nameLabel) {
      nameLabel.innerText =
        AKTIVES_TABELLENBLATT === "USER-ID" ? "Benutzername" : "Artikelname";
    }
  }
  if (beschrInput) {
    const beschrLabel = beschrInput.closest(".form-group")?.querySelector("label");
    if (beschrLabel) {
      beschrLabel.innerText =
        AKTIVES_TABELLENBLATT === "USER-ID"
          ? "Passwort"
          : "Beschreibung / Zutaten";
    }
  }
}
/* TABELLENBLATT WECHSELN */
function switchTabellenblatt() {
  const selector = document.getElementById("sheetSelectMenu");
  if (!selector) return;
  AKTIVES_TABELLENBLATT = selector.value;
  closeEditForm();
  updateLabels();
  updateFormVisibility();
  updateNewRowButtonVisibility();
  showTableLoader(`Lade Blatt "${AKTIVES_TABELLENBLATT}" ...`);
  fetchSheetData();
}
/* DATEN LADEN UND TABELLE RENDERN */
async function fetchSheetData() {
  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=getMenu&sheet=${encodeURIComponent(
        AKTIVES_TABELLENBLATT
      )}`
    );
    const rawData = await response.json();
    hideTableLoader();
    if (rawData.error) {
      document.getElementById("realtime-table-container").innerHTML =
        "Fehler vom Server: " + rawData.error;
      return;
    }
    globalRowsData = rawData;
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      document.getElementById("realtime-table-container").innerHTML = `
        <p style="padding:20px; text-align:center; color:#64748b;">
          Das Tabellenblatt "${AKTIVES_TABELLENBLATT}" ist aktuell leer oder enthält keine Datenzeilen.
        </p>
      `;
      return;
    }
    // Checkbox-Renderer
    function renderCheckbox(value) {
      return value === "TRUE"
        ? `<input type="checkbox" disabled checked>`
        : `<input type="checkbox" disabled>`;
    }
    const columns = Object.keys(rawData[0]).filter(key => key !== "rowIndex");
    let html = `
      <table style="border-collapse: collapse; font-family: Roboto, Arial, sans-serif;
      font-size: 11px; width: max-content; min-width: 100%; table-layout: auto; cursor:pointer;">
    `;
    html += `<tr style="height: 38px;">`;
    for (let i = 0; i < columns.length; i++) {
      const displayHeader = columns[i].startsWith("_leer_") ? "" : columns[i];
      html += `
        <th style="background:#f8f9fa; font-weight:bold; border:1px solid #e2e2e2;
        padding:8px; position:sticky; top:0; z-index:10; text-align:left; min-width:80px; max-width:250px;">
          ${displayHeader}
        </th>
      `;
    }
    html += `</tr>`;
    rawData.forEach(item => {
      html += `
        <tr onclick="openEditForm(${item.rowIndex})"
            style="height:36px;"
            onmouseover="this.style.backgroundColor='#f1f5f9'"
            onmouseout="this.style.backgroundColor='transparent'">
      `;
      for (let i = 0; i < columns.length; i++) {
        const key = columns[i];
        const cellValue = item[key] !== undefined ? item[key] : "";
// Checkbox-Erkennung
let displayValue = cellValue;
if (key.toLowerCase() === "sperren" ||
    key.toLowerCase() === "zahlungsart aktivieren") {
  displayValue = renderCheckbox(cellValue);
}
        html += `
          <td style="border:1px solid #e2e2e2; padding:0 8px; overflow:hidden;
          text-overflow:ellipsis; white-space:nowrap;">
            ${displayValue}
          </td>
        `;
      }
      html += `</tr>`;
    });
    html += `</table>`;
    document.getElementById("realtime-table-container").innerHTML = html;
  } catch (e) {
    console.error("Detaillierter Fehler:", e);
    hideTableLoader();
    document.getElementById("realtime-table-container").innerHTML =
      `Verbindungsfehler oder Fehler beim Verarbeiten von "${AKTIVES_TABELLENBLATT}".`;
  }
}
/* Hilfsfunktion: Felder anhand der Spaltennamen füllen (robust) */
function fillFieldsFromItem(item) {
  const map = FIELD_MAP_BY_SHEET[AKTIVES_TABELLENBLATT] || {};
  Object.keys(item).forEach(col => {
    if (col === "rowIndex") return;
    const fieldId = map[col];
    if (fieldId) {
      const el = document.getElementById(fieldId);
      if (el) el.value = item[col] !== undefined ? item[col] : "";
    }
  });
  const gruppeEl = document.getElementById("editGruppe");
  if (gruppeEl && item["Artikelgruppe"]) {
    const normalized = item["Artikelgruppe"]
      .trim()
      .replace(/\s+/g, "_")
      .toUpperCase();
    gruppeEl.value = normalized;
  }
}
/* FORMULAR ÖFFNEN FÜR BEARBEITUNG */
function openEditForm(sheetRowIndex) {
// SPEICHERN-BUTTON AUTOMATISCH AUSBLENDEN
  const btn = document.getElementById("saveChangeBtn");
  if (btn) {
    if (AKTIVES_TABELLENBLATT === "Kundennummer-Liste-nur-für-CallAgent") {
      btn.style.display = "none";
    } else {
      btn.style.display = "inline-block";
    }
  }
  document.getElementById("bs-fields").style.display = "none";
  document.getElementById("tr-fields").style.display = "none";
  document.getElementById("z-fields").style.display = "none";
  updateLabels();
  updateFormVisibility();
  const item = globalRowsData.find(r => r.rowIndex === sheetRowIndex);
  if (!item) return;
  const rowIndexEl = document.getElementById("editRowIndex");
  if (rowIndexEl) rowIndexEl.value = sheetRowIndex;
  const currentLabel = document.getElementById("currentActiveSheetLabel");
  if (currentLabel) currentLabel.innerText = AKTIVES_TABELLENBLATT;
  const keys = Object.keys(item).filter(k => k !== "rowIndex");
  // ⭐ Nur für Öffnungszeiten-Bestellsystem & Öffnungszeiten-Tischreservierung
if (AKTIVES_TABELLENBLATT === "Öffnungszeiten-Bestellsystem") {
  applyRowSpecificVisibility(sheetRowIndex);
  document.getElementById("bs-fields").style.display = "block";
  document.getElementById("tr-fields").style.display = "none";
}
if (AKTIVES_TABELLENBLATT === "Öffnungszeiten-Tischreservierung") {
  applyRowSpecificVisibilityTR(sheetRowIndex);
  document.getElementById("tr-fields").style.display = "block";
  document.getElementById("bs-fields").style.display = "none";
}
if (AKTIVES_TABELLENBLATT === "Zahlungsart") {
  applyRowSpecificVisibilityZ(sheetRowIndex);
  document.getElementById("tr-fields").style.display = "none";
  document.getElementById("bs-fields").style.display = "none";
  document.getElementById("z-fields").style.display = "block";
}
  const SELECTED_INDEX_BY_SHEET = {
    "Speisekarte": 1,
    "USER-ID": 0,
    "Restaurant-Daten": 0,
    "Artikelgruppen-Sperren": 1,
    "Allergeneliste": 1,
    "Öffnungszeiten-Bestellsystem": 0,
    "Öffnungszeiten-Tischreservierung": 0,
    "Zahlungsart": 1,
    "Kundennummer-Liste-nur-für-CallAgent": 1,
    "Extras": 2
  };
  const deleteBtn = document.getElementById("deleteBtn");
  if (deleteBtn) {
    const erlaubteTabellen = ["Speisekarte", "Extras", "Liefergebiete", "Artikelgruppen-Sperren","Allergeneliste"];
    if (erlaubteTabellen.includes(AKTIVES_TABELLENBLATT)) {
      deleteBtn.style.display = "inline-block";
      deleteBtn.setAttribute("data-row", sheetRowIndex);
      deleteBtn.setAttribute("data-sheet", AKTIVES_TABELLENBLATT);
    } else {
      deleteBtn.style.display = "none";
    }
  }
const selectedNameEl = document.getElementById("selectedItemName");
let displayName = "Datensatz";
if (AKTIVES_TABELLENBLATT === "Admin&Bonus") {
  displayName = "Admin&Bonus";
} else if (AKTIVES_TABELLENBLATT === "Kundennummer-Liste-nur-für-CallAgent") {
  displayName = "ACHTUNG!!! - Diese Kundendaten sind NICHT VERÄNDERBAR und dienen ausschließlich dem KI-Agenten. Nur Ihre Kunden können diese Daten telefonisch beim KI-Agenten ändern bzw. anpassen lassen – über einen Legitimationsprozess.\n\nIHR BARRETTA SOLUTIONS IT-SUPPORT TEAM";
} else {
  const preferredIndex = SELECTED_INDEX_BY_SHEET[AKTIVES_TABELLENBLATT];
  if (
    typeof preferredIndex === "number" &&
    keys[preferredIndex] &&
    item[keys[preferredIndex]] &&
    item[keys[preferredIndex]].toString().trim() !== ""
  ) {
    displayName = item[keys[preferredIndex]];
  } else if (
    keys[1] &&
    item[keys[1]] &&
    item[keys[1]].toString().trim() !== ""
  ) {
    displayName = item[keys[1]];
  } else {
    for (let k = 0; k < keys.length; k++) {
      const kk = keys[k];
      if (item[kk] !== undefined && item[kk].toString().trim() !== "") {
        displayName = item[kk];
        break;
      }
    }
  }
}
  if (selectedNameEl) selectedNameEl.innerText = displayName;
  fillFieldsFromItem(item);
fillFieldsFromItem(item);
if (AKTIVES_TABELLENBLATT === "Öffnungszeiten-Bestellsystem") {
  const statusValue = item["Status"] || "";
  document.getElementById("editStatusoezbs").value = statusValue;
  document.getElementById("editschließgrund").value = statusValue;
  document.getElementById("editschließgrundUrlaubBS").value = statusValue;
  const wochentagValue = item["Wochentag"] || "";
  document.getElementById("editWochentagBS").value = wochentagValue;
  document.getElementById("editBSclosenam").value = wochentagValue;
  document.getElementById("editUrlaubBS").value = wochentagValue;
  const von1Value = item["von1"] || "";
  document.getElementById("editvon1").value = von1Value;
  document.getElementById("editschließenvon1").value = von1Value;
  document.getElementById("editUrlaubBSvon1").value = von1Value;
  const bis1Value = item["bis1"] || "";
  document.getElementById("editbis1").value = bis1Value;
  document.getElementById("editschließenbis1").value = bis1Value;
  document.getElementById("editUrlaubBSbis1").value = bis1Value;
  const von2Value = item["von2"] || "";
  document.getElementById("editvon2").value = von2Value;
  document.getElementById("editschließenvon2").value = von2Value;
  const bis2Value = item["bis2"] || "";
  document.getElementById("editbis2").value = bis2Value;
  document.getElementById("editschließenbis2").value = bis2Value;
}
if (AKTIVES_TABELLENBLATT === "Öffnungszeiten-Tischreservierung") {
  const statusValueTR = item["Status"] || "";
  document.getElementById("editStatusoezTR").value = statusValueTR;
  document.getElementById("editschließgrundTR").value = statusValueTR;
  document.getElementById("editschließgrundUrlaubTR").value = statusValueTR;
  const wochentagValueTR = item["Wochentag"] || "";
  document.getElementById("editWochentagTR").value = wochentagValueTR;
  document.getElementById("editTRclosenam").value = wochentagValueTR;
  document.getElementById("editUrlaubTR").value = wochentagValueTR;
  const von1ValueTR = item["von1"] || "";
  document.getElementById("editvon1TR").value = von1ValueTR;
  document.getElementById("editschließenvon1TR").value = von1ValueTR;
  document.getElementById("editUrlaubTRvon1").value = von1ValueTR;
  const bis1ValueTR = item["bis1"] || "";
  document.getElementById("editbis1TR").value = bis1ValueTR;
  document.getElementById("editschließenbis1TR").value = bis1ValueTR;
  document.getElementById("editUrlaubTRbis1").value = bis1ValueTR;
  const von2ValueTR = item["von2"] || "";
  document.getElementById("editvon2TR").value = von2ValueTR;
  document.getElementById("editschließenvon2TR").value = von2ValueTR;
  const bis2ValueTR = item["bis2"] || "";
  document.getElementById("editbis2TR").value = bis2ValueTR;
  document.getElementById("editschließenbis2TR").value = bis2ValueTR;
}
if (AKTIVES_TABELLENBLATT === "Zahlungsart") {
  const zahlungsartaktivierenValueZ = item["Zahlungsart aktivieren"] || "";
  document.getElementById("editZahlungsartakt").value = zahlungsartaktivierenValueZ;
}
  // ⭐ IIFE 1
  (function() {
    const selectEl = document.getElementById("editArtikelgruppeAusverkauft");
    if (!selectEl) return;
    const usedGroups = globalRowsData
      .filter(r => r.rowIndex !== item.rowIndex)
      .map(r => (r["Welche Artikelgruppen möchten Sie sperren oder sind ausverkauft"] || "").trim().toUpperCase())
      .filter(v => v !== "");
    const currentValue = (item["artikelgruppeausverkauft"] || "").trim().toUpperCase();
    for (let opt of selectEl.options) {
      const val = opt.value.trim().toUpperCase();
      if (val === currentValue) {
        opt.disabled = false;
      } else if (usedGroups.includes(val)) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    }
  })();
  // ⭐ IIFE 2
  (function() {
    const selectEl = document.getElementById("editWochentagBS");
    if (!selectEl) return;
    const usedGroups = globalRowsData
      .filter(r => r.rowIndex !== item.rowIndex)
      .map(r => (r["Wochentag"] || "").trim().toUpperCase())
      .filter(v => v !== "");
    const currentValue = (item["wochentag"] || "").trim().toUpperCase();
    for (let opt of selectEl.options) {
      const val = opt.value.trim().toUpperCase();
      if (val === currentValue) {
        opt.disabled = false;
      } else if (usedGroups.includes(val)) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    }
  })();
  // ⭐ IIFE 3
  (function() {
    const selectEl = document.getElementById("editWochentagTR");
    if (!selectEl) return;
    const usedGroups = globalRowsData
      .filter(r => r.rowIndex !== item.rowIndex)
      .map(r => (r["Wochentag"] || "").trim().toUpperCase())
      .filter(v => v !== "");
    const currentValue = (item["wochentag"] || "").trim().toUpperCase();
    for (let opt of selectEl.options) {
      const val = opt.value.trim().toUpperCase();
      if (val === currentValue) {
        opt.disabled = false;
      } else if (usedGroups.includes(val)) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    }
  })();
  // ⭐ IIFE 4
  (function() {
    const selectEl = document.getElementById("editZahlungsartwählen");
    if (!selectEl) return;
    const usedGroups = globalRowsData
      .filter(r => r.rowIndex !== item.rowIndex)
      .map(r => (r["Welche Zahlungen soll der TelefonAssistent anbieten"] || "").trim().toUpperCase())
      .filter(v => v !== "");
    const currentValue = (item["Welche Zahlungen soll der TelefonAssistent anbieten"] || "").trim().toUpperCase();
    for (let opt of selectEl.options) {
      const val = opt.value.trim().toUpperCase();
      if (val === currentValue) {
        opt.disabled = false;
      } else if (usedGroups.includes(val)) {
        opt.disabled = true;
      } else {
        opt.disabled = false;
      }
    }
  })();
  if (item.hasOwnProperty("Sperren")) {
    const sperrenEl = document.getElementById("editArtikelgruppeSperren");
    if (sperrenEl) {
      sperrenEl.checked = (item["Sperren"] === "TRUE" || item["Sperren"] === true);
    }
  }
  if (item.hasOwnProperty("Zahlungsart aktivieren")) {
    const sperrenEl = document.getElementById("editZahlungsartakt");
    if (sperrenEl) {
      sperrenEl.checked = (item["Zahlungsart aktivieren"] === "TRUE" || item["Zahlungsart aktivieren"] === true);
    }
  }
  const typSelect = document.getElementById("editTyp");
  const extrasInput = document.getElementById("editExtras");
  if (typSelect && extrasInput) {
    if (typSelect.value === "Nicht ergänzbarer Hauptartikel") {
      extrasInput.value = "Keine Extras möglich";
      extrasInput.disabled = true;
    } else {
      extrasInput.disabled = false;
    }
  }
  let ausverkauftKey = keys.find(
    k =>
      k.toLowerCase().includes("ausverkauft") ||
      k.toLowerCase().includes("status")
  );
  const ausEl = document.getElementById("editAusverkauft");
  if (ausverkauftKey && item[ausverkauftKey]) {
    const val = item[ausverkauftKey].toString().trim().toUpperCase();
    if (ausEl) ausEl.value = val === "JA" || val === "TRUE" ? "JA" : "NEIN";
  } else {
    if (ausEl) ausEl.value = "NEIN";
  }
  const pfandKey = keys.find(k => k.toLowerCase().includes("pfand"));
  const pfandEl = document.getElementById("editPfand");
  if (pfandEl) pfandEl.value = pfandKey && item[pfandKey] ? item[pfandKey] : "";
  showEditFormBox();
}
// ⭐ Utility: bestimmte Felder anzeigen
function showFields(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.closest(".form-group").style.display = "flex";
  });
}
function applyRowSpecificVisibility(row) {
  document.querySelectorAll(".form-group").forEach(el => {
    el.style.display = "none";
  });
  // ⭐ BS-Bereich
  if (row >= 1 && row <= 9) {
    showFields([
      "editWochentagBS",
      "editvon1",
      "editbis1",
      "editvon2",
      "editbis2",
      "editschichtfreiBS",
      "editStatusoezbs"
    ]);
    return;
  }
  if (row >= 11 && row <= 13) {
    showFields([
      "editBSclosenam",
      "editschließenvon1",
      "editschließenbis1",
      "editschließenvon2",
      "editschließenbis2",
      "editschichtfreiBS2",
      "editschließgrund"
    ]);
    return;
  }
  if (row >= 15 && row <= 19) {
    showFields([
      "editUrlaubBS",
      "editUrlaubBSvon1",
      "editUrlaubBSbis1",
      "editurlaubhinweisBS",
      "editschließgrundUrlaubBS"
    ]);
    return;
  }
}
function applyRowSpecificVisibilityTR(row) {
  document.querySelectorAll(".form-group").forEach(el => {
    el.style.display = "none";
  });
  // ⭐ TR-Bereich
  if (row >= 1 && row <= 9) {
    showFields([
      "editWochentagTR",
      "editvon1TR",
      "editbis1TR",
      "editvon2TR",
      "editbis2TR",
      "editschichtfreiTR",
      "editStatusoezTR"
    ]);
    return;
  }
  if (row >= 11 && row <= 13) {
    showFields([
      "editTRclosenam",
      "editschließenvon1TR",
      "editschließenbis1TR",
      "editschließenvon2TR",
      "editschließenbis2TR",
      "editschichtfreiTR2",
      "editschließgrundTR"
    ]);
    return;
  }
  if (row >= 15 && row <= 19) {
    showFields([
      "editUrlaubTR",
      "editUrlaubTRvon1",
      "editUrlaubTRbis1",
      "editurlaubhinweisTR",
      "editschließgrundUrlaubTR"
    ]);
    return;
  }
}
function applyRowSpecificVisibilityZ(row) {
  document.querySelectorAll(".form-group").forEach(el => {
    el.style.display = "none";
  });
  // 1–3: Nur Basisfelder
  if (row >= 2 && row <= 4) {
    showFields([
      "editZahlungsartakt",
      "editZahlungsartwählen"
    ]);
    return;
  }
  // 4: PayPal-Felder
  if (row === 5) {
    showFields([
      "editZahlungsartakt",
      "editZahlungsartwählen",
      "editPaypalls",
      "editPaypalclientid",
      "editPaypalclientsecret",
      "editPaypalhinweis"
    ]);
    return;
  }
  // 5: Mollie-Felder
  if (row === 6) {
    showFields([
      "editZahlungsartakt",
      "editZahlungsartwählen",
      "editMolliekey",
      "editMolliehinweis"
    ]);
    return;
  }
}
/* NEUE ZEILE ANLEGEN (Form vorbereiten) */
function openNewRowForm() {
    // Alle Hinweisfelder IMMER ausblenden
    const hintIds = [
        "schichtfreiHinweis",
        "schichtfreiHinweisTR",
        "schichtfreiHinweis2",
        "schichtfreiHinweisTR2",
        "urlaubHinweis",
        "urlaubHinweisTR",
        "PaypalHinweis",
        "MollieHinweis",
        "KundendatenHinweis"
    ];
    hintIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
  updateLabels();
  updateFormVisibility();
  const currentLabel = document.getElementById("currentActiveSheetLabel");
  if (currentLabel) currentLabel.innerText = AKTIVES_TABELLENBLATT;
  const selectedNameEl = document.getElementById("selectedItemName");
  if (selectedNameEl) selectedNameEl.innerText = "Neue Zeile";
  const rowIndexEl = document.getElementById("editRowIndex");
  if (rowIndexEl) rowIndexEl.value = "";
  const fields = [
    "editGruppe","editName","editBeschreibung","editAllergene","editTyp",
    "editExtras","editEssenGetraenk","editPreis1","editSize1","editNr1",
    "editPreis2","editSize2","editNr2","editPreis3","editSize3","editNr3",
    "editPreis4","editSize4","editNr4","editPreis5","editSize5","editNr5",
    "editAusverkauft","editPfand","editBenutzername","editPasswort","editFirmenname","editAnrede","editVorname","editNachname","editStrasseHausnr","editPLZrd","editOrtrd","editOrtZusatz","editBundesland","editGeschaeftsfuehrer","editSteuernummer","editUstID","editHRNr","editAmtsgericht","editTelefon1","editTelefon2","editTelefon3","editMobil","editFehlerSMS","editWhatsApp","editFax","editEmail",
    "editPLZ","editOrt","editMindesteuro","editAnfahrteuro","editAnfahrtfreieuro","editZusatztext",
    "editZeitangabe","editZeitangabe2","editLieferart","editZustellung","editAbholrabatt","editLieferrabatt",
    "editArtikelgruppeSperren","editArtikelgruppeAusverkauft","editArtikelgruppeSperrgrund",
    "editKrz","editAllergeneBeschreibung",  
    "editWochentagBS","editvon1","editbis1","editvon2","editbis2","editStatusoezbs","editBSclosenam","editschließenvon1","editschließenbis1","editschließenvon2","editschließenbis2","editschließgrund","editUrlaubBS","editUrlaubBSvon1","editUrlaubBSbis1","editschließgrundUrlaubBS",
    "editWochentagTR","editvon1TR","editbis1TR","editvon2TR","editbis2TR","editStatusoezTR","editTRclosenam","editschließenvon1TR","editschließenbis1TR","editschließenvon2TR","editschließenbis2TR","editschließgrundTR","editUrlaubTR","editUrlaubTRvon1","editUrlaubTRbis1","editschließgrundUrlaubTR",
    "editZahlungsartakt","editZahlungsartwählen","editPaypalls","editPaypalclientid","editPaypalclientsecret","editMolliekey",
    "editKundendatenName","editKundendatenHinweis",
    "editGruppeExtras","editArtikelTypExtras","editExtraName","editAufpreis1","editExtraArtikelnr1","editAufpreis2","editExtraArtikelnr2","editAufpreis3","editExtraArtikelnr3","editAufpreis4","editExtraArtikelnr4","editAufpreis5","editExtraArtikelnr5"
  ];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const ausEl = document.getElementById("editAusverkauft");
  if (ausEl) ausEl.value = "NEIN";
  const extrasInput = document.getElementById("editExtras");
  if (extrasInput) {
    extrasInput.disabled = false;
    extrasInput.value = "";
  }
  // ⭐ Ergänzungsartikel automatisch setzen
  if (AKTIVES_TABELLENBLATT === "Extras") {
    const typEl = document.getElementById("editArtikelTypExtras");
    if (typEl) typEl.value = "Ergänzungsartikel";
  }
// ⭐ NEU: Wochentag, der bereits verwendet wurde, blockieren
(function() {
  const selectEl = document.getElementById("editWochentagBS");
  if (!selectEl) return;
  const COLUMN = "Wochentag";
  const usedGroups = globalRowsData
    .map(r => (r[COLUMN] || "").trim().toUpperCase())
    .filter(v => v !== "");
  for (let opt of selectEl.options) {
    const val = opt.value.trim().toUpperCase();
    opt.disabled = usedGroups.includes(val);
  }
})();   // ✅ WICHTIG: Block sauber schließen
// ⭐ NEU:  Zahlungsart, die bereits verwendet wurde, blockieren
(function() {
  const selectEl = document.getElementById("editZahlungsartwählen");
  if (!selectEl) return;
  const COLUMN = "Welche Zahlungen soll der TelefonAssistent anbieten";
  const usedGroups = globalRowsData
    .map(r => (r[COLUMN] || "").trim().toUpperCase())
    .filter(v => v !== "");
  for (let opt of selectEl.options) {
    const val = opt.value.trim().toUpperCase();
    opt.disabled = usedGroups.includes(val);
  }
})();   // ✅ WICHTIG: Block sauber schließen
  // ⭐ NEU: Artikelgruppen, die bereits verwendet wurden, blockieren
  (function() {
    const selectEl = document.getElementById("editArtikelgruppeAusverkauft");
    if (!selectEl) return;
    // Spaltenname exakt wie im Google Sheet
    const COLUMN = "Welche Artikelgruppen möchten Sie sperren oder sind ausverkauft";
    // Alle bereits verwendeten Gruppen sammeln
    const usedGroups = globalRowsData
      .map(r => (r[COLUMN] || "").trim().toUpperCase())
      .filter(v => v !== "");
    // Jede Option prüfen
    for (let opt of selectEl.options) {
      const val = opt.value.trim().toUpperCase();
      if (usedGroups.includes(val)) {
        opt.disabled = true;   // bereits verwendet → blockieren
      } else {
        opt.disabled = false;  // frei verfügbar
      }
    }
  })();
  showEditFormBox();
}
/* SUBMIT AN MAKE */
async function submitToMakeWebhook() {
if (AKTIVES_TABELLENBLATT === "Kundennummer-Liste-nur-für-CallAgent") {
  alert("Dieses Tabellenblatt ist für Änderungen gesperrt.");
  return;
}
  const btn = document.getElementById("saveChangeBtn");
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Übertrage Daten ...";
  }
  const payload = {
    tabellenblatt: AKTIVES_TABELLENBLATT,
    WebAppURL: "https://script.google.com/macros/s/AKfycbx4S1EwWYzyhm_9e_qRvFbzVIxfcvrurLzJ1er6t__DlSrs8NHFOOZk48q04VS3L2fW/exec",
    spreadsheetID: "1F5ay1C9WdJ6v5R22aNcUUkZW5Ziw25XDLcKrqoZobj4",
    GASTRONAME: "PIZZERIA BS",
    zeilennummer: (document.getElementById("editRowIndex") || { value: "" }).value,
    artikelgruppe: (document.getElementById("editGruppe") || { value: "" }).value,
    artikelname: (document.getElementById("editName") || { value: "" }).value,
    beschreibung: (document.getElementById("editBeschreibung") || { value: "" }).value,
    allergene: (document.getElementById("editAllergene") || { value: "" }).value,
    typ: (document.getElementById("editTyp") || { value: "" }).value,
    extras: (document.getElementById("editExtras") || { value: "" }).value,
    essenGetraenk: (document.getElementById("editEssenGetraenk") || { value: "" }).value,
    preis1: (document.getElementById("editPreis1") || { value: "" }).value,
    size1: (document.getElementById("editSize1") || { value: "" }).value,
    artikelnr1: (document.getElementById("editNr1") || { value: "" }).value,
    preis2: (document.getElementById("editPreis2") || { value: "" }).value,
    size2: (document.getElementById("editSize2") || { value: "" }).value,
    artikelnr2: (document.getElementById("editNr2") || { value: "" }).value,
    preis3: (document.getElementById("editPreis3") || { value: "" }).value,
    size3: (document.getElementById("editSize3") || { value: "" }).value,
    artikelnr3: (document.getElementById("editNr3") || { value: "" }).value,
    preis4: (document.getElementById("editPreis4") || { value: "" }).value,
    size4: (document.getElementById("editSize4") || { value: "" }).value,
    artikelnr4: (document.getElementById("editNr4") || { value: "" }).value,
    preis5: (document.getElementById("editPreis5") || { value: "" }).value,
    size5: (document.getElementById("editSize5") || { value: "" }).value,
    artikelnr5: (document.getElementById("editNr5") || { value: "" }).value,
    ausverkauft: (document.getElementById("editAusverkauft") || { value: "NEIN" }).value,
    pfand: (document.getElementById("editPfand") || { value: "" }).value,
    gruppeextras: (document.getElementById("editGruppeExtras") || { value: "" }).value,
    artikeltypextras: (document.getElementById("editArtikelTypExtras") || { value: "" }).value,
    extraname: (document.getElementById("editExtraName") || { value: "" }).value,
    aufpreis1: (document.getElementById("editAufpreis1") || { value: "" }).value,
    extraartikelnr1: (document.getElementById("editExtraArtikelnr1") || { value: "" }).value,
    aufpreis2: (document.getElementById("editAufpreis2") || { value: "" }).value,
    extraartikelnr2: (document.getElementById("editExtraArtikelnr2") || { value: "" }).value,
    aufpreis3: (document.getElementById("editAufpreis3") || { value: "" }).value,
    extraartikelnr3: (document.getElementById("editExtraArtikelnr3") || { value: "" }).value,
    aufpreis4: (document.getElementById("editAufpreis4") || { value: "" }).value,
    extraartikelnr4: (document.getElementById("editExtraArtikelnr4") || { value: "" }).value,
    aufpreis5: (document.getElementById("editAufpreis5") || { value: "" }).value,
    extraartikelnr5: (document.getElementById("editExtraArtikelnr5") || { value: "" }).value,
    benutzername: (document.getElementById("editBenutzername") || { value: "" }).value,
    passwort: (document.getElementById("editPasswort") || { value: "" }).value,
    plz: (document.getElementById("editPLZ") || { value: "" }).value,
    ort: (document.getElementById("editOrt") || { value: "" }).value,
    mindesteuro: (document.getElementById("editMindesteuro") || { value: "" }).value,
    anfahrteuro: (document.getElementById("editAnfahrteuro") || { value: "" }).value,
    anfahrtfreieuro: (document.getElementById("editAnfahrtfreieuro") || { value: "" }).value,
    zusatztext: (document.getElementById("editZusatztext") || { value: "" }).value,
    firmenname: (document.getElementById("editFirmenname") || { value: "" }).value,
anrede: (document.getElementById("editAnrede") || { value: "" }).value,
vorname: (document.getElementById("editVorname") || { value: "" }).value,
nachname: (document.getElementById("editNachname") || { value: "" }).value,
strasse_hausnr: (document.getElementById("editStrasseHausnr") || { value: "" }).value,
plzrd: (document.getElementById("editPLZrd") || { value: "" }).value,
ortrd: (document.getElementById("editOrtrd") || { value: "" }).value,
ort_zusatz: (document.getElementById("editOrtZusatz") || { value: "" }).value,
bundesland: (document.getElementById("editBundesland") || { value: "" }).value,
geschaeftsfuehrer: (document.getElementById("editGeschaeftsfuehrer") || { value: "" }).value,
steuernummer: (document.getElementById("editSteuernummer") || { value: "" }).value,
ustid: (document.getElementById("editUstID") || { value: "" }).value,
hrnr: (document.getElementById("editHRNr") || { value: "" }).value,
amtsgericht: (document.getElementById("editAmtsgericht") || { value: "" }).value,
telefon1: (document.getElementById("editTelefon1") || { value: "" }).value,
telefon2: (document.getElementById("editTelefon2") || { value: "" }).value,
telefon3: (document.getElementById("editTelefon3") || { value: "" }).value,
mobil: (document.getElementById("editMobil") || { value: "" }).value,
fehlersms: (document.getElementById("editFehlerSMS") || { value: "" }).value,
whatsapp: (document.getElementById("editWhatsApp") || { value: "" }).value,
fax: (document.getElementById("editFax") || { value: "" }).value,
email: (document.getElementById("editEmail") || { value: "" }).value,
zeitangabe: (document.getElementById("editZeitangabe") || { value: "" }).value,
zeitangabe2: (document.getElementById("editZeitangabe2") || { value: "" }).value,
lieferarten: (document.getElementById("editLieferart") || { value: "" }).value,
zustellung: (document.getElementById("editZustellung") || { value: "" }).value,
abholrabatt: (document.getElementById("editAbholrabatt") || { value: "" }).value,
lieferrabatt: (document.getElementById("editLieferrabatt") || { value: "" }).value,
artikelgruppensperren: document.getElementById("editArtikelgruppeSperren").checked ? "TRUE" : "FALSE",
artikelgruppeausverkauft: (document.getElementById("editArtikelgruppeAusverkauft") || { value: "" }).value,
artikelgruppesperrgrund: (document.getElementById("editArtikelgruppeSperrgrund") || { value: "" }).value,
kurzel: (document.getElementById("editKrz") || { value: "" }).value,
allergenebeschreibung: (document.getElementById("editAllergeneBeschreibung") || { value: "" }).value,
wochentagBS: (document.getElementById("editWochentagBS") || { value: "" }).value,
von1: (document.getElementById("editvon1") || { value: "" }).value,
bis1: (document.getElementById("editbis1") || { value: "" }).value,
von2: (document.getElementById("editvon2") || { value: "" }).value,
bis2: (document.getElementById("editbis2") || { value: "" }).value,
statusoezbs: (document.getElementById("editStatusoezbs") || { value: "" }).value,
BSclosenam: (document.getElementById("editBSclosenam") || { value: "" }).value,
schließenvon1: (document.getElementById("editschließenvon1") || { value: "" }).value,
schließenbis1: (document.getElementById("editschließenbis1") || { value: "" }).value,
schließenvon2: (document.getElementById("editschließenvon2") || { value: "" }).value,
schließenbis2: (document.getElementById("editschließenbis2") || { value: "" }).value,
schließgrund: (document.getElementById("editschließgrund") || { value: "" }).value,
UrlaubBS: (document.getElementById("editUrlaubBS") || { value: "" }).value,
UrlaubBSvon1: (document.getElementById("editUrlaubBSvon1") || { value: "" }).value,
UrlaubBSbis1: (document.getElementById("editUrlaubBSbis1") || { value: "" }).value,
schließgrundUrlaubBS: (document.getElementById("editschließgrundUrlaubBS") || { value: "" }).value,
wochentagTR: (document.getElementById("editWochentagTR") || { value: "" }).value,
von1TR: (document.getElementById("editvon1TR") || { value: "" }).value,
bis1TR: (document.getElementById("editbis1TR") || { value: "" }).value,
von2TR: (document.getElementById("editvon2TR") || { value: "" }).value,
bis2TR: (document.getElementById("editbis2TR") || { value: "" }).value,
statusoezTR: (document.getElementById("editStatusoezTR") || { value: "" }).value,
TRclosenam: (document.getElementById("editTRclosenam") || { value: "" }).value,
schließenvon1TR: (document.getElementById("editschließenvon1TR") || { value: "" }).value,
schließenbis1TR: (document.getElementById("editschließenbis1TR") || { value: "" }).value,
schließenvon2TR: (document.getElementById("editschließenvon2TR") || { value: "" }).value,
schließenbis2TR: (document.getElementById("editschließenbis2TR") || { value: "" }).value,
schließgrundTR: (document.getElementById("editschließgrundTR") || { value: "" }).value,
UrlaubTR: (document.getElementById("editUrlaubTR") || { value: "" }).value,
UrlaubTRvon1: (document.getElementById("editUrlaubTRvon1") || { value: "" }).value,
UrlaubTRbis1: (document.getElementById("editUrlaubTRbis1") || { value: "" }).value,
schließgrundUrlaubTR: (document.getElementById("editschließgrundUrlaubTR") || { value: "" }).value,
zahlungsartakt: document.getElementById("editZahlungsartakt").checked ? "TRUE" : "FALSE",
zahlungsartwahl: (document.getElementById("editZahlungsartwählen") || { value: "" }).value,
paypalls: (document.getElementById("editPaypalls") || { value: "" }).value,
paypalclientid: (document.getElementById("editPaypalclientid") || { value: "" }).value,
paypalclientsecret: (document.getElementById("editPaypalclientsecret") || { value: "" }).value,
molliekey: (document.getElementById("editMolliekey") || { value: "" }).value
  };
  if (!payload.zeilennummer || payload.zeilennummer.trim() === "") {
    payload.neueZeile = true;
  }
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      alert("Erfolgreich übermittelt!");
      closeEditForm();
      showTableLoader("Aktualisiere Tabelle ...");
      await fetchSheetData();
    } else {
      alert("Fehler beim Webhook-Aufruf.");
    }
  } catch (e) {
    console.error("Fehler beim Senden an Make:", e);
    alert("Verbindungsfehler zu Make.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Änderungen live speichern";
    }
  }
}
/* Refresh Button */
document.getElementById("btnRefresh").addEventListener("click", async function () {
  const btn = this;
  try {
    btn.disabled = true;
    btn.innerText = "Aktualisiere ...";
    showTableLoader("Aktualisiere ...");
    await fetchSheetData();
  } catch (e) {
    console.error("Fehler beim Aktualisieren:", e);
  } finally {
    hideTableLoader();
    btn.disabled = false;
    btn.innerText = "Liste aktualisieren";
  }
});
/* Typ-Änderung: Extras sperren/freigeben */
document.getElementById("editTyp").addEventListener("change", function () {
  const extrasInput = document.getElementById("editExtras");
  if (!extrasInput) return;
  if (this.value === "Nicht ergänzbarer Hauptartikel") {
    extrasInput.value = "Keine Extras möglich";
    extrasInput.disabled = true;
  } else {
    extrasInput.value = "";
    extrasInput.disabled = false;
  }
});
/* Datensatz löschen (nur manuell über Button) */
async function deleteSelectedRow() {
  const deleteBtn = document.getElementById("deleteBtn");
  if (!deleteBtn) return;
  const rowIndex = deleteBtn.getAttribute("data-row");
  const sheetName = deleteBtn.getAttribute("data-sheet");
  if (!rowIndex || !sheetName) return;
  // Dynamisch den Datensatz-Namen bestimmen
  let recordName = "Datensatz";
  if (sheetName === "Speisekarte") {
    const nameEl = document.getElementById("editName");
    if (nameEl && nameEl.value.trim() !== "") {
      recordName = nameEl.value.trim();
    }
  }
  if (sheetName === "Extras") {
    const extraEl = document.getElementById("editExtraName");
    if (extraEl && extraEl.value.trim() !== "") {
      recordName = extraEl.value.trim();
    }
  }
  if (sheetName === "Liefergebiete") {
    const ortEl = document.getElementById("editOrt");
    if (ortEl && ortEl.value.trim() !== "") {
      recordName = ortEl.value.trim();
    }
  }
    if (sheetName === "Artikelgruppen-Sperren") {
    const ortEl = document.getElementById("editArtikelgruppeAusverkauft");
    if (ortEl && ortEl.value.trim() !== "") {
      recordName = ortEl.value.trim();
    }
  }
      if (sheetName === "Allergeneliste") {
    const ortEl = document.getElementById("editAllergeneBeschreibung");
    if (ortEl && ortEl.value.trim() !== "") {
      recordName = ortEl.value.trim();
    }
  }
  // Bestätigungsdialog
  if (!confirm(`Soll der Datensatz "${recordName}" aus "${sheetName}" wirklich gelöscht werden?`)) {
    return;
  }
  const url = `https://script.google.com/macros/s/AKfycbx4S1EwWYzyhm_9e_qRvFbzVIxfcvrurLzJ1er6t__DlSrs8NHFOOZk48q04VS3L2fW/exec?action=deleteRow&sheet=${encodeURIComponent(sheetName)}&rowIndex=${rowIndex}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    alert(result.message || "Datensatz gelöscht.");
    fetchSheetData();
    closeEditForm();
  } catch (err) {
    alert("Fehler beim Löschen.");
    console.error(err);
  }
}
/* LOGOUT & START */
function handleLogout() {
  sessionStorage.clear();
  window.location.href = "/admin-panel";
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeEditForm();
});
/* Initial */
updateLabels();
updateFormVisibility();
updateNewRowButtonVisibility();
showTableLoader("Lade initiale Daten ...");
fetchSheetData();

