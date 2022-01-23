// send request to server.shakedown.tech/resemblance?url=https://hacktober-discord.info?w=1013&h=1301

// if bad then show bad screen

// if good then show good screen

fetch("https://server.shakedown.tech/compare?url=" + location.href).then(r => r.json()).then(r => {
    if (r.alert) {
        document.body.insertAdjacentHTML('beforeend', popup(titleCase(r.data[0].domain)));
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
        }
    })
}, 1000)

const popup = url => `<div class="scm-background" id="shakedown">
    <img src="https://shakedown.tech/logo.svg" alt="">
    <h1>We are 87% sure this is a scam website.</h1>
    <h2 class="subtitle">Be careful! <b>This website is pretending to be ${url}; it is not ${url.split(".")[0]}.</b></h2>
    <p class="more-info">
        Be extremely careful when entering personal information into this website, we think they’re trying to steal your personal information (like your username, email, or password).
    </p>
    <button class="close-tab" onclick="window.close()">Close tab</button>
    <p class="continue" onclick="document.querySelector("#shakedown").remove(); ">continue</p>
</div>
<style>
    .scm-background {
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        color: white;
        font-family: sans-serif;
    }
    .scm-background * {
    margin-top: 46px;
    font-size: 33px;
        }
    .more-info {
        font-size: 20px;
    }

    .close-tab {
        padding: 20px 50px;
        font-size: 30px;
        border: 5px solid black;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.4);
        color: white;
        cursor: pointer;
    }
    .continue {
        color: rgba(255,255,255,0.3)
    }</style>
`

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}
