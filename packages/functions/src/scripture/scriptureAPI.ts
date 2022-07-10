import * as functions from 'firebase-functions';
// import chapter from "./data/cuv/1JN/1.json";

export default async (data: any, context: functions.https.CallableContext) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const chapter = require(`./data/cuv/${data.bookId}/${data.chapter}.json`);
  // const chapter = JSON.parse(
  //     fs.readFileSync('data/cuv/1JN.json', 'utf-8')
  // );
  console.log(chapter);

  console.log(data.version);
  if (data.verse) {
    return `${data.bookId}.${data.chapter}.${data.verse}`;
  } else {
    return `${data.bookId}.${data.chapter}`;
  }
};
