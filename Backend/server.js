const http = require("http");
const datageneration = require("./datageneration"); // Import function properly
const port = 3000;

const server = http.createServer(async (req, res) => {
  try {
    const content = await datageneration(); // Call function and wait for response
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(content);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error generating content");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
