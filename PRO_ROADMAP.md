# Generator Danych PRO - Roadmap

> Ten dokument opisuje długofalowy plan rozwoju po zakończeniu migracji z `MIGRATION_PLAN.md`.
> Każda faza jest zależna od poprzedniej. Szacunki czasowe zakładają pracę solo developera.

---

## Faza 0: Migracja (patrz: MIGRATION_PLAN.md)

**Status:** W trakcie  
**Cel:** React + TypeScript + Tailwind + Vite  
**Wynik:** Działająca wtyczka 1:1 z obecną, ale na nowoczesnym stacku

---

## Faza 1: Infrastruktura PRO

**Czas:** 3-5 dni  
**Cel:** Przygotowanie fundamentów pod płatności i rozróżnienie FREE/PRO

### 1.1 Integracja ExtensionPay

```
src/
├── lib/
│   └── payment/
│       ├── extensionPay.ts      # Wrapper na ExtensionPay SDK
│       ├── types.ts             # PaymentStatus, UserTier
│       └── hooks/
│           └── usePayment.ts    # Hook do sprawdzania statusu
```

**Kroki:**
1. Zarejestruj się na [ExtensionPay.com](https://extensionpay.com)
2. Stwórz produkt "Generator Danych PRO"
3. Dodaj `extpay` do dependencies
4. Zaimplementuj wrapper:

```typescript
// src/lib/payment/extensionPay.ts
import ExtPay from 'extpay';

const extpay = ExtPay('generator-danych'); // Twój extension ID

export const initPayment = () => extpay.startBackground();

export const getUser = async () => {
  const user = await extpay.getUser();
  return {
    isPro: user.paid,
    email: user.email,
    installedAt: user.installedAt,
    trialDaysRemaining: user.trialDaysRemaining,
  };
};

export const openPaymentPage = () => extpay.openPaymentPage();
export const openManagePage = () => extpay.openManagementPage();
```

### 1.2 AuthContext z Feature Flags

```typescript
// src/context/AuthContext.tsx
interface AuthState {
  isPro: boolean;
  isLoading: boolean;
  trialDaysRemaining: number | null;
}

interface FeatureFlags {
  batchGeneration: boolean;
  csvExport: boolean;
  jsonExport: boolean;
  savedProfiles: boolean;
  customAgeRange: boolean;
  historyEnabled: boolean;
  maxBatchSize: number;
  maxSavedProfiles: number;
}

// FREE tier defaults
const FREE_FLAGS: FeatureFlags = {
  batchGeneration: false,
  csvExport: false,
  jsonExport: false,
  savedProfiles: false,
  customAgeRange: false,
  historyEnabled: false,
  maxBatchSize: 1,
  maxSavedProfiles: 0,
};

// PRO tier
const PRO_FLAGS: FeatureFlags = {
  batchGeneration: true,
  csvExport: true,
  jsonExport: true,
  savedProfiles: true,
  customAgeRange: true,
  historyEnabled: true,
  maxBatchSize: 100,
  maxSavedProfiles: 10,
};
```

### 1.3 UI Komponenty PRO

- `<ProBadge />` - etykieta PRO przy funkcjach
- `<UpgradeButton />` - CTA do płatności
- `<ProGate feature="csvExport">` - wrapper blokujący dostęp

**Definition of Done:**
- [ ] ExtensionPay zintegrowany
- [ ] AuthContext działa z prawdziwym statusem płatności
- [ ] Komponenty PRO gate gotowe
- [ ] Trial period skonfigurowany (opcjonalnie 7 dni)

---

## Faza 2: Pierwsze Funkcje PRO

**Czas:** 1-2 tygodnie  
**Cel:** Minimalne, ale wartościowe funkcje uzasadniające PRO

### 2.1 Eksport CSV/JSON

**Priorytet:** Krytyczny  
**Wartość:** Bardzo wysoka - użytkownicy potrzebują danych w arkuszach/bazach

```
src/
├── lib/
│   └── export/
│       ├── csv.ts          # Konwersja do CSV
│       ├── json.ts         # Formatowanie JSON
│       ├── download.ts     # Trigger pobrania pliku
│       └── types.ts
├── components/
│   └── features/
│       └── ExportPanel/
│           ├── ExportPanel.tsx
│           ├── FormatSelector.tsx
│           └── ExportButton.tsx
```

**Funkcjonalność:**
- Eksport pojedynczego rekordu (CSV/JSON)
- Eksport batch (CSV/JSON)
- Wybór pól do eksportu
- Separator CSV (przecinek/średnik/tab)
- Encoding UTF-8 BOM dla Excela

### 2.2 Batch Generation

**Priorytet:** Krytyczny  
**Wartość:** Bardzo wysoka - oszczędność czasu

```typescript
// src/lib/generators/batch.ts
interface BatchOptions {
  count: number;           // 1-100
  gender?: 'M' | 'F' | 'random';
  ageRange?: { min: number; max: number };
  voivodeship?: string;    // Filtr województwa
}

export const generateBatch = (options: BatchOptions): GeneratedPerson[] => {
  return Array.from({ length: options.count }, () => 
    generatePerson(options)
  );
};
```

**UI:**
- Slider: ilość rekordów (1-100)
- Preview: tabela z pierwszymi 5 rekordami
- Przycisk "Generuj batch"
- Progress indicator dla dużych batch'ów

### 2.3 Custom Age Range

**Priorytet:** Średni  
**Wartość:** Średnia - precyzyjne scenariusze testowe

```typescript
interface AgeRangeOptions {
  minAge: number;  // 18-100
  maxAge: number;  // 18-100
}
```

**UI:**
- Dual slider lub dwa inputy
- Domyślnie: 18-90 (obecne)
- Walidacja: min <= max

**Definition of Done:**
- [ ] Eksport CSV działa z polskimi znakami
- [ ] Eksport JSON z pretty print
- [ ] Batch 1-100 rekordów
- [ ] Custom age range
- [ ] Wszystkie funkcje za PRO gate

---

## Faza 3: Rozszerzenie Funkcjonalności

**Czas:** 2-3 tygodnie  
**Cel:** Głębsze funkcje dla power userów

### 3.1 Zapisane Profile/Szablony

**Wartość:** Powtarzalne scenariusze testowe

```typescript
interface SavedProfile {
  id: string;
  name: string;
  createdAt: Date;
  settings: {
    gender: 'M' | 'F' | 'random';
    ageRange: { min: number; max: number };
    voivodeship?: string;
    includeFields: string[];  // Które pola generować
  };
}
```

**Limity:**
- FREE: 0 profili
- PRO: 10 profili

**Przechowywanie:** `chrome.storage.sync` (sync między urządzeniami)

### 3.2 Historia Generacji

**Wartość:** Powrót do poprzednich danych

```typescript
interface HistoryEntry {
  id: string;
  timestamp: Date;
  data: GeneratedData;
  profileUsed?: string;
}
```

**Limity:**
- FREE: brak historii
- PRO: ostatnie 50 generacji

**UI:**
- Nowa zakładka "Historia"
- Lista z datą i podstawowymi danymi
- "Przywróć" / "Kopiuj" / "Eksportuj"

### 3.3 Auto-fill Formularzy

**Wartość:** Automatyczne wypełnianie pól na stronie

**Implementacja:**
1. Content script wykrywa pola formularza
2. Analiza atrybutów (`name`, `id`, `placeholder`, `autocomplete`)
3. Mapowanie na odpowiednie dane (np. `name="pesel"` → PESEL)
4. Przycisk "Wypełnij formularz" w context menu

```typescript
// src/content/autoFill.ts
const FIELD_MAPPINGS: Record<string, keyof GeneratedData> = {
  'pesel': 'person.pesel',
  'imie': 'person.firstName',
  'nazwisko': 'person.lastName',
  'email': 'person.email',
  'telefon': 'person.phone',
  'nip': 'company.nip',
  // ... więcej mapowań
};
```

**Definition of Done:**
- [ ] CRUD profili z sync storage
- [ ] Historia z limitem 50 wpisów
- [ ] Auto-fill dla standardowych pól
- [ ] Testy na popularnych formularzach (rejestracja, checkout)

---

## Faza 4: Internacjonalizacja (Opcjonalna)

**Czas:** 3-4 tygodnie  
**Cel:** Wsparcie dla innych krajów

### 4.1 Architektura Multi-Country

```
src/
├── lib/
│   └── generators/
│       ├── types.ts           # Wspólne interfejsy
│       ├── base.ts            # Abstrakcyjna klasa bazowa
│       ├── countries/
│       │   ├── poland.ts      # Obecna logika
│       │   ├── germany.ts     # Nowa
│       │   ├── czechia.ts     # Nowa
│       │   └── ukraine.ts     # Nowa
│       └── index.ts           # Factory
```

### 4.2 Priorytety Krajów

| Kraj | Dane do zaimplementowania | Trudność | Popyt* |
|------|---------------------------|----------|--------|
| 🇩🇪 Niemcy | Personalausweis, Steuer-ID, IBAN DE | Średnia | Wysoki |
| 🇨🇿 Czechy | Rodné číslo, IČO, DIČ | Średnia | Średni |
| 🇺🇦 Ukraina | ІПН, paszport, IBAN UA | Średnia | Wysoki |
| 🇬🇧 UK | NIN, NHS number | Łatwa | Wysoki |
| 🇺🇸 USA | SSN, Driver's License | Łatwa | Bardzo wysoki |

*Popyt szacowany na podstawie polskiej diaspory i firm z tymi rynkami

### 4.3 UI dla wyboru kraju

- Dropdown z flagami
- Zapamiętanie ostatniego wyboru
- Różne zakładki/pola per kraj

**Definition of Done:**
- [ ] Interfejs generatora jest country-agnostic
- [ ] Minimum 2 dodatkowe kraje
- [ ] Wybór kraju w UI
- [ ] Testy walidacji dla każdego kraju

---

## Faza 5: Boilerplate Extraction

**Czas:** 3-5 dni  
**Cel:** Wyciągnięcie generycznego szablonu dla przyszłych wtyczek

### 5.1 Struktura Template Repo

```
extension-saas-boilerplate/
├── src/
│   ├── popup/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── ui/              # Generyczne komponenty
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── ProGate.tsx
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       └── Footer.tsx
│   │   ├── hooks/
│   │   │   ├── useStorage.ts
│   │   │   └── useTheme.ts
│   │   └── context/
│   │       └── AuthContext.tsx
│   ├── background/
│   │   └── index.ts
│   ├── content/
│   │   └── index.ts
│   ├── lib/
│   │   ├── payment/
│   │   │   └── extensionPay.ts
│   │   └── storage/
│   │       └── index.ts
│   └── types/
│       └── index.ts
├── public/
│   └── icons/
├── _locales/
│   ├── en/
│   └── pl/
├── manifest.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md                    # Instrukcja użycia boilerplate
```

### 5.2 Konfiguracja per Extension

```typescript
// extension.config.ts
export const extensionConfig = {
  name: 'My Extension',
  extensionPayId: 'my-extension',
  
  tiers: {
    free: {
      features: ['basic-feature'],
    },
    pro: {
      price: 5.99,
      features: ['basic-feature', 'pro-feature-1', 'pro-feature-2'],
    },
  },
  
  trial: {
    enabled: true,
    days: 7,
  },
  
  themes: ['light', 'dark', 'neon'],
  
  locales: ['en', 'pl'],
  defaultLocale: 'en',
};
```

### 5.3 Dokumentacja Boilerplate

- Quick Start (5 minut do działającej wtyczki)
- Dodawanie nowych funkcji
- Konfiguracja płatności
- Deploy do Chrome Web Store / Firefox Add-ons
- Troubleshooting

**Definition of Done:**
- [ ] Osobne repozytorium `extension-saas-boilerplate`
- [ ] README z pełną dokumentacją
- [ ] Przykładowa implementacja (Generator Danych jako case study)
- [ ] GitHub template repository

---

## Faza 6: Marketing i Launch PRO

**Czas:** Ongoing  
**Cel:** Konwersja FREE → PRO

### 6.1 Pricing Strategy

| Plan | Cena | Cechy |
|------|------|-------|
| FREE | $0 | Pojedyncze generacje, 2 motywy |
| PRO Monthly | $4.99/mies | Wszystkie funkcje PRO |
| PRO Lifetime | $29.99 | Jednorazowo, wszystko na zawsze |

**Rekomendacja:** Zacznij od Lifetime, dodaj Monthly po 3 miesiącach

### 6.2 Conversion Triggers

- **Soft gate:** "Ta funkcja wymaga PRO" z przyciskiem upgrade
- **Usage limit:** "Wygenerowałeś 100 rekordów dziś. Upgrade dla unlimited"
- **Trial expire:** "Twój trial kończy się za 2 dni"
- **Feature discovery:** Tooltips pokazujące PRO features

### 6.3 Kanały Promocji

1. **Product Hunt** - launch z PRO tier
2. **Reddit** - r/webdev, r/QualityAssurance, r/Poland
3. **Twitter/X** - developer community
4. **Dev.to / Medium** - artykuł o generowaniu danych testowych
5. **Chrome Web Store** - optymalizacja opisu, screenshoty

---

## Metryki Sukcesu

| Metryka | Cel (6 miesięcy) |
|---------|------------------|
| Instalacje (FREE) | 500+ |
| Konwersja FREE → PRO | 5-10% |
| MRR (Monthly Recurring Revenue) | $200+ |
| Retencja PRO (3 miesiące) | 80%+ |
| Ocena w Chrome Web Store | 4.5+ ⭐ |

---

## Risk Register

| Ryzyko | Prawdopodobieństwo | Impact | Mitygacja |
|--------|-------------------|--------|-----------|
| ExtensionPay zamknie działalność | Niskie | Wysoki | Abstrakcja warstwy płatności |
| Chrome zmieni manifest V3 | Średnie | Średni | Śledzenie Chromium blog |
| Niska konwersja | Średnie | Wysoki | A/B testy pricing, więcej PRO features |
| Konkurencja skopiuje | Średnie | Niski | First mover advantage, szybka iteracja |

---

## Changelog

| Data | Zmiana |
|------|--------|
| 2026-01-18 | Utworzenie dokumentu |

---

*Dokument żywy - aktualizuj w miarę postępów.*
