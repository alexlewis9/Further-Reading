function bookmarkLinks(links) {
    var folderID;
    browser.bookmarks.create({title: links[0]}).then((node) => {
        for (let i = 1; i < links.length; i++) {
            browser.bookmarks.create({
                title: links[i][1],
                url: links[i][0],
                parentId: node.id,
            });
        }
    });
}

function sendMessage(tab) {
    browser.tabs
           .sendMessage(tab.id, 'get links')
           .then(links => {
                bookmarkLinks(links)
           })
           .catch(error => {
               console.error(`Error: ${error}`)
           })
}

browser.browserAction.onClicked.addListener(sendMessage);

// function disableGetLinksButton() {
//     document.getElementById('save-links').textContent = 'Links saved!';
//     document.getElementById('save-links').style.backgroundColor = 'gray';
//     document.getElementById('save-links').disabled = 'true';
// }

// function resetGetLinksButton() {
//     document.getElementById('save-links').textContent = 'Save Links';
//     document.getElementById('save-links').style.backgroundColor = '#1E3A5F';
//     document.getElementById('save-links').disabled = 'false';
// }