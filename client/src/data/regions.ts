// 国家和城市数据

export interface City {
  name: string;
  nameEn: string;
}

export interface State {
  name: string;
  nameEn: string;
  cities: City[];
}

export interface Country {
  code: string;
  name: string;
  nameEn: string;
  hotCities?: City[]; // 热门城市（英国、美国、加拿大有）
  cities?: City[]; // 平铺城市列表（英国、澳洲、新加坡使用）
  states?: State[]; // 州/省分组（美国、加拿大使用）
}

// 英国数据
const ukHotCities: City[] = [
  { name: '伦敦', nameEn: 'London' },
  { name: '布里斯托', nameEn: 'Bristol' },
  { name: '格拉斯哥', nameEn: 'Glasgow' },
  { name: '曼彻斯特', nameEn: 'Manchester' },
  { name: '伯明翰', nameEn: 'Birmingham' },
  { name: '杜伦', nameEn: 'Durham' },
  { name: '爱丁堡', nameEn: 'Edinburgh' },
  { name: '南安普敦', nameEn: 'Southampton' },
  { name: '利兹', nameEn: 'Leeds' },
  { name: '卡迪夫', nameEn: 'Cardiff' },
];

const ukAllCities: City[] = [
  { name: '爱丁堡', nameEn: 'Edinburgh' },
  { name: '埃克塞特', nameEn: 'Exeter' },
  { name: '埃格姆', nameEn: 'Egham' },
  { name: '阿伯丁', nameEn: 'Aberdeen' },
  { name: '伯明翰', nameEn: 'Birmingham' },
  { name: '布里斯托', nameEn: 'Bristol' },
  { name: '伯恩茅斯', nameEn: 'Bournemouth' },
  { name: '北安普敦', nameEn: 'Northampton' },
  { name: '巴斯', nameEn: 'Bath' },
  { name: '布拉德福德', nameEn: 'Bradford' },
  { name: '布莱顿与霍夫', nameEn: 'Brighton and Hove' },
  { name: '班戈', nameEn: 'Bangor' },
  { name: '贝尔法斯特', nameEn: 'Belfast' },
  { name: '邓迪', nameEn: 'Dundee' },
  { name: '杜伦', nameEn: 'Durham' },
  { name: '德比', nameEn: 'Derby' },
  { name: '格拉斯哥', nameEn: 'Glasgow' },
  { name: '哈德斯菲尔德', nameEn: 'Huddersfield' },
  { name: '哈罗盖特', nameEn: 'Harrogate' },
  { name: '哈特菲尔德', nameEn: 'Hatfield' },
  { name: '赫尔', nameEn: 'Hull' },
  { name: '剑桥', nameEn: 'Cambridge' },
  { name: '吉尔福德', nameEn: 'Guildford' },
  { name: '金斯顿', nameEn: 'Kingston' },
  { name: '卡迪夫', nameEn: 'Cardiff' },
  { name: '考文垂', nameEn: 'Coventry' },
  { name: '坎特伯雷', nameEn: 'Canterbury' },
  { name: '科尔切斯特', nameEn: 'Colchester' },
  { name: '伦敦', nameEn: 'London' },
  { name: '利物浦', nameEn: 'Liverpool' },
  { name: '利兹', nameEn: 'Leeds' },
  { name: '莱斯特', nameEn: 'Leicester' },
  { name: '拉夫堡', nameEn: 'Loughborough' },
  { name: '兰卡斯特', nameEn: 'Lancaster' },
  { name: '雷丁', nameEn: 'Reading' },
  { name: '林肯', nameEn: 'Lincoln' },
  { name: '雷克斯汉姆', nameEn: 'Wrexham' },
  { name: '曼彻斯特', nameEn: 'Manchester' },
  { name: '米德尔斯堡', nameEn: 'Middlesbrough' },
  { name: '诺丁汉', nameEn: 'Nottingham' },
  { name: '南安普敦', nameEn: 'Southampton' },
  { name: '纽卡斯尔', nameEn: 'Newcastle' },
  { name: '牛津', nameEn: 'Oxford' },
  { name: '诺里奇', nameEn: 'Norwich' },
  { name: '普雷斯顿', nameEn: 'Preston' },
  { name: '普利茅斯', nameEn: 'Plymouth' },
  { name: '朴茨茅斯', nameEn: 'Portsmouth' },
  { name: '切斯特', nameEn: 'Chester' },
  { name: '圣安德鲁斯', nameEn: 'St Andrews' },
  { name: '斯旺西', nameEn: 'Swansea' },
  { name: '斯特林', nameEn: 'Stirling' },
  { name: '桑德兰', nameEn: 'Sunderland' },
  { name: '索尔福德', nameEn: 'Salford' },
  { name: '斯托克', nameEn: 'Stoke' },
  { name: '伍尔弗汉普顿', nameEn: 'Wolverhampton' },
  { name: '温彻斯特', nameEn: 'Winchester' },
  { name: '谢菲尔德', nameEn: 'Sheffield' },
  { name: '约克', nameEn: 'York' },
  { name: '伊普斯维奇', nameEn: 'Ipswich' },
];

// 美国数据（补全所有主要留学州和城市）
const usHotCities: City[] = [
  { name: '纽约', nameEn: 'New York' },
  { name: '洛杉矶', nameEn: 'Los Angeles' },
  { name: '波士顿', nameEn: 'Boston' },
  { name: '芝加哥', nameEn: 'Chicago' },
  { name: '香槟', nameEn: 'Champaign' },
  { name: '费城', nameEn: 'Philadelphia' },
  { name: '华盛顿特区', nameEn: 'Washington D.C.' },
  { name: '伯克利', nameEn: 'Berkeley' },
  { name: '戴维斯', nameEn: 'Davis' },
  { name: '旧金山', nameEn: 'San Francisco' },
];

const usStates: State[] = [
  {
    name: '阿拉巴马州',
    nameEn: 'Alabama',
    cities: [
      { name: '伯明翰', nameEn: 'Birmingham' },
      { name: '蒙哥马利', nameEn: 'Montgomery' },
      { name: '塔斯卡卢萨', nameEn: 'Tuscaloosa' },
    ],
  },
  {
    name: '阿拉斯加州',
    nameEn: 'Alaska',
    cities: [
      { name: '安克雷奇', nameEn: 'Anchorage' },
      { name: '费尔班克斯', nameEn: 'Fairbanks' },
    ],
  },
  {
    name: '亚利桑那州',
    nameEn: 'Arizona',
    cities: [
      { name: '凤凰城', nameEn: 'Phoenix' },
      { name: '图森', nameEn: 'Tucson' },
      { name: '坦佩', nameEn: 'Tempe' },
    ],
  },
  {
    name: '阿肯色州',
    nameEn: 'Arkansas',
    cities: [
      { name: '小石城', nameEn: 'Little Rock' },
      { name: '费耶特维尔', nameEn: 'Fayetteville' },
    ],
  },
  {
    name: '加利福尼亚州',
    nameEn: 'California',
    cities: [
      { name: '伯克利', nameEn: 'Berkeley' },
      { name: '戴维斯', nameEn: 'Davis' },
      { name: '尔湾', nameEn: 'Irvine' },
      { name: '河滨', nameEn: 'Riverside' },
      { name: '旧金山', nameEn: 'San Francisco' },
      { name: '洛杉矶', nameEn: 'Los Angeles' },
      { name: '圣地亚哥', nameEn: 'San Diego' },
      { name: '圣何塞', nameEn: 'San Jose' },
      { name: '圣巴巴拉', nameEn: 'Santa Barbara' },
      { name: '帕萨迪纳', nameEn: 'Pasadena' },
      { name: '圣克拉拉', nameEn: 'Santa Clara' },
    ],
  },
  {
    name: '科罗拉多州',
    nameEn: 'Colorado',
    cities: [
      { name: '丹佛', nameEn: 'Denver' },
      { name: '博尔德', nameEn: 'Boulder' },
      { name: '柯林斯堡', nameEn: 'Fort Collins' },
    ],
  },
  {
    name: '康涅狄格州',
    nameEn: 'Connecticut',
    cities: [
      { name: '纽黑文', nameEn: 'New Haven' },
      { name: '哈特福德', nameEn: 'Hartford' },
      { name: '斯坦福', nameEn: 'Stamford' },
    ],
  },
  {
    name: '特拉华州',
    nameEn: 'Delaware',
    cities: [
      { name: '威明顿', nameEn: 'Wilmington' },
      { name: '纽瓦克', nameEn: 'Newark' },
    ],
  },
  {
    name: '佛罗里达州',
    nameEn: 'Florida',
    cities: [
      { name: '迈阿密', nameEn: 'Miami' },
      { name: '奥兰多', nameEn: 'Orlando' },
      { name: '坦帕', nameEn: 'Tampa' },
      { name: '盖恩斯维尔', nameEn: 'Gainesville' },
      { name: '塔拉哈西', nameEn: 'Tallahassee' },
    ],
  },
  {
    name: '佐治亚州',
    nameEn: 'Georgia',
    cities: [
      { name: '亚特兰大', nameEn: 'Atlanta' },
      { name: '雅典', nameEn: 'Athens' },
      { name: '奥古斯塔', nameEn: 'Augusta' },
    ],
  },
  {
    name: '夏威夷州',
    nameEn: 'Hawaii',
    cities: [
      { name: '檀香山', nameEn: 'Honolulu' },
    ],
  },
  {
    name: '爱达荷州',
    nameEn: 'Idaho',
    cities: [
      { name: '博伊西', nameEn: 'Boise' },
      { name: '莫斯科', nameEn: 'Moscow' },
    ],
  },
  {
    name: '伊利诺伊州',
    nameEn: 'Illinois',
    cities: [
      { name: '芝加哥', nameEn: 'Chicago' },
      { name: '香槟', nameEn: 'Champaign' },
      { name: '埃文斯顿', nameEn: 'Evanston' },
    ],
  },
  {
    name: '印第安纳州',
    nameEn: 'Indiana',
    cities: [
      { name: '印第安纳波利斯', nameEn: 'Indianapolis' },
      { name: '布卢明顿', nameEn: 'Bloomington' },
      { name: '西拉法叶', nameEn: 'West Lafayette' },
    ],
  },
  {
    name: '爱荷华州',
    nameEn: 'Iowa',
    cities: [
      { name: '得梅因', nameEn: 'Des Moines' },
      { name: '爱荷华城', nameEn: 'Iowa City' },
      { name: '艾姆斯', nameEn: 'Ames' },
    ],
  },
  {
    name: '堪萨斯州',
    nameEn: 'Kansas',
    cities: [
      { name: '劳伦斯', nameEn: 'Lawrence' },
      { name: '威奇托', nameEn: 'Wichita' },
    ],
  },
  {
    name: '肯塔基州',
    nameEn: 'Kentucky',
    cities: [
      { name: '路易斯维尔', nameEn: 'Louisville' },
      { name: '列克星敦', nameEn: 'Lexington' },
    ],
  },
  {
    name: '路易斯安那州',
    nameEn: 'Louisiana',
    cities: [
      { name: '新奥尔良', nameEn: 'New Orleans' },
      { name: '巴吞鲁日', nameEn: 'Baton Rouge' },
    ],
  },
  {
    name: '缅因州',
    nameEn: 'Maine',
    cities: [
      { name: '波特兰', nameEn: 'Portland' },
      { name: '奥罗诺', nameEn: 'Orono' },
    ],
  },
  {
    name: '马里兰州',
    nameEn: 'Maryland',
    cities: [
      { name: '巴尔的摩', nameEn: 'Baltimore' },
      { name: '大学公园', nameEn: 'College Park' },
    ],
  },
  {
    name: '马萨诸塞州',
    nameEn: 'Massachusetts',
    cities: [
      { name: '波士顿', nameEn: 'Boston' },
      { name: '剑桥', nameEn: 'Cambridge' },
      { name: '伍斯特', nameEn: 'Worcester' },
      { name: '阿默斯特', nameEn: 'Amherst' },
    ],
  },
  {
    name: '密歇根州',
    nameEn: 'Michigan',
    cities: [
      { name: '底特律', nameEn: 'Detroit' },
      { name: '安娜堡', nameEn: 'Ann Arbor' },
      { name: '东兰辛', nameEn: 'East Lansing' },
    ],
  },
  {
    name: '明尼苏达州',
    nameEn: 'Minnesota',
    cities: [
      { name: '明尼阿波利斯', nameEn: 'Minneapolis' },
      { name: '圣保罗', nameEn: 'St. Paul' },
    ],
  },
  {
    name: '密西西比州',
    nameEn: 'Mississippi',
    cities: [
      { name: '杰克逊', nameEn: 'Jackson' },
      { name: '牛津', nameEn: 'Oxford' },
    ],
  },
  {
    name: '密苏里州',
    nameEn: 'Missouri',
    cities: [
      { name: '圣路易斯', nameEn: 'St. Louis' },
      { name: '堪萨斯城', nameEn: 'Kansas City' },
      { name: '哥伦比亚', nameEn: 'Columbia' },
    ],
  },
  {
    name: '蒙大拿州',
    nameEn: 'Montana',
    cities: [
      { name: '比灵斯', nameEn: 'Billings' },
      { name: '米苏拉', nameEn: 'Missoula' },
    ],
  },
  {
    name: '内布拉斯加州',
    nameEn: 'Nebraska',
    cities: [
      { name: '奥马哈', nameEn: 'Omaha' },
      { name: '林肯', nameEn: 'Lincoln' },
    ],
  },
  {
    name: '内华达州',
    nameEn: 'Nevada',
    cities: [
      { name: '拉斯维加斯', nameEn: 'Las Vegas' },
      { name: '里诺', nameEn: 'Reno' },
    ],
  },
  {
    name: '新罕布什尔州',
    nameEn: 'New Hampshire',
    cities: [
      { name: '曼彻斯特', nameEn: 'Manchester' },
      { name: '达勒姆', nameEn: 'Durham' },
    ],
  },
  {
    name: '新泽西州',
    nameEn: 'New Jersey',
    cities: [
      { name: '纽瓦克', nameEn: 'Newark' },
      { name: '新不伦瑞克', nameEn: 'New Brunswick' },
      { name: '普林斯顿', nameEn: 'Princeton' },
    ],
  },
  {
    name: '新墨西哥州',
    nameEn: 'New Mexico',
    cities: [
      { name: '阿尔伯克基', nameEn: 'Albuquerque' },
      { name: '圣菲', nameEn: 'Santa Fe' },
    ],
  },
  {
    name: '纽约州',
    nameEn: 'New York',
    cities: [
      { name: '纽约', nameEn: 'New York' },
      { name: '布法罗', nameEn: 'Buffalo' },
      { name: '罗切斯特', nameEn: 'Rochester' },
      { name: '锡拉丘兹', nameEn: 'Syracuse' },
      { name: '伊萨卡', nameEn: 'Ithaca' },
    ],
  },
  {
    name: '北卡罗来纳州',
    nameEn: 'North Carolina',
    cities: [
      { name: '夏洛特', nameEn: 'Charlotte' },
      { name: '罗利', nameEn: 'Raleigh' },
      { name: '达勒姆', nameEn: 'Durham' },
      { name: '教堂山', nameEn: 'Chapel Hill' },
    ],
  },
  {
    name: '北达科他州',
    nameEn: 'North Dakota',
    cities: [
      { name: '法戈', nameEn: 'Fargo' },
      { name: '大福克斯', nameEn: 'Grand Forks' },
    ],
  },
  {
    name: '俄亥俄州',
    nameEn: 'Ohio',
    cities: [
      { name: '哥伦布', nameEn: 'Columbus' },
      { name: '克利夫兰', nameEn: 'Cleveland' },
      { name: '辛辛那提', nameEn: 'Cincinnati' },
      { name: '代顿', nameEn: 'Dayton' },
    ],
  },
  {
    name: '俄克拉何马州',
    nameEn: 'Oklahoma',
    cities: [
      { name: '俄克拉何马城', nameEn: 'Oklahoma City' },
      { name: '诺曼', nameEn: 'Norman' },
      { name: '塔尔萨', nameEn: 'Tulsa' },
    ],
  },
  {
    name: '俄勒冈州',
    nameEn: 'Oregon',
    cities: [
      { name: '波特兰', nameEn: 'Portland' },
      { name: '尤金', nameEn: 'Eugene' },
      { name: '科瓦利斯', nameEn: 'Corvallis' },
    ],
  },
  {
    name: '宾夕法尼亚州',
    nameEn: 'Pennsylvania',
    cities: [
      { name: '费城', nameEn: 'Philadelphia' },
      { name: '匹兹堡', nameEn: 'Pittsburgh' },
      { name: '斯泰特科利奇', nameEn: 'State College' },
    ],
  },
  {
    name: '罗德岛州',
    nameEn: 'Rhode Island',
    cities: [
      { name: '普罗维登斯', nameEn: 'Providence' },
    ],
  },
  {
    name: '南卡罗来纳州',
    nameEn: 'South Carolina',
    cities: [
      { name: '哥伦比亚', nameEn: 'Columbia' },
      { name: '查尔斯顿', nameEn: 'Charleston' },
      { name: '克莱姆森', nameEn: 'Clemson' },
    ],
  },
  {
    name: '南达科他州',
    nameEn: 'South Dakota',
    cities: [
      { name: '苏福尔斯', nameEn: 'Sioux Falls' },
    ],
  },
  {
    name: '田纳西州',
    nameEn: 'Tennessee',
    cities: [
      { name: '纳什维尔', nameEn: 'Nashville' },
      { name: '孟菲斯', nameEn: 'Memphis' },
      { name: '诺克斯维尔', nameEn: 'Knoxville' },
    ],
  },
  {
    name: '德克萨斯州',
    nameEn: 'Texas',
    cities: [
      { name: '奥斯汀', nameEn: 'Austin' },
      { name: '达拉斯', nameEn: 'Dallas' },
      { name: '休斯敦', nameEn: 'Houston' },
      { name: '圣安东尼奥', nameEn: 'San Antonio' },
      { name: '大学城', nameEn: 'College Station' },
    ],
  },
  {
    name: '犹他州',
    nameEn: 'Utah',
    cities: [
      { name: '盐湖城', nameEn: 'Salt Lake City' },
      { name: '普罗沃', nameEn: 'Provo' },
    ],
  },
  {
    name: '佛蒙特州',
    nameEn: 'Vermont',
    cities: [
      { name: '伯灵顿', nameEn: 'Burlington' },
    ],
  },
  {
    name: '弗吉尼亚州',
    nameEn: 'Virginia',
    cities: [
      { name: '里士满', nameEn: 'Richmond' },
      { name: '夏洛茨维尔', nameEn: 'Charlottesville' },
      { name: '布莱克斯堡', nameEn: 'Blacksburg' },
    ],
  },
  {
    name: '华盛顿州',
    nameEn: 'Washington',
    cities: [
      { name: '西雅图', nameEn: 'Seattle' },
      { name: '斯波坎', nameEn: 'Spokane' },
      { name: '塔科马', nameEn: 'Tacoma' },
    ],
  },
  {
    name: '华盛顿特区',
    nameEn: 'Washington D.C.',
    cities: [
      { name: '华盛顿特区', nameEn: 'Washington D.C.' },
    ],
  },
  {
    name: '西弗吉尼亚州',
    nameEn: 'West Virginia',
    cities: [
      { name: '摩根敦', nameEn: 'Morgantown' },
    ],
  },
  {
    name: '威斯康星州',
    nameEn: 'Wisconsin',
    cities: [
      { name: '密尔沃基', nameEn: 'Milwaukee' },
      { name: '麦迪逊', nameEn: 'Madison' },
    ],
  },
  {
    name: '怀俄明州',
    nameEn: 'Wyoming',
    cities: [
      { name: '夏延', nameEn: 'Cheyenne' },
      { name: '拉勒米', nameEn: 'Laramie' },
    ],
  },
];

// 加拿大数据（主要留学城市）
const canadaHotCities: City[] = [
  { name: '多伦多', nameEn: 'Toronto' },
  { name: '温哥华', nameEn: 'Vancouver' },
  { name: '蒙特利尔', nameEn: 'Montreal' },
  { name: '渥太华', nameEn: 'Ottawa' },
  { name: '卡尔加里', nameEn: 'Calgary' },
  { name: '埃德蒙顿', nameEn: 'Edmonton' },
  { name: '滑铁卢', nameEn: 'Waterloo' },
  { name: '维多利亚', nameEn: 'Victoria' },
];

const canadaStates: State[] = [
  {
    name: '安大略省',
    nameEn: 'Ontario',
    cities: [
      { name: '多伦多', nameEn: 'Toronto' },
      { name: '渥太华', nameEn: 'Ottawa' },
      { name: '滑铁卢', nameEn: 'Waterloo' },
      { name: '伦敦', nameEn: 'London' },
      { name: '金斯顿', nameEn: 'Kingston' },
      { name: '汉密尔顿', nameEn: 'Hamilton' },
    ],
  },
  {
    name: '不列颠哥伦比亚省',
    nameEn: 'British Columbia',
    cities: [
      { name: '温哥华', nameEn: 'Vancouver' },
      { name: '维多利亚', nameEn: 'Victoria' },
      { name: '本拿比', nameEn: 'Burnaby' },
    ],
  },
  {
    name: '魁北克省',
    nameEn: 'Quebec',
    cities: [
      { name: '蒙特利尔', nameEn: 'Montreal' },
      { name: '魁北克市', nameEn: 'Quebec City' },
    ],
  },
  {
    name: '艾伯塔省',
    nameEn: 'Alberta',
    cities: [
      { name: '卡尔加里', nameEn: 'Calgary' },
      { name: '埃德蒙顿', nameEn: 'Edmonton' },
    ],
  },
];

// 澳洲数据
const australiaCities: City[] = [
  { name: '阿德莱德', nameEn: 'Adelaide' },
  { name: '布里斯班', nameEn: 'Brisbane' },
  { name: '珀斯', nameEn: 'Perth' },
  { name: '黄金海岸', nameEn: 'Gold Coast' },
  { name: '堪培拉', nameEn: 'Canberra' },
  { name: '墨尔本', nameEn: 'Melbourne' },
  { name: '悉尼', nameEn: 'Sydney' },
];

// 新加坡数据
const singaporeCities: City[] = [
  { name: '新加坡', nameEn: 'Singapore' },
];

// 导出所有国家数据
export const countries: Country[] = [
  {
    code: 'UK',
    name: '英国',
    nameEn: 'United Kingdom',
    hotCities: ukHotCities,
    cities: ukAllCities,
  },
  {
    code: 'US',
    name: '美国',
    nameEn: 'United States',
    hotCities: usHotCities,
    states: usStates,
  },
  {
    code: 'CA',
    name: '加拿大',
    nameEn: 'Canada',
    hotCities: canadaHotCities,
    states: canadaStates,
  },
  {
    code: 'AU',
    name: '澳洲',
    nameEn: 'Australia',
    cities: australiaCities,
  },
  {
    code: 'SG',
    name: '新加坡',
    nameEn: 'Singapore',
    cities: singaporeCities,
  },
];
