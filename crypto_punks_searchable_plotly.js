function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  // Submit Button handler
  function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var cryptopunkID = d3.select("#IDInput").node().value;
    console.log(cryptopunkID);
  
    // clear the input value
    d3.select("#IDInput").node().value = "";
  
    // Build the plot with the new ID
    buildPlot(cryptopunkID);
  }
  
  function buildPlot() {
    d3.json("localhost:8000/punk/").then(function(data) {
  console.log(data)
  
      // Grab values from the response json object to build the plots
      var cryptopunkID = data.map((d) => d["id"]);
      var price = data.map((d) => +d["Price"]);
      var date = unpack(data.map((d) => d["Date"], 0));
      var time = unpack(data.map((d) => d["Time"], 1));
      console.log(cryptopunkID, price)
  
      //function filterCryptoPunkID(crypto) {
        //return movie.imdbRating > 8.9;
      //}

      var trace1 = {
        type: "#scatter",
        mode: "lines",
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
  
      var data = [trace1, trace2];
  
      var layout = {
        title: `Crypto Punks Transactions `,
        xaxis: {
          range: ["2017-06-23", "2021-04-13"],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);
    });
}
  
  // Add event listener for submit button
//d3.select("#submit").on("click", handleSubmit);

buildPlot();