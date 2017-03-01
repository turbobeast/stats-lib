function pipe (...funcs) {
  return function recurse (...vals) {
    if (!funcs.length) {
      return vals.length > 1 
        ? vals
        : vals[0]
    }

    const nextVal = funcs.shift()(...vals)
    return (Array.isArray(nextVal)) 
      ? recurse(...nextVal)
      : recurse(nextVal)
  }
}

const sub = (one, two) => one - two
const popshift = (...set) => [set.pop(), set.shift()]
const sortSet = (...set) => [...set.sort((a, b) => a > b)]

const mean = (...set) => set.reduce((a, b) => a + b) / set.length
const half = (...set) => Math.ceil(set.length * 0.5)
const interQuartileSplit = (half) => (...set) => [median(...set.slice(0, half - 1)), median(...set.slice(half))]
const mapVariance = (sm) => (...arr) => arr.map((a) => (a - sm) * (a - sm))

const variance = (...set) => {
  const varyMapped = pipe(mean, mapVariance)(...set)
  return pipe(varyMapped, mean)(...set)
}

const deviation = (...set) => pipe(variance, Math.sqrt)(...set) // Math.sqrt(variance(...set))
const range = (...set) => pipe(sortSet, popshift, sub)(...set) // sortSet(...set).pop() - sortSet(...set).shift()

const median = (...set) => {
  const half = Math.floor(set.length * 0.5)
  const sorted = sortSet(...set)
  return (set.length % 2 !== 0)
    ? sorted.slice(half).shift()
    : mean(...sorted.slice(half - 1, half + 1))
}

const interquartileRange = (...set) => {
  const getInterquartileValues =  pipe(half, interQuartileSplit)(...set)
  return pipe(sortSet, getInterquartileValues, popshift, sub)(...set)
}

const mode = (...set) => {
  let maxCount = 0
  const counterObj = {}
  return set.reduce((a, b) => { 
    if (!counterObj[b]) {
      counterObj[b] = { count: 0 }
    }
    ++counterObj[b].count
    let mode = a
    if (counterObj[b].count > maxCount) {
      maxCount = counterObj[b].count
      mode = b
    }
    return mode
  })
}

module.exports = { mean, variance, deviation, range, median, interquartileRange, mode }
