(function() {
"use strict";

const json = document.getElementById('json');
const view = document.getElementById('view');

function makeTmp(data){
  return `<div class="flexContainer" data-url="${data.url}">
          <h2> ${data.name} </h2>
          <p> ${data.content} </p>
          </div>`;
  }

const getUrl = function(folder, data, datatype) {
  return folder + data + '.' + datatype;
};


const getData = function(eTarget){
  return eTarget.dataset.url;
}

const getDataEls = function() {
      let els = view.querySelectorAll('.flexContainer');
      let elsDataSet = [];
      for (let i = 0; i < els.length; i++) {
        let elData = els[i].dataset.url;
        elsDataSet.push(elData);

      }
      return elsDataSet;
    };

const compareData = function(btnData, dataEls){
  let length = dataEls.length;
  for (let i = 0; i < length; i++){
    if( dataEls[i] === btnData){
      return false
    }
  }
  return true
};

makeRequest function(method, url) {
  return new Promise(function (resolve, reject) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      resolve(xhr.response);
    } else {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    }
  };
  xhr.onerror = function () {
    reject({
      status: this.status,
      statusText: xhr.statusText
    });
  };
  xhr.send();
});
}


function makeRequestALL() {}

const requestHandlerJson = function(e) {
let eTarget   =  e.target,
    nameMatch1 = eTarget.classList.contains('add'),
    nameMatch2 = eTarget.classList.contains('all'),
    nameMatch3 = eTarget.classList.contains('clear'),
    btnData    = getData(eTarget),
    url        = getUrl('load/', btnData, 'json'),
    els        = json.querySelectorAll('.add'),
    dataEls    = getDataEls(),
    needToAdd  = compareData(btnData, dataEls);

    /*if (nameMatch1) {
      let url = getUrl('load/', eTarget, 'json');
      makeRequest(url);

    } else if (nameMatch2) {
      console.log('all');
      let els = json.querySelectorAll('.add');
      console.log(els);

    } else if (nameMatch3) {
      view.innerHTML = "";

    } else {
      console.log("Klik vedla")
    }*/

    switch (true){
      case nameMatch1 && needToAdd:
        makeRequest('GET', url)
          .then(function(response){
            return JSON.parse(response.data)
          })
          .then(function(data){
            let tmp = makeTmp(data);
            view.insertAdjacentHTML('beforeend', tmp);
          })
          .catch(function(err){
            console.error(err.statusText);
          });
        break;
      case nameMatch2:
        view.innerHTML = "";
        for (let i = 0; i < els.length; i++) {
          let a = getData(els[i]);
          let b = getUrl('load/', a, 'json');
          makeRequest('GET', b);
            }
        break;
      case nameMatch3:
        view.innerHTML = "";
        break;
      default:
        console.log("nepridavat nic");
    }
};

json.addEventListener('click', requestHandlerJson, false);

})(); //end
