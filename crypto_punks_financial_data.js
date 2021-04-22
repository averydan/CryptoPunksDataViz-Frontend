var url = "CryptoPunk_Market_Data.csv"

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  function buildPlot() {
    d3.csv(url).then(function(data) {
  console.log(data)

      // Grab values from the data json object to build the plots
      var date = data.map((d) => d['DATE']);
      var time = data.map((d) => d["TIME"]);
      var cryptopunkID = data.map((d) => d["CRYPTOPUNK ID"]);
      var price = data.map((d) => +d["PRICE"]);
      console.log(date, price)
  
      var trace1 = {
        type: "scatter",
        marker: "star-diamond",
        mode: "lines",
        name: "Crypto Punks Prices",
        x: date,
        y: price,
        line: {
          color: "#17BECF"
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: `Crypto Punks Prices`,
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
  
  buildPlot();
  