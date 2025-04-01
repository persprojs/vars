const dns = require('dns');
const net = require('net');

const hostname = 'cluster0.mongodb.net';
const port = 27017; // or 443 for HTTPS

dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
  if (err) {
    console.error('Error resolving SRV record:', err.message);
    return;
  }

  console.log('SRV records:', addresses);

  if (addresses && addresses.length > 0) {
    const { name, port } = addresses[0];

    const socket = net.createConnection({ port: port, host: name }, () => {
      console.log('Successfully connected to', name, port);
      socket.end();
    });

    socket.on('error', (err) => {
      console.error('Error connecting to', name, port, err.message);
    });
  }
});
