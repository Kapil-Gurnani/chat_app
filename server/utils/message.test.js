var {generateMessage} = require('./message');
describe('generateMessage', () => {
var expect = require('expect');

    it('should generate correct message object', () => {
        var from = 'JEN';
        var text = 'Some message';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});