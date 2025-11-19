/**
 * Skrypt obsługujący interfejs użytkownika rozszerzenia
 */

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function () {
  // Inicjalizacja generatora danych
  let generator = new PolishDataGenerator();

  // Wypełnij formularz danymi
  fillFormWithData(generator);

  // Obsługa przełączania zakładek
  setupTabs();

  // Obsługa przycisku generowania
  document.getElementById('generateBtn').addEventListener('click', function () {
    generator = new PolishDataGenerator();
    fillFormWithData(generator);
  });

  // Obsługa przycisków kopiowania
  setupCopyButtons();
  // Obsługa przycisku "Kopiuj wszystko"
  document.getElementById('copyAllBtn').addEventListener('click', function () {
    copyAllData(generator);
  });

  // Zapisz dane w pamięci lokalnej
  saveDataToStorage(generator);

  // Obsługa przycisku sugestii
  const suggestionBtn = document.querySelector('.suggestion-btn');
  if (suggestionBtn) {
    suggestionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: this.href });
    });
  }
});

function fillFormWithData(generator) {
  // Dane osobowe
  document.getElementById('fullName').value = generator.person.fullName;
  document.getElementById('pesel').value = generator.person.pesel;
  document.getElementById('birthDate').value = generator.person.birthDate;
  document.getElementById('email').value = generator.person.email;
  document.getElementById('phone').value = generator.person.phone;

  // Dane bankowe dla osoby
  document.getElementById('bankName').value = generator.bankAccount.bank;
  document.getElementById('iban').value = generator.bankAccount.formattedIban;
  document.getElementById('cardNumber').value = generator.bankAccount.formattedCardNumber;
  document.getElementById('cardDetails').value = `${generator.bankAccount.expiryDate} / ${generator.bankAccount.cvv}`;

  // Adres
  document.getElementById('street').value = generator.address.streetWithNumber;
  document.getElementById('postalCode').value = generator.address.postalCode;
  document.getElementById('city').value = generator.address.city;
  document.getElementById('voivodeship').value = generator.address.voivodeship;
  document.getElementById('fullAddress').value = generator.address.fullAddress;

  // Dokumenty
  document.getElementById('idCard').value = generator.documents.idCard;
  document.getElementById('idCardIssueDate').value = generator.documents.idCardIssueDate;
  document.getElementById('idCardExpiryDate').value = generator.documents.idCardExpiryDate;
  document.getElementById('passport').value = generator.documents.passport;
  document.getElementById('passportIssueDate').value = generator.documents.passportIssueDate;
  document.getElementById('passportExpiryDate').value = generator.documents.passportExpiryDate;

  // Firma
  document.getElementById('companyName').value = generator.company.companyName;
  document.getElementById('nip').value = generator.company.nip;
  document.getElementById('regon').value = generator.company.regon;
  document.getElementById('krs').value = generator.company.krs;

  // Dane bankowe dla firmy
  document.getElementById('swift').value = generator.company.companySwift;
  document.getElementById('companyIban').value = generator.company.formattedCompanyIban;
}

/**
 * Konfiguruje obsługę zakładek
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Usuń klasę active ze wszystkich przycisków i paneli
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Dodaj klasę active do klikniętego przycisku
      this.classList.add('active');

      // Aktywuj odpowiedni panel
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Zapisz aktywną zakładkę w pamięci lokalnej
      chrome.storage.local.set({ activeTab: tabId });
    });
  });

  // Przywróć ostatnio aktywną zakładkę
  chrome.storage.local.get('activeTab', function (data) {
    if (data.activeTab) {
      const tabToActivate = document.querySelector(`.tab-btn[data-tab="${data.activeTab}"]`);
      if (tabToActivate) {
        tabToActivate.click();
      }
    }
  });
}

/**
 * Konfiguruje przyciski kopiowania
 */
function setupCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Pobierz ID pola do skopiowania
      const targetId = this.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);

      // Kopiuj tekst do schowka
      copyToClipboard(targetInput.value);

      // Pokaż informację o skopiowaniu
      showCopyTooltip(this);
    });
  });
}

/**
 * Kopiuje wszystkie dane do schowka
 */
function copyAllData(generator) {
  // Przygotuj tekst ze wszystkimi danymi
  let allData = '';

  // Dane osobowe
  allData += 'DANE OSOBOWE:\n';
  allData += `Imię i nazwisko: ${generator.person.fullName}\n`;
  allData += `PESEL: ${generator.person.pesel}\n`;
  allData += `Data urodzenia: ${generator.person.birthDate}\n`;
  allData += `Email: ${generator.person.email}\n`;
  allData += `Telefon: ${generator.person.phone}\n\n`;

  // Dane bankowe dla osoby
  allData += 'DANE BANKOWE:\n';
  allData += `Bank: ${generator.bankAccount.bank}\n`;
  allData += `IBAN: ${generator.bankAccount.formattedIban}\n`;
  allData += `Numer karty: ${generator.bankAccount.formattedCardNumber}\n`;
  allData += `Szczegóły karty: ${generator.bankAccount.expiryDate} / ${generator.bankAccount.cvv}\n\n`;

  // Adres
  allData += 'ADRES:\n';
  allData += `Ulica i numer: ${generator.address.streetWithNumber}\n`;
  allData += `Kod pocztowy: ${generator.address.postalCode}\n`;
  allData += `Miasto: ${generator.address.city}\n`;
  allData += `Województwo: ${generator.address.voivodeship}\n`;
  allData += `Pełny adres: ${generator.address.fullAddress}\n\n`;

  // Dokumenty
  allData += 'DOKUMENTY:\n';
  allData += `Dowód osobisty: ${generator.documents.idCard}\n`;
  allData += `Data wydania dowodu: ${generator.documents.idCardIssueDate}\n`;
  allData += `Data ważności dowodu: ${generator.documents.idCardExpiryDate}\n`;
  allData += `Paszport: ${generator.documents.passport}\n`;
  allData += `Data wydania paszportu: ${generator.documents.passportIssueDate}\n`;
  allData += `Data ważności paszportu: ${generator.documents.passportExpiryDate}\n\n`;

  // Firma
  allData += 'FIRMA:\n';
  allData += `Nazwa firmy: ${generator.company.companyName}\n`;
  allData += `NIP: ${generator.company.nip}\n`;
  allData += `REGON: ${generator.company.regon}\n`;
  allData += `KRS: ${generator.company.krs}\n`;

  // Dane bankowe dla firmy
  allData += 'DANE BANKOWE FIRMY:\n';
  allData += `Bank: ${generator.company.companyBank}\n`;
  allData += `SWIFT: ${generator.company.companySwift}\n`;
  allData += `IBAN: ${generator.company.formattedCompanyIban}\n`;

  // Kopiuj do schowka
  copyToClipboard(allData);

  // Pokaż informację o skopiowaniu
  const copyAllBtn = document.getElementById('copyAllBtn');
  showCopyTooltip(copyAllBtn);
}

/**
 * Kopiuje tekst do schowka
 */
function copyToClipboard(text) {
  // Tworzymy tymczasowy element textarea
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  // Zaznacz tekst i skopiuj
  textarea.select();
  document.execCommand('copy');

  // Usuń tymczasowy element
  document.body.removeChild(textarea);
}

/**
 * Pokazuje tooltip informujący o skopiowaniu
 */
function showCopyTooltip(button) {
  // Dodaj klasę tooltip do przycisku
  button.classList.add('tooltip');

  // Utwórz element tooltip jeśli nie istnieje
  if (!button.querySelector('.tooltip-text')) {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip-text';
    tooltip.textContent = 'Skopiowano!';
    button.appendChild(tooltip);
  }

  // Pokaż tooltip
  button.classList.add('show');

  // Ukryj tooltip po 2 sekundach
  setTimeout(() => {
    button.classList.remove('show');
  }, 2000);
}

/**
 * Zapisuje dane w pamięci lokalnej
 */
function saveDataToStorage(generator) {
  chrome.storage.local.set({ lastGeneratedData: generator });
} 