var main = require('../main')
var should = require('should')

describe('test/main-test.js',() => {
  it('should equal 55 when n === 10',() => {
    main.fibonacci(10).should.equal(55)
  })
  it('should bigger than 0',() => {
    main.fibonacci(-1).should.throw('n > 0 must')
  })
  it('should smaller than 10',() => {
    main.fibonacci(11).should.throw('n <= 10 must')
  })
  it('must be a number',() => {
    main.fibonacci('fff').should.throw('n must be a number')
  })
})