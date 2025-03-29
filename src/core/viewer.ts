import type { IManga } from '../types';
import { logScript, logScriptVerbose } from '../utils/tampermonkey';
import { getUserSettings } from './settings';
import display from '../ui';
import { waitForFunc, waitWithTimeout } from '../utils/waitFor';

async function captureIframeComments() {
  let comments = document.querySelector('#disqus_thread, #fb-comments');
  if (comments) {
    logScript(`Waiting to Comments to load`, comments);
    window.scrollTo(0, document.body.scrollHeight);
    await waitWithTimeout(
      waitForFunc(() => {
        comments = document.querySelector('#disqus_thread, #fb-comments');
        const iframe = comments?.querySelector<HTMLIFrameElement>(
          'iframe:not(#indicator-north, #indicator-south)',
        );
        return (
          iframe?.contentWindow?.document.readyState === 'complete' &&
          iframe?.contentWindow?.document?.body?.textContent?.length
        );
      }),
    );
  }
  return comments;
}

async function captureComickComments() {
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

  // Handle dark mode and remove blur
  comments.classList.add('dark');
  comments.classList.remove('blur-sm');

  // Create a container with a Shadow DOM to isolate CSS
  const container = document.createElement('div');
  document.body.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: 'open' });

  shadowRoot.appendChild(comments);

  // Create and append a style tag inside the Shadow DOM
  const style = document.createElement('style');
  style.textContent = css.join('\n');
  shadowRoot.appendChild(style);

  return container;
}

async function captureComments() {
  if (!getUserSettings().enableComments) return null;
  const comments = (await captureIframeComments()) ?? (await captureComickComments());
  if (comments?.children.length) {
    logScript(`Got Comments`, comments);
  } else {
    logScript(`Timeout Comments`);
  }
  window.scrollTo(0, 0);
  return comments;
}

export default async function viewer(manga: IManga) {
  if (manga.before !== undefined) {
    logScriptVerbose(`Executing Preparation`);
    await manga.before(manga.begin);
  }
  if (getUserSettings().enableComments && !manga.comments) {
    manga.comments = await captureComments();
  }
  setTimeout(() => {
    try {
      display(manga);
    } catch (e) {
      logScript(e);
    }
  }, 50);
}

