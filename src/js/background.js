/**
 * Background script for the Data Generator extension
 * Responsible for creating context menu items in the browser
 */

// Data categories
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

// Main menu context - only for text fields
const CONTEXT_TYPES = ['editable'];

// Function to initialize context menu
function initContextMenus() {
  // Remove all existing menu items
  chrome.contextMenus.removeAll();

  // Create main menu item
  chrome.contextMenus.create({
    id: 'polishDataGenerator',
    title: 'Wstaw dane testowe',
    contexts: CONTEXT_TYPES
  });

  // Create refresh data menu item
  chrome.contextMenus.create({
    id: 'refreshData',
    parentId: 'polishDataGenerator',
    title: '🔄 Wygeneruj nowe dane',
    contexts: CONTEXT_TYPES
  });

  // Add separator
  chrome.contextMenus.create({
    id: 'separator1',
    parentId: 'polishDataGenerator',
    type: 'separator',
    contexts: CONTEXT_TYPES
  });

  // Create categories and their items
  Object.values(CATEGORIES).forEach(category => {
    // Create category
    chrome.contextMenus.create({
      id: category.id,
      parentId: 'polishDataGenerator',
      title: category.title,
      contexts: CONTEXT_TYPES
    });

    // Create items in category
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

// Function for dynamically injecting scripts
async function injectScripts(tabId) {
  // Inject styles
  await chrome.scripting.insertCSS({
    target: { tabId },
    files: ['src/css/contextMenu.css']
  });

  // Inject scripts in proper order
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['src/js/data.js']
  });

  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['src/js/generators.js']
  });

  // Finally, inject the context menu handling script
  return chrome.scripting.executeScript({
    target: { tabId },
    files: ['src/js/contextMenu.js']
  });
}

// Function to handle context menu actions
async function handleContextMenuAction(info, tab, action, dataType = null) {
  try {
    // Inject scripts if they haven't been injected yet
    await injectScripts(tab.id);

    // Send appropriate action to content script
    if (action === 'refreshData') {
      chrome.tabs.sendMessage(tab.id, { action: 'refreshData' });
    } else if (action === 'insertData' && dataType) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'insertData',
        dataType
      });
    }
  } catch (error) {
    console.error('Error while handling context menu action:', error);
  }
}

// Handle menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Check if refresh data menu item was clicked
  if (info.menuItemId === 'refreshData') {
    handleContextMenuAction(info, tab, 'refreshData');
    return;
  }

  // Check if data item was clicked
  const [categoryId, itemId] = info.menuItemId.split('_');
  if (categoryId && itemId) {
    // Find category and item
    const category = Object.values(CATEGORIES).find(cat => cat.id === categoryId);
    if (category) {
      const item = category.children.find(it => it.id === itemId);
      if (item) {
        handleContextMenuAction(info, tab, 'insertData', item.title);
      }
    }
  }
});

// Initialize context menu on extension installation or update
chrome.runtime.onInstalled.addListener(() => {
  initContextMenus();
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getContextMenuState') {
    sendResponse({ enabled: true });
  }
}); 