// var Tabulator = require('tabulator-tables');
// var Tabulator = require('tabulator-tables');
// from 'tabulator-tables';
//define data array
// fetch('http://127.0.0.1:5000/punks', {mode: 'no-cors'})
// .then(response => response.json())
// .then(response => console.log(response));
// .then(data => console.log(data));

function displayResults(output) {
  console.log(output)
  let tabledata = output['Punk_Data']
  var table = new Tabulator("#Dustins_Awesome_Table", {
    data:tabledata, //assign data to table
    // autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    // adding column layout order
    columns:[                 //define the table columns
      {title:"Punk ID", field:"ID"},
      {title:"Accessories Count", field:"Count"},
      {title:"Accessories", field:"Accessories", hozAlign:"left"},
      {title:"Gender", field:"Type", width:95},
      ],
  });
}
var buildplot = d3.select("brian_stuff")

  /**  
   * @param {array} rows
   * @param {integer} index 
   **/ 

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


function displayMarket(data){
  
    //console.log(output)
    //let data = output

      // Grab values from the response json object to build the plots
    var cryptopunkID = data.Market_Data.map((d) => d["ID"]);
    var price = data.Market_Data.map((d) => +d["Price"]);
    var date = data.Market_Data.map((d) => d["Date"]);
    var time = data.Market_Data.map((d) => d["Time"]);
    console.log(date, price)

    var trace1 = {
      type: "scatter",
      mode: "lines+markers",
      name: "Crypto Punks Prices",
      x: date,
      y: price,
      line: {
      color: "#17BECF"
      }
    };
  
      // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      x: date,
      y: price,
    };
  
    var chartdata = [trace1, trace2];
  
    var layout = {
      title: `Crypto Punks Transactions `,
      xaxis: {
        autorange: true,
        type: "date",
        text: 'Date'
      },
      yaxis: {
        autorange: true,
        type: "linear",
        text: 'Price ETH',
        title: {
          text: 'Price ETH',
          font: {
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
  
    Plotly.newPlot("plot", chartdata, layout);
}

function resetdata(){
  buildplot.html("")
}  



function fetchById(inp) {
  fetch(`http://127.0.0.1:5000/punk/${inp}`)
  .then(response => response.json())
  .then(function (data) {
    displayResults(data);
    resetdata()
    displayMarket(data)
    

});
}

fetchById(1)

// console.log(fetchById())
// const response = await fetch('http://127.0.0.1:5000/punks', {
//   method: 'GET', // *GET, POST, PUT, DELETE, etc.
//   mode: 'no-cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(data) // body data type must match "Content-Type" header
// });
// return response.json(); // parses JSON response into native JavaScript objects
// // }

// postData('https://example.com/answer', { answer: 42 })
// .then(data => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

// var tabledata =
// [
//   {
//     "Accessories": 3, 

//     "Count": "Female", 
//     "ID": 0, 
//     "Type": 0
//   }, 
//   {
//     "Accessories": 2, 
//     "Count": "Male", 
//     "ID": 1, 
//     "Type": 1
//   }, 
//   {
//     "Accessories": 1, 
//     "Count": "Female", 
//     "ID": 2, 
//     "Type": 2
//   }, 
//   {
//     "Accessories": 3, 
//     "Count": "Male", 
//     "ID": 3, 
//     "Type": 3
//   }, 
//   {
//     "Accessories": 4, 
//     "Count": "Male", 
//     "ID": 4, 
//     "Type": 4
//   }
// ];

//initialize table
// var table = new Tabulator("#Dustins_Awesome_Table", {
//   data:tabledata, //assign data to table
//   autoColumns:true, //create columns from data field names
// });

document.getElementById('search_form').onsubmit = function() { 
  // console.log(document.getElementById('punk_id').value);
  let value = document.getElementById('punk_id').value
  fetchById(value)
  // let imageId = str.padStart(4, value)
  console.log(value.padStart(4, 0))
  document.getElementById("crypto").src="https://www.larvalabs.com/public/images/cryptopunks/punk" + value.padStart(4, 0) + ".png";
  document.getElementById("larvaLab").href="https://www.larvalabs.com/cryptopunks/details/" + value;
  return false;
};