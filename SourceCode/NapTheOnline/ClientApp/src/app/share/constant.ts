export const MENU_VALUE = {
  Game: 1,
  NewsGame: 2,
  NewsGameTricks: 3,
  NewsTechnology: 4,
};

export const MENU_ITEMS = [
  {value: MENU_VALUE.Game, path: '/games'},
  {value: MENU_VALUE.NewsGame, path: '/news/game'},
  {value: MENU_VALUE.NewsGameTricks, path: '/news/game-tricks'},
  {value: MENU_VALUE.NewsTechnology, path: 'About us'},
];

export const PRICE_VALUE = {
  '10.000': 10000,
  '20.000': 20000,
  '30.000': 30000,
  '50.000': 50000,
  '100.000': 100000,
  '200.000': 200000,
  '300.000': 300000,
  '500.000': 500000,
  '1.000. 000': 1000000,
};

export const CARD_PRICE = [
  {value: PRICE_VALUE['10.000'], text: '10.000 VND'},
  {value: PRICE_VALUE['20.000'], text: '20.000 VND'},
  {value: PRICE_VALUE['30.000'], text: '30.000 VND'},
  {value: PRICE_VALUE['50.000'], text: '50.000 VND'},
  {value: PRICE_VALUE['100.000'], text: '100.000 VND'},
  {value: PRICE_VALUE['200.000'], text: '200.000 VND'},
  {value: PRICE_VALUE['300.000'], text: '300.000 VND'},
  {value: PRICE_VALUE['500.000'], text: '500.000 VND'},
  {value: PRICE_VALUE['1.000. 000'], text: '1.000.000 VND'},
];


export const NEW_TYPES = [
    {value: 1, text: 'Tin tức game'},
    {value: 2, text: 'Mẹo chơi game'},
    {value: 3, text: 'Công nghệ'},
  ];


export const ALLOWED_FILE_TYPES = '.jpg,.jpeg,.png,.gif';
