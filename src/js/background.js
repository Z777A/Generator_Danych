/**
 * Background script dla rozszerzenia Generator Danych
 * Odpowiada za tworzenie pozycji w menu kontekstowym przeglądarki
 */

// Kategorie danych
const CATEGORIES = {
  PERSONAL: {
    id: 'personal',
    title: 'Dane osobowe',
    children: [
      { id: 'fullName', title: 'Imię i nazwisko' },
      { id: 'firstName', title: 'Imię' },
      { id: 'lastName', title: 'Nazwisko' },
      { id: 'pesel', title: 'PESEL' },
      { id: 'birthDate', title: 'Data urodzenia' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Telefon' }
    ]
  },
  ADDRESS: {
    id: 'address',
    title: 'Adres',
    children: [
      { id: 'street', title: 'Ulica i numer' },
      { id: 'postalCode', title: 'Kod pocztowy' },
      { id: 'city', title: 'Miasto' },
      { id: 'voivodeship', title: 'Województwo' },
      { id: 'fullAddress', title: 'Pełny adres' }
    ]
  },
  DOCUMENTS: {
    id: 'documents',
    title: 'Dokumenty',
    children: [
      { id: 'idCard', title: 'Dowód osobisty' },
      { id: 'idCardIssueDate', title: 'Data wydania dowodu' },
      { id: 'idCardExpiryDate', title: 'Data ważności dowodu' },
      { id: 'passport', title: 'Paszport' },
      { id: 'passportIssueDate', title: 'Data wydania paszportu' },
      { id: 'passportExpiryDate', title: 'Data ważności paszportu' }
    ]
  },
  BANK: {
    id: 'bank',
    title: 'Dane bankowe',
    children: [
      { id: 'bankName', title: 'Nazwa banku' },
      { id: 'iban', title: 'Numer rachunku (IBAN)' },
      { id: 'cardNumber', title: 'Numer karty' },
      { id: 'cardExpiry', title: 'Data ważności karty' },
      { id: 'cvv', title: 'Kod CVV' }
    ]
  },
  COMPANY: {
    id: 'company',
    title: 'Firma',
    children: [
      { id: 'companyName', title: 'Nazwa firmy' },
      { id: 'nip', title: 'NIP' },
      { id: 'regon', title: 'REGON' },
      { id: 'krs', title: 'KRS' }
    ]
  }
};

// Główny kontekst menu - tylko dla pól tekstowych
const CONTEXT_TYPES = ['editable'];

// Funkcja inicjalizująca menu kontekstowe
function initContextMenus() {
  // Usuń wszystkie istniejące pozycje menu
  chrome.contextMenus.removeAll();
  
  // Utwórz główną pozycję menu
  chrome.contextMenus.create({
    id: 'polishDataGenerator',
    title: 'Wstaw dane testowe',
    contexts: CONTEXT_TYPES
  });
  
  // Utwórz pozycję do odświeżania danych
  chrome.contextMenus.create({
    id: 'refreshData',
    parentId: 'polishDataGenerator',
    title: '🔄 Wygeneruj nowe dane',
    contexts: CONTEXT_TYPES
  });
  
  // Dodaj separator
  chrome.contextMenus.create({
    id: 'separator1',
    parentId: 'polishDataGenerator',
    type: 'separator',
    contexts: CONTEXT_TYPES
  });
  
  // Utwórz kategorie i ich pozycje
  Object.values(CATEGORIES).forEach(category => {
    // Utwórz kategorię
    chrome.contextMenus.create({
      id: category.id,
      parentId: 'polishDataGenerator',
      title: category.title,
      contexts: CONTEXT_TYPES
    });
    
    // Utwórz pozycje w kategorii
    category.children.forEach(item => {
      chrome.contextMenus.create({
        id: `${category.id}_${item.id}`,
        parentId: category.id,
        title: item.title,
        contexts: CONTEXT_TYPES
      });
    });
  });
}

// Obsługa kliknięcia w pozycję menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Najpierw aktywujemy uprawnienie activeTab poprzez wywołanie chrome.tabs.executeScript
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // Ta funkcja jest pusta, ale jej wywołanie aktywuje uprawnienie activeTab
      return true;
    }
  }, () => {
    // Po aktywacji uprawnienia activeTab, możemy wysłać komunikat do content script
    
    // Sprawdź, czy kliknięto w pozycję menu
    if (info.menuItemId === 'refreshData') {
      // Wyślij komunikat do content script o odświeżenie danych
      chrome.tabs.sendMessage(tab.id, { action: 'refreshData' });
      return;
    }
    
    // Sprawdź, czy kliknięto w pozycję z danymi
    const [categoryId, itemId] = info.menuItemId.split('_');
    if (categoryId && itemId) {
      // Znajdź kategorię i pozycję
      const category = Object.values(CATEGORIES).find(cat => cat.id === categoryId);
      if (category) {
        const item = category.children.find(it => it.id === itemId);
        if (item) {
          // Wyślij komunikat do content script o wstawienie danych
          chrome.tabs.sendMessage(tab.id, { 
            action: 'insertData',
            dataType: item.title
          });
        }
      }
    }
  });
});

// Inicjalizacja menu kontekstowego przy instalacji lub aktualizacji rozszerzenia
chrome.runtime.onInstalled.addListener(() => {
  initContextMenus();
});

// Nasłuchuj na komunikaty od content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getContextMenuState') {
    sendResponse({ enabled: true });
  }
}); 