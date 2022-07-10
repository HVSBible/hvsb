import fs from 'fs';
const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const bibles = JSON.parse(data);
  const biblesDataArray = bibles['data'] as IBibleData[];

  const bibleIdsArray: Partial<IBibleData>[] = [];

  biblesDataArray.forEach((bibleData) => {
    const bible = {
      id: bibleData.id,
      name: bibleData.name,
    };
    bibleIdsArray.push(bible);
  });

  fs.writeFile(
    'scripts/bibles/extracted_Bible_IDs2.json',
    JSON.stringify(bibleIdsArray),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved.');
    }
  );
});

interface IBibleData {
  id: string;
  dblId: string;
  relatedDbl?: any;
  name: string;
  nameLocal: string;
  abbreviation: string;
  abbreviationLocal: string;
  description: string;
  descriptionLocal: string;
  language: Language;
  countries: Country[];
  type: string;
  audioBibles: any[];
}

interface Language {
  id: string;
  name: string;
  nameLocal: string;
  script: string;
  scriptDirection: string;
}

interface Country {
  id: string;
  name: string;
  nameLocal: string;
}
