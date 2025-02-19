import Graph from "./ui/graph"

const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-15)
const formatToday = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`
const formatYesterday = `${yesterday.getFullYear()}-${(yesterday.getMonth()+1).toString().padStart(2, '0')}-${(yesterday.getDate()-1).toString().padStart(2, '0')}`
console.log(formatToday)
console.log(formatYesterday)

const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${formatYesterday}/${formatToday}?adjusted=true&sort=asc&apiKey=AKvXKL0saQx8gH59kkDgsFzEJsTmcrRh`
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
  try{
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    return json
  }
  catch(error){
    throw error
  }

};

const data = await getData()
const length = data.results.length
const prices: Array<number> = []
const dates: string[] = []
for(let i=0; i < length; i++){
  const price = data.results[i].vw
  prices.push(price)
  const date = new Date(data.results[i].t)
  const dateFormat = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
  dates.push(dateFormat)
}
const timestamp = data.results[data.results.length-1].t
const ticker = data.ticker

export default function Home() {
  return (
    <>
      <main className="mt-[5vh]">
        <Graph prices={prices} dates={dates} time={timestamp} ticker={ticker}/>
      </main>
    </>
  );
}
