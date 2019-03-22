(function (){

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('script.js');
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
        s.remove();
    };

    document.addEventListener('log_event', (e) => {
        console.log('event', e);
    });
})();
