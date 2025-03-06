# Ikony rozszerzenia

W tym katalogu znajdują się ikony dla rozszerzenia w formacie PNG. Ikony są generowane z pliku źródłowego `logo.jpg`.

## Generowanie ikon PNG

### Sposób 1: Użycie skryptu Node.js

W tym katalogu znajduje się skrypt `create_icons.js`, który automatycznie generuje ikony PNG na podstawie pliku źródłowego `logo.jpg`. Aby go użyć:

1. Upewnij się, że masz zainstalowany Node.js
2. Zainstaluj wymagane zależności: `npm install canvas`
3. Przejdź do katalogu `src/images`: `cd src/images`
4. Uruchom skrypt: `node create_icons.js`

Skrypt wygeneruje ikony w rozmiarach 16x16, 48x48 i 128x128 pikseli, a także utworzy kopię ikony 128x128 jako `icon.png` (wymagane przez Chrome Web Store). Wszystkie pliki zostaną zapisane w tym samym katalogu, w którym znajduje się skrypt.

### Sposób 2: Użycie narzędzia online

Jeśli chcesz ręcznie wygenerować ikony z pliku `logo.jpg`, możesz użyć narzędzia online:

1. Odwiedź stronę konwertera obrazów, np. https://www.iloveimg.com/resize-image
2. Prześlij plik `logo.jpg`
3. Ustaw odpowiednie rozmiary (16x16, 48x48, 128x128)
4. Pobierz wygenerowane pliki PNG

### Sposób 3: Użycie narzędzia wiersza poleceń

Jeśli masz zainstalowany ImageMagick, możesz użyć następującego polecenia:

```bash
convert logo.jpg -resize 16x16 icon16.png
convert logo.jpg -resize 48x48 icon48.png
convert logo.jpg -resize 128x128 icon128.png
convert logo.jpg -resize 128x128 icon.png
```

## Wymagane rozmiary ikon

Dla rozszerzenia Chrome potrzebne są następujące rozmiary ikon:
- icon16.png (16x16 pikseli)
- icon48.png (48x48 pikseli)
- icon128.png (128x128 pikseli)
- icon.png (128x128 pikseli) - kopia icon128.png, wymagana przez Chrome Web Store

Upewnij się, że wszystkie ikony są w formacie PNG i mają odpowiednie rozmiary przed dodaniem ich do rozszerzenia. 