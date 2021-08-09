const uses = require("../data/uses-data");

function list(req, res) {
  const { urlId } = req.params;

  if (!urlId) res.json({ data: uses })

  const byRequest = uses.filter(use => use.urlId === Number(urlId));
  res.json({ data: byRequest })
}

function useExists(req, res, next) {
  const { urlId, useId } = req.params;
  
  const foundUse = uses.find((use) => urlId ? use.id === Number(useId) && use.urlId === Number(urlId) : use.id === Number(useId));

  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  
  next({
    status: 404,
    message: urlId ? `Url id ${urlId} and Use id ${useId} are mismatched.` :  `Use id is not found: ${useId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.use })
}

function destroy(req,res) {
  const { useId } = req.params;
  const index = uses.findIndex(use => use.id === useId);
  uses.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  destroy: [useExists, destroy]
};