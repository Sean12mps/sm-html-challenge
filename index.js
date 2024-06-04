import ip from 'ip';
import { exec } from 'child_process';
import liveServer from 'live-server';

// Get the local IP address
const localIp = ip.address();

console.log(`Server will be available at: http://${localIp}:8080`);
console.log( '============================' )

// Start the live server
liveServer.start({
    port: 8080,
    host: localIp,
    root: './dist',
    file: 'index.html',
    wait: 1000,
    logLevel: 2,
});
