import sites from '../adult';
import { requiredScripts } from '../core/externals';

export default {
  name: 'Manga OnlineViewer Adult',
  author: 'Tago',
  updateURL:
    'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.meta.js',
  downloadURL:
    'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js',
  supportURL: 'https://github.com/TagoDR/MangaOnlineViewer/issues',
  namespace: 'https://github.com/TagoDR',
  description: `Shows all pages at once in online view for these sites: ${sites
    .flatMap((s) => s.name)
    .map((s) => s.trim())
    .join(', ')}`,
  version: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
  license: 'MIT',
  icon: 'https://cdn-icons-png.flaticon.com/32/9824/9824312.png', // https://www.freepik.com/icon/comic_9824312
  'run-at': 'document-end',
  grant: [
    'unsafeWindow',
    'GM_getValue',
    'GM_setValue',
    'GM_listValues',
    'GM_deleteValue',
    'GM_xmlhttpRequest',
    'GM_addValueChangeListener',
  ],
  noframes: 'on',
  connect: '*',
  require: requiredScripts,
  include: sites.map((s) => s.url),
} as Partial<Tampermonkey.ScriptMetadata>;
