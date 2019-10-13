import {GameModel} from './view-model/game.model';
import {NewsModel} from './view-model/news.model';

export const GAMES: GameModel[] = [
  //{
  //  id: 1,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Lord Mobile',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'description',
  //  prices: [{name: '50.000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}],
  //  friendlyName: 'lord-mobible'
  //},
  //{
  //  id: 2,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Liên Quân',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'lien quan is the best game in mobile',
  //  prices: [
  //    {name: '50000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}
  //  ],
  //  friendlyName: 'lien-quan'
  //},
  //{
  //  id: 3,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Võ Lâm Truyền Kỳ',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'description',
  //  prices: [
  //    {name: '50000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}
  //  ],
  //  friendlyName: 'vo-lam-truyen-ky'
  //},
  //{
  //  id: 4,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Gunny Mobile',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'description',
  //  prices: [{name: '50000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}],
  //  friendlyName: 'gunny-mobible'
  //},
  //{
  //  id: 5,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Auto Chess',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'lien quan is the best game in mobile',
  //  prices: [
  //    {name: '50000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}
  //  ],
  //  friendlyName: 'auto-chess'
  //},
  //{
  //  id: 6,
  //  logo: '../../assets/images/lords.jpg',
  //  name: 'Audition Mobile',
  //  banner: '../../assets/uploads/Description_2019_09_02_09_00_4875.jpg',
  //  description: 'description',
  //  prices: [
  //    {name: '50000', value: 600, isUpdating: false},
  //    {name: '100000', value: 1300, isUpdating: false},
  //    {name: '200000', value: 2800, isUpdating: false},
  //    {name: '500000', value: 6000, isUpdating: false},
  //    {name: '1000000', value: 15000, isUpdating: false}
  //  ],
  //  friendlyName: 'audition-mobile'
  //},
];
//

export const NEWS: NewsModel[] = [
  {
    id: 1,
    logo: '../../assets/images/img_01.jpg',
    name: 'MAECENAS DEVELOPERS',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news1',
    typeId: 1
  },
  {
    id: 2,
    logo: '"../../assets/images/img_01.jpg',
    name: ' SPEAK OUT ON \'DEATH MARCH\' CRUNCH',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news2',
    typeId: 1
  },
  {
    id: 3,
    logo: '../../assets/uploads/Logo_2019_09_02_08_58_1156.jpg',
    name: 'Viet Nam vuot qua vong loai world cup',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news3',
    typeId: 1
  },
  {
    id: 4,
    logo: '../../assets/uploads/Logo_2019_09_02_08_31_4460.jpg',
    name: 'Nguyen Trong Khoi sap lay vo sau khi yeu don phuong 1 nguoi khong yeu minh 5 nam',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news4',
    typeId: 1
  },
  {
    id: 5,
    logo: '../../assets/uploads/Logo_2019_09_02_08_26_3042.jpg',
    name: 'Lam mmo chac luong cao lam',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news5',
    typeId: 1
  },
  {
    id: 6,
    logo: '../../assets/images/img_01.jpg',
    name: 'Nho duoi doc nha ta la ai rua man?',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news6',
    typeId: 1
  },
  {
    id: 7,
    logo: '"../../assets/images/img_01.jpg',
    name: ' Co gia su day kem tieng anh dinh ghe bay =)))',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news7',
    typeId: 1
  },
  {
    id: 8,
    logo: '../../assets/uploads/Logo_2019_09_02_08_58_1156.jpg',
    name: 'Cuoi lien tay di ban eiiiii',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news3',
    typeId: 1
  },
  {
    id: 9,
    logo: '../../assets/uploads/Logo_2019_09_02_08_31_4460.jpg',
    name: 'Nguyen Thi Le Vi la ai vay man?',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news4',
    typeId: 1
  },
  {
    id: 10,
    logo: '../../assets/uploads/Logo_2019_09_02_08_26_3042.jpg',
    name: 'Tinh khi nao cuoi man?',
    description: 'asdsd&#160;&#160;<div>' +
      '<img src=../../assets/uploads/Description_2019_09_02_09_00_4875.jpg />' +
      '</div><div><br></div><div>test test test&#160;</div>' +
      '<div><img src=../../assets/uploads/Description_2019_09_02_09_00_4841.jpg /><br><div><br></div></div>',
    dateCreated: '21:09 Sep, 02 2019',
    friendlyName: 'news5',
    typeId: 1
  },
];
