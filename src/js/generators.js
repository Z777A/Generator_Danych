// Data generator class
class PolishDataGenerator {
  constructor() {
    this.person = null;
    this.address = null;
    this.company = null;
    this.documents = null;
    this.bankAccount = null;

    // Initialize data
    this.generateAll();
  }

  // Generates all data
  generateAll() {
    // Random gender selection
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

  // Generates personal data
  generatePerson(isMale = true) {
    // Select random first name and last name
    const firstName = this.getRandomItem(isMale ? DATA.maleFirstNames : DATA.femaleFirstNames);
    const lastName = this.getRandomItem(isMale ? DATA.maleSurnames : DATA.femaleSurnames);

    // Generate PESEL
    const { pesel, birthDate } = this.generatePesel(isMale);

    // Generate email
    const email = this.generateEmail(firstName, lastName);

    // Generate phone
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

  // Generates address
  generateAddress() {
    // First select random voivodeship
    const voivodeship = this.getRandomItem(DATA.voivodeships);

    // Then select random city from that voivodeship
    const citiesInVoivodeship = DATA.citiesVoivodeships[voivodeship];
    const city = this.getRandomItem(citiesInVoivodeship);

    // Generate street and number
    const streetType = this.getRandomItem(DATA.streetTypes);
    const street = this.getRandomItem(DATA.streets);
    const buildingNumber = Math.floor(Math.random() * 200) + 1;
    const apartmentNumber = Math.random() > 0.3 ? Math.floor(Math.random() * 100) + 1 : null;

    // Generate postal code
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

  // Generates documents
  generateDocuments() {
    // Generate ID card (new format from 2019)
    const idCardSeries = this.generateRandomLetters(3).toUpperCase();
    const idCardNumber = this.generateRandomDigits(5);

    // Calculate check digit for ID card
    // Validation algorithm compliant with Polish standards
    const weights = [7, 3, 1, 7, 3, 1, 7, 3];
    const idCardChars = (idCardSeries + idCardNumber).split('');
    let sum = 0;

    for (let i = 0; i < idCardChars.length; i++) {
      const char = idCardChars[i];
      // For letters we use their ASCII code - 55 (A=10, B=11, etc.)
      const value = /[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : parseInt(char);
      sum += value * weights[i];
    }

    const checkDigit = sum % 10;
    const idCard = `${idCardSeries}${checkDigit}${idCardNumber}`;

    // Generate dates for ID card
    const idCardIssueDate = this.generatePastDate(5);

    // Expiry date exactly 10 years after issue date
    const idCardExpiryDate = new Date(idCardIssueDate);
    idCardExpiryDate.setFullYear(idCardIssueDate.getFullYear() + 10);

    // Generate passport
    // Passport format: 2 letters + 7 digits (e.g. AB1234567)
    const passportSeries = this.generateRandomLetters(2).toUpperCase();
    const passportNumber = this.generateRandomDigits(7);

    // Passport validation - check digit algorithm implementation
    // Weights for individual positions in passport
    const passportWeights = [7, 3, 9, 1, 7, 3, 1, 7, 3];
    const passportChars = (passportSeries + passportNumber).split('');
    let passportSum = 0;

    for (let i = 0; i < passportChars.length; i++) {
      const char = passportChars[i];
      // For letters we use their ASCII code - 55 (A=10, B=11, etc.)
      const value = /[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : parseInt(char);
      passportSum += value * passportWeights[i];
    }

    // Check digit for passport
    const passportCheckDigit = passportSum % 10;
    // Final passport format: series + number
    const passport = `${passportSeries}${passportNumber}`;

    // Generate dates for passport
    const passportIssueDate = this.generatePastDate(5);

    // Passport expiry date - exactly 10 years from issue date
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

  // Generates company data
  generateCompany() {
    // Generate company name
    const prefix = this.getRandomItem(DATA.companyPrefixes);
    const root = this.getRandomItem(DATA.companyRoots);
    const suffix = this.getRandomItem(DATA.companySuffixes);
    const companyName = `${prefix}${root} ${suffix}`;

    // Generate NIP
    const nip = this.generateNIP();

    // Generate REGON
    const regon = this.generateREGON();

    // Generate KRS
    const krs = this.generateRandomDigits(10);

    // Generate company bank account
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

  // Generates PESEL
  generatePesel(isMale = true) {
    // Generate birth date
    const birthDate = this.generateRandomBirthDate();
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    // First 6 digits are the birth date
    let pesel = '';

    // Year - last two digits
    const yearStr = year.toString().slice(-2);
    pesel += yearStr;

    // Month - with modification depending on century
    let monthCode = month;
    if (year >= 2000 && year < 2100) {
      monthCode += 20;
    } else if (year >= 2100 && year < 2200) {
      monthCode += 40;
    } else if (year >= 1800 && year < 1900) {
      monthCode += 80;
    }
    pesel += monthCode.toString().padStart(2, '0');

    // Day
    pesel += day.toString().padStart(2, '0');

    // Random serial number (3 digits, not 4!)
    pesel += this.generateRandomDigits(3);

    // Gender digit (odd for males, even for females)
    const genderDigit = isMale ? this.getRandomOddDigit() : this.getRandomEvenDigit();
    pesel += genderDigit;

    // Check digit
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }

    // Check digit algorithm for PESEL
    const remainder = sum % 10;
    const checkDigit = remainder === 0 ? 0 : 10 - remainder;
    pesel += checkDigit;

    return {
      pesel,
      birthDate: this.formatDate(birthDate)
    };
  }

  // Generates NIP
  generateNIP() {
    // 3 digits - tax office
    const officeCode = Math.floor(Math.random() * 900) + 100;

    // 6 digits - serial number
    const serialNumber = this.generateRandomDigits(6);

    // Combine them
    let nip = `${officeCode}${serialNumber}`;

    // Calculate check digit
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(nip[i]) * weights[i];
    }

    const checkDigit = sum % 11 === 10 ? 0 : sum % 11;
    nip += checkDigit;

    // NIP format: XXXXXXXXX
    return `${nip.slice(0, 3)}${nip.slice(3, 6)}${nip.slice(6, 8)}${nip.slice(8, 10)}`;
  }

  // Generates REGON
  generateREGON() {
    // 8 digits - serial number
    let regon = this.generateRandomDigits(8);

    // Calculate check digit
    const weights = [8, 9, 2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = 0; i < 8; i++) {
      sum += parseInt(regon[i]) * weights[i];
    }

    const checkDigit = sum % 11 === 10 ? 0 : sum % 11;
    regon += checkDigit;

    // REGON format: XXXXXXXXX
    return `${regon.slice(0, 3)}${regon.slice(3, 6)}${regon.slice(6, 9)}`;
  }

  // Generates email
  generateEmail(firstName, lastName) {
    // Remove Polish characters
    const normalizedFirstName = this.normalizeString(firstName.toLowerCase());
    const normalizedLastName = this.normalizeString(lastName.toLowerCase());

    // Select random domain
    const domain = this.getRandomItem(DATA.emailDomains);

    // Random email format
    const formats = [
      `${normalizedFirstName}.${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${normalizedLastName[0]}@${domain}`,
      `${normalizedFirstName[0]}${normalizedLastName}@${domain}`,
      `${normalizedFirstName}${Math.floor(Math.random() * 100)}@${domain}`
    ];

    return this.getRandomItem(formats);
  }

  // Generates phone number
  generatePhone() {
    // Polish mobile operators prefixes
    const mobilePrefixes = ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'];
    const prefix = this.getRandomItem(mobilePrefixes);

    // 7 random digits
    const number = this.generateRandomDigits(7);

    // Format: XXXXXXXXX
    return `${prefix}${number[0]}${number.slice(1, 4)}${number.slice(4, 7)}`;
  }

  // Generates postal code
  generatePostalCode() {
    const firstPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const secondPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    return `${firstPart}-${secondPart}`;
  }

  // Generates bank data
  generateBankAccount() {
    // Select random bank
    const bank = this.getRandomBank();

    // Generate bank account number (IBAN for Poland)
    const iban = this.generateIBAN(bank);

    // Generate card number
    const cardNumber = this.generateCardNumber(bank.cardPrefix);

    // Generate card expiry date
    const expiryDate = this.generateCardExpiryDate();

    // Generate CVV code
    const cvv = this.generateCVV();

    // Generate SWIFT/BIC number
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

  // Generates IBAN number for Poland
  generateIBAN(bank) {
    // Country code (PL) + 2 check digits + 8 digits of bank sort code + 16 digits of account number

    // Use bank code from bank object
    const bankCode = bank.bankCode;

    // Generate 16 digits of account number
    const accountNumber = this.generateRandomDigits(16);

    // Combine sort code and account number
    const bban = bankCode + accountNumber;

    // Calculate check digits
    // Convert PL to numbers (P=25, L=21) and add '00' at the end
    const countryCode = '252100';
    const checkDigits = this.calculateIBANCheckDigits(bban + countryCode);

    // Full IBAN number
    return 'PL' + checkDigits + bban;
  }

  // Calculates IBAN check digits
  calculateIBANCheckDigits(digits) {
    // Convert string to number modulo 97
    let remainder = 0;
    for (let i = 0; i < digits.length; i++) {
      remainder = (remainder * 10 + parseInt(digits[i])) % 97;
    }

    // Calculate check digits (98 - remainder) % 97
    const checkDigits = (98 - remainder) % 97;

    // Return check digits as two-digit string
    return checkDigits.toString().padStart(2, '0');
  }

  // Formats IBAN number to readable form
  formatIBAN(iban) {
    // Format: PL00 0000 0000 0000 0000 0000 0000
    return iban.replace(/(.{2})(.{2})(.{4})(.{4})(.{4})(.{4})(.{4})(.{4})/, '$1$2 $3 $4 $5 $6 $7 $8');
  }

  // Returns random bank from list of Polish banks
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

  // Generates payment card number
  generateCardNumber(prefix) {
    // Prefix + random digits (16 digits total)
    let cardNumber = prefix;
    const remainingDigits = 16 - prefix.length;

    cardNumber += this.generateRandomDigits(remainingDigits - 1);

    // Add check digit (Luhn algorithm)
    const digits = cardNumber.split('').map(Number);
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];

      // Every second digit (from right) is doubled
      if ((digits.length - i) % 2 !== 0) {
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

  // Formats card number to readable form
  formatCardNumber(cardNumber) {
    // Format: XXXX XXXX XXXX XXXX
    return cardNumber.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1 $2 $3 $4');
  }

  // Generates card expiry date
  generateCardExpiryDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    let year = today.getFullYear() + Math.floor(Math.random() * 4) + 1; // 1-5 years in the future
    year = year % 100; // Only last 2 digits of year

    return `${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
  }

  // Generates CVV code
  generateCVV() {
    return this.generateRandomDigits(3);
  }

  // Helper methods

  // Selects random element from array
  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Generates random birth date
  generateRandomBirthDate() {
    const now = new Date();
    const minAge = 18;
    const maxAge = 90;

    const minYear = now.getFullYear() - maxAge;
    const maxYear = now.getFullYear() - minAge;

    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12);

    // Correct day generation - accounts for different month lengths
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    return new Date(year, month, day);
  }

  // Generates random date in the past
  generatePastDate(maxYearsAgo) {
    const now = new Date();
    const yearsAgo = Math.random() * maxYearsAgo;
    const pastDate = new Date(now);
    pastDate.setFullYear(now.getFullYear() - yearsAgo);
    return pastDate;
  }

  // Generates random date in the future
  generateFutureDate(maxYearsAhead) {
    const now = new Date();
    const yearsAhead = Math.random() * maxYearsAhead;
    const futureDate = new Date(now);
    futureDate.setFullYear(now.getFullYear() + yearsAhead);
    return futureDate;
  }

  // Formats date to DD-MM-YYYY format
  formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  // Generates random digits
  generateRandomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }

  // Generates random letters
  generateRandomLetters(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Returns random odd digit
  getRandomOddDigit() {
    const oddDigits = [1, 3, 5, 7, 9];
    return oddDigits[Math.floor(Math.random() * oddDigits.length)].toString();
  }

  // Returns random even digit
  getRandomEvenDigit() {
    const evenDigits = [0, 2, 4, 6, 8];
    return evenDigits[Math.floor(Math.random() * evenDigits.length)].toString();
  }

  // Normalizes string (removes Polish characters)
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

// Export generator
window.PolishDataGenerator = PolishDataGenerator; 