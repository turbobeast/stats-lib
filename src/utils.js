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

function kwikSort (...ray) {
  if (ray.length < 2) { return ray }
  const smallies = []
  const biggies = []
  const pivot = ray.pop()
  for (let i = 0; i < ray.length; i += 1) {
    if (ray[i] < pivot) {
      smallies.push(ray[i])
    } else {
      biggies.push(ray[i])
    }
  }

  return [...kwikSort(...smallies), pivot, ...kwikSort(...biggies)]
}

const sub = (one, two) => one - two
const popshift = (...set) => [set.pop(), set.shift()]
const swap = (a, b) => [b, a]
const squares = (...arr) => arr.map((a) => a * a)

const half = (...set) => Math.floor(set.length * 0.5)
const twoChunks = (half) => (...set) => [set.slice(0, half), set.slice(set.length % 2 === 0 ? half : half + 1)]
const mapTwoDArrayWith = (fn) => (ray) => ray.map((inner) => fn(...inner))

module.exports = { pipe, sub, swap, popshift, kwikSort, half, twoChunks, mapTwoDArrayWith, squares }
