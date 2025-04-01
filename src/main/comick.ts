// == Comick =======================================================================================

function captureComickComments() {
  let comments = document.querySelector('#comments-container');
  if (!comments) return comments;

  // Collect styles from the main document
  const css = [...document.styleSheets]
    .filter((stylesheet) => !stylesheet.href || stylesheet.href.startsWith(window.location.origin)) // Avoid CORS issues
    .map((stylesheet) => {
      try {
        return [...stylesheet.cssRules].map(({ cssText }) => cssText).join('\n');
      } catch (e) {
        return ''; // Ignore CORS-restricted stylesheets
      }
    });

  // Remove blur
  comments.classList.remove('blur-sm');

  // Create a container with a Shadow DOM to isolate CSS
  const container = document.createElement('div');
  document.body.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: 'open' });

  // Handle dark mode
  const commentsParent = document.createElement('div');
  commentsParent.classList.add('dark');

  commentsParent.appendChild(comments);
  shadowRoot.appendChild(commentsParent);

  // Create and append a style tag inside the Shadow DOM
  const style = document.createElement('style');
  style.textContent = css.join('\n');
  shadowRoot.appendChild(style);

  return container;
}

export default {
  name: 'Comick',
  url: /https?:\/\/(www\.)?comick.io\/.+/,
  homepage: 'https://comick.io/',
  language: ['English'],
  category: 'manga',
  waitFunc() {
    return /\/([^/]+)-chapter.+$/.test(window.location.pathname);
  },
  waitEle: '#__NEXT_DATA__',
  waitTime: 3000,
  run() {
    const data = JSON.parse(document.getElementById('__NEXT_DATA__')?.innerHTML ?? '')?.props
      ?.pageProps;
    const pages = data?.chapter?.md_images?.map(
      (image: { b2key: string }) => `https://meo.comick.pictures/${image?.b2key}`,
    );
    return {
      title: data?.seoTitle ?? `${data.chapter?.md_comics?.title} ${data?.chapter?.chap}`,
      series: `/comic/${data?.chapter?.md_comics?.slug}`,
      pages: pages?.length,
      prev: data?.prev?.href,
      next: data?.next?.href,
      listImages: pages,
      comments: captureComickComments(),
    };
  },
};
