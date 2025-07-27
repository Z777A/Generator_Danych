// Klasa generatora danych
class PolishDataGenerator {
  constructor() {
    this.person = null;
    this.address = null;
    this.company = null;
    this.documents = null;
    this.bankAccount = null;

    // Inicjalizacja danych
    this.generateAll();
  }

  // Generuje wszystkie dane
  generateAll() {
    // Losowy wybór płci
    const isMale = Math.random() > 0.5;

    this.generatePerson(isMale);
    this.generateAddress();
    this.generateDocuments();
    this.generateCompany();
    this.generateBankAccount();

    return {
      person: this.person,
      address: this.address,
      company: this.company,
      documents: this.documents,
      bankAccount: this.bankAccount
    };
  }

  // Generuje dane osobowe
  generatePerson(isMale = true) {
    // Wybierz losowe imię i nazwisko
    const firstName = this.getRandomItem(isMale ? DATA.maleFirstNames : DATA.femaleFirstNames);
    const lastName = this.getRandomItem(isMale ? DATA.maleSurnames : DATA.femaleSurnames);

    // Generuj PESEL
    const { pesel, birthDate } = this.generatePesel(isMale);

    // Generuj email
    const email = this.generateEmail(firstName, lastName);

    // Generuj telefon
    const phone = this.generatePhone();

    this.person = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender: isMale ? 'M' : 'K',
      pesel,
      birthDate,
      email,
      phone
    };

    return this.person;
  }

  // Generuje adres
  generateAddress() {
    // Najpierw wybierz losowe województwo
    const voivodeship = this.getRandomItem(DATA.voivodeships);

    // Następnie wybierz losowe miasto z tego województwa
    const citiesInVoivodeship = DATA.citiesVoivodeships[voivodeship];
    const city = this.getRandomItem(citiesInVoivodeship);

    // Generuj ulicę i numer
    const streetType = this.getRandomItem(DATA.streetTypes);
    const street = this.getRandomItem(DATA.streets);
    const buildingNumber = Math.floor(Math.random() * 200) + 1;
    const apartmentNumber = Math.random() > 0.3 ? Math.floor(Math.random() * 100) + 1 : null;

    // Generuj kod pocztowy
    const postalCode = this.generatePostalCode();

    const streetWithNumber = apartmentNumber
      ? `${streetType} ${street} ${buildingNumber}/${apartmentNumber}`
      : `${streetType} ${street} ${buildingNumber}`;

    this.address = {
      street,
      streetType,
      buildingNumber,
      apartmentNumber,
      streetWithNumber,
      postalCode,
      city,
      voivodeship,
      fullAddress: `${streetWithNumber}, ${postalCode} ${city}`
    };

    return this.address;
  }

  // Generuje dokumenty
  generateDocuments() {
    // Generuj dowód osobisty (nowy format od 2019 roku)
    const idCardSeries = this.generateRandomLetters(3).toUpperCase();
    const idCardNumber = this.generateRandomDigits(4);

    // Obliczanie cyfry kontrolnej dla dowodu osobistego
    // Algorytm walidacji zgodny z polskimi standardami
    const weights = [7, 3, 1, 9, 7, 3, 1, 7, 3];
    const idCardChars = (idCardSeries + idCardNumber).split('');
    let sum = 0;

    for (let i = 0; i < idCardChars.length; i++) {
      const char = idCardChars[i];
      // Dla liter używamy ich kodu ASCII - 55 (A=10, B=11, itd.)
      const value = /[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : parseInt(char);
      sum += value * weights[i];
    }

    const checkDigit = sum % 10;
    const idCard = `${idCardSeries}${idCardNumber}`;

    // Generuj daty dla dowodu
    const idCardIssueDate = this.generatePastDate(5);

    // Data ważności dokładnie 10 lat po dacie wydania
    const idCardExpiryDate = new Date(idCardIssueDate);
    idCardExpiryDate.setFullYear(idCardIssueDate.getFullYear() + 10);

    // Generuj paszport
    // Format paszportu: 2 litery + 7 cyfr (np. AB1234567)
    const passportSeries = this.generateRandomLetters(2).toUpperCase();
    const passportNumber = this.generateRandomDigits(7);

    // Walidacja paszportu - implementacja algorytmu kontrolnego
    // Wagi dla poszczególnych pozycji w paszporcie
    const passportWeights = [7, 3, 9, 1, 7, 3, 1, 7, 3];
    const passportChars = (passportSeries + passportNumber).split('');
    let passportSum = 0;

    for (let i = 0; i < passportChars.length; i++) {
      const char = passportChars[i];
      // Dla liter używamy ich kodu ASCII - 55 (A=10, B=11, itd.)
      const value = /[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : parseInt(char);
      passportSum += value * passportWeights[i];
    }

    // Cyfra kontrolna dla paszportu
    const passportCheckDigit = passportSum % 10;
    // Ostateczny format paszportu: seria + numer
    const passport = `${passportSeries}${passportNumber}`;

    // Generuj daty dla paszportu
    const passportIssueDate = this.generatePastDate(5);

    // Data ważności paszportu - dokładnie 10 lat od daty wydania
    const passportExpiryDate = new Date(passportIssueDate);
    passportExpiryDate.setFullYear(passportIssueDate.getFullYear() + 10);

    this.documents = {
      idCard,
      idCardIssueDate: this.formatDate(idCardIssueDate),
      idCardExpiryDate: this.formatDate(idCardExpiryDate),
      passport,
      passportIssueDate: this.formatDate(passportIssueDate),
      passportExpiryDate: this.formatDate(passportExpiryDate)
    };

    return this.documents;
  }

  // Generuje dane firmy
  generateCompany() {
    // Generuj nazwę firmy
    const prefix = this.getRandomItem(DATA.companyPrefixes);
    const root = this.getRandomItem(DATA.companyRoots);
    const suffix = this.getRandomItem(DATA.companySuffixes);
    const companyName = `${prefix}${root} ${suffix}`;

    // Generuj NIP
    const nip = this.generateNIP();

    // Generuj REGON
    const regon = this.generateREGON();

    // Generuj KRS
    const krs = this.generateRandomDigits(10);

    // Generuj firmowy rachunek bankowy
    const bank = this.getRandomBank();
    const companyIban = this.generateIBAN(bank);

    this.company = {
      companyName,
      nip,
      regon,
      krs,
      companyIban,
      formattedCompanyIban: this.formatIBAN(companyIban),
      companyBank: bank.name,
      companySwift: bank.swift
    };

    return this.company;
  }

  // Generuje PESEL
  generatePesel(isMale = true) {
    // Generuj datę urodzenia
    const birthDate = this.generateRandomBirthDate();
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    // Pierwsze 6 cyfr to data urodzenia
    let pesel = '';

    // Rok - ostatnie dwie cyfry
    const yearStr = year.toString().slice(-2);
    pesel += yearStr;

    // Miesiąc - z modyfikacją zależną od stulecia
    let monthCode = month;
    if (year >= 2000 && year < 2100) {
      monthCode += 20;
    } else if (year >= 2100 && year < 2200) {
      monthCode += 40;
    } else if (year >= 1800 && year < 1900) {
      monthCode += 80;
    }
    pesel += monthCode.toString().padStart(2, '0');

    // Dzień
    pesel += day.toString().padStart(2, '0');

    // Losowy numer seryjny (3 cyfry, nie 4!)
    pesel += this.generateRandomDigits(3);

    // Cyfra płci (nieparzysta dla mężczyzn, parzysta dla kobiet)
    const genderDigit = isMale ? this.getRandomOddDigit() : this.getRandomEvenDigit();
    pesel += genderDigit;

    // Cyfra kontrolna
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }

    // algorytm cyfry kontrolnej dla PESEL
    const remainder = sum % 10;
    const checkDigit = remainder === 0 ? 0 : 10 - remainder;
    pesel += checkDigit;

    return {
      pesel,
      birthDate: this.formatDate(birthDate)
    };
  }

  // Generuje NIP
  generateNIP() {
    // 3 cyfry - urząd skarbowy
    const officeCode = Math.floor(Math.random() * 900) + 100;

    // 6 cyfr - numer seryjny
    const serialNumber = this.generateRandomDigits(6);

    // Łączymy
    let nip = `${officeCode}${serialNumber}`;

    // Obliczamy cyfrę kontrolną
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(nip[i]) * weights[i];
    }

    const checkDigit = sum % 11 === 10 ? 0 : sum % 11;
    nip += checkDigit;

    // Format NIP: XXXXXXXXX
    return `${nip.slice(0, 3)}${nip.slice(3, 6)}${nip.slice(6, 8)}${nip.slice(8, 10)}`;
  }

  // Generuje REGON
  generateREGON() {
    // 8 cyfr - numer seryjny
    let regon = this.generateRandomDigits(8);

    // Obliczamy cyfrę kontrolną
    const weights = [8, 9, 2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = 0; i < 8; i++) {
      sum += parseInt(regon[i]) * weights[i];
    }

    const checkDigit = sum % 11 === 10 ? 0 : sum % 11;
    regon += checkDigit;

    // Format REGON: XXXXXXXXX
    return `${regon.slice(0, 3)}${regon.slice(3, 6)}${regon.slice(6, 9)}`;
  }

  // Generuje email
  generateEmail(firstName, lastName) {
    // Usuń polskie znaki
    const normalizedFirstName = this.normalizeString(firstName.toLowerCase());
    const normalizedLastName = this.normalizeString(lastName.toLowerCase());

    // Wybierz losową domenę
    const domain = this.getRandomItem(DATA.emailDomains);

    // Losowy format emaila
    const formats = [
      `${normalizedFirstName}.${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${normalizedLastName[0]}@${domain}`,
      `${normalizedFirstName[0]}${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${Math.floor(Math.random() * 100)}@${domain}`
    ];

    return this.getRandomItem(formats);
  }

  // Generuje numer telefonu
  generatePhone() {
    // Prefiksy polskich operatorów komórkowych
    const mobilePrefixes = ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'];
    const prefix = this.getRandomItem(mobilePrefixes);

    // 7 losowych cyfr
    const number = this.generateRandomDigits(7);

    // Format: XXXXXXXXX
    return `${prefix}${number[0]}${number.slice(1, 4)}${number.slice(4, 7)}`;
  }

  // Generuje kod pocztowy
  generatePostalCode() {
    const firstPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const secondPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    return `${firstPart}-${secondPart}`;
  }

  // Generuje dane bankowe
  generateBankAccount() {
    // Wybierz losowy bank
    const bank = this.getRandomBank();

    // Generuj numer rachunku bankowego (IBAN dla Polski)
    const iban = this.generateIBAN(bank);

    // Generuj numer karty
    const cardNumber = this.generateCardNumber(bank.cardPrefix);

    // Generuj datę ważności karty
    const expiryDate = this.generateCardExpiryDate();

    // Generuj kod CVV
    const cvv = this.generateCVV();

    // Generuj numer SWIFT/BIC
    const swift = bank.swift;

    this.bankAccount = {
      iban,
      formattedIban: this.formatIBAN(iban),
      bank: bank.name,
      cardNumber,
      formattedCardNumber: this.formatCardNumber(cardNumber),
      expiryDate,
      cvv,
      swift
    };

    return this.bankAccount;
  }

  // Generuje numer IBAN dla Polski
  generateIBAN(bank) {
    // Kod kraju (PL) + 2 cyfry kontrolne + 8 cyfr numeru rozliczeniowego banku + 16 cyfr numeru rachunku

    // Użyj kodu banku z obiektu bank
    const bankCode = bank.bankCode;

    // Generuj 16 cyfr numeru rachunku
    const accountNumber = this.generateRandomDigits(16);

    // Połącz numer rozliczeniowy i numer rachunku
    const bban = bankCode + accountNumber;

    // Oblicz cyfry kontrolne
    // Konwertuj PL na liczby (P=25, L=21) i dodaj '00' na końcu
    const countryCode = '252100';
    const checkDigits = this.calculateIBANCheckDigits(bban + countryCode);

    // Pełny numer IBAN
    return 'PL' + checkDigits + bban;
  }

  // Oblicza cyfry kontrolne IBAN
  calculateIBANCheckDigits(digits) {
    // Konwertuj ciąg znaków na liczbę modulo 97
    let remainder = 0;
    for (let i = 0; i < digits.length; i++) {
      remainder = (remainder * 10 + parseInt(digits[i])) % 97;
    }

    // Oblicz cyfry kontrolne (98 - remainder) % 97
    const checkDigits = (98 - remainder) % 97;

    // Zwróć cyfry kontrolne jako dwucyfrowy ciąg znaków
    return checkDigits.toString().padStart(2, '0');
  }

  // Formatuje numer IBAN do czytelnej postaci
  formatIBAN(iban) {
    // Format: PL00 0000 0000 0000 0000 0000 0000
    return iban.replace(/(.{2})(.{2})(.{4})(.{4})(.{4})(.{4})(.{4})(.{4})/, '$1$2 $3 $4 $5 $6 $7 $8');
  }

  // Zwraca losowy bank z listy polskich banków
  getRandomBank() {
    const banks = [
      { name: 'PKO Bank Polski', swift: 'BPKOPLPW', cardPrefix: '5164', bankCode: '10201010' },
      { name: 'Bank Pekao', swift: 'PKOPPLPW', cardPrefix: '4175', bankCode: '12401037' },
      { name: 'Santander Bank Polska', swift: 'WBKPPLPP', cardPrefix: '5213', bankCode: '10901056' },
      { name: 'mBank', swift: 'BREXPLPW', cardPrefix: '5274', bankCode: '11401010' },
      { name: 'ING Bank Śląski', swift: 'INGBPLPW', cardPrefix: '4147', bankCode: '10501012' },
      { name: 'BNP Paribas Bank Polska', swift: 'PPABPLPK', cardPrefix: '5196', bankCode: '16001049' },
      { name: 'Bank Millennium', swift: 'BIGBPLPW', cardPrefix: '5577', bankCode: '11602202' },
      { name: 'Alior Bank', swift: 'ALBPPLPW', cardPrefix: '4034', bankCode: '24901010' },
      { name: 'Credit Agricole', swift: 'AGRIPLPR', cardPrefix: '5120', bankCode: '19401076' },
      { name: 'Getin Noble Bank', swift: 'GBGCPLPK', cardPrefix: '4265', bankCode: '15801010' }
    ];

    return this.getRandomItem(banks);
  }

  // Generuje numer karty płatniczej
  generateCardNumber(prefix) {
    // Prefix + losowe cyfry (łącznie 16 cyfr)
    let cardNumber = prefix;
    const remainingDigits = 16 - prefix.length;

    cardNumber += this.generateRandomDigits(remainingDigits - 1);

    // Dodaj cyfrę kontrolną (algorytm Luhna)
    const digits = cardNumber.split('').map(Number);
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];

      // Co druga cyfra (od prawej) jest podwajana
      if ((digits.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    cardNumber += checkDigit;

    return cardNumber;
  }

  // Formatuje numer karty do czytelnej postaci
  formatCardNumber(cardNumber) {
    // Format: XXXX XXXX XXXX XXXX
    return cardNumber.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1 $2 $3 $4');
  }

  // Generuje datę ważności karty
  generateCardExpiryDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    let year = today.getFullYear() + Math.floor(Math.random() * 4) + 1; // 1-5 lat w przyszłości
    year = year % 100; // Tylko ostatnie 2 cyfry roku

    return `${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
  }

  // Generuje kod CVV
  generateCVV() {
    return this.generateRandomDigits(3);
  }

  // Pomocnicze metody

  // Wybiera losowy element z tablicy
  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Generuje losową datę urodzenia - poprawa dla lepszej walidacji
  generateRandomBirthDate() {
    const now = new Date();
    const minAge = 18;
    const maxAge = 90;

    const minYear = now.getFullYear() - maxAge;
    const maxYear = now.getFullYear() - minAge;

    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12);

    // Poprawne generowanie dnia - uwzględnia różne długości miesięcy
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    return new Date(year, month, day);
  }

  // Generuje losową datę w przeszłości
  generatePastDate(maxYearsAgo) {
    const now = new Date();
    const yearsAgo = Math.random() * maxYearsAgo;
    const pastDate = new Date(now);
    pastDate.setFullYear(now.getFullYear() - yearsAgo);
    return pastDate;
  }

  // Generuje losową datę w przyszłości
  generateFutureDate(maxYearsAhead) {
    const now = new Date();
    const yearsAhead = Math.random() * maxYearsAhead;
    const futureDate = new Date(now);
    futureDate.setFullYear(now.getFullYear() + yearsAhead);
    return futureDate;
  }

  // Formatuje datę do formatu DD.MM.YYYY
  formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  // Generuje losowe cyfry
  generateRandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }

  // Generuje losowe litery
  generateRandomLetters(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Zwraca losową nieparzystą cyfrę
  getRandomOddDigit() {
    const oddDigits = [1, 3, 5, 7, 9];
    return oddDigits[Math.floor(Math.random() * oddDigits.length)].toString();
  }

  // Zwraca losową parzystą cyfrę
  getRandomEvenDigit() {
    const evenDigits = [0, 2, 4, 6, 8];
    return evenDigits[Math.floor(Math.random() * evenDigits.length)].toString();
  }

  // Normalizuje string (usuwa polskie znaki)
  normalizeString(str) {
    return str
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź/g, 'z')
      .replace(/ż/g, 'z');
  }
}

// Eksportuj generator
window.PolishDataGenerator = PolishDataGenerator; 