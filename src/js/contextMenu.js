/**
 * Skrypt obsługujący wstawianie danych z menu kontekstowego przeglądarki
 */

// Inicjalizacja generatora danych
let dataGenerator = new PolishDataGenerator();
dataGenerator.generateAll();

// Typy danych, które można wstawić
const DATA_TYPES = {
  // Dane osobowe
  'Imię i nazwisko': 'FULL_NAME',
  'Imię': 'FIRST_NAME',
  'Nazwisko': 'LAST_NAME',
  'PESEL': 'PESEL',
  'Data urodzenia': 'BIRTH_DATE',
  'Email': 'EMAIL',
  'Telefon': 'PHONE',
  
  // Adres
  'Ulica i numer': 'STREET',
  'Kod pocztowy': 'POSTAL_CODE',
  'Miasto': 'CITY',
  'Województwo': 'VOIVODESHIP',
  'Pełny adres': 'FULL_ADDRESS',
  
  // Dokumenty
  'Dowód osobisty': 'ID_CARD',
  'Data wydania dowodu': 'ID_CARD_ISSUE_DATE',
  'Data ważności dowodu': 'ID_CARD_EXPIRY_DATE',
  'Paszport': 'PASSPORT',
  'Data wydania paszportu': 'PASSPORT_ISSUE_DATE',
  'Data ważności paszportu': 'PASSPORT_EXPIRY_DATE',
  
  // Dane bankowe
  'Nazwa banku': 'BANK_NAME',
  'Numer rachunku (IBAN)': 'IBAN',
  'Numer karty': 'CARD_NUMBER',
  'Data ważności karty': 'CARD_EXPIRY',
  'Kod CVV': 'CVV',
  
  // Firma
  'Nazwa firmy': 'COMPANY_NAME',
  'NIP': 'NIP',
  'REGON': 'REGON',
  'KRS': 'KRS'
};

// Funkcja odświeżająca generator danych
function refreshGenerator() {
  dataGenerator = new PolishDataGenerator();
  dataGenerator.generateAll();
  console.log('✨ Wygenerowano nowe dane testowe!');
}

// Funkcja pobierająca dane na podstawie wybranego typu
function getDataByType(type) {
  const dataType = DATA_TYPES[type];
  
  if (!dataType) {
    console.error(`Nieznany typ danych: ${type}`);
    return '';
  }
  
  switch (dataType) {
    // Dane osobowe
    case 'FULL_NAME':
      return dataGenerator.person.fullName;
    case 'FIRST_NAME':
      return dataGenerator.person.firstName;
    case 'LAST_NAME':
      return dataGenerator.person.lastName;
    case 'PESEL':
      return dataGenerator.person.pesel;
    case 'BIRTH_DATE':
      return dataGenerator.person.birthDate;
    case 'EMAIL':
      return dataGenerator.person.email;
    case 'PHONE':
      return dataGenerator.person.phone;
    
    // Adres
    case 'STREET':
      return dataGenerator.address.streetWithNumber;
    case 'POSTAL_CODE':
      return dataGenerator.address.postalCode;
    case 'CITY':
      return dataGenerator.address.city;
    case 'VOIVODESHIP':
      return dataGenerator.address.voivodeship;
    case 'FULL_ADDRESS':
      return dataGenerator.address.fullAddress;
    
    // Dokumenty
    case 'ID_CARD':
      return dataGenerator.documents.idCard;
    case 'ID_CARD_ISSUE_DATE':
      return dataGenerator.documents.idCardIssueDate;
    case 'ID_CARD_EXPIRY_DATE':
      return dataGenerator.documents.idCardExpiryDate;
    case 'PASSPORT':
      return dataGenerator.documents.passport;
    case 'PASSPORT_ISSUE_DATE':
      return dataGenerator.documents.passportIssueDate;
    case 'PASSPORT_EXPIRY_DATE':
      return dataGenerator.documents.passportExpiryDate;
    
    // Dane bankowe
    case 'BANK_NAME':
      return dataGenerator.bankAccount.bank;
    case 'IBAN':
      return dataGenerator.bankAccount.formattedIban;
    case 'CARD_NUMBER':
      return dataGenerator.bankAccount.formattedCardNumber;
    case 'CARD_EXPIRY':
      return dataGenerator.bankAccount.expiryDate;
    case 'CVV':
      return dataGenerator.bankAccount.cvv;
    
    // Firma
    case 'COMPANY_NAME':
      return dataGenerator.company.companyName;
    case 'NIP':
      return dataGenerator.company.nip;
    case 'REGON':
      return dataGenerator.company.regon;
    case 'KRS':
      return dataGenerator.company.krs;
    
    default:
      return '';
  }
}

// Funkcja wstawiająca dane do aktywnego elementu
function insertDataToActiveElement(data) {
  // Pobierz aktywny element
  const activeElement = document.activeElement;
  
  if (activeElement) {
    // Sprawdź typ elementu i odpowiednio ustaw wartość
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
      activeElement.value = data;
      // Wywołaj zdarzenie input, aby powiadomić stronę o zmianie wartości
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
      activeElement.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Dodaj klasę animacji sukcesu
      activeElement.classList.add('polish-data-insert-success');
      setTimeout(() => {
        activeElement.classList.remove('polish-data-insert-success');
      }, 1000);
    } else if (activeElement.isContentEditable) {
      activeElement.textContent = data;
      // Wywołaj zdarzenie input, aby powiadomić stronę o zmianie wartości
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}

// Nasłuchuj na komunikaty z background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Obsługa odświeżania danych
  if (message.action === 'refreshData') {
    refreshGenerator();
    sendResponse({ success: true });
    return;
  }
  
  // Obsługa wstawiania danych
  if (message.action === 'insertData' && message.dataType) {
    const data = getDataByType(message.dataType);
    if (data) {
      insertDataToActiveElement(data);
      sendResponse({ success: true, data });
    } else {
      sendResponse({ success: false, error: 'Nie udało się wygenerować danych' });
    }
    return;
  }
});

// Komunikat powitalny w konsoli
console.log('✨ Generator danych testowych aktywny! Kliknij prawym przyciskiem myszy na dowolnym polu tekstowym, aby wstawić dane.'); 