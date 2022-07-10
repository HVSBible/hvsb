export async function getBibleName(version: string): Promise<string> {
  const matchingBible = bibles.find((bible) => {
    return bible.abbreviation === version;
  });
  if (matchingBible) {
    return matchingBible.name;
  } else {
    throw new Error('Not a valid Bible version');
  }
}

export interface IBible {
  name: string;
  abbreviation: string;
  id: string;
  supported?: boolean;
}

export const bibles: IBible[] = [
  {
    id: '9879dbb7cfe39e4d-04',
    abbreviation: 'WEB',
    name: 'World English Bible (Protestant)',
    supported: true,
  },
  {
    id: '25210406001d9aae-01',
    abbreviation: 'TRW',
    name: 'Tongan Revised West Translation',
    supported: true,
  },
  {
    id: '9879dbb7cfe39e4d-01',
    abbreviation: 'WEBE',
    name: 'World English Bible (Ecumenical)',
  },
  {
    id: '9879dbb7cfe39e4d-02',
    abbreviation: 'WEBC',
    name: 'World English Bible (Catholic)',
  },
  {
    id: '9879dbb7cfe39e4d-03',
    abbreviation: 'WEBO',
    name: 'World English Bible (Orthodox)',
  },
  {
    id: '179568874c45066f-01',
    abbreviation: 'DRA',
    name: 'Douay-Rheims, American 1899',
  },
  {
    //     'id': 'de4e12af7f28f599-01',
    //     'name': 'King James Version (Ecumenical)'
    // }, {
    id: 'de4e12af7f28f599-02',
    abbreviation: 'KJV',
    name: 'King James Version', // Protestant
  },
  {
    id: 'c315fa9f71d4af3a-01',
    abbreviation: 'GNVA',
    name: 'Geneva Bible',
  },
  {
    id: '06125adad2d5898a-01',
    abbreviation: 'ASV',
    name: 'American Standard Version',
  },
  {
    id: '0bc8836afa7427fa-01',
    abbreviation: 'TFT',
    name: 'Translation for Translators',
  },
  {
    //     'id': '40072c4a5aba4022-01',
    //     'name': 'Revised Version 1885'
    // }, {
    //     'id': '65eec8e0b60e656b-01',
    //     'name': 'Free Bible Version New Testament with Psalms'
    // }, {
    //     'id': 'bf8f1c7f3f9045a5-01',
    //     'name': 'JPS TaNaKH 1917'
    // }, {
    //     'id': '7142879509583d59-01',
    //     'name': 'World English Bible British Edition'
    // }, {
    //     'id': '7142879509583d59-02',
    //     'name': 'World English Bible British Edition'
    // }, {
    //     'id': '7142879509583d59-03',
    //     'name': 'World English Bible British Edition'
    // }, {
    //     'id': '7142879509583d59-04',
    //     'name': 'World English Bible British Edition'
    // }, {
    //     'id': 'f72b840c855f362c-04',
    //     'name': 'World Messianic Bible'
    // }, {
    //     'id': '04da588535d2f823-04',
    //     'name': 'World Messianic Bible British Edition'
    // }, {
    id: 'b7ad344da9c39262-01',
    abbreviation: 'ARP',
    name: 'Arapaho Luke',
  },
  {
    id: '34690fafc7ffd7d4-02',
    abbreviation: 'ASIRV',
    name: 'Assamese Indian Revised Version Bible',
  },
  {
    id: '34690fafc7ffd7d4-01',
    abbreviation: 'ASNT',
    name: 'Assamese New Testament',
  },
  {
    id: '17c44f6c89de00db-01',
    abbreviation: 'BLRNT',
    name: 'Belarusian New Testament and Proverbs',
  },
  {
    id: 'b52bc8b7af3bdc6f-03',
    abbreviation: 'BLR',
    name: 'Belarusion Bible (V. Semukha translation)',
  },
  {
    id: '4338bcf7a310c65f-02',
    abbreviation: 'BGIRV',
    name: 'Bengali Indian Revised Version Bible',
  },
  {
    id: '4338bcf7a310c65f-01',
    abbreviation: 'BGNT',
    name: 'Bengali New Testament',
  },
  {
    id: '6855dabfcb711cc2-01',
    abbreviation: 'SIKBM',
    name: 'Siksika: Blackfoot Matthew',
  },
  {
    id: '71d2075d284c4eae-01',
    abbreviation: 'BGS',
    name: "Baga Sitemu: God's Holy Book",
  },
  {
    id: 'c61908161b077c4c-01',
    abbreviation: 'CKB',
    name: 'Czech Kralická Bible 1613',
  },
  {
    id: 'dca01eb41e39d25d-01',
    abbreviation: 'KWE',
    name: 'Kwere New Testament',
  },
  {
    id: '95410db44ef800c1-01',
    abbreviation: 'GUE',
    name: 'German Unrevised Elberfelder Bible',
  },
  {
    id: '542b32484b6e38c2-01',
    abbreviation: 'GERKW',
    name: 'The Holy Bible in German, Kautzsch und Weizsäcker 1906',
  },
  {
    id: 'e578524a0893c6b7-01',
    abbreviation: 'DAWNT',
    name: 'Dawro New Testament',
  },
  {
    id: '2ef4ad5622cfd98b-01',
    abbreviation: 'FRBS',
    name: 'French: Bible Segond 1910',
  },
  {
    id: '9b076bc0f1856204-01',
    abbreviation: 'PFJV',
    name: 'Pular Fuuta-Jallon Version',
  },
  {
    id: '977373b43b1f52ff-01',
    abbreviation: 'BMKNT',
    name: 'Borei: New Testament in Mborena Kam',
  },
  {
    //     'id': 'da905e46720432e2-01',
    //     'name': 'New Testament in Mborena Kam'
    // }, {
    id: 'e8b818f49c7c2835-01',
    abbreviation: 'KIRNT',
    name: 'Kire New Testament',
  },
  {
    id: '3548ab6114a312d4-02',
    abbreviation: 'GUJ',
    name: 'Gujarati Bible',
  },
  {
    //     'id': '3548ab6114a312d4-01',
    //     'name': 'Gujarati New Testament'
    // }, {
    id: '705aad6832c6e4d2-02',
    abbreviation: 'HIN',
    name: 'The Holy Bible in Hindi',
  },
  {
    id: '2dd568eeff29fb3c-01',
    abbreviation: 'TSI',
    name: 'Terjemahan Sederhana Indonesia',
  },
  {
    id: '41f25b97f468e10b-01',
    abbreviation: 'ITD',
    name: 'Italian: Diodati Bible',
  },
  {
    id: '27d398e76e8b43bf-02',
    abbreviation: 'KIRV',
    name: 'Kannada Indian Revised Version',
  },
  {
    //     'id': '27d398e76e8b43bf-01',
    //     'name': 'Kannada New Testament'
    // }, {
    id: 'f2f349d77ac8f8bc-01',
    abbreviation: 'KUTNT',
    name: 'Kutu New Testament',
  },
  {
    id: 'df7d5d71526afe9e-01',
    abbreviation: 'KAP',
    name: 'Kapingamarangi Bible',
  },
  {
    id: '5591cba5ae063228-01',
    abbreviation: 'MUMNT',
    name: 'Mum Language NT Portions',
  },
  {
    id: '6aa52b968434d882-01',
    abbreviation: 'KIBMK',
    name: 'Kianying Balang: The Book of Mark',
  },
  {
    id: '9f78f34aabe691c9-02',
    abbreviation: 'MLYIRV',
    name: 'Malayalam Indian Revised Version Bible',
  },
  {
    id: '9f78f34aabe691c9-01',
    abbreviation: 'MLYNT',
    name: 'Malayalam New Testament (BCS 2017)',
  },
  {
    id: 'f425394cc4a3cd5a-01',
    abbreviation: 'MRTIRV',
    name: 'Marathi Indian Revised Version Bible',
  },
  {
    id: '385573d4ba3ff72a-01',
    abbreviation: 'MAA',
    name: 'Maale Bible',
  },
  {
    id: 'bed82ba57f117c16-01',
    abbreviation: 'MAANT',
    name: 'Maale New Testament',
  },
  {
    id: 'abf017938be72f46-01',
    abbreviation: 'MOR',
    name: 'Morokodo',
  },
  {
    id: 'b5105cd03c972046-01',
    abbreviation: 'MAKNT',
    name: 'Makua New Testament',
  },
  {
    id: '4ffcec8e8f3c33e7-01',
    abbreviation: 'SKR',
    name: "God's Holy Book in Sankaran",
  },
  {
    id: '5e51f89e89947acb-01',
    abbreviation: 'ARUNT',
    name: 'Aruamu New Testament',
  },
  {
    id: 'cb0425ae772bb042-01',
    abbreviation: 'NDANT',
    name: 'Ndamba New Testament',
  },
  {
    id: '324f457845cb5d21-01',
    abbreviation: 'NGUNT',
    name: 'Nguu New Testament',
  },
  {
    id: '312df00520eac624-01',
    abbreviation: 'TAKNT',
    name: 'Takuu New Testament',
  },
  {
    id: '365f988242c307d2-02',
    abbreviation: 'ORIRV',
    name: 'Oria Indian Revised Version Bible',
  },
  {
    id: '365f988242c307d2-01',
    abbreviation: 'ORINT',
    name: 'Oriya New Testament',
  },
  {
    id: '7b929cf7aea665a3-02',
    abbreviation: 'EPNIRV',
    name: 'Eastern Punjabi Indian Revised Version Bible',
  },
  {
    id: '7b929cf7aea665a3-01',
    abbreviation: 'EPNT',
    name: 'Eastern Punjabi New Testament',
  },
  {
    id: '1c9761e0230da6e0-01',
    abbreviation: 'PUGB',
    name: 'Polish: Updated Gdansk Bible',
  },
  {
    id: '90799bb5b996fddc-01',
    abbreviation: 'TFTBP',
    name: 'Translation for Translators in Brasilian Portuguese',
  },
  {
    id: '355792a03079ccdd-01',
    abbreviation: 'POGNT',
    name: 'Pogoro New Testament',
  },
  {
    id: '33ac978af36830fa-01',
    abbreviation: 'ROMNT',
    name: 'Romani New Testament',
  },
  {
    id: '98d1c5bee401f80c-01',
    abbreviation: 'LUGNT',
    name: 'Lughulu New Testament',
  },
  {
    id: 'bb3df4b7c8587c77-01',
    abbreviation: 'SANNTA',
    name: 'Sanskrit Bible (NT) in Assamese Script (সত্যৱেদঃ।)',
  },
  {
    id: '8d1ad2c921d811c3-01',
    abbreviation: 'SANNTB',
    name: 'Sanskrit Bible (NT) in Bengali Script',
  },
  {
    id: '9449d4ad98193779-01',
    abbreviation: 'SANNTBU',
    name: 'Sanskrit Bible (NT) in Burmese Script (သတျဝေဒး၊)',
  },
  {
    id: '33b6449cacf22773-01',
    abbreviation: 'SANNTC',
    name: 'Sanskrit Bible (NT) in Cologne Script (satyavEdaH|)',
  },
  {
    id: 'e9ea572977b4f504-01',
    abbreviation: 'SANNTG',
    name: 'Sanskrit Bible (NT) in Gujarati Script (સત્યવેદઃ।)',
  },
  {
    id: '89007ccbb2eb5187-01',
    abbreviation: 'SANNTHK',
    name: 'Sanskrit Bible (NT) in Harvard-Kyoto Script (satyavedaH|)',
  },
  {
    id: '0b07fcef627a2db2-01',
    abbreviation: 'SANNTIAST',
    name: 'Sanskrit Bible (NT) in IAST Script (satyavedaḥ|)',
  },
  {
    id: 'd4599ff3c6b97f3a-01',
    abbreviation: 'SANNTISO',
    name: 'Sanskrit Bible (NT) in ISO Script (satyavēdaḥ|)',
  },
  {
    id: '6bc5ae3d6dd9009a-01',
    abbreviation: 'SANNTITRANS',
    name: 'Sanskrit Bible (NT) in ITRANS Script (satyavedaH|)',
  },
  {
    id: 'c1f49ed98a65a544-01',
    abbreviation: 'SANNTKA',
    name: 'Sanskrit Bible (NT) in Kannada Script (ಸತ್ಯವೇದಃ।)',
  },
  {
    id: '6bb8b0fa7aca67c6-01',
    abbreviation: 'SANNTKH',
    name: 'Sanskrit Bible (NT) in Khmer Script (សត្យវេទះ។)',
  },
  {
    id: '119375d97b57cf04-01',
    abbreviation: 'SANNTM',
    name: 'Sanskrit Bible (NT) in Malayalam Script (സത്യവേദഃ।)',
  },
  {
    id: '5a27fd2a2de187c8-01',
    abbreviation: 'SANNTO',
    name: 'Sanskrit Bible (NT) in Oriya Script (ସତ୍ୟୱେଦଃ।)',
  },
  {
    id: '07225eadadcb079a-01',
    abbreviation: 'SANNTP',
    name: 'Sanskrit Bible (NT) in Punjabi Script (ਸਤ੍ਯਵੇਦਃ।)',
  },
  {
    id: '2c2cf8df5a22a46e-01',
    abbreviation: 'SANNTS',
    name: 'Sanskrit Bible (NT) in Sinhala Script (සත්‍යවේදඃ।)',
  },
  {
    id: '143e0e03cf5b12ae-01',
    abbreviation: 'SANNTTA',
    name: 'Sanskrit Bible (NT) in Tamil Script (ஸத்யவேத³​:।)',
  },
  {
    id: 'aa146959e1d39b78-01',
    abbreviation: 'SANNTTE',
    name: 'Sanskrit Bible (NT) in Telugu Script (సత్యవేదః।)',
  },
  {
    id: '306d6ab1ca333a1e-01',
    abbreviation: 'SANNTTH',
    name: 'Sanskrit Bible (NT) in Thai Script (สตฺยเวท:ฯ)',
  },
  {
    id: '018ff00d7f55cbc1-01',
    abbreviation: 'SANNTTI',
    name: 'Sanskrit Bible (NT) in Tibetan Script (སཏྱཝེདཿ།)',
  },
  {
    id: '51b16e0b4b7c9825-01',
    abbreviation: 'SANNTU',
    name: 'Sanskrit Bible (NT) in Urdu Script (سَتْیَویدَح۔)',
  },
  {
    id: '9a875168ff4df1a3-01',
    abbreviation: 'SANNTV',
    name: 'Sanskrit Bible (NT) in Velthuis Script (satyaveda.h|)',
  },
  {
    id: 'e8b40ccabe793c0d-01',
    abbreviation: 'SANNTD',
    name: 'Sanskrit NT in Devanagari',
  },
  {
    id: '592420522e16049f-01',
    abbreviation: 'RVB',
    name: 'Reina Valera Bible 1909',
  },
  {
    id: '482ddd53705278cc-01',
    abbreviation: 'SPFNT',
    name: 'Spanish New Testament, Free Bible Version',
  },
  {
    id: '2a65010324d677b6-01',
    abbreviation: 'AKUP',
    name: 'Akukem Portions for DBL',
  },
  {
    id: '06995ce9cd23361b-01',
    abbreviation: 'SER',
    name: 'Serbian Bible',
  },
  {
    id: 'bbeb583cd75c6356-01',
    abbreviation: 'SUSU',
    name: 'Susu Bible',
  },
  {
    id: '2d5220a02a7aaac6-01',
    abbreviation: 'SUSUA',
    name: 'Susu Bible in Arabic Script',
  },
  {
    id: 'fa4317c59f0825e0-01',
    abbreviation: 'SWC',
    name: 'Swedish Core Bible',
  },
  {
    id: 'cd37ba0be852367d-02',
    abbreviation: 'TAMIRV',
    name: 'Tamil Indian Revised Version Bible',
  },
  {
    id: 'cd37ba0be852367d-01',
    abbreviation: 'TAMNT',
    name: 'Tamil New Testament',
  },
  {
    id: '8e3b1a957009c6ca-01',
    abbreviation: 'TAYNT',
    name: 'Tay New Testament',
  },
  {
    id: '85653c8847391b02-02',
    abbreviation: 'TELIRV',
    name: 'Telugu Indian Revised Version Bible',
  },
  {
    id: '85653c8847391b02-01',
    abbreviation: 'TELNT',
    name: 'Telugu New Testament',
  },
  {
    id: '2eb94132ad61ae75-01',
    abbreviation: 'THKJV',
    name: 'Thai KJV',
  },
  {
    id: '30cb581bcc911c45-01',
    abbreviation: 'TOMA',
    name: "God's Book in Toma",
  },
  {
    id: '5d73986246cb876f-01',
    abbreviation: 'URDUNT',
    name: 'Urdu New Testament (BCS 2017)',
  },
  {
    id: 'e01f11e9b4b8e338-01',
    abbreviation: 'SOBJL',
    name: 'Sob Jonah and Luke',
  },
  {
    id: '9a270e42b294fc37-01',
    abbreviation: 'VIDNT',
    name: 'Vidunda New Testament',
  },
  {
    id: 'afe8f67d8ba9025c-01',
    abbreviation: 'YAL',
    name: 'Yalunka Bible',
  },
  {
    id: '8a448a0135a6a70a-01',
    abbreviation: 'YAP',
    name: 'Yapese Bible',
  },
  {
    id: 'c9f3cf58d557a9f3-01',
    abbreviation: 'ZIG',
    name: 'Zigua New Testament',
  },
];
