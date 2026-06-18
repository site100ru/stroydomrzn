function loadScript(url, data, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (!isEmptyObject(data)) {
        $.each(data, function(name, value) {
            script.setAttribute(name, value);
        });
    }

    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            if (callback) {
                callback();
            }
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function isEmptyObject(obj) {
    return JSON.stringify(obj) == '{}';
}

window.dataLayer = window.dataLayer || [];
window._tmr = window._tmr || [];


document.addEventListener("DOMContentLoaded", function() {
	var loadedScripts = false;

    // $(document).on("scroll.delayed", checkDelayedEvent);
    $(document).on("click.delayed", checkDelayedEvent);
    $(document).on("mousemove.delayed", checkDelayedEvent);

    $(document).on("touchstart.delayed", checkDelayedEvent);
    $(document).on("touchmove.delayed", checkDelayedEvent);

    var delayTimeout = setTimeout(checkDelayedTimeout, 11000);

    function checkDelayedTimeout(e) {
        if (!loadedScripts) {
            setTimeout(loadDelayedScripts(), 11000);
        }
    };

    function checkDelayedEvent(e) {
        if (e.originalEvent && !loadedScripts) {
            setTimeout(loadDelayedScripts(), 11000);
            clearTimeout(delayTimeout);
        }
    };

	function loadDelayedScripts() {
		loadedScripts = true;



        // Yandex Metrika — отключено

        // GTM
    	// loadScript("https://www.googletagmanager.com/gtm.js?id=GTM-MRV3KNF", {}, function(){
    	// 	window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
		//     console.log("GTM loaded");
		// });

        // GoogleAnalytics
		// loadScript("https://www.google-analytics.com/analytics.js", {}, function(){
    	// 	ga('create', 'UA-46597140-1', 'auto');
		// 	ga('require', 'displayfeatures');
		// 	ga('send', 'pageview');
		// 	ga(function(tracker) {
		// 		(function(w, d, c){
		// 			jQuery(document).ready(function(){
		// 				var a = 'all', b = 'tou'; var src = b + 'c' +'h'; src = 'm' + 'o' + 'd.c' + a + src;
		// 				jQuery.getScript(('https:' == d.location.protocol ? 'https://' : 'http://')+src+"."+"r"+"u/d_client.js?param;client_id"+c+";ref" + escape(d.referrer) + ";url" + escape(d.URL) + ";cook" + escape(d.cookie)+";");
		// 			});
		// 		})(window, document, tracker.get('clientId'));
		// 	});
		//     console.log("GoogleAnalytics loaded");
		// });

        // Mango — отключено

        // VK Retargeting — отключено

        // reCAPTCHA — отключено

        // loadScript("https://web.webpushs.com/js/push/982018699cfba7a6129b077b8cbd6a37_1.js", {}, function(){
        //     console.log("Webpushs loaded");
        // });

        // Yandex.Metrika counter — отключено

        // Top.Mail.Ru — отключено

        // (function(t,l,g,r,m){t[g]||(g=t[g]=function(){g.run?g.run.apply(g,arguments):g.queue.push(arguments)},g.queue=[],t=l.createElement(r),t.async=!0,t.src=m,l=l.getElementsByTagName(r)[0],l.parentNode.insertBefore(t,l))})(window,document,'tgp','script','https://telegram.org/js/pixel.js');tgp('init','vHi7gT3h');
        // console.log("Pixel Tag loaded");



        $(document).off("click.delayed", checkDelayedEvent);
        $(document).off("mousemove.delayed", checkDelayedEvent);

        $(document).off("touchstart.delayed", checkDelayedEvent);
        $(document).off("touchmove.delayed", checkDelayedEvent);
	};
})
