import Handlebars from 'handlebars'

// Register helper functions
export function registerHelpers() {
  // Equality helper
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b
  })

  // Greater than helper
  Handlebars.registerHelper('gt', function (a, b) {
    return a > b
  })

  // Subtract helper
  Handlebars.registerHelper('subtract', function (a, b) {
    return a - b
  })

  // Limit array helper
  Handlebars.registerHelper('limit', function (arr, limit, options) {
    if (!Array.isArray(arr)) return ''
    
    let result = ''
    const end = Math.min(arr.length, limit)
    
    for (let i = 0; i < end; i++) {
      result += options.fn(arr[i])
    }
    
    return result
  })

  // JSON stringify helper for passing data to Alpine.js
  Handlebars.registerHelper('JSON.stringify', function (obj) {
    return JSON.stringify(obj)
  })
}