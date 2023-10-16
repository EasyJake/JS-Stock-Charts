// These conditions check the stock's name and return a specific color for each stock.
   
    

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {
   // const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=24&apikey=b2b0e11651294ee9a789558a1625b754'); 
    //const result = await response.json();
    //console.log(result);

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let response = await fetch ('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=24&apikey=b2b0e11651294ee9a789558a1625b754')
    // let result = await response.json();

//
    const { GME, MSFT, DIS, BNTX } = mockData;
    //
    const stocks = [GME, MSFT, DIS, BNTX];
//
    stocks.forEach( stock => stock.values.reverse())
//
    // TIME CHART
    // new Chart(timeChartCanvas.getContext('2d'), {
    //     type: 'line',
    //     data: {
    //         labels: stocks[0].values.map(value => value.datetime),
    //         datasets: stocks.map( stock => ({
    //             label: stock.meta.symbol,
    //             data: stock.values.map(value => parseFloat(value.high)),
    //             backgroundColor: getColor(stock.meta.symbol),
    //             borderColor: getColor(stock.meta.symbol),
    //         }))
    //     }
    // });
// Creating a new line chart for stock prices over time.
new Chart(timeChartCanvas.getContext('2d'), { // 'getContext' allows us to draw on the canvas.
    type: 'line', // This says we're making a line chart.
    data: {
        // We're setting up labels for our chart here. It's using all the date/times from the first stock's data.
        // This assumes all stocks have the same date/times, so we just need one set of labels.
        labels: stocks[0].values.map(value => value.datetime),

        // 'datasets' contains the info for each line we're drawing for each stock.
        // For each stock, we create an object with its specific settings.
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol, // This is the stock symbol (like 'GME') that will show up as the label.

            // 'data' is the actual information being charted. We're specifically charting the 'high' prices.
            // We use 'parseFloat' to make sure the values are numbers since we can't chart text.
            data: stock.values.map(value => parseFloat(value.high)),

            // The line and the area under the line will be colored with 'getColor', 
            // which gives us a specific color based on the stock symbol.
            backgroundColor: getColor(stock.meta.symbol), // color of the area under the line.
            borderColor: getColor(stock.meta.symbol), // color of the line itself.
        }))
    }
});

    // HIGHEST CHART (BAR GRAPH)
    function highestValue(values){
        let highest = values[0].high
        for (let i = 1; i < values.length; i++){
            if (highest < values[i].high){
                highest = values[i].high
            }
        }
        return highest
    }
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map((stock) => stock.meta.symbol),
            datasets: [{
                label: 'Highest Value',
                data: stocks.map(stock => highestValue(stock.values)),
                backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
                borderColor: stocks.map((stock) =>getColor(stock.meta.symbol)),
            }]
        }
    });

// AVERAGE STOCK PRICE (PIE CHART)
function averageValue (values) {
    let total = 0;
    values.forEach((value) => {
        total += value.high;
    });
    return total/values.length
}
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average Value',
                data: stocks.map(stock => highestValue(stock.values)),
                backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
                borderColor: stocks.map((stock) =>getColor(stock.meta.symbol)),
        }]
        }
    });
}                     
main()