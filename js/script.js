
//add charts
//add animations to charts

//alert message
const alertMessage = document.querySelector('.alert-message');
const alertMessageSymbol = document.querySelector('#close');
//dropdown menu
const body = document.querySelector('main');
const bell = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.drop-options');
const bellDot = document.querySelector('.dot-container');
//message fields
const searchUser = document.querySelector('#searchUser');
const messageUser = document.querySelector('#messageUser');
const sendButton = document.querySelector('#send-button');
const emptyFieldMessage = document.querySelector('.message-one');
const sentMessage = document.querySelector('.message-two');
//on and off buttons
const onOffButton = document.querySelectorAll('.on-button');
const onButtonText = document.querySelectorAll('.on-button-text');
const buttonDiv = document.querySelectorAll('.btn-div');
const selectMenu = document.querySelector('select');
//Chart selectors
const chartDataSelectors = document.querySelectorAll('li');

//dropdown menu

bell.addEventListener('click', () => {
    if(dropdownMenu.className == "drop-options drop-hide") {
        dropdownMenu.className = "drop-options drop-show";
        bellDot.style.opacity = 0;
    } else {
        dropdownMenu.className = "drop-options drop-hide";
        bellDot.style.opacity = 1;
    }
})

body.addEventListener('click', ()=> {
  dropdownMenu.className = "drop-options drop-hide";
  bellDot.style.opacity = 1;
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
const autoNames = ['Victoria Chambers','Dale Byrd','Dawn Wood','Dan Oliver','Ana Maria'];

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

selectMenu.addEventListener('change', ()=> {
  localStorage.setItem('selectOption', selectMenu.selectedIndex);
})

for (let i = 0; i < onOffButton.length; i++) {
    onButtonText[i].textContent = localStorage.getItem(`text${i}`);
    onOffButton[i].className = localStorage.getItem(`class${i}`);
    buttonDiv[i].className = localStorage.getItem(`buttonClass${i}`);
    selectMenu.selectedIndex = localStorage.getItem('selectOption');
}

//Charts


//Line Charts

function chartSelectorClearClass() {
  for (let i = 0;i < chartDataSelectors.length; i++) {
    chartDataSelectors[i].className = '';
  }
}

for (let i = 0; i < chartDataSelectors.length; i++) {
  chartDataSelectors[i].addEventListener('click', ()=> {
    if (chartDataSelectors[i] == chartDataSelectors[0]) {
      lineChart.data.datasets[0].data = [680,1000,750,1250,1750,1250,1500,1000,1500,2000,1500];
      lineChart.update();
      barChart.data.datasets[0].data = [140,75,175,100,225,200,100];
      barChart.update();
      doughnutChart.data.datasets[0].data = [140,75,17];
      doughnutChart.update();
      chartSelectorClearClass();
      chartDataSelectors[i].className = "selected";
    } else if (chartDataSelectors[i] == chartDataSelectors[1]) {
      lineChart.data.datasets[0].data = [1000,1900,750,1000,1750,800,1500,1000,500,1000,500];
      lineChart.update();
      barChart.data.datasets[0].data = [50,175,75,100,215,160,190];
      barChart.update();
      doughnutChart.data.datasets[0].data = [25,115,107];
      doughnutChart.update();
      chartSelectorClearClass();
      chartDataSelectors[i].className = "selected";
    } else if (chartDataSelectors[i] == chartDataSelectors[2]) {
      lineChart.data.datasets[0].data = [1500,1750,900,1050,1600,1200,1000,1800,2500,2000,1500];
      lineChart.update();
      barChart.data.datasets[0].data = [178,75,135,120,115,240,120];
      barChart.update();
      doughnutChart.data.datasets[0].data = [90,175,27];
      doughnutChart.update();
      chartSelectorClearClass();
      chartDataSelectors[i].className = "selected";
    } else if (chartDataSelectors[i] == chartDataSelectors[3]) {
      lineChart.data.datasets[0].data = [2500,700,1750,2250,750,850,500,1400,1200,1000,2200];
      lineChart.update();
      barChart.data.datasets[0].data = [145,175,75,150,225,170,140];
      barChart.update();
      doughnutChart.data.datasets[0].data = [55,195,117];
      doughnutChart.update();
      chartSelectorClearClass();
      chartDataSelectors[i].className = "selected";
    }        
  })
}


const myLineChart = document.getElementById('lineChart').getContext('2d');
Chart.defaults.global.legend.display = false; 
Chart.defaults.global.legend.labels.fontColor = "rgba(0,0,0,.6)";

let lineChart = new Chart (myLineChart, {
    type:'line',
    data: {
        labels:['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
        datasets:[{
            label: null,
            lineTension: 0,                                
            data: [680,1000,750,1250,1750,1250,1500,1000,1500,2000,1500],                                                              
            backgroundColor: 'rgba(112, 102, 179,.3)',
            borderColor: 'rgba(76, 60, 115,.8)',
            borderWidth: 1,
            pointBackgroundColor: "rgba(255,255,255,.8)",
            pointRadius: 6,
            pointBorderWidth: 2
        }]
    },
    options:{                                                              
        scales: {
            yAxes: [{
                gridLines: {
                    offsetGridLines: true,                                        
                },                                    
                ticks: {        
                    min: 500,                                
                    max: 2500,                                                                               
                }
            }],
            xAxes: [{
                gridLines: {
                    offsetGridLines: true,                                         
                },

            }]
        }
    }
});

//bar chart

const myBarChart = document.getElementById('barChart').getContext('2d');
let barChart = new Chart (myBarChart, {
  type:'bar',
  data: {
      labels:['S','M','T','W','T','F','S'],
      datasets:[{
          label: null,                              
          data: [140,75,175,100,225,200,100],                                                              
          backgroundColor: 'rgba(112, 102, 179, 1)',
          maxBarThickness: 35,
          minBarLength: 8
      }]
  },
  options:{                                                       
    scales: {
        yAxes: [{
            gridLines: {
                offsetGridLines: true,                                        
            },                                    
            ticks: {        
                min: 0,                                
                max: 250,                                                                               
            }
        }],
        xAxes: [{
            gridLines: {
                offsetGridLines: true,                                    
            },

        }]
    }
}
});


//doughnut chart

const myDoughnutChart = document.getElementById('doughnutChart').getContext('2d');
let doughnutChart = new Chart (myDoughnutChart, {
  type:'doughnut',
  data: {
      labels:['Phones','Tablets','Desktop'],
      datasets:[{
          label: null,
          lineTension: 0,                                
          data: [140,75,17],                                                              
          backgroundColor: [
            'rgba(112, 102, 179, 1)',
            'rgba(129, 245, 66, .7)',
            'rgba(66, 230, 245, .7)'
        ],
      }]
  },
  options:{                                                       
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 40,
              fontSize: 20
            }
          }
  }
});