// async function main() {
//     const apiKey = "80f7e790109144a387df82ba3d16e5fa";
    
//     const timeChartCanvas = document.querySelector('#time-chart');
//     const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
//     const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//     const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1d&apikey=${apiKey}`);
//     const data = await response.json();
    
//     const { GME, MSFT, DIS, BNTX } = data;
//     const stocks = [GME, MSFT, DIS, BNTX];
    
//     console.log(stocks);
// }

// main();


async function main() {
    const apiKey = "b2b0e11651294ee9a789558a1625b754";
    
    try {
        const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log(data); // Log the entire data to inspect its structure

        const { GME, MSFT, DIS, BNTX } = data;
        const stocks = [GME, MSFT, DIS, BNTX];
        
        console.log(stocks);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

main();
