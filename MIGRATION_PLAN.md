Jesteś Senior Frontend Architektem specjalizującym się w browser extensions. Twoim zadaniem jest migracja istniejącej wtyczki "Generator Danych" z Vanilla JS do nowoczesnego stacku technologicznego, który posłuży jako boilerplate SaaS.

**Kontekst:**
Mam działającą wtyczkę w katalogu `Generator_Danych`. Jest napisana w czystym JS/HTML. Zawiera logikę generowania polskich danych (PESEL, dowody, banki) w pliku `generators.js`.

**Cel:**
Stworzyć nową strukturę projektu obok starej (np. w folderze `Generator_Danych_React`), która odwzorowuje funkcjonalność 1:1, ale na nowym stacku.

**Wymagany Stack Technologiczny:**
1.  **Core:** React + TypeScript (dla typowania danych i skalowalności).
2.  **Build Tool:** Vite (szybki build, HMR).
3.  **Styling:** Tailwind CSS (szybkie stylowanie, łatwe do zmiany motywu w przyszłych klonach).
4.  **Extension Framework:** Użyj `@crxjs/vite-plugin` (to standard do łączenia Vite z Manifest V3) LUB standardowej konfiguracji Vite z `rollup-plugin-copy` dla manifestu, jeśli wolisz prostotę.

**Plan działania (krok po kroku):**

1.  **Inicjalizacja:** Zainicjuj projekt Vite z React i TypeScript. Skonfiguruj `manifest.json` pod Manifest V3 (Chrome) z odpowiednimi uprawnieniami (`storage`).
2.  **Migracja Logiki (Core):**
    *   Weź logikę z pliku `src/js/generators.js` i `src/js/data.js`.
    *   Przekształć ją w czyste funkcje TypeScript lub hooki (np. `usePolishGenerator`).
    *   Stwórz odpowiednie interfejsy TS dla generowanych obiektów (Person, Company, Address).
3.  **Odtworzenie UI:**
    *   Zbuduj interfejs w React używając Tailwind CSS.
    *   Ma wyglądać nowocześnie i schludnie.
    *   Odtwórz zakładki (Tabs) jako komponenty React.
    *   Zamiast manipulacji DOM (`document.getElementById`), użyj React State do wyświetlania wygenerowanych danych.

**Instrukcja wykonania:**
Nie generuj całego kodu naraz. Zacznij od **Kroku 1 i 2** (Setup i Migracja Logiki). Pokaż mi strukturę plików i skonwertowany kod TypeScript dla generatora. Czekaj na moją akceptację przed robieniem UI.
