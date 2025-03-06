# Generator Danych 

Rozszerzenie do przeglądarki Chrome, które generuje realistyczne polskie dane testowe.

## Funkcje

- Generowanie polskich danych osobowych (imię, nazwisko, PESEL, data urodzenia, email, telefon)
- Generowanie polskich adresów (ulica, kod pocztowy, miasto, województwo)
- Generowanie danych dokumentów (dowód osobisty, paszport)
- Generowanie danych firmowych (nazwa firmy, NIP, REGON, KRS)
- Kopiowanie pojedynczych danych lub wszystkich danych naraz
- Interfejs z zakładkami dla łatwego dostępu do różnych typów danych
- Elegancki ciemny motyw (dark mode)

## Instalacja

### Z Chrome Web Store

1. Przejdź do [Chrome Web Store](https://chrome.google.com/webstore)
2. Wyszukaj "Generator_Danych"
3. Kliknij "Dodaj do Chrome"

### Instalacja lokalna (dla developerów)

1. Pobierz lub sklonuj to repozytorium
2. Otwórz Chrome i przejdź do `chrome://extensions/`
3. Włącz "Tryb dewelopera" (przełącznik w prawym górnym rogu)
4. Kliknij "Załaduj rozpakowane" i wybierz folder z rozszerzeniem
5. Rozszerzenie powinno pojawić się na liście i być gotowe do użycia

## Użycie

1. Kliknij ikonę rozszerzenia w pasku narzędzi Chrome
2. Wybierz zakładkę z typem danych, które chcesz wygenerować
3. Kliknij przycisk kopiowania obok pola, aby skopiować pojedynczą wartość
4. Kliknij "Kopiuj wszystko", aby skopiować wszystkie dane
5. Kliknij "Generuj nowe dane", aby wygenerować nowy zestaw danych

## Uwagi

- Wszystkie generowane dane są fikcyjne i nie odpowiadają rzeczywistym osobom
- Dane są generowane lokalnie w przeglądarce, nie są wysyłane na żaden serwer
- Numery PESEL, NIP i REGON są generowane zgodnie z algorytmami walidacyjnymi

## Ikony

Aby rozszerzenie działało poprawnie, należy dodać ikony w katalogu `src/images`:
- `icon16.png` (16x16 pikseli)
- `icon48.png` (48x48 pikseli)
- `icon128.png` (128x128 pikseli)

W katalogu `src/images` znajdują się pliki SVG, które należy przekonwertować na format PNG. Instrukcje konwersji znajdują się w pliku `src/images/README.md`.

## Technologie

- HTML5
- CSS3
- JavaScript

## Licencja

MIT 