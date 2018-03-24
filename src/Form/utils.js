export const extractRootUrl = url => {
  let rootUrl;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('://') > -1) {
    const urlParts = url.split('/');
    const hostname = urlParts[2];
    const protocol = urlParts[0];
    rootUrl = `${protocol}//${hostname}`;
  } else {
    const urlParts = url.split('/');
    const hostname = urlParts[0];
    const protocol = 'http'; // default to http
    rootUrl = `${protocol}//${hostname}`;
  }

  return rootUrl;
};
