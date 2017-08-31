
export async function getRequest(url) {
  return fetch(url)
    .then(e => e.text());
}
