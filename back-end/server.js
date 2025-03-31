#!/usr/bin/env node
import server from "./app.js";
const port = 8080;

const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

const close = () => {
  listener.close();
};

export { close };
