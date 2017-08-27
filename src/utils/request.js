
export async function getRequest(url) {
  return fetch('/subs.srt')
    .then(e => e.text());
}
