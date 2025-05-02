const express = require('express');
const dgram = require('dgram');
const app = express();

const playerIP = '192.168.0.148'; // Change to your BrightSign player's IP
const udpPort = 5000; // Default UDP listening port for BrightSign

app.get('/send/:command', (req, res) => {
  const message = Buffer.from(req.params.command);
  const socket = dgram.createSocket('udp4');

  socket.send(message, udpPort, playerIP, (err) => {
    socket.close();
    if (err) {
      console.error('UDP send failed:', err);
      res.status(500).send('Error sending command');
    } else {
      console.log(`Command "${req.params.command}" sent to ${playerIP}:${udpPort}`);
      res.send(`Sent: ${req.params.command}`);
    }
  });
});

app.listen(3000, () => {
  console.log('UDP relay server running at http://localhost:3000');
});
