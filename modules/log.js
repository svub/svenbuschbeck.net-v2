export function log(...args) {
  console.log(...args)
  return args.pop()
}
