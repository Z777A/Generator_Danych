/**
 * Data for generating Polish test data
 */
const DATA = {
  // Male first names
  maleFirstNames: [
    'Adam', 'Aleksander', 'Andrzej', 'Antoni', 'Artur', 'Bartosz', 'Błażej', 'Cezary',
    'Damian', 'Daniel', 'Dariusz', 'Dawid', 'Dominik', 'Filip', 'Franciszek', 'Grzegorz',
    'Hubert', 'Ignacy', 'Jacek', 'Jakub', 'Jan', 'Janusz', 'Jarosław', 'Jerzy',
    'Józef', 'Kamil', 'Karol', 'Kazimierz', 'Krystian', 'Krzysztof', 'Leszek', 'Łukasz',
    'Maciej', 'Marek', 'Mariusz', 'Mateusz', 'Michał', 'Mieczysław', 'Mikołaj', 'Miłosz',
    'Norbert', 'Olaf', 'Oskar', 'Patryk', 'Paweł', 'Piotr', 'Przemysław', 'Radosław',
    'Rafał', 'Robert', 'Roman', 'Sebastian', 'Sławomir', 'Stanisław', 'Stefan', 'Szymon',
    'Tadeusz', 'Tomasz', 'Wacław', 'Waldemar', 'Wiktor', 'Witold', 'Wojciech', 'Zbigniew',
    'Adrian', 'Albert', 'Alfred', 'Bogdan', 'Bogusław', 'Bronisław', 'Bruno', 'Czesław',
    'Edward', 'Emil', 'Ernest', 'Eugeniusz', 'Fabian', 'Feliks', 'Fryderyk', 'Gabriel',
    'Gustaw', 'Henryk', 'Igor', 'Ireneusz', 'Jędrzej', 'Julian', 'Kacper', 'Kajetan',
    'Konrad', 'Kornel', 'Leon', 'Lucjan', 'Ludwik', 'Marcel', 'Marcin', 'Maksymilian',
    'Nikodem', 'Oliwier', 'Remigiusz', 'Ryszard', 'Seweryn', 'Teodor', 'Tymon', 'Wincenty',
    'Zenon', 'Zygmunt'
  ],

  // Female first names
  femaleFirstNames: [
    'Agata', 'Agnieszka', 'Aleksandra', 'Alicja', 'Amelia', 'Anastazja', 'Aneta', 'Angelika',
    'Anna', 'Barbara', 'Beata', 'Bogumiła', 'Bożena', 'Cecylia', 'Dagmara', 'Danuta',
    'Dominika', 'Dorota', 'Edyta', 'Eliza', 'Elżbieta', 'Emilia', 'Ewa', 'Ewelina',
    'Gabriela', 'Grażyna', 'Halina', 'Hanna', 'Helena', 'Ilona', 'Irena', 'Iwona',
    'Izabela', 'Jadwiga', 'Janina', 'Joanna', 'Jolanta', 'Julia', 'Justyna', 'Kamila',
    'Karolina', 'Katarzyna', 'Kinga', 'Klaudia', 'Krystyna', 'Laura', 'Lena', 'Lidia',
    'Liliana', 'Lucyna', 'Magdalena', 'Maja', 'Małgorzata', 'Maria', 'Marianna', 'Marlena',
    'Marta', 'Martyna', 'Michalina', 'Monika', 'Natalia', 'Oliwia', 'Patrycja', 'Paulina',
    'Renata', 'Róża', 'Sandra', 'Sylwia', 'Teresa', 'Urszula', 'Weronika', 'Wiktoria',
    'Zofia', 'Zuzanna', 'Ada', 'Adrianna', 'Aldona', 'Alina', 'Anita', 'Antonina',
    'Bernadeta', 'Blanka', 'Celina', 'Diana', 'Eleonora', 'Eugenia', 'Felicja', 'Franciszka',
    'Honorata', 'Ida', 'Iga', 'Inga', 'Jagoda', 'Jowita', 'Judyta', 'Julita',
    'Kalina', 'Kornelia', 'Klara', 'Łucja', 'Malwina', 'Marcelina', 'Matylda', 'Melania',
    'Milena', 'Nadia', 'Nikola', 'Nina', 'Olga', 'Pola', 'Regina', 'Roksana',
    'Rozalia', 'Sabina', 'Sara', 'Sonia', 'Stella', 'Tamara', 'Wanda', 'Żaneta'
  ],

  // Male surnames
  maleSurnames: [
    'Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński',
    'Szymański', 'Woźniak', 'Dąbrowski', 'Kozłowski', 'Jankowski', 'Mazur', 'Kwiatkowski', 'Krawczyk',
    'Piotrowski', 'Grabowski', 'Nowakowski', 'Pawłowski', 'Michalski', 'Nowicki', 'Adamczyk', 'Dudek',
    'Zając', 'Wieczorek', 'Jabłoński', 'Król', 'Majewski', 'Olszewski', 'Jaworski', 'Wróbel',
    'Malinowski', 'Pawlak', 'Witkowski', 'Walczak', 'Stępień', 'Górski', 'Rutkowski', 'Michalak',
    'Sikora', 'Ostrowski', 'Baran', 'Duda', 'Szewczyk', 'Tomaszewski', 'Pietrzak', 'Marciniak',
    'Wróblewski', 'Zalewski', 'Jakubowski', 'Jasiński', 'Zawadzki', 'Sadowski', 'Bąk', 'Chmielewski',
    'Borkowski', 'Czarnecki', 'Sawicki', 'Sokołowski', 'Urbański', 'Kubiak', 'Maciejewski', 'Szczepański',
    'Kucharski', 'Wilk', 'Kalinowski', 'Lis', 'Mazurek', 'Wysocki', 'Adamski', 'Kaźmierczak',
    'Wasilewski', 'Sobczak', 'Czerwiński', 'Andrzejewski', 'Cieślak', 'Głowacki', 'Zakrzewski', 'Kołodziej',
    'Sikorski', 'Krajewski', 'Gajewski', 'Szymczak', 'Szulc', 'Baranowski', 'Laskowski', 'Brzeziński',
    'Makowski', 'Ziółkowski', 'Przybylski', 'Andrzejczak', 'Bernat', 'Chojnacki', 'Domański',
    'Falkowski', 'Gajda', 'Hajduk', 'Janas', 'Karpiński', 'Lech', 'Markowski', 'Nawrocki',
    'Orłowski', 'Piątek', 'Rogowski', 'Sienkiewicz', 'Tkaczyk', 'Urbaniak', 'Wawrzyniak',
    'Zdunek', 'Żak', 'Bielecki', 'Cieślik', 'Dobrowolski', 'Filipiak', 'Grzelak', 'Jarosz',
    'Kaczor', 'Kurek', 'Lipski', 'Małek', 'Mróz', 'Niemiec', 'Owczarek', 'Pająk',
    'Ratajczak', 'Sobolewski', 'Stasiak', 'Szczęsny', 'Tomczyk', 'Walkowiak', 'Zawada'
  ],

  // Female surnames
  femaleSurnames: [
    'Nowak', 'Kowalska', 'Wiśniewska', 'Wójcik', 'Kowalczyk', 'Kamińska', 'Lewandowska', 'Zielińska',
    'Szymańska', 'Woźniak', 'Dąbrowska', 'Kozłowska', 'Jankowska', 'Mazur', 'Kwiatkowska', 'Krawczyk',
    'Piotrowska', 'Grabowska', 'Nowakowska', 'Pawłowska', 'Michalska', 'Nowicka', 'Adamczyk', 'Dudek',
    'Zając', 'Wieczorek', 'Jabłońska', 'Król', 'Majewska', 'Olszewska', 'Jaworska', 'Wróbel',
    'Malinowska', 'Pawlak', 'Witkowska', 'Walczak', 'Stępień', 'Górska', 'Rutkowska', 'Michalak',
    'Sikora', 'Ostrowska', 'Baran', 'Duda', 'Szewczyk', 'Tomaszewska', 'Pietrzak', 'Marciniak',
    'Wróblewska', 'Zalewska', 'Jakubowska', 'Jasińska', 'Zawadzka', 'Sadowska', 'Bąk', 'Chmielewska',
    'Borkowska', 'Czarnecka', 'Sawicka', 'Sokołowska', 'Urbańska', 'Kubiak', 'Maciejewska', 'Szczepańska',
    'Kucharska', 'Wilk', 'Kalinowska', 'Lis', 'Mazurek', 'Wysocka', 'Adamska', 'Kaźmierczak',
    'Wasilewska', 'Sobczak', 'Czerwińska', 'Andrzejewska', 'Cieślak', 'Głowacka', 'Zakrzewska', 'Kołodziej',
    'Sikorska', 'Krajewska', 'Gajewska', 'Szymczak', 'Szulc', 'Baranowska', 'Laskowska', 'Brzezińska',
    'Makowska', 'Ziółkowska', 'Przybylska', 'Andrzejczak', 'Bernat', 'Chojnacka', 'Domańska',
    'Falkowska', 'Gajda', 'Hajduk', 'Janas', 'Karpińska', 'Lech', 'Markowska', 'Nawrocka',
    'Orłowska', 'Piątek', 'Rogowska', 'Sienkiewicz', 'Tkaczyk', 'Urbaniak', 'Wawrzyniak',
    'Zdunek', 'Żak', 'Bielecka', 'Cieślik', 'Dobrowolska', 'Filipiak', 'Grzelak', 'Jarosz',
    'Kaczor', 'Kurek', 'Lipska', 'Małek', 'Mróz', 'Niemiec', 'Owczarek', 'Pająk',
    'Ratajczak', 'Sobolewska', 'Stasiak', 'Szczęsna', 'Tomczyk', 'Walkowiak', 'Zawada'
  ],

  // Streets
  streets: [
    'Mickiewicza', 'Słowackiego', 'Kościuszki', 'Sienkiewicza', 'Piłsudskiego', 'Kopernika',
    'Matejki', 'Chopina', 'Wyspiańskiego', 'Reymonta', 'Prusa', 'Konopnickiej', 'Norwida',
    'Orzeszkowej', 'Żeromskiego', 'Asnyka', 'Baczyńskiego', 'Broniewskiego', 'Gałczyńskiego',
    'Iwaszkiewicza', 'Kruczkowskiego', 'Makuszyńskiego', 'Nałkowskiej', 'Reja', 'Staffa',
    'Tuwima', 'Wańkowicza', 'Brzechwy', 'Fredry', 'Gombrowicza', 'Herberta', 'Kochanowskiego',
    'Leśmiana', 'Miłosza', 'Różewicza', 'Szymborskiej', 'Tetmajera', 'Witkiewicza', 'Zapolskiej',
    'Długa', 'Krótka', 'Szeroka', 'Wąska', 'Cicha', 'Głośna', 'Jasna', 'Ciemna', 'Prosta',
    'Krzywa', 'Nowa', 'Stara', 'Mała', 'Duża', 'Wesoła', 'Smutna', 'Spokojna', 'Burzliwa',
    'Polna', 'Leśna', 'Ogrodowa', 'Kwiatowa', 'Słoneczna', 'Księżycowa', 'Gwiezdna', 'Tęczowa',
    'Deszczowa', 'Wietrzna', 'Śnieżna', 'Mglista', 'Górna', 'Dolna', 'Wschodnia', 'Zachodnia',
    'Północna', 'Południowa', 'Środkowa', 'Boczna', 'Główna', 'Centralna', 'Graniczna', 'Skrajna',
    'Akacjowa', 'Brzozowa', 'Cedrowa', 'Dębowa', 'Grabowa', 'Jaworowa', 'Kasztanowa', 'Lipowa',
    'Modrzewiowa', 'Orzechowa', 'Sosnowa', 'Świerkowa', 'Wierzbowa', 'Bukowa', 'Jodłowa', 'Klonowa',
    'Malinowa', 'Poziomkowa', 'Jagodowa', 'Truskawkowa', 'Wiśniowa', 'Czereśniowa', 'Brzoskwiniowa', 'Morelowa',
    'Jabłoniowa', 'Gruszkowa', 'Śliwkowa', 'Porzeczkowa', 'Agrestowa', 'Winogronowa', 'Borówkowa', 'Jeżynowa',
    'Fiołkowa', 'Różana', 'Tulipanowa', 'Liliowa', 'Stokrotkowa', 'Chabrowa', 'Makowa', 'Konwaliowa',
    'Irysowa', 'Jaśminowa', 'Lawendowa', 'Nagietkowa', 'Sasankowa', 'Wrzosowa', 'Kalinowa', 'Bzowa'
  ],

  // Cities
  cities: [
    'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz',
    'Lublin', 'Białystok', 'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Sosnowiec',
    'Toruń', 'Kielce', 'Rzeszów', 'Gliwice', 'Zabrze', 'Olsztyn', 'Bielsko-Biała',
    'Bytom', 'Zielona Góra', 'Rybnik', 'Ruda Śląska', 'Opole', 'Tychy', 'Gorzów Wielkopolski',
    'Dąbrowa Górnicza', 'Płock', 'Elbląg', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów',
    'Koszalin', 'Kalisz', 'Legnica', 'Grudziądz', 'Słupsk', 'Jaworzno', 'Jastrzębie-Zdrój',
    'Nowy Sącz', 'Jelenia Góra', 'Siedlce', 'Mysłowice', 'Piła', 'Konin', 'Piotrków Trybunalski',
    'Inowrocław', 'Lubin', 'Ostrów Wielkopolski', 'Suwałki', 'Stargard', 'Gniezno', 'Ostrowiec Świętokrzyski',
    'Siemianowice Śląskie', 'Głogów', 'Pabianice', 'Leszno', 'Żory', 'Zamość', 'Pruszków',
    'Łomża', 'Ełk', 'Tomaszów Mazowiecki', 'Chełm', 'Mielec', 'Kędzierzyn-Koźle', 'Przemyśl',
    'Stalowa Wola', 'Tczew', 'Biała Podlaska', 'Bełchatów', 'Świdnica', 'Będzin', 'Zgierz',
    'Piekary Śląskie', 'Racibórz', 'Legionowo', 'Ostrołęka', 'Augustów', 'Bartoszyce', 'Brodnica',
    'Cieszyn', 'Działdowo', 'Giżycko', 'Hajnówka', 'Iława', 'Jarocin', 'Kętrzyn',
    'Kołobrzeg', 'Krosno', 'Kutno', 'Lębork', 'Łowicz', 'Malbork', 'Mińsk Mazowiecki', 'Nakło nad Notecią',
    'Nysa', 'Oleśnica', 'Oświęcim', 'Piaseczno', 'Puławy', 'Radomsko', 'Sanok', 'Sieradz',
    'Skierniewice', 'Starachowice', 'Świdnik', 'Tarnobrzeg', 'Turek', 'Wejherowo', 'Wodzisław Śląski', 'Zakopane',
    'Żagań', 'Żyrardów', 'Biłgoraj', 'Bolesławiec', 'Chojnice', 'Dzierżoniów', 'Goleniów', 'Gryfino',
    'Jasło', 'Kamienna Góra', 'Krapkowice', 'Lubliniec', 'Mrągowo', 'Nowa Ruda', 'Ostróda', 'Polkowice'
  ],

  // Voivodeships
  voivodeships: [
    'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie', 'Łódzkie', 'Małopolskie',
    'Mazowieckie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
    'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
  ],

  // Mapping cities to voivodeships
  citiesVoivodeships: {
    'Dolnośląskie': ['Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra', 'Lubin', 'Głogów', 'Świdnica', 'Bolesławiec', 'Oleśnica', 'Dzierżoniów', 'Kamienna Góra', 'Nowa Ruda'],
    'Kujawsko-pomorskie': ['Bydgoszcz', 'Toruń', 'Włocławek', 'Grudziądz', 'Inowrocław', 'Brodnica', 'Nakło nad Notecią'],
    'Lubelskie': ['Lublin', 'Zamość', 'Chełm', 'Biała Podlaska', 'Puławy', 'Świdnik', 'Biłgoraj'],
    'Lubuskie': ['Zielona Góra', 'Gorzów Wielkopolski', 'Żagań', 'Żary', 'Nowa Sól'],
    'Łódzkie': ['Łódź', 'Piotrków Trybunalski', 'Pabianice', 'Tomaszów Mazowiecki', 'Bełchatów', 'Zgierz', 'Kutno', 'Łowicz', 'Radomsko', 'Skierniewice', 'Sieradz', 'Żyrardów'],
    'Małopolskie': ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim', 'Zakopane'],
    'Mazowieckie': ['Warszawa', 'Radom', 'Płock', 'Siedlce', 'Pruszków', 'Legionowo', 'Ostrołęka', 'Mińsk Mazowiecki', 'Piaseczno'],
    'Opolskie': ['Opole', 'Kędzierzyn-Koźle', 'Nysa', 'Krapkowice'],
    'Podkarpackie': ['Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec', 'Krosno', 'Sanok', 'Jasło', 'Tarnobrzeg'],
    'Podlaskie': ['Białystok', 'Suwałki', 'Łomża', 'Augustów', 'Hajnówka'],
    'Pomorskie': ['Gdańsk', 'Gdynia', 'Słupsk', 'Tczew', 'Wejherowo', 'Lębork', 'Malbork', 'Kołobrzeg'],
    'Śląskie': ['Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bytom', 'Rybnik', 'Ruda Śląska', 'Tychy', 'Dąbrowa Górnicza', 'Chorzów', 'Jaworzno', 'Jastrzębie-Zdrój', 'Mysłowice', 'Siemianowice Śląskie', 'Żory', 'Piekary Śląskie', 'Racibórz', 'Cieszyn', 'Wodzisław Śląski', 'Lubliniec'],
    'Świętokrzyskie': ['Kielce', 'Ostrowiec Świętokrzyski', 'Starachowice'],
    'Warmińsko-mazurskie': ['Olsztyn', 'Elbląg', 'Ełk', 'Bartoszyce', 'Działdowo', 'Giżycko', 'Iława', 'Kętrzyn', 'Mrągowo', 'Ostróda'],
    'Wielkopolskie': ['Poznań', 'Kalisz', 'Konin', 'Piła', 'Ostrów Wielkopolski', 'Gniezno', 'Leszno', 'Jarocin', 'Turek'],
    'Zachodniopomorskie': ['Szczecin', 'Koszalin', 'Stargard', 'Goleniów', 'Gryfino']
  },

  // Email domains
  emailDomains: [
    'gmail.com', 'wp.pl', 'onet.pl', 'interia.pl', 'o2.pl', 'yahoo.com', 'hotmail.com',
    'outlook.com', 'protonmail.com', 'icloud.com', 'poczta.fm', 'gazeta.pl', 'tlen.pl'
  ],

  // Company name prefixes
  companyPrefixes: [
    'Pol', 'Euro', 'Trans', 'Inter', 'Mega', 'Super', 'Eko', 'Bio', 'Tech', 'Bud',
    'Info', 'Auto', 'Agro', 'Med', 'Art', 'Pro', 'Net', 'Soft', 'Web', 'Cyber',
    'Smart', 'Elektro', 'Termo', 'Hydro', 'Petro', 'Chem', 'Farm', 'Gastro', 'Lux', 'Max',
    'Alfa', 'Beta', 'Delta', 'Gamma', 'Omega', 'Neo', 'Uni', 'Multi', 'Global', 'Local',
    'Micro', 'Macro', 'Meta', 'Digi', 'Krypto', 'Quantum', 'Nano', 'Vita', 'Nutri', 'Fit',
    'Eco', 'Green', 'Solar', 'Wind', 'Geo', 'Aqua', 'Aero', 'Astro', 'Cosmo', 'Terra',
    'Nova', 'Prima', 'Ultra', 'Extra', 'Hyper', 'Turbo', 'Rapid', 'Fast', 'Quick', 'Speed'
  ],

  // Company name roots
  companyRoots: [
    'Serwis', 'Handel', 'Logistyka', 'Consulting', 'Projekt', 'System', 'Market', 'Produkt',
    'Inwest', 'Budowa', 'Montaż', 'Naprawa', 'Sprzedaż', 'Wynajem', 'Usługi', 'Eksport',
    'Import', 'Hurt', 'Detal', 'Centrum', 'Grupa', 'Fabryka', 'Zakład', 'Biuro',
    'Studio', 'Agencja', 'Fundacja', 'Instytut', 'Laboratorium', 'Klinika',
    'Technologia', 'Innowacja', 'Rozwój', 'Energia', 'Finanse', 'Kapitał', 'Kredyt', 'Leasing',
    'Ubezpieczenia', 'Nieruchomości', 'Budownictwo', 'Architektura', 'Konstrukcja', 'Dystrybucja', 'Transport',
    'Spedycja', 'Magazyn', 'Hurtownia', 'Sklep', 'Apteka', 'Przychodnia', 'Szpital', 'Edukacja',
    'Szkolenia', 'Doradztwo', 'Analiza', 'Badania', 'Rozwój', 'Produkcja', 'Przetwórstwo', 'Recykling',
    'Ochrona', 'Bezpieczeństwo', 'Monitoring', 'Informatyka', 'Programowanie', 'Hosting', 'Media', 'Reklama',
    'Marketing', 'Promocja', 'Design', 'Grafika', 'Druk', 'Wydawnictwo', 'Gastronomia', 'Catering'
  ],

  // Company name suffixes
  companySuffixes: [
    'Sp. z o.o.', 'S.A.', 'Sp.j.', 'Sp.k.', 'S.K.A.', 'Sp. p.', 'Sp. c.', 'i Wspólnicy',
    'Group', 'Polska', 'Poland', 'Plus', 'Pro', 'Solutions', 'Systems', 'Services',
    'Industries', 'International', 'Investments', 'Partners', 'Team', 'Company', 'Corporation',
    'Holding', 'Capital', 'Ventures', 'Enterprise', 'Limited', 'Inc.', 'LLC', 'GmbH',
    'Consulting', 'Management', 'Development', 'Technologies', 'Networks', 'Communications', 'Media',
    'Digital', 'Online', 'Connect', 'Global', 'World', 'European', 'Central', 'Eastern',
    'Nordic', 'Baltic', 'Trading', 'Exchange', 'Market', 'Business', 'Commerce', 'Financial',
    'Investment', 'Asset', 'Equity', 'Trust', 'Fund', 'Bank', 'Insurance', 'Security',
    'Healthcare', 'Medical', 'Pharma', 'Biotech', 'Research', 'Labs', 'Science', 'Engineering',
    'Construction', 'Properties', 'Estate', 'Logistics', 'Transport', 'Shipping', 'Express'
  ],

  // Street types
  streetTypes: [
    'ul.', 'al.', 'pl.', 'os.', 'Rondo', 'Skwer', 'Bulwar', 'Szosa', 'Droga'
  ],

  // ID card series
  idCardSeries: [
    'AAA', 'ABA', 'ACA', 'ADA', 'AEA', 'AFA', 'AGA', 'AHA', 'AIA', 'AJA',
    'AKA', 'ALA', 'AMA', 'ANA', 'AOA', 'APA', 'ARA', 'ASA', 'ATA', 'AUA',
    'AVA', 'AWA', 'AXA', 'AYA', 'AZA', 'CAA', 'CBA', 'CCA', 'CDA', 'CEA',
    'CFA', 'CGA', 'CHA', 'CIA', 'CJA', 'CKA', 'CLA', 'CMA', 'CNA', 'COA',
    'CPA', 'CRA', 'CSA', 'CTA', 'CUA', 'CVA', 'CWA', 'CXA', 'CYA', 'CZA',
    'DAA', 'DBA', 'DCA', 'DDA', 'DEA', 'DFA', 'DGA', 'DHA', 'DIA', 'DJA',
    'DKA', 'DLA', 'DMA', 'DNA', 'DOA', 'DPA', 'DRA', 'DSA', 'DTA', 'DUA',
    'DVA', 'DWA', 'DXA', 'DYA', 'DZA', 'EAA', 'EBA', 'ECA', 'EDA', 'EEA'
  ]
};

// Export data
window.DATA = DATA; 