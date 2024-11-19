/**
 * Find value inside array
 */

export function find<X, V>(mapFn: (_1: X) => V): (xs: X[]) => undefined | V
export function find<X, V>(xs: X[], mapFn: (_1: X) => V): undefined | V
export function find<X, V>(xs: X[] | ((value: X) => V), mapFn?: (value: X) => V) {
  if (typeof xs === 'function') {
    const mapFn = xs
    return (xs: X[]) => find(xs, mapFn)
  }

  let value: unknown

  for (const x of xs) {
    value = mapFn!(x)
    // mapped value not nullable
    if (value !== undefined && value !== null) {
      break
    }
  }

  return value
}

/**
 * Toggle items inside array
 */

export function toggleItems<X>(items: X[]): (xs: X[]) => X[]
export function toggleItems<X>(xs: X[], items: X[]): X[]
export function toggleItems<X>(xs: X[], items?: X[]) {
  if (!Array.isArray(items)) {
    const items = xs
    return (xs: X[]) => toggleItems(xs, items)
  }

  const xsSet = new Set(xs)
  const itemsSet = new Set(items)

  const xsToggled = xs.filter(item => !itemsSet.has(item))
  const itemsToggled = items.filter(item => !xsSet.has(item))

  return xsToggled.concat(itemsToggled)
}

/**
 * of
 */

export const of = <V>(xs: Of<V>) => {
  return (Array.isArray(xs) ? xs : [xs]).filter(
    (x): x is Exclude<V, null | undefined> => x !== null && x !== undefined
  )
}

export type Of<V> = V | V[]

/**
 * takeOnly:
 * take element if is only element in array
 */

export const takeOnly = <X>(xs: X[]) => {
  if (xs.length === 1) return xs[0]
}
