/* ---------------------------------------------------------------
   Chanel bag canon — Week 10 PUBLIC parc
   Sources: Miloura (year-by-year), Maison de Chanel CA (iconic 8),
            Yoogi's Closet (notable + LE).
   Significant: gets a real Vestiaire product photo + editorial slides
   Notable:     gets a year-keyed product photo (Vestiaire or Gemini)
   Fill:        gets a Gemini-generated photo on plain white bg
--------------------------------------------------------------- */

const BAG_CANON = [
  // === SIGNIFICANT (15) — get real Vestiaire + editorial ============
  { year: 1955, slug: '255',          name: '2.55',                  significance: 'significant', vestiaireQuery: 'chanel 2.55 reissue', editorialKey: '1955_255' },
  { year: 1983, slug: 'classic-flap', name: 'Timeless Classic',      significance: 'significant', vestiaireQuery: 'chanel timeless classic flap', editorialKey: '1983_classicflap' },
  { year: 1992, slug: 'vanity-case',  name: 'Vanity Case',           significance: 'significant', vestiaireQuery: 'chanel vanity case vintage' },
  { year: 1994, slug: 'supermodel',   name: 'Supermodel',            significance: 'significant', vestiaireQuery: 'chanel supermodel bag vintage' },
  { year: 1997, slug: 'woc',          name: 'Wallet on Chain',       significance: 'significant', vestiaireQuery: 'chanel wallet on chain', editorialKey: '1997_woc' },
  { year: 2005, slug: 'reissue-255',  name: 'Reissue 2.55',          significance: 'significant', vestiaireQuery: 'chanel reissue 2.55 2005', editorialKey: '2005_reissue' },
  { year: 2008, slug: 'modern-chain', name: 'Modern Chain',          significance: 'significant', vestiaireQuery: 'chanel modern chain', hasLocalPhoto: 'assets/bags/2008.webp' },
  { year: 2011, slug: 'boy',          name: 'Boy Bag',               significance: 'significant', vestiaireQuery: 'chanel boy bag', editorialKey: '2011_boy' },
  { year: 2014, slug: 'graffiti',     name: 'Graffiti Backpack',     significance: 'significant', vestiaireQuery: 'chanel graffiti backpack' },
  { year: 2017, slug: 'gabrielle',    name: 'Gabrielle',             significance: 'significant', vestiaireQuery: 'chanel gabrielle hobo' },
  { year: 2018, slug: '31',           name: '31 Bag',                significance: 'significant', vestiaireQuery: 'chanel 31 bag' },
  { year: 2019, slug: '19',           name: 'Chanel 19',             significance: 'significant', vestiaireQuery: 'chanel 19 bag', editorialKey: '2019_19' },
  { year: 2022, slug: '22',           name: 'Chanel 22',             significance: 'significant', vestiaireQuery: 'chanel 22 bag', editorialKey: '2022_22' },
  { year: 2023, slug: 'kelly',        name: 'Kelly re-edition',      significance: 'significant', vestiaireQuery: 'chanel kelly bag' },
  { year: 2025, slug: '25',           name: 'Chanel 25',             significance: 'significant', vestiaireQuery: 'chanel 25 bag', editorialKey: '2025_25' },

  // === NOTABLE — from Miloura's year-by-year (fill via Vestiaire or Gemini) =
  { year: 1995, slug: 'diana',        name: 'Diana',                 significance: 'notable' },
  { year: 1995, slug: 'heart-vanity', name: 'Heart Vanity Bag',      significance: 'notable' },
  { year: 2004, slug: 'cambon',       name: 'Cambon',                significance: 'notable' },
  { year: 2005, slug: 'cerf',         name: 'Cerf Tote',             significance: 'notable' },
  { year: 2005, slug: 'ultimate-soft', name: 'Ultimate Soft',        significance: 'notable' },
  { year: 2006, slug: 'outdoor-ligne', name: 'Outdoor Ligne',        significance: 'notable' },
  { year: 2006, slug: 'luxe-ligne',   name: 'Luxe Ligne',            significance: 'notable' },
  { year: 2006, slug: 'paris-biarritz', name: 'Paris-Biarritz',      significance: 'notable' },
  { year: 2008, slug: 'portobello',   name: 'Portobello',            significance: 'notable' },
  { year: 2011, slug: 'hampton-cc',   name: 'Hampton CC',            significance: 'notable' },
  { year: 2012, slug: 'coco-pleats',  name: 'Coco Pleats',           significance: 'notable' },
  { year: 2013, slug: 'easy',         name: 'Easy',                  significance: 'notable' },
  { year: 2013, slug: 'crossing-times', name: 'Crossing Times',      significance: 'notable' },
  { year: 2013, slug: 'deauville',    name: 'Deauville',             significance: 'notable' },
  { year: 2014, slug: 'shopping-fever', name: 'Shopping Fever Tote', significance: 'notable' },
  { year: 2014, slug: 'perfume-bottle', name: 'Perfume Bottle Bag',  significance: 'notable' },
  { year: 2014, slug: 'lego',         name: 'Supermarket Boy Brick Lego', significance: 'notable' },
  { year: 2015, slug: 'girl',         name: 'Girl Bag',              significance: 'notable' },
  { year: 2015, slug: 'coco-boy',     name: 'Coco Boy',              significance: 'notable' },
  { year: 2016, slug: 'urban-backpack', name: 'Urban Backpack',      significance: 'notable' },
  { year: 2017, slug: 'gabrielle-backpack', name: 'Gabrielle Backpack', significance: 'notable' },
  { year: 2019, slug: 'duma',         name: 'Duma Backpack re-edition', significance: 'notable' },
  { year: 2020, slug: 'diamond',      name: 'Diamond Bag',           significance: 'notable' },
  { year: 2023, slug: 'hobo',         name: 'Hobo Bag',              significance: 'notable' },
  { year: 2024, slug: 'walk-of-fame', name: 'Walk of Fame Star Bag', significance: 'notable' },
];

if (typeof window !== 'undefined') window.BAG_CANON = BAG_CANON;
