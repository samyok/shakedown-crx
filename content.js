// send request to server.shakedown.tech/resemblance?url=https://hacktober-discord.info?w=1013&h=1301

// if bad then show bad screen

// if good then show good screen

fetch("https://server.shakedown.tech/compare?url=" + location.href).then(r => r.json()).then(r => {
    if (r.alert) {
        alert("bad wesbite");
    }
})

fetch("https://server.shakedown.tech/scamtest?url=" + location.href).then(r => r.json()).then(r => {
    if (r.alert) {
        alert("scummy website sometimes");
    }
});


setInterval(() => {
    if (location.href.includes(".gov/")) return;
    Array.from(document.querySelectorAll("input")).filter((input) => {
        if (input.value.match(/^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/)) {
            input.value = "";
            alert("why tf ssn");
        }
    })
}, 1000)
