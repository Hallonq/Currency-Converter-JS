
var converter = (function () {
       function start() {
           api.data('EUR');
           var ratesList = sessionStorage.getItem("rates");
           var rates = JSON.parse(ratesList);
           populateLists(rates);
   
           var d = new Date();
           let currentTime = d.getTime();
           console.log(currentTime);
           sessionStorage.setItem("timestamp", currentTime);
       }
   
       // Checks if the api data is older than one hour
   
       function checkExpiration() {
           var hours = 1;
           let timestamp = sessionStorage.getItem("timestamp");
           var d = new Date();
           let currentTime = d.getTime();
   
           if(currentTime-timestamp > hours*60*60*1000) {
               localStorage.clear()
               start();
           }
       }
   
       // Retrieves the currency and input to work with
   
       function currency() {
           checkExpiration();
   
           var endCur = document.querySelector('#end-currency');
           var startCur = 1;
           var startValue = document.querySelector('#start-value');
           console.log('end currency: ' + endCur.value);
           console.log('start currency: ' + startCur);
           console.log('textbox value: ' + startValue.value)
   
           var result = calculate(endCur.value, startCur, startValue.value);
           console.log('result is: ' + result);
   
           var endValue = document.querySelector('#end-value');
           endValue.value = result;
       }
   
       // Calculates result
   
       function calculate(a, b, c) {
           var result = a * b * c;
   
           return result;
       }
       // Method called when the base currency is changed
   
       function changeCurrency() {
           checkExpiration();
   
           var startCurrency = document.querySelector('#start-currency');
           var base = startCurrency.options[startCurrency.selectedIndex]
           console.log(base.text);
           api.data(base.text);
       }
   
       // Takes care of the changes that come from choosing different start currency
   
       function update() {
           checkExpiration();
   
           var ratesList = sessionStorage.getItem("rates");
   
           var rates = JSON.parse(ratesList);
           console.log(rates);
           cleanLists();
           populateLists(rates);
   
           currency();
       }
   
       // Methods that handle the dropdown lists
   
       function cleanLists() {
           let startCurList = document.querySelector('#start-currency');
           let endCurList = document.querySelector('#end-currency');
           startCurList.options.length = 0;
           endCurList.options.length = 0;
       }
   
       function populateLists(rates) {
           let startCurList = document.querySelector('#start-currency');
           let endCurList = document.querySelector('#end-currency');
   
           var base = sessionStorage.getItem('base');
           let baseItem = document.createElement('option');
           baseItem.innerHTML = JSON.parse(base);
           baseItem.value = 1;
           startCurList.appendChild(baseItem);
   
           for (let item of Object.entries(rates)) {
   
               let newSelectItem = document.createElement('option');
               newSelectItem.innerHTML = item[0];
               newSelectItem.value = item[1];
   
               startCurList.appendChild(newSelectItem);
           }
   
           for (let item of Object.entries(rates)) {
   
               let newSelectItem = document.createElement('option');
               newSelectItem.innerHTML = item[0];
               newSelectItem.value = item[1];
   
               endCurList.appendChild(newSelectItem);
           }
   
       }
   
       return {
           init: start,
           update: update,
           convert: changeCurrency,
           calculate: currency
       }
   
   })();
   
   // Initiates app
   
   converter.init();