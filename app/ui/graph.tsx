'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from "react";
import { getNextDay, getPattern } from "@/util";
import Controls from "./controls";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

export default function Graph({prices, dates, time, ticker}: {prices: number[], dates: string[], time: number, ticker:string}) {
  const [newPrices, setNewPrice] = useState(prices)
  const [newDates, setNewDates] = useState(dates)
  const [timestamp, setTimestamp] = useState(time)
  const [animations, setAnimations] = useState(true)
  const currentPrice = parseFloat(newPrices[newPrices.length-1].toFixed(2))
  const [pattern, setPattern] = useState(getPattern(currentPrice))

  let [nextDay, t] = getNextDay(timestamp)

  useEffect(()=>{
    function startTimeout(){
      let timeoutId: NodeJS.Timeout
      timeoutId= setTimeout(()=>{
        nextDay = nextDay.toString()
        const orders: number[] = [...pattern]
        let nextPrice: number = 0
        if (orders.length < 2 && orders.length > 0){
          nextPrice = orders[0]
          setPattern(getPattern(nextPrice))
        }else{
          nextPrice = orders[0]
          orders.shift()
          setPattern(orders)
        }

        if(newPrices.length > 99){
          setAnimations(false)
          const arr: number[] = [...newPrices, nextPrice]
          const arr2: string[] = [...newDates, nextDay]

          arr.shift()
          arr2.shift()

          setNewPrice(arr);
          setNewDates(arr2)

        }else{
          setNewPrice([...newPrices, nextPrice]);
          setNewDates([...newDates, nextDay])
        }

        t = Number(t)
        setTimestamp(t)
      }, 2500)
      return timeoutId
    }

    const myTimeout = startTimeout()

      return ()=>{clearTimeout(myTimeout)}
  },[newPrices, newDates, pattern])


    const data2 = {
        labels: newDates,
        datasets: [
            {
                label: `${ticker}`,
                data: newPrices,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            }
        ]
    }
    const options: object = {
      animation: animations,
        scales: {
          y: {
            title: {
              display: true,
              text: "Average price",
            },
            display: true,
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
            display: true,
          },
        },
      };


    return (
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Line data={data2} options={options}/>
        <Controls price={currentPrice} />
      </div>
    );
  }