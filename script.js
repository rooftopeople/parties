// This script can be used for handling Instagram login response
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        document.getElementById('response').innerHTML = "Instagram login successful! Code: " + code;
        // Here, send the code to your backend (Render) to exchange it for an access token.
    }
};
