// ==UserScript==
// @name Manga OnlineViewer
// @author Tago
// @updateURL https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.meta.js
// @downloadURL https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js
// @namespace https://github.com/TagoDR
// @description Shows all pages at once in online view for these sites: Asura Scans, Batoto, ComiCastle, Dynasty-Scans, Asura Scans, Flame Scans, Realm Scans, Voids-Scans, Luminous Scans, InManga, KLManga, Leitor, LHTranslation, MangaBuddy, MangaDex, MangaFox, MangaHere, MangaFreak, Mangago, mangahosted, MangaHub, MangaKakalot, MangaNelo, MangaNato, MangaPark, MReader, Mangareader, MangaSee, Manga4life, MangaTigre, MangaTown, ManhuaScan, NineManga, PandaManga, RawDevart, ReadComicsOnline, ReadManga Today, Funmanga, MangaDoom, MangaInn, ReaperScans, SenManga(Raw), ShimadaScans, KLManga, TenManga, TuMangaOnline, UnionMangas, WebToons, Manga33, ZeroScans, FoOlSlide, Kireicake, Madara WordPress Plugin, MangaHaus, Isekai Scan, Comic Kiba, Zinmanga, mangatx, Toonily, Mngazuki, JaiminisBox, DisasterScans, ManhuaPlus
// @version 2022.11.15
// @license MIT
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_xmlhttpRequest
// @connect *
// @require https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/5.0.0/imagesloaded.pkgd.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.35/sweetalert2.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @include /https?:\/\/beta.asurascans.com\/read\/.+\/.+/
// @include /https?:\/\/(www.)?bato.to\/chapter.*/
// @include /https?:\/\/(www.)?comicastle.org\/read\/.+\/[0-9]+.*/
// @include /https?:\/\/(www.)?dynasty-scans.com\/chapters\/.+/
// @include /https?:\/\/(www.)?(asura|flamescans|realmscans|void-scans|luminousscans).(com|org|gg)\/.+/
// @include /https?:\/\/(www.)?inmanga.com\/ver\/manga\/.+\/.+/
// @include /https?:\/\/(www.)?klmanga.com\/.+chapter.+/
// @include /https?:\/\/(www.)?leitor.net\/manga\/.+\/.+\/.+/
// @include /https?:\/\/(www.)?lhtranslation.net\/read.+/
// @include /https?:\/\/(www.)?mangabuddy.com\/.+\/chapter.+/
// @include /https?:\/\/(www.)?mangadex.org\/chapter\/.+(\/.+)?/
// @include /https?:\/\/(www.)?(fanfox.net|mangahere.cc)\/manga\/.+\/.+\//
// @include /https?:\/\/.{3,4}?(mangafreak).net\/Read.+/
// @include /https?:\/\/(www.)?mangago.me\/.*\/.*\/.*/
// @include /https?:\/\/(www.)?mangahosted.com\/manga\/.+\/.+/
// @include /https?:\/\/(www.)?(mangahub).io\/chapter\/.+\/.+/
// @include /https?:\/\/(www.)?((manganelo|mangakakalot).com\/chapter\/.+\/.+|(manganato|readmanganato|chapmanganato).com\/manga-\w\w\d+\/chapter-\d+)/
// @include /https?:\/\/(www.)?mangapark.(com|me|org|net)\/(manga|chapter|comic)\/.+\/.+/
// @include /https?:\/\/(www.)?mreader.co\/reader\/.*/
// @include /https?:\/\/(www.)?mangareader.to\/read\/.+\/.+\/.+/
// @include /https?:\/\/(www.)?(mangasee123|manga4life).com\/read-online\/.+/
// @include /https?:\/\/(www.)?mangatigre.net\/.+\/.+\/.+/
// @include /https?:\/\/(www.|m.)?mangatown.com\/manga\/.+\/.+/
// @include /https?:\/\/(www.)?manhuascan.io\/.+chapter.+/
// @include /https?:\/\/(www.)?ninemanga.com\/chapter\/.+\/.+\.html/
// @include /https?:\/\/(www.)?pandamanga.xyz\/.+\/.+\/.+/
// @include /https?:\/\/(www.)?rawdevart.com\/comic\/.+\/.+\//
// @include /https?:\/\/(www.)?readcomicsonline.ru\/comic\/.*\/\d*/
// @include /https?:\/\/(www.)?(funmanga|mngdoom|readmng|mangainn).(com|net)\/.+\/\d+/
// @include /https?:\/\/(www.)?reaperscans.com\/comics\/.+\/chapters\/.+/
// @include /https?:\/\/raw.senmanga.com\/.+\/.+\/?/
// @include /https?:\/\/(www.)?shimadascans.com\/.+series.+/
// @include /https?:\/\/(www.)?tapas.io\/episode\/.+/
// @include /https?:\/\/(www.)?(tenmanga|gardenmanage).com\/(chapter|statuses)\/.+/
// @include /https?:\/\/(www.)?(tmofans|lectortmo|followmanga).com\/.+\/.+\/(paginated|cascade)/
// @include /https?:\/\/(www.)?unionleitor.top\/leitor\/.+\/.+/
// @include /https?:\/\/(www.)?webtoons.com\/.+viewer.+/
// @include /https?:\/\/(www.)?(manga33).com\/manga\/.+/
// @include /https?:\/\/(www.)?zeroscans.com\/comics\/.+/
// @include /^(?!.*jaiminisbox).*\/read\/.+/
// @include /https?:\/\/.+\/(manga|series)\/.+\/.+/
// @exclude /https?:\/\/(www.)?tsumino.com\/.+/
// @exclude /https?:\/\/(www.)?pururin.io\/.+/
// ==/UserScript==
