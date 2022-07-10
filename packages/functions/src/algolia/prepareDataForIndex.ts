import { IDocument, IImage, IVideo, IVimeoVideo } from '../../../src/lib/interfaces';

export async function prepareDataForIndex(
  data: IDocument | IImage | IVideo
): Promise<Partial<IDocument | IImage | IVideo>> {
  const dataForIndex: Partial<IDocument | IImage | (IVideo & IVimeoVideo)> = {};

  for (const key of [
    'bookIds',
    'chapterIds',
    'verseIds',
    'title',
    'description',
    'gcs',
    'genre',
    'credit',
    'subject',
    'author',
    'secondAuthor',
    'yearWritten',
    'location',
    'type',
    'createdBy',
    'updatedBy',
  ]) {
    //@ts-ignore
    if (data[key]) {
      //@ts-ignore
      dataForIndex[key] = data[key];
    }
  }

  dataForIndex.published = data.published ? true : false;

  if (data.createdAt) {
    // @ts-ignore
    dataForIndex.createdAt = data.createdAt._seconds;
  }
  if (data.updatedAt) {
    // @ts-ignore
    dataForIndex.updatedAt = data.updatedAt._seconds;
  }

  if (data.type === 'document' && dataForIndex.type === 'document') {
    dataForIndex.stringifiedSections = '';
    data.sections.forEach((currentSection) => {
      if (currentSection.contentType === 'text') {
        const htmlRemovedText = currentSection.text
          .replace(/(<([^>]+)>)/gi, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/\s\s+/g, ' ');
        //@ts-ignore // typescript bug ignoring type guard inside forEach statement
        dataForIndex.stringifiedSections += htmlRemovedText + ' ';
      }
    });

    const stringifiedData = JSON.stringify(dataForIndex);
    const kbLimit = 9.5;
    const characterSpaceRemaining = kbLimit * 1000 - stringifiedData.length;
    if (characterSpaceRemaining /*?*/ < 0) {
      dataForIndex.stringifiedSections = dataForIndex.stringifiedSections.slice(
        0,
        characterSpaceRemaining
      );
    }
    dataForIndex.stringifiedSections = dataForIndex.stringifiedSections.trim();
  }

  if (data.type === 'video' && dataForIndex.type === 'video') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fetch = require('node-fetch');
    const url = `https://api.vimeo.com/videos/${data.id}`;
    const vimeoUnauthenticatedAccessToken = 'e9ef80e65a1a6b16b33d9bf80a66c2e2';
    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${vimeoUnauthenticatedAccessToken}`,
      },
    });
    const vimeoVideoData = (await response.json()) as IVimeoVideo;
    if (vimeoVideoData.name) {
      dataForIndex.title = vimeoVideoData.name;
      dataForIndex.duration = vimeoVideoData.duration;
      dataForIndex.thumbnail = vimeoVideoData.pictures.sizes[1].link.replace('?r=pad', '');

      if (vimeoVideoData.description) {
        dataForIndex.description = vimeoVideoData.description.replace(/Subscribe[\S\s]*/, '');
      }
    }
  }

  return dataForIndex;
}
