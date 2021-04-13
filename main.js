const express = require("express");
const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const queryString = require("query-string");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.get("/echo", (req, res) => {
  res.json(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method == "POST") {
    req.body.id = uuidv4();
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers["x-total-count"];
  if (req.method === "GET" && totalCountHeader) {
    const queryPrams = queryString.parse(req._parsedUrl.query);
    console.log(queryPrams);
    const result = {
      data: res.locals.data,
      paginations: {
        _page: Number.parseInt(queryPrams._page),
        _limit: Number.parseInt(queryPrams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };
    return res.json(result);
  }
  res.json(res.locals.data);
};

server.use("/api", router);
server.listen(4000, () => {
  console.log("server is running");
});
