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

//get data from collection of DOM nodes

const getDataEls = function(elem, elems) {
      let elsCollection = elem.querySelectorAll(elems);
      let elsDataSet = [];
      let length = elsCollection.length;
      for (let i = 0; i < elsCollection.length; i++) {
        let elsData = elsCollection[i].dataset.url;
        elsDataSet.push(elsData);
      }
      return elsDataSet;
    };

function getDataEls2(elems) {
  let elsData = Array.prototype.map.call(elems, function(obj){
    return obj.dataset.url;
  })
  return elsData;
}

const compareData = function(btnData, dataEls){
  let length = dataEls.length;
  for (let i = 0; i < length; i++){
    if( dataEls[i] === btnData){
      return false
    }
  }
  return true
};

function makeRequest(url){
  axios.get(url)
    .then(function (response) {
      let tmp = makeTmp(response.data);
      view.insertAdjacentHTML('beforeend', tmp);
    })
    .catch(function (response) {
      console.log(response);
    });
}

const requestHandlerJson = function(e) {
let eTarget    =  e.target,
    nameMatch1 = eTarget.classList.contains('add'),
    nameMatch2 = eTarget.classList.contains('all'),
    nameMatch3 = eTarget.classList.contains('clear'),
    btnData    = getData(eTarget),
    els        = json.querySelectorAll('.add'),
    dataEls    = getDataEls(view, '.flexContainer'),
    //elsCol     = view.querySelectorAll('.flexContainer'), //?
    //dataEls    = getDataEls2(elsCol),                     //?
    needToAdd  = compareData(btnData, dataEls),
    match      = nameMatch1 && needToAdd;

  switch (true){
    case match:
      let url  = getUrl('load/', btnData, 'json');
      makeRequest(url);
      break;
    case nameMatch2:
      let length = els.length;
      view.innerHTML = "";
      for (let i = 0; i < length; i++) {
        let a = getData(els[i]);
        let url = getUrl('load/', a, 'json');   //!!!
        makeRequest(url)
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
