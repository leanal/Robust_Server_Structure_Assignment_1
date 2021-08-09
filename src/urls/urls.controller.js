const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require("../data/uses-data");

// middleware function to validate the request body
function bodyHasHrefProperty(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    return next(); // Call `next()` without an error message if the href exists
  }
  // next("A 'href' property is required.");
  next({
    status: 400,
    message: "A 'href' property is required.",
  });
}

function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${urlId}`,
  });
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function trackRead(req, res, next) {
  const urlId = res.locals.url.id;
  const newUseId = uses.length + 1;
  const newUse = {
    id: newUseId,
    urlId: urlId,
    time: Date.now()
  };
  uses.push(newUse);
  next();
}

function read(req, res) {
  res.json({ data: res.locals.url })
}

function update(req,res) {
  const url = res.locals.url;
  const originalHref = url.href;
  const { data: { href } = {} } = req.body;

  if (originalHref !== href) {
    url.href = href;
  }

  res.json({ data: url })
}

function list(req, res) {
  res.json({ data: urls })
}

function destroy(req, res) {
  const { urlId } = req.params;
  const index = urls.findIndex((url) => url.id === Number(urlId));
  // `splice()` returns an array of the deleted elements, even if it is one element
  const deletedUrls = urls.splice(index, 1);

  res.sendStatus(204);
}

module.exports = {
  create: [bodyHasHrefProperty, create],
  list,
  read: [urlExists, trackRead, read],
  update: [urlExists, bodyHasHrefProperty, update],
  urlExists,
};
