
//add charts
//add animations to charts

//alert message
const alertMessage = document.querySelector('.alert-message');
const alertMessageSymbol = document.querySelector('#close');
//dropdown menu
const bell = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.drop-options');
//message fields
const searchUser = document.querySelector('#searchUser');
const messageUser = document.querySelector('#messageUser');
const sendButton = document.querySelector('#send-button');
const emptyFieldMessage = document.querySelector('.message-one');
const sentMessage = document.querySelector('.message-two');
//on and off buttons
// const onOffButton = document.querySelector('.on-button');
// const onButtonText = document.querySelector('.on-button-text');
// const buttonDiv = document.querySelector('.btn-div');

const onOffButton = document.querySelectorAll('.on-button');
const onButtonText = document.querySelectorAll('.on-button-text');
const buttonDiv = document.querySelectorAll('.btn-div');



//dropdown menu

bell.addEventListener('click', () => {
    if(dropdownMenu.className == "drop-options drop-hide") {
        dropdownMenu.className = "drop-options drop-show";
    } else {
        dropdownMenu.className = "drop-options drop-hide";
    }
})

//Close the alert message
alertMessageSymbol.addEventListener('click', () => {
    alertMessage.style.display = 'none';
})

//Check user and message fields before sending message
sendButton.addEventListener('click', ()=> {
    let searchValue = searchUser.value;
    let messageValue = messageUser.value;
    if (searchValue == '' || messageValue == '') {
        emptyFieldMessage.style.animation = 'showMessage 2s ease-in';
        window.setTimeout( () => {
            emptyFieldMessage.style.animation = '';
        }, 2000)
    }    
    else {
        sentMessage.style.animation = 'showMessage 2s ease-in'
        searchUser.value = '';
        messageUser.value = '';
        window.setTimeout( () => {
            sentMessage.style.animation = '';
        }, 2000)
    } 
})

//autocomplete function and array of possible names 
const autoNames = ['Victoria Chambers','Dale Byrd','Dawn Wood','Dan Oliver'];

function autocomplete(inp, arr) {
    var currentFocus;    
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { //up
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.querySelector('#searchUser'), autoNames)

  //On and Off button functionality

for (let i = 0; i < onOffButton.length; i++) {
    onOffButton[i].addEventListener('click', ()=> {
        if (onButtonText[i].textContent == "ON") {
            onButtonText[i].textContent = "OFF";
            localStorage.setItem(`text${i}`,'OFF');
            onOffButton[i].className = "on-button offClass";
            localStorage.setItem(`class${i}`, 'on-button offClass');
            buttonDiv[i].className = "btn-div div-off";         
            localStorage.setItem(`buttonClass${i}`, 'btn-div div-off');
        } else {
            onButtonText[i].textContent = "ON";
            localStorage.setItem(`text${i}`,'ON');
            onOffButton[i].className = "on-button onClass";
            localStorage.setItem(`class${i}`, 'on-button onClass');
            buttonDiv[i].className = "btn-div div-on";
            localStorage.setItem(`buttonClass${i}`, 'btn-div div-on');
        }
        })
}

for (let i = 0; i < onOffButton.length; i++) {
    onButtonText[i].textContent = localStorage.getItem(`text${i}`);
    onOffButton[i].className = localStorage.getItem(`class${i}`);
    buttonDiv[i].className = localStorage.getItem(`buttonClass${i}`);
}