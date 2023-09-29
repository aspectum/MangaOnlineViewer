// == ReadComicsOnline =============================================================================
export default {
  name: 'ReadComicsOnline',
  url: /https?:\/\/(www.)?readcomicsonline.ru\/comic\/.*\/\d*/,
  homepage: 'https://readcomicsonline.ru/',
  language: ['English'],
  category: 'comic',
  run() {
    const images = [...document.querySelectorAll('#all img')];
    return {
      title: unsafeWindow.title.replace(/ - Page \d+/, ''),
      series: document.querySelector('div.pager-cnt a')?.getAttribute('href'),
      pages: unsafeWindow.pages.length,
      prev: unsafeWindow.prev_chapter,
      next: unsafeWindow.next_chapter,
      listImages: images.map((img) => img.getAttribute('data-src')),
    };
  },
};
