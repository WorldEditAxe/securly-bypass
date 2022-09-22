const { lookup } = require("dns")
const { networkInterfaces } = require("os")
const dns2 = require("dns2")
const { Packet } = dns2

let securlyContacted = false

function lookupAsync(addr, ipv6) {
  return new Promise((res, rej) => {
    lookup(addr, {
      family: ipv6 == true ? 6 : 4
    }, (err, addr, family) => {
      if (err) {
        rej(err)
      } else {
        res({
          address: addr,
          family: family
        })
      }
    })
  })
}

function getLocalAddresses() {
  const nets = networkInterfaces();
  const results = Object.create(null);
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
          if (net.family === familyV4Value && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  return results
}

const dnsServer = dns2.createServer({
  tcp: true,
  udp: true,
  handle: async (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request)
    for (const req of request.questions) {
      if (req.type == Packet.TYPE.A || req.type == Packet.TYPE.AAAA) {
        if (req.name.endsWith("securly.com")) {
          if (!securlyContacted) {
            securlyContacted = true
            console.log(`[i] An attempt to Securly's servers has just been made and successfully blocked!`)
          }
          response.answers.push({
            name: req.name,
            type: req.type,
            class: Packet.CLASS.IN,
            ttl: 65,
            address: "0.0.0.0"
          })
        } else {
          response.answers.push({
            name: req.name,
            type: req.type,
            class: Packet.CLASS.IN,
            ttl: 65,
            address: (await lookupAsync(req.name, req.type == Packet.TYPE.AAAA ? true : false)).address
          })
        } 
      }
    }
    send(response)
  }
})
 
console.log("[i] Starting server...")
const interfaces = getLocalAddresses()
if (interfaces["bridge100"] != undefined) {
    console.error("[!] Detected phone hotspot is enabled! Please run this script BEFORE turning on phone hotspot.")
    process.exit (1)
}
dnsServer.listen({
    udp: {
        port: 53,
        address: "0.0.0.0",
        tcp: "udp4"
    },
    tcp: {
        port: 53,
        address: "0.0.0.0"
    }
})
console.log(`DNS running on port 53.`)
console.log("[i] --- HOW TO SETUP ---")
console.log("[i] -> Hotspot: You do not need to set anything up.")
if (interfaces["en0"] != undefined) {
    console.log(`[i] -> WiFi: Set your DNS to ${interfaces["en0"][0]}.`)
}
console.log(`[i] -> Other Interfaces:`)
console.log(`[i] If the above IPs do not work, try using the below IPs.`)
for (const [int, ips] of Object.entries(interfaces)) {
    console.log(`[i] > ${int}: ${ips[0]}`)
}
console.log(`[i] ---------------------`)