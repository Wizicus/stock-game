'use client'

import { useState } from "react"

export default function Controls({price}: {price:number}){
    const [balance, setBalance] = useState(1000)
    const [stockAmount, setStockAmount] = useState(0)

    function buy(){
        let num = balance - price
        num = parseFloat(num.toFixed(2))
        setBalance(num)
        setStockAmount(stockAmount + 1)
    }
    function sell(){
        if(stockAmount > 0){
            let num = balance + price
            num = parseFloat(num.toFixed(2))
            setBalance(num)
            setStockAmount(stockAmount -1)
        }
    }
    return(
        <div className="flex flex-row justify-center gap-[6vw] items-center ml-[2vw] mr-[2vw] ">
            <button className="
                text-red-500
                border border-amber-300
                pb-[5px] pt-[5px] pl-[10px] pr-[10px]
                bg-orange-950
                w-[80px]
                rounded-md " onClick={sell}>
                sell
            </button>
            <p>shares: <u>{stockAmount}</u></p>
            <p>share price: <u>${price}</u></p>
            <p>${balance}</p>
            <button className="
                text-green-500
                border border-lime-400
                pb-[5px] pt-[5px] pl-[10px] pr-[10px]
                bg-emerald-900
                w-[80px]
                rounded-md" onClick={buy}>
                buy
            </button>
        </div>
    )
}