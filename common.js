chrome.storage.local.get(['status'], function(value) {
	if (value.status) {
		chrome.runtime.sendMessage(
			{
				type: "set_status",
				status: false
			},
			null
		);

		setTimeout(function() {
			$(':not(:has(video))').each(function(i, elem) {
				if (elem.tagName != 'VIDEO') {
					elem.remove()
				}
			})
			$('video').css('height', '100%')
			$('video').css('width', '100%')
			$(':has(video)').css('margin', '0 0 0 0')
		}, 1000)
	}
});
var lastUrl = ''
setInterval(function() {
	var url = document.location.href;
	if (lastUrl != url) {
		lastUrl = url;
		chrome.runtime.sendMessage(
			{
				type: "youtube",
				url: document.location.href,
			},
			null
		);
	}
}, 1000);

