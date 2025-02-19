import Graph from "./ui/graph"

const url = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=AKvXKL0saQx8gH59kkDgsFzEJsTmcrRh'
{/*{ticker: stock ticker, resultsCount: number of matching results,
  results[{
    v: trading volume in given time period
    vw: volume weighted average price
    o: the open price
    c: the close price
    h: highest price
    l: lowest price
    t: timestamp
    n: number of transactions in the given timeperiod
  }]} */}

async function getData(){
  console.log('--------in getData--------')
  try{
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    console.log(json)
    console.log('--------exiting getData--------')
    return json
  }
  catch(error: any){
    throw error
    console.error(error.message)
  }

};

const data = await getData()
const length = data.results.length
let prices: Array<number> = []
let dates: string[] = []
for(let i=0; i < length; i++){
  let price = data.results[i].vw
  prices.push(price)
  let date = new Date(data.results[i].t)
  console.log(date)
  console.log(date.getDate())
  const dateFormat = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
  dates.push(dateFormat)
}

export default function Home() {
  return (
    <div>
      <main>
        <Graph prices={prices} dates={dates} data={data}/>
      </main>

    </div>
  );
}
