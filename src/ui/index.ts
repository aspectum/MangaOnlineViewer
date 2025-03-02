import type { IManga } from '../types';
import head from './reader';
import body, { hydrateApp } from './components/App';
import events from './events';
import { loadManga } from './page';
import { cleanUpElement } from '../utils/cleanup';
import { logScriptVerbose } from '../utils/tampermonkey';

export default function display(manga: IManga) {
  cleanUpElement(document.documentElement, document.head, document.body);
  window.scrollTo(0, 0);
  logScriptVerbose(`Page Cleaned Up`);
  document.head.innerHTML = head(manga);
  document.body.innerHTML = body(manga);
  events();
  loadManga(manga);
  document.querySelector('#MangaOnlineViewer')?.addEventListener('hydrate', hydrateApp);
  if (manga.comments) document.querySelector('#CommentsArea')?.append(manga.comments);

  document.querySelector('main#Chapter')?.addEventListener('click', (evt) => {
    const mEvt = evt as MouseEvent;
    if (mEvt.clientX / window.innerWidth < 0.25) {
      clickScroll(-1);
    } else {
      clickScroll(1);
    }
  });
}

let targetPosition = 0;
let requestAnimationFrameId: number | null = null;

// Check when the scroll is complete
const checkScrollEnd = () => {
  if (Math.abs(window.scrollY - targetPosition) <= 1) {
    requestAnimationFrameId = null;
  } else {
    requestAnimationFrame(checkScrollEnd); // Keep checking the scroll position
  }
};

export function clickScroll(sign: 1 | -1) {
  if (requestAnimationFrameId == null) {
    targetPosition = window.scrollY;
  } else {
    cancelAnimationFrame(requestAnimationFrameId);
  }
  targetPosition += sign * window.innerHeight * 0.8;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });

  requestAnimationFrameId = requestAnimationFrame(checkScrollEnd); // Start checking
}

