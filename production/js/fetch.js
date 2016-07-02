(function() {
"use strict";
console.log('ha');
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

function makeRequest(url) {
  fetch(url)
  .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }})
      // Examine the text in the response
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //let pJason = JSON.parse(httpRequestJSON.data);   //nie je treba native metoda :)
        let tmp = makeTmp(data);
        view.insertAdjacentHTML('beforeend', tmp);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}



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

    switch (true){
      case nameMatch1 && needToAdd:
        makeRequest(url);
        break;

      case nameMatch2:
        view.innerHTML = "";
        for (let i = 0; i < els.length; i++) {
          let a = getData(els[i]);
          let b = getUrl('load/', a, 'json');
          makeRequest(b);
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
