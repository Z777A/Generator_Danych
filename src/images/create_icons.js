// Skrypt do generowania ikon dla rozszerzenia
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Ścieżka do katalogu, w którym znajduje się ten skrypt
const scriptDir = __dirname;

// Ścieżka do pliku źródłowego logo
const logoPath = path.join(scriptDir, 'logo-removebg-preview.png');

// Rozmiary ikon
const sizes = [16, 48, 128];

// Generuj ikony dla każdego rozmiaru
async function generateIcons() {
  try {
    // Wczytaj obraz źródłowy
    const sourceImage = await loadImage(logoPath);
    
    // Generuj ikony dla każdego rozmiaru
    for (const size of sizes) {
      // Utwórz canvas
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Wyczyść canvas i ustaw przezroczyste tło
      ctx.clearRect(0, 0, size, size);
      
      // Oblicz proporcje, aby zachować aspekt obrazu
      const aspectRatio = sourceImage.width / sourceImage.height;
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (aspectRatio > 1) {
        // Obraz szerszy niż wyższy
        drawWidth = size;
        drawHeight = size / aspectRatio;
        offsetX = 0;
        offsetY = (size - drawHeight) / 2;
      } else {
        // Obraz wyższy niż szerszy lub kwadratowy
        drawHeight = size;
        drawWidth = size * aspectRatio;
        offsetX = (size - drawWidth) / 2;
        offsetY = 0;
      }
      
      // Narysuj obraz źródłowy, skalując go do odpowiedniego rozmiaru i zachowując proporcje
      ctx.drawImage(sourceImage, offsetX, offsetY, drawWidth, drawHeight);
      
      // Ścieżka do pliku wyjściowego
      const outputPath = path.join(scriptDir, `icon${size}.png`);
      
      // Zapisz jako PNG
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      
      // Zapisz kopię ikony 128px jako icon.png (wymagane przez Chrome Web Store)
      if (size === 128) {
        const iconPath = path.join(scriptDir, 'icon.png');
        fs.writeFileSync(iconPath, buffer);
        console.log(`Wygenerowano icon.png w katalogu ${scriptDir}`);
      }
      
      console.log(`Wygenerowano icon${size}.png w katalogu ${scriptDir}`);
    }
    
    console.log('Wszystkie ikony zostały wygenerowane!');
  } catch (error) {
    console.error('Wystąpił błąd podczas generowania ikon:', error);
  }
}

// Uruchom funkcję generowania ikon
generateIcons(); 