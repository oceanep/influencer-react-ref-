/*global chrome*/
/* script.js */
setTimeout(function() {
    var entryData = window._sharedData.entry_data;
    if (entryData.ProfilePage) {
        document.dispatchEvent(new CustomEvent('entry_data', {
            detail: entryData.ProfilePage[0]
        }));
    }
    interceptRequests();
}, 0);

function interceptRequests () {
    var open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send,
        setRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader;

    function openReplacement(method, url, async, user, password) {
        this._url = url;
        return open.apply(this, arguments);
    }

    function setHeaderReplacement(header, value) {
        this._headers = this._headers || {};
        this._headers[header] = value;

        return setRequestHeader.apply(this, arguments);
    }

    function sendReplacement(data) {
        if(this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange;
        }
        this.onreadystatechange = onReadyStateChangeReplacement;
        return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement(e) {
        const xhr = e.currentTarget;
        const requestType = getRequestType(xhr.responseURL);
        let eventData = {};
        if (xhr.readyState === 4 && requestType) {
            eventData = JSON.parse(xhr.responseText);
            if (requestType === 'timeline_data') {
                eventData = {
                    timeline: Object.assign({}, eventData),
                    requestData: {
                        url: this._url,
                        headers: this._headers
                    }
                };
            }
            document.dispatchEvent(new CustomEvent(requestType, {
                detail: eventData
            }));
        }
        if(this._onreadystatechange) {
            return this._onreadystatechange.apply(this, arguments);
        }
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.setRequestHeader = setHeaderReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;
}

function getRequestType(url) {
    let parsedUrl = new URL(url),
        searchParams = parsedUrl.searchParams,
        type = null;
    if (!/^\/p\//.test(parsedUrl.pathname) && searchParams.get('__a')) {
        type = 'profile_data';
    } else if (parsedUrl.pathname === '/qp/batch_fetch_web/') {
        type = 'profile_page_loaded';
    } else if (parsedUrl.pathname === '/graphql/query/') {
        searchParams = JSON.parse(searchParams.get('variables'));
        if (searchParams.id && searchParams.first && searchParams.after) {
            type = 'timeline_data';
        } else if (searchParams.shortcode) {
            type = 'post_data';
        } else if (searchParams.user_id) {
            type = 'navigate_profile';
        }
    }
    console.log("Type :", type);
    return type;
}
