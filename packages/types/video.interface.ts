import type { IMediaMetaData } from '.';

export interface IVideo extends IMediaMetaData {
  // use same id for Firestore and VIMEO to ensure videos aren't added twice

  // in search results, map 'name' field to 'title' to parallel documents and images
  thumbnail?: string; // for search results

  // ADD as needed
  // author?: string;
  // keywords?: string[];
  // description?: string;
  // location?: string;
  // yearRecorded?: number;
  // genre: VideoGenre;

  type: 'video';
}

// export enum VideoGenres {
//   passage = 'Passage Study',
//   topical = 'Topical Study',
//   artifact = 'Artifact',
//   site = 'Site Study',
//   scenery = 'Scenery & Landscape',
// }
// export type VideoGenre = keyof typeof VideoGenres;


export interface IVimeoVideo {
  uri: string;
  name: string;
  description: string;
  type: string;
  link: string;
  duration: number;
  width: number;
  language: string;
  height: number;
  embed: Embed;
  created_time: Date;
  modified_time: Date;
  release_time: Date;
  content_rating: string[];
  license?: any;
  privacy: Privacy;
  pictures: Pictures;
  tags: Tag[];
  stats: Stats;
  categories: any[];
  metadata: Metadata2;
  user: User;
  app: App;
  status: string;
  resource_key: string;
  upload?: any;
  transcode?: any;
  is_playable: boolean;
}

interface Live {
  streaming: boolean;
  archived: boolean;
}

interface StaffPick {
  normal: boolean;
  best_of_the_month: boolean;
  best_of_the_year: boolean;
  premiere: boolean;
}

interface Badges {
  hdr: boolean;
  live: Live;
  staff_pick: StaffPick;
  vod: boolean;
  weekend_challenge: boolean;
}

interface Embed {
  html: string;
  badges: Badges;
}

interface Privacy {
  view: string;
  embed: string;
  download: boolean;
  add: boolean;
  comments: string;
}

interface Size {
  width: number;
  height: number;
  link: string;
  link_with_play_button: string;
}

interface Pictures {
  uri: string;
  active: boolean;
  type: string;
  sizes: Size[];
  resource_key: string;
  default_picture: boolean;
}

interface Videos {
  uri: string;
  options: string[];
  total: number;
}

interface Connections {
  videos: Videos;
}

interface Metadata {
  connections: Connections;
}

interface Tag {
  uri: string;
  name: string;
  tag: string;
  canonical: string;
  metadata: Metadata;
  resource_key: string;
}

interface Stats {
  plays?: any;
}

interface Comments {
  uri: string;
  options: string[];
  total: number;
}

interface Credits {
  uri: string;
  options: string[];
  total: number;
}

interface Likes {
  uri: string;
  options: string[];
  total: number;
}

interface Pictures2 {
  uri: string;
  options: string[];
  total: number;
}

interface Texttracks {
  uri: string;
  options: string[];
  total: number;
}

interface Recommendations {
  uri: string;
  options: string[];
}

interface Connections2 {
  comments: Comments;
  credits: Credits;
  likes: Likes;
  pictures: Pictures2;
  texttracks: Texttracks;
  related?: any;
  recommendations: Recommendations;
}

interface Report {
  uri: string;
  options: string[];
  reason: string[];
}

interface Interactions {
  report: Report;
}

interface Metadata2 {
  connections: Connections2;
  interactions: Interactions;
}

interface Size2 {
  width: number;
  height: number;
  link: string;
}

interface Pictures3 {
  uri: string;
  active: boolean;
  type: string;
  sizes: Size2[];
  resource_key: string;
  default_picture: boolean;
}

interface Website {
  uri: string;
  name: string;
  link: string;
  type: string;
  description: string;
}

interface Albums {
  uri: string;
  options: string[];
  total: number;
}

interface Appearances {
  uri: string;
  options: string[];
  total: number;
}

interface Channels {
  uri: string;
  options: string[];
  total: number;
}

interface Feed {
  uri: string;
  options: string[];
}

interface Followers {
  uri: string;
  options: string[];
  total: number;
}

interface Following {
  uri: string;
  options: string[];
  total: number;
}

interface Groups {
  uri: string;
  options: string[];
  total: number;
}

interface Likes2 {
  uri: string;
  options: string[];
  total: number;
}

interface Membership {
  uri: string;
  options: string[];
}

interface ModeratedChannels {
  uri: string;
  options: string[];
  total: number;
}

interface Portfolios {
  uri: string;
  options: string[];
  total: number;
}

interface Videos2 {
  uri: string;
  options: string[];
  total: number;
}

interface Shared {
  uri: string;
  options: string[];
  total: number;
}

interface Pictures4 {
  uri: string;
  options: string[];
  total: number;
}

interface FoldersRoot {
  uri: string;
  options: string[];
}

interface Teams {
  uri: string;
  options: string[];
  total: number;
}

interface Connections3 {
  albums: Albums;
  appearances: Appearances;
  channels: Channels;
  feed: Feed;
  followers: Followers;
  following: Following;
  groups: Groups;
  likes: Likes2;
  membership: Membership;
  moderated_channels: ModeratedChannels;
  portfolios: Portfolios;
  videos: Videos2;
  shared: Shared;
  pictures: Pictures4;
  folders_root: FoldersRoot;
  teams: Teams;
}

interface Metadata3 {
  connections: Connections3;
}

interface LocationDetails {
  formatted_address: string;
  latitude?: any;
  longitude?: any;
  city?: any;
  state?: any;
  neighborhood?: any;
  sub_locality?: any;
  state_iso_code?: any;
  country?: any;
  country_iso_code?: any;
}

interface User {
  uri: string;
  name: string;
  link: string;
  location: string;
  gender: string;
  bio?: any;
  short_bio: string;
  created_time: Date;
  pictures: Pictures3;
  websites: Website[];
  metadata: Metadata3;
  location_details: LocationDetails;
  skills: any[];
  available_for_hire: boolean;
  can_work_remotely: boolean;
  resource_key: string;
  account: string;
}

interface App {
  name: string;
  uri: string;
}
