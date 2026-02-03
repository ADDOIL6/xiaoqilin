// 国家和地区筛选数据结构

export interface Location {
  id: string;
  name: string;
  nameEn: string;
}

export interface Country {
  id: string;
  name: string;
  nameEn: string;
  hotCities: Location[];
  allCities: Location[];
}

// 英国城市数据
const ukHotCities: Location[] = [
  { id: 'london', name: '伦敦', nameEn: 'London' },
  { id: 'bristol', name: '布里斯托', nameEn: 'Bristol' },
  { id: 'glasgow', name: '格拉斯哥', nameEn: 'Glasgow' },
  { id: 'manchester', name: '曼彻斯特', nameEn: 'Manchester' },
  { id: 'birmingham', name: '伯明翰', nameEn: 'Birmingham' },
  { id: 'durham', name: '杜伦', nameEn: 'Durham' },
  { id: 'edinburgh', name: '爱丁堡', nameEn: 'Edinburgh' },
  { id: 'southampton', name: '南安普敦', nameEn: 'Southampton' },
  { id: 'leeds', name: '利兹', nameEn: 'Leeds' },
  { id: 'cardiff', name: '卡迪夫', nameEn: 'Cardiff' },
];

const ukAllCities: Location[] = [
  ...ukHotCities,
  { id: 'aberdeen', name: '阿伯丁', nameEn: 'Aberdeen' },
  { id: 'bath', name: '巴斯', nameEn: 'Bath' },
  { id: 'belfast', name: '贝尔法斯特', nameEn: 'Belfast' },
  { id: 'bournemouth', name: '伯恩茅斯', nameEn: 'Bournemouth' },
  { id: 'bradford', name: '布拉德福德', nameEn: 'Bradford' },
  { id: 'brighton', name: '布莱顿', nameEn: 'Brighton' },
  { id: 'cambridge', name: '剑桥', nameEn: 'Cambridge' },
  { id: 'canterbury', name: '坎特伯雷', nameEn: 'Canterbury' },
  { id: 'chester', name: '切斯特', nameEn: 'Chester' },
  { id: 'coventry', name: '考文垂', nameEn: 'Coventry' },
  { id: 'derby', name: '德比', nameEn: 'Derby' },
  { id: 'dundee', name: '邓迪', nameEn: 'Dundee' },
  { id: 'exeter', name: '埃克塞特', nameEn: 'Exeter' },
  { id: 'guildford', name: '吉尔福德', nameEn: 'Guildford' },
  { id: 'hull', name: '赫尔', nameEn: 'Hull' },
  { id: 'lancaster', name: '兰卡斯特', nameEn: 'Lancaster' },
  { id: 'leicester', name: '莱斯特', nameEn: 'Leicester' },
  { id: 'liverpool', name: '利物浦', nameEn: 'Liverpool' },
  { id: 'loughborough', name: '拉夫堡', nameEn: 'Loughborough' },
  { id: 'newcastle', name: '纽卡斯尔', nameEn: 'Newcastle' },
  { id: 'northampton', name: '北安普敦', nameEn: 'Northampton' },
  { id: 'nottingham', name: '诺丁汉', nameEn: 'Nottingham' },
  { id: 'norwich', name: '诺里奇', nameEn: 'Norwich' },
  { id: 'oxford', name: '牛津', nameEn: 'Oxford' },
  { id: 'plymouth', name: '普利茅斯', nameEn: 'Plymouth' },
  { id: 'portsmouth', name: '朴茨茅斯', nameEn: 'Portsmouth' },
  { id: 'reading', name: '雷丁', nameEn: 'Reading' },
  { id: 'sheffield', name: '谢菲尔德', nameEn: 'Sheffield' },
  { id: 'stirling', name: '斯特林', nameEn: 'Stirling' },
  { id: 'sunderland', name: '桑德兰', nameEn: 'Sunderland' },
  { id: 'swansea', name: '斯旺西', nameEn: 'Swansea' },
  { id: 'york', name: '约克', nameEn: 'York' },
];

// 美国城市数据
const usHotCities: Location[] = [
  { id: 'new-york', name: '纽约', nameEn: 'New York' },
  { id: 'los-angeles', name: '洛杉矶', nameEn: 'Los Angeles' },
  { id: 'boston', name: '波士顿', nameEn: 'Boston' },
  { id: 'chicago', name: '芝加哥', nameEn: 'Chicago' },
  { id: 'san-francisco', name: '旧金山', nameEn: 'San Francisco' },
  { id: 'seattle', name: '西雅图', nameEn: 'Seattle' },
  { id: 'washington-dc', name: '华盛顿', nameEn: 'Washington DC' },
  { id: 'philadelphia', name: '费城', nameEn: 'Philadelphia' },
  { id: 'san-diego', name: '圣地亚哥', nameEn: 'San Diego' },
  { id: 'austin', name: '奥斯汀', nameEn: 'Austin' },
];

const usAllCities: Location[] = [
  ...usHotCities,
  { id: 'atlanta', name: '亚特兰大', nameEn: 'Atlanta' },
  { id: 'baltimore', name: '巴尔的摩', nameEn: 'Baltimore' },
  { id: 'charlotte', name: '夏洛特', nameEn: 'Charlotte' },
  { id: 'dallas', name: '达拉斯', nameEn: 'Dallas' },
  { id: 'denver', name: '丹佛', nameEn: 'Denver' },
  { id: 'detroit', name: '底特律', nameEn: 'Detroit' },
  { id: 'houston', name: '休斯顿', nameEn: 'Houston' },
  { id: 'miami', name: '迈阿密', nameEn: 'Miami' },
  { id: 'minneapolis', name: '明尼阿波利斯', nameEn: 'Minneapolis' },
  { id: 'phoenix', name: '凤凰城', nameEn: 'Phoenix' },
  { id: 'pittsburgh', name: '匹兹堡', nameEn: 'Pittsburgh' },
  { id: 'portland', name: '波特兰', nameEn: 'Portland' },
  { id: 'raleigh', name: '罗利', nameEn: 'Raleigh' },
  { id: 'salt-lake-city', name: '盐湖城', nameEn: 'Salt Lake City' },
  { id: 'tampa', name: '坦帕', nameEn: 'Tampa' },
];

// 加拿大城市数据
const canadaHotCities: Location[] = [
  { id: 'toronto', name: '多伦多', nameEn: 'Toronto' },
  { id: 'vancouver', name: '温哥华', nameEn: 'Vancouver' },
  { id: 'montreal', name: '蒙特利尔', nameEn: 'Montreal' },
  { id: 'calgary', name: '卡尔加里', nameEn: 'Calgary' },
  { id: 'ottawa', name: '渥太华', nameEn: 'Ottawa' },
  { id: 'edmonton', name: '埃德蒙顿', nameEn: 'Edmonton' },
  { id: 'quebec-city', name: '魁北克市', nameEn: 'Quebec City' },
  { id: 'winnipeg', name: '温尼伯', nameEn: 'Winnipeg' },
  { id: 'hamilton', name: '汉密尔顿', nameEn: 'Hamilton' },
  { id: 'kitchener-waterloo', name: '基奇纳-滑铁卢', nameEn: 'Kitchener-Waterloo' },
];

const canadaAllCities: Location[] = [
  ...canadaHotCities,
  { id: 'halifax', name: '哈利法克斯', nameEn: 'Halifax' },
  { id: 'london-on', name: '伦敦', nameEn: 'London' },
  { id: 'markham', name: '万锦', nameEn: 'Markham' },
  { id: 'mississauga', name: '密西沙加', nameEn: 'Mississauga' },
  { id: 'regina', name: '里贾纳', nameEn: 'Regina' },
  { id: 'saskatoon', name: '萨斯卡通', nameEn: 'Saskatoon' },
  { id: 'st-johns', name: '圣约翰斯', nameEn: "St. John's" },
  { id: 'victoria', name: '维多利亚', nameEn: 'Victoria' },
  { id: 'windsor', name: '温莎', nameEn: 'Windsor' },
];

// 澳大利亚城市数据
const australiaHotCities: Location[] = [
  { id: 'sydney', name: '悉尼', nameEn: 'Sydney' },
  { id: 'melbourne', name: '墨尔本', nameEn: 'Melbourne' },
  { id: 'brisbane', name: '布里斯班', nameEn: 'Brisbane' },
  { id: 'perth', name: '珀斯', nameEn: 'Perth' },
  { id: 'adelaide', name: '阿德莱德', nameEn: 'Adelaide' },
  { id: 'gold-coast', name: '黄金海岸', nameEn: 'Gold Coast' },
  { id: 'canberra', name: '堪培拉', nameEn: 'Canberra' },
  { id: 'hobart', name: '霍巴特', nameEn: 'Hobart' },
];

const australiaAllCities: Location[] = [...australiaHotCities];

// 新加坡（只有一个城市）
const singaporeCities: Location[] = [
  { id: 'singapore', name: '新加坡', nameEn: 'Singapore' },
];

// 国家数据
export const countries: Country[] = [
  {
    id: 'uk',
    name: '英国',
    nameEn: 'United Kingdom',
    hotCities: ukHotCities,
    allCities: ukAllCities,
  },
  {
    id: 'us',
    name: '美国',
    nameEn: 'United States',
    hotCities: usHotCities,
    allCities: usAllCities,
  },
  {
    id: 'canada',
    name: '加拿大',
    nameEn: 'Canada',
    hotCities: canadaHotCities,
    allCities: canadaAllCities,
  },
  {
    id: 'australia',
    name: '澳大利亚',
    nameEn: 'Australia',
    hotCities: australiaHotCities,
    allCities: australiaAllCities,
  },
  {
    id: 'singapore',
    name: '新加坡',
    nameEn: 'Singapore',
    hotCities: singaporeCities,
    allCities: singaporeCities,
  },
];

// 辅助函数：根据ID查找城市
export function findCityById(cityId: string): Location | undefined {
  for (const country of countries) {
    const city = country.allCities.find(c => c.id === cityId);
    if (city) return city;
  }
  return undefined;
}

// 辅助函数：根据ID查找国家
export function findCountryById(countryId: string): Country | undefined {
  return countries.find(c => c.id === countryId);
}
