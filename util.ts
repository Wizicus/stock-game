
export function adjustStock(price: number){
    //randomly increase or decrease given number and return it
    //todo: make more random
    let num = Math.floor(Math.random() * 2)
    switch(num){
        case 1:
            price = price - (price/100)
            break
        default:
            price = price + (price/100)
            break
        }

    return price
}

function adjustPattern(pattern: number[], multiplier: number = 1){
    let nextPrice = pattern[pattern.length-1]
    pattern.push((nextPrice + ((nextPrice/100)) * multiplier) )
}


function generatePattern(price: number){
    let rand = Math.floor((Math.random() * 4) + 1)
    let pattern: number[] = [adjustStock(price)]
    let nextPrice
    let nums
    switch(rand){
        case 1://stock crashes
            for(let i=0; i < 4; i++){
                adjustPattern(pattern,-1)
                }
            break;
        case 2://stock soars
            for(let i=0; i < 5; i++){
                adjustPattern(pattern)
                }
            break;
        case 3://small raises big spike then falls
            nums = [2, 1, 2, 2,-2, -2, -1,-2, 2]
            for(let i=0; i < (nums.length); i++){
                adjustPattern(pattern,nums[i])
            }
            break;
        case 4://samll crash small short gain big gain normalises
            nums = [-1,-1,3,-1,1,1,3,3,3,-3,-3,-2,-2,-1]
            for(let i=0; i < (nums.length); i++){
                adjustPattern(pattern,nums[i])
            }
            break;
        default:
            nextPrice = pattern[pattern.length-1]
            pattern.push(nextPrice)
    }
    return pattern
}

export function getPattern(price: number){
    let orders: number[] = []
    let rand = Math.floor((Math.random() * 100) + 1)
    let nextPrice
    switch(true){
        case(rand >= 1 && rand <= 98):
            nextPrice = adjustStock(price)
            orders.push(nextPrice)
            break
        case(rand >= 99 && rand <= 100):
            let pattern = generatePattern(price)
            orders = orders.concat(pattern)
            break;
        default:
            orders.push(price)
    }
    return orders
}



export function getNextDay(date: number){
    let tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate()+1)
    let timestamp = new Date(tomorrow).getTime()
    let dateFormat = `${tomorrow.getMonth()+1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`

    return([dateFormat, timestamp])
}
