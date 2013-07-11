
/**
 * Module dependencies.
 */

var chai = require('chai')
  , domify = require('domify')
  , dom = require('dom')
  , query = require('query')
  , dynamicRows = require('dynamic-rows')
  , should = chai.should();

/**
 * Tests.
 */

describe('DynamicRows', function(){
  var rows
    , template
    , root;
  before(function(){
    root = domify('<ul></ul>');
    template = domify('<span data-index="{index}"></span>');
    rows = dynamicRows(root, template);
  });
  describe('#append', function(){
    it('should append rows', function(){
      rows.append();
      dom(query('span', root)).attr('data-index').should.equal('0');
    });
    it('should a row after the first', function(){
      var spans;
      rows.append();
      rows.template = domify(
	'<span class="test" data-index="{index}"></span>'
      );
      rows.append(0);
      spans = query.all('span', root);
      spans.length.should.equal(3);
      console.log(spans);
      dom(spans[1]).attr('data-index').should.equal('1');
      dom(spans[1]).attr('class').should.equal('test');
    });
  });
  describe('#remove', function(){
    it('should remove the third row', function(){
      var spans;
      rows.remove(2);
      spans = query.all('span', root);
      console.log(spans);
      spans.length.should.equal(2);
      dom(spans[1]).attr('class').should.equal('test');
    });
  });
});