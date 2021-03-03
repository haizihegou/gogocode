// 把简单的api转换成ast
const parse = require('./parse');
const filterProps = require('./filter-prop.js');

function getSelector(selectorCode, parseOptions, expando = 'g$_$g') {
    const selector = { nodeType: '', structure: {} };
    if (typeof selectorCode != 'string') {
        // 如果是通过builders造出来的ast结构，比如return语句
        selector.nodeType = selectorCode.nodeType;
        filterProps(selectorCode, selector.structure);
        selector.type = selectorCode.nodeType; // 兼容只用type匹配的选择器
        return selector;
    } else {
        selectorCode = selectorCode.replace(/\$_\$/g, expando);
    }
    let selectorAst = parse(selectorCode, parseOptions);
    if (selectorAst.content && selectorAst.content.children && selectorAst.content.children[0]) {
        filterProps(selectorAst.content.children[0], selector.structure);
        selector.nodeType = selectorAst.content.children[0].nodeType;
    }
    return selector;
}

module.exports = getSelector;