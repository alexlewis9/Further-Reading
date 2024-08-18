function getLinks() {
    var links = document.querySelectorAll('a');
    var result = [document.title];
    for (let link of links) {
        var url = link.getAttribute('href');
        if (url === null) {
            continue;
        }
        if (url.indexOf('://') === -1) {
            url = window.location.origin + url;
        }
        result.push([url, link.text]);
    }
    return result;
}

browser.runtime.onMessage.addListener((message, sender) => {
    return Promise.resolve(getLinks());
});

// window.onload = function() {
//     document.getElementById('save-links').onclick = sendMessage;
// }