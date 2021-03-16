/* eslint-disable prettier/prettier */
// Read 'example.js' as text
const fs = require('fs')
const src = fs.readFileSync('./webpack/node_modules/@fingerprintjs/fingerprintjs-pro/dist/fp.esm.min.js', 'utf-8')

const { refactor } = require('shift-refactor')
const Shift = require('shift-ast')

// Create a refactor query object
const $script = refactor(src)

const strings = $script(`Script > :first-child ArrayExpression > .elements`)

const destringifyDeclarator = $script(`VariableDeclarator[binding.name="b"][init.params.items.length=2]`)

destringifyDeclarator.rename('destringify')

const destringifyOffset = destringifyDeclarator.$(`BinaryExpression > LiteralNumericExpression`)

const findIndex = (c /*, d*/ ) => c - destringifyOffset.first().value

$script(`CallExpression[callee.name="destringify"]`).replace((node) => {
    return new Shift.LiteralStringExpression({
        value: strings.get(findIndex(node.arguments[0].value)).value,
    })
})

// $script(`[binding.name="a"]`).delete()
// $script(`[binding.name="destringify"]`).delete()

$script.convertComputedToStatic()

console.log($script.print())

// Select all `LiteralStringExpression`s
// const $stringNodes = $script('LiteralStringExpression')
//
// // Turn the string AST nodes into real JS strings
// const strings = $stringNodes.codegen()
//
// // Output the strings to the console
// strings.forEach((string) => console.log(string))