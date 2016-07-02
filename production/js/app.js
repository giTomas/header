(function() {
    "use strict";

    const btns = document.getElementById('retrieve');
    //const btn  = btns.querySelector('button');
    const bio = document.getElementById('bio');

    function getUrl(folder, eTarget, datatype) {
        return folder + eTarget.dataset.url + '.' + datatype;
    }

    const httpRequest = new XMLHttpRequest();

    httpRequest.onload = function() { //co robit s datami, ktore pridu zo servera
        if (httpRequest.readyState === 4) {
            //bio.style.border = '1px solid red';
            if (httpRequest.status >= 200 && httpRequest.status < 400) {
                bio.innerHTML = httpRequest.responseText;
            } else {
                bio.innerHTML = 'ERROR' + httpRequest.status + httpRequest.statusText;
            }
        }
    }

    const requestHandler = function(e) {
        let eTarget = e.target,
        url = getUrl('load/', eTarget, 'txt'),
        //hasClass  = eTarget.classList.contains('btn'),
        nameMatch = eTarget.nodeName === 'BUTTON';

        if (nameMatch) {
            httpRequest.open('Get', url, true);
            httpRequest.send();
        } else {
            console.log("Klik vedla")
        }
    };

    btns.addEventListener('click', requestHandler, false);


})(); //end iffy
