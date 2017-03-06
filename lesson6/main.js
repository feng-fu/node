var fibonacci = function (n) {
    if ( n > 10 ) {
      throw new Error('n <= 10 must')
    }

    if ( n < 0 ) {
      throw new Error('n > 0 must');
    }
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }

    if (typeof n !== 'number'){
      throw new Error('n must be a number');
    }
    return fibonacci(n - 1) + fibonacci(n - 2)

}

if (require.main === module) {
  console.log(process.argv)
  var n = Number(process.argv[2])
  console.log(`fibonacci(${n}):${fibonacci(n)}`)
}


exports.fibonacci = fibonacci