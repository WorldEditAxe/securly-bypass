# Securly Bypasser
An unpatchable, effective and reliable exploit for bypassing Securly (extension).  
Can be used at home or at school. Break your school Chromebook from its shackles!

## DISCONTINUED
The code technically works today, but the public server is no longer up, and Securly themselves have written a patch/workaround to effectively render this ineffective. As such, I have decided to archive and release this code publically under the MIT license. Have fun! This may or may not work with other device management solutions.
## About
Securly Bypasser is a server made to exploit and disable the Securly extension. Unlike other circumvention methods, it is highly effective, works with all websites and can bypass both the school firewall AND the Securly extension itself. In addition, it also disables telemetry and data logging for the extension, preventing device owners and administrators from peeking on what you're doing.  

The exploit, unlike using website proxies such as Ultraviolet, utilizes DNS spoofing to block communications with Securly servers, preventing the extension from both logging traffic and blocking websites. The server itself is a DNS server acting like a middleman sitting between the DNS servers and the client accessing it. It detects Securly domain lookup requests, blocks them, and therefore preventing Securly's extensions from communicating with Securly. Depending on how it is set up, it can be unpatchable and unfixable.
## Setup
### 1. Setting Up a Server
The bypass software is written in Node.js, allowing it to be ran anywhere Node.js can be ran, including iOS powered devices.
#### iOS
Setting it is possible for Android (via Termux), but instructions will not be gone over here.  
**IMPORTANT!** Due to iOS limitations, apps cannot run in the background and thus you will have to stay on the CodeSandbox app with the screen on.
1. Install [CodeSandbox](https://apps.apple.com/us/app/codesandbox/id1423330822) from the App Store. This will serve as the runtime for our server.
2. Create a local Node.js sandbox.
3. Copy the file contents of `index.js` (in this repository) and replace everything in `index.js` (in CodeSandbox) with it.
4. Do the same for `package.json`.
5. Swipe up, and then tap "Install Dependencies".
6. Run "test: node index.js" and you're all set!
#### Linux
The server can be ran on any desktop/PC platform - as long as there's Node.js, you can run the bypass server software. Clone the repository and run `node index.js` (requires superuser). If you're using Ubuntu, port 53 may be used by systemd-resolved. Refer to [this](https://unix.stackexchange.com/questions/676942/free-up-port-53-on-ubuntu-so-costom-dns-server-can-use-it) for a fix. Additionally, unless the PC is on the same network as the Chromebook, you'll need to port forward it (expose to internet).  
If you do not want to go through the hassle of setting one up, just use the public DNS resolver.
### 2. Connecting to the Server
There are many configurations in which you can connect to the server in. Take a look below.
#### Home Wi-Fi (unfirewalled)
Follow the instructions sent in console after the server starts (iOS only).
#### School Wi-Fi (firewalled)
The DNS resolver on its own will not work behind a school firewall, let alone on a non-configurable Wi-Fi network (most admins block modification of DNS settings on school Wi-Fi). You will need to use a phone hotspot in order to get around this. Instructions are iOS only.
##### Self-hosted Resolver
1. Start the server in CodeSandbox.
- **IMPORTANT!** ALWAYS start the server before the hotspot. If done in the incorrect order, the server will be unable to create the DNS server (as iOS will have already created one for the hotspot on the DNS port the server uses)!
2. Enable the mobile hotspot in Settings.
3. Connect to the hotspot on your Chromebook.
4. You're done! Don't forget to stay in CodeSandbox with the display on, or the server will be stopped by iOS.
## Alternative Methods
If the above methods do not work (no hotspot), check this list for alternatives.
### Chrome OS Storage Exploit
There is a way to remove Securly from your Chromebook, but you'll lose a lot of functionality (apps, extensions, downloads, no firewall bypass). This was made specifically for SFUSD Chromebooks.
1. Grab a Chromebook with a lot of registered users on it. The more there are, the less free storage there is on the laptop.
2. Log in.
3. You'll know if it has worked if you get an error about profile loading OR if the storage is full and no plugins can be installed (use `chrome://os-settings` if there is no settings app).
### Website Proxy Circumvention
Join [this Discord server](https://discord.gg/unblock), verify and request for proxies. Some websites'll work, others won't, but still better than nothing. 
