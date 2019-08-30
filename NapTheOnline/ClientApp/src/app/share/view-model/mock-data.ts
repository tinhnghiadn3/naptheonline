import {GameModel} from './game.model';
import {NewsModel} from './news.model';
import {PriceModel} from './price.model';

export const GAMES: GameModel[] = [
  {
    id: 1,
    logo: '../../assets/images/lords.jpg',
    name: 'Lord Mobile',
    banner: 'lord-mobile',
    description: 'description',
    prices: [],
  },
  {
    id: 2,
    logo: '../../assets/images/lords.jpg',
    name: 'Liên Quân Mobile',
    banner: 'lord-mobile',
    description: 'lien quan is the best game in mobile',
    prices: [
      {name: '50.000 VNĐ', value: 600, isUpdating: false},
      {name: '100000 VNĐ', value: 1300, isUpdating: false},
      {name: '200.000 VNĐ', value: 2800, isUpdating: false},
      {name: '500.000 VNĐ', value: 6000, isUpdating: false},
      {name: '1.000.000 VNĐ', value: 15000, isUpdating: false},
    ],
  },
  {
    id: 3,
    logo: '../../assets/images/lords.jpg',
    name: 'Võ Lâm Truyền Kỳ',
    banner: 'lord-mobile',
    description: 'description',
    prices: [
      {name: '50.000 VNĐ', value: 600, isUpdating: false},
      {name: '100000 VNĐ', value: 1300, isUpdating: false},
      {name: '200.000 VNĐ', value: 2800, isUpdating: false},
      {name: '500.000 VNĐ', value: 6000, isUpdating: false},
      {name: '1.000.000 VNĐ', value: 15000, isUpdating: false},
    ],
  },
];

export const NEWS: NewsModel[] = [
  {
    id: 1,
    logo: '../../assets/images/img_01.jpg',
    name: 'MAECENAS DEVELOPERS SPEAK OUT ON \'DEATH MARCH\' CRUNCH',
    description: 'description',
    dateCreated: '14/8/2019 - 7h30'
  },
  {
    id: 2,
    logo: '"../../assets/images/img_01.jpg',
    name: 'Lord Mobile',
    description: 'description',
    dateCreated: '14/8/2019 - 7h30'
  },
  {
    id: 3,
    logo: '"../../assets/images/img_01.jpg',
    name: 'Lord Mobile',
    description: 'description',
    dateCreated: '14/8/2019 - 7h30'
  },
  {
    id: 4,
    logo: '"../../assets/images/img_01.jpg',
    name: 'Lord Mobile',
    description: 'description',
    dateCreated: '14/8/2019 - 7h30'
  },
  {
    id: 5,
    logo: '"../../assets/images/img_01.jpg',
    name: 'Lord Mobile',
    description: 'description',
    dateCreated: '14/8/2019 - 7h30'
  },
];
