var childName = document.getElementById("nameInput");
var childNameOutput = document.getElementById("nameOutput");
var allergyItems = document.getElementById("allergyItems");
var allergyInput = document.getElementById("allergyInput");
var allergies = [];

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

if (childName) {
  childName.value = localStorage.getItem("nameInput");
  document.getElementById("nameOutput").textContent = childName.value;

  childName.addEventListener('input', function() {
    localStorage.setItem('nameInput', childName.value);}, false);

  document.getElementById("nameSubmit").addEventListener('click', function(){
    childNameOutput.textContent = childName.value;
    }, false);
  document.getElementById("nameInput").onkeydown=function(e){
      if(e.keyCode==13){
        childNameOutput.textContent = childName.value;
    }
  }
}

if(childNameOutput) {
  document.getElementById("nameOutput").textContent = localStorage.getItem("nameInput");
};


function outputList() {
  var retrievedData = localStorage.getObj("allergyKey");
  for (var i = 0; i < retrievedData.length; i++) {
    console.log(retrievedData[i]);
  }
}

function addToList(item) {
  var retrievedData = [];
  retrievedData = localStorage.getObj("allergyKey");
  retrievedData.push(item);
  localStorage.setObj("allergyKey", retrievedData);
}

function removeFromList(item) {
  var retrievedData = [];
  retrievedData = localStorage.getObj("allergyKey");
  for(var i = retrievedData.length; i--;) {
    if(retrievedData[i] == item) {
      retrievedData.splice(i, 1);
    }
  }
  localStorage.setObj("allergyKey", retrievedData);
}

function renderList() {
  var retrievedData = localStorage.getObj("allergyKey");
  allergyItems.innerHTML = "";
  if (retrievedData){
      for (var i = 0; i < retrievedData.length; i++) {

        var li = document.createElement("li");
        var t = document.createTextNode(retrievedData[i]);
        var Xbutton = document.createElement("button");
        var bt = document.createTextNode("X");

        li.appendChild(t);
        if (allergyInput) {
          li.appendChild(Xbutton);
          Xbutton.appendChild(bt);
        }
        Xbutton.setAttribute("class", "delete")
        allergyItems.appendChild(li);
      }
    }
  else{
    localStorage.setObj("allergyKey", allergies)
  }
}

if (allergyInput){
  document.getElementById("allergyInput").onkeydown=function(e){
      if(e.keyCode==13){
        addToList(allergyInput.value);
        allergyInput.value= "";
        renderList();
        $("#allergyItems li:last-of-type").hide().fadeIn(200);
      }
  }
  document.getElementById("addAnotherAllergy").addEventListener('click', function() {
    addToList(allergyInput.value);
    allergyInput.value= "";
    renderList();
    allergyInput.scrollIntoView();
    $("#allergyItems li:last-of-type").hide().fadeIn(200);
  }, false);
}

//Adapted from David Walsh http://davidwalsh.name/event-delegate
document.getElementById("allergyItems").addEventListener("click",function(e) {
  if(e.target && e.target.nodeName == "BUTTON") {
      $(e.target.parentNode).fadeOut(200);
      setTimeout(function(){
        removeFromList(e.target.parentNode.firstChild.textContent);
        renderList();
      }, 200);
  }
});

window.addEventListener("DOMContentLoaded", renderList(), false);


