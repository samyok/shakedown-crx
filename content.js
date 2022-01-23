// send request to server.shakedown.tech/resemblance?url=https://hacktober-discord.info?w=1013&h=1301

// if bad then show bad screen

// if good then show good screen

fetch("https://server.shakedown.tech/compare?url=" + location.href).then(r => r.json()).then(r => {
    if (r.alert) {
        alert("bad wesbite");
    }
})
