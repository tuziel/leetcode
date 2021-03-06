const process = require('process');
const expect = require('chai').expect;
const { slice64 } = require('../utils');

const func = require('.');
const title = '43. 字符串相乘';
const tepmlate = ({ input, output }) =>
  `输入: ${slice64(input)}
      输出: ${slice64(output)}`;

const samples = [
  {
    input: ['0', '0'],
    output: '0',
  },
  {
    input: ['23987065489721647824', '21634879023649871264879213'],
    output: '518957260002494605206997122041960368684282512',
  },
  {
    input: ['123', '456'],
    output: '56088',
  },
  {
    input: ['0', '52'],
    output: '0',
  },
];

describe(title, function () {
  for (const i of samples) {
    process.send && process.send({ log: tepmlate(i) });
    it(tepmlate(i), function () {
      expect(func(...i.input)).to.equal(i.output);
    });
  }
});
