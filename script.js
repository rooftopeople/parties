// Generate QR code that links to the website URL
window.onload = function() {
    const currentURL = window.location.href;
    QRCode.toCanvas(document.getElementById('qrcode'), currentURL, function (error) {
        if (error) console.error(error);
        console.log("QR code generated!");
    });
}
