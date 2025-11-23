/**
 * Script handling the extension's user interface
 */

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function () {
  // Initialize data generator
  let generator = new PolishDataGenerator();

  // Fill form with data
  fillFormWithData(generator);

  // Handle tab switching
  setupTabs();

  // Handle generate button
  document.getElementById('generateBtn').addEventListener('click', function () {
    generator = new PolishDataGenerator();
    fillFormWithData(generator);
  });

  // Handle copy buttons
  setupCopyButtons();
  // Handle "Copy all" button
  document.getElementById('copyAllBtn').addEventListener('click', function () {
    copyAllData(generator);
  });

  // Save data in local storage
  saveDataToStorage(generator);

  // Handle suggestion button
  const suggestionBtn = document.querySelector('.suggestion-btn');
  if (suggestionBtn) {
    suggestionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: this.href });
    });
  }

  // Handle themes
  setupThemeSwitcher();
});

function fillFormWithData(generator) {
  // Personal data
  document.getElementById('fullName').value = generator.person.fullName;
  document.getElementById('pesel').value = generator.person.pesel;
  document.getElementById('birthDate').value = generator.person.birthDate;
  document.getElementById('email').value = generator.person.email;
  document.getElementById('phone').value = generator.person.phone;

  // Bank account data for person
  document.getElementById('bankName').value = generator.bankAccount.bank;
  document.getElementById('iban').value = generator.bankAccount.formattedIban;
  document.getElementById('cardNumber').value = generator.bankAccount.formattedCardNumber;
  document.getElementById('cardDetails').value = `${generator.bankAccount.expiryDate} / ${generator.bankAccount.cvv}`;

  // Address
  document.getElementById('street').value = generator.address.streetWithNumber;
  document.getElementById('postalCode').value = generator.address.postalCode;
  document.getElementById('city').value = generator.address.city;
  document.getElementById('voivodeship').value = generator.address.voivodeship;
  document.getElementById('fullAddress').value = generator.address.fullAddress;

  // Documents
  document.getElementById('idCard').value = generator.documents.idCard;
  document.getElementById('idCardIssueDate').value = generator.documents.idCardIssueDate;
  document.getElementById('idCardExpiryDate').value = generator.documents.idCardExpiryDate;
  document.getElementById('passport').value = generator.documents.passport;
  document.getElementById('passportIssueDate').value = generator.documents.passportIssueDate;
  document.getElementById('passportExpiryDate').value = generator.documents.passportExpiryDate;

  // Company
  document.getElementById('companyName').value = generator.company.companyName;
  document.getElementById('nip').value = generator.company.nip;
  document.getElementById('regon').value = generator.company.regon;
  document.getElementById('krs').value = generator.company.krs;

  // Bank account data for company
  document.getElementById('swift').value = generator.company.companySwift;
  document.getElementById('companyIban').value = generator.company.formattedCompanyIban;
}

/**
 * Sets up tab handling
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Activate corresponding panel
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Save active tab in local storage
      chrome.storage.local.set({ activeTab: tabId });
    });
  });

  // Restore last active tab
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
 * Sets up copy buttons
 */
function setupCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Get ID of field to copy
      const targetId = this.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);

      // Copy text to clipboard
      copyToClipboard(targetInput.value);

      // Show copy notification
      showCopyTooltip(this);
    });
  });
}

/**
 * Copies all data to clipboard
 */
function copyAllData(generator) {
  // Prepare text with all data
  let allData = '';

  // Personal data
  allData += 'DANE OSOBOWE:\n';
  allData += `Imię i nazwisko: ${generator.person.fullName}\n`;
  allData += `PESEL: ${generator.person.pesel}\n`;
  allData += `Data urodzenia: ${generator.person.birthDate}\n`;
  allData += `Email: ${generator.person.email}\n`;
  allData += `Telefon: ${generator.person.phone}\n\n`;

  // Bank account data for person
  allData += 'DANE BANKOWE:\n';
  allData += `Bank: ${generator.bankAccount.bank}\n`;
  allData += `IBAN: ${generator.bankAccount.formattedIban}\n`;
  allData += `Numer karty: ${generator.bankAccount.formattedCardNumber}\n`;
  allData += `Szczegóły karty: ${generator.bankAccount.expiryDate} / ${generator.bankAccount.cvv}\n\n`;

  // Address
  allData += 'ADRES:\n';
  allData += `Ulica i numer: ${generator.address.streetWithNumber}\n`;
  allData += `Kod pocztowy: ${generator.address.postalCode}\n`;
  allData += `Miasto: ${generator.address.city}\n`;
  allData += `Województwo: ${generator.address.voivodeship}\n`;
  allData += `Pełny adres: ${generator.address.fullAddress}\n\n`;

  // Documents
  allData += 'DOKUMENTY:\n';
  allData += `Dowód osobisty: ${generator.documents.idCard}\n`;
  allData += `Data wydania dowodu: ${generator.documents.idCardIssueDate}\n`;
  allData += `Data ważności dowodu: ${generator.documents.idCardExpiryDate}\n`;
  allData += `Paszport: ${generator.documents.passport}\n`;
  allData += `Data wydania paszportu: ${generator.documents.passportIssueDate}\n`;
  allData += `Data ważności paszportu: ${generator.documents.passportExpiryDate}\n\n`;

  // Company
  allData += 'FIRMA:\n';
  allData += `Nazwa firmy: ${generator.company.companyName}\n`;
  allData += `NIP: ${generator.company.nip}\n`;
  allData += `REGON: ${generator.company.regon}\n`;
  allData += `KRS: ${generator.company.krs}\n`;

  // Bank account data for company
  allData += 'DANE BANKOWE FIRMY:\n';
  allData += `Bank: ${generator.company.companyBank}\n`;
  allData += `SWIFT: ${generator.company.companySwift}\n`;
  allData += `IBAN: ${generator.company.formattedCompanyIban}\n`;

  // Copy to clipboard
  copyToClipboard(allData);

  // Show copy notification
  const copyAllBtn = document.getElementById('copyAllBtn');
  showCopyTooltip(copyAllBtn);
}

/**
 * Copies text to clipboard
 */
function copyToClipboard(text) {
  // Create temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  // Select text and copy
  textarea.select();
  document.execCommand('copy');

  // Remove temporary element
  document.body.removeChild(textarea);
}

/**
 * Shows tooltip informing about copying
 */
function showCopyTooltip(button) {
  // Add tooltip class to button
  button.classList.add('tooltip');

  // Create tooltip element if it doesn't exist
  if (!button.querySelector('.tooltip-text')) {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip-text';
    tooltip.textContent = 'Skopiowano!';
    button.appendChild(tooltip);
  }

  // Show tooltip
  button.classList.add('show');

  // Hide tooltip after 2 seconds
  setTimeout(() => {
    button.classList.remove('show');
  }, 2000);
}

/**
 * Saves data in local storage
 */
function saveDataToStorage(generator) {
  chrome.storage.local.set({ lastGeneratedData: generator });
}

/**
 * Sets up theme switcher
 */
function setupThemeSwitcher() {
  const themeSelect = document.getElementById('themeSelect');
  // Handle theme change
  if (themeSelect) {
    themeSelect.addEventListener('change', function () {
      const selectedTheme = this.value;

      // Remove all theme classes
      document.body.className = '';

      // Add new class
      document.body.classList.add(`theme-${selectedTheme}`);

      // Save choice
      chrome.storage.local.set({ theme: selectedTheme });
    });
  }
}