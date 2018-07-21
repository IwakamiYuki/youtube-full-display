chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.local.get(['url'], function(value) {
		if (value.url.match('www.youtube.com/watch')) {
			chrome.storage.local.set({'status': true});
			window.open(value.url,"host","width=" + window.parent.screen.width + ",height=" + window.parent.screen.height);
		}
	});
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 'set_status') {
    chrome.storage.local.set({'status': request.status});
	}
	if (request.type == 'youtube') {
		setUrl(request.url)
	}
})
chrome.tabs.onActiveChanged.addListener(function(tabId) {
	chrome.tabs.getSelected(window.id, function (tab) {
		setUrl(tab.url)
	});
});

var setUrl = function(url) {
	chrome.storage.local.set({'url': url});
	if (url.match('www.youtube.com/watch')) {
		chrome.browserAction.setIcon({path:{
			"16":"images/red-16.png",
			"48":"images/red-48.png",
			"128":"images/red-128.png",
		}});
	} else {
		chrome.browserAction.setIcon({path:{
			"16":"images/icon-16.png",
			"48":"images/icon-48.png",
			"128":"images/icon-128.png",
		}});
	}
}
