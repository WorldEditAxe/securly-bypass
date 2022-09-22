// Securly Bypass (works best with hotspot)
// Start the program BEFORE you start your device hotspot. If this is not done, the DNS server will not be able to start.
// Made for CodeSandbox in mind, but in theory you can run this anywhere with Node.js.

// Create a new Node.js local sandbox in CodeSandbox. Open it and replace the file contents with the file contents of this file.
// Replace package.json's file contents with the below text:

/*
{
  "name": "securly-bypass",
  "version": "1.0.0",
  "description": "Bypass Securly's annoying blocks!",
  "main": "index.js",
  "scripts": {
    "test": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dns2": "^2.0.5"
  }
}
*/

// Click "Install Dependencies" and click "test: node index.js" to start the bypass software, and you're done!

const{lookup:e}=require("dns"),{networkInterfaces:t}=require("os"),dns2=require("dns2"),{Packet:s}=dns2;let securlyContacted=!1;function lookupAsync(t,s){return new Promise((n,o)=>{e(t,{family:!0==s?6:4},(e,t,s)=>{e?o(e):n({address:t,family:s})})})}function getLocalAddresses(){let e=t(),s=Object.create(null);for(let n of Object.keys(e))for(let o of e[n]){let r="string"==typeof o.family?"IPv4":4;o.family!==r||o.internal||(s[n]||(s[n]=[]),s[n].push(o.address))}return s}const dnsServer=dns2.createServer({tcp:!0,udp:!0,async handle(e,t,n){let o=s.createResponseFromRequest(e);for(let r of e.questions)(r.type==s.TYPE.A||r.type==s.TYPE.AAAA)&&(r.name.endsWith("securly.com")?(securlyContacted||(securlyContacted=!0,console.log("[i] An attempt to Securly's servers has just been made and successfully blocked!")),o.answers.push({name:r.name,type:r.type,class:s.CLASS.IN,ttl:65,address:"0.0.0.0"})):o.answers.push({name:r.name,type:r.type,class:s.CLASS.IN,ttl:65,address:(await lookupAsync(r.name,r.type==s.TYPE.AAAA)).address}));t(o)}});console.log("[i] Starting server...");const interfaces=getLocalAddresses();for(const[int,ips]of(void 0!=interfaces.bridge100&&(console.error("[!] Detected phone hotspot is enabled! Please run this script BEFORE turning on phone hotspot."),process.exit(1)),dnsServer.listen({udp:{port:53,address:"0.0.0.0",tcp:"udp4"},tcp:{port:53,address:"0.0.0.0"}}),console.log("DNS running on port 53."),console.log("[i] --- HOW TO SETUP ---"),console.log("[i] -> Hotspot: You do not need to set anything up."),void 0!=interfaces.en0&&console.log(`[i] -> WiFi: Set your DNS to ${interfaces.en0[0]}.`),console.log("[i] -> Other Interfaces:"),console.log("[i] If the above IPs do not work, try using the below IPs."),Object.entries(interfaces)))console.log(`[i] > ${int}: ${ips[0]}`);console.log("[i] ---------------------");