/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ARDUINO for procedure blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.ARDUINO.procedures');

goog.require('Blockly.ARDUINO');

Blockly.ARDUINO['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is not shadowed by
  // a local parameter.
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (block.getVars().indexOf(varName) == -1) {
      globals.push(Blockly.ARDUINO.variableDB_.getName(varName,
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  }
  // Add developer variables.
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.ARDUINO.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }
  globals = globals.length ?
      Blockly.ARDUINO.INDENT + 'global ' + globals.join(', ') + ';\n' : '';

  var funcName = Blockly.ARDUINO.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var xfix1 = '';
  if (Blockly.ARDUINO.STATEMENT_PREFIX) {
    xfix1 += Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_PREFIX, block);
  }
  if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
    xfix1 += Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.ARDUINO.prefixLines(xfix1, Blockly.ARDUINO.INDENT);
  }
  var loopTrap = '';
  if (Blockly.ARDUINO.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.ARDUINO.prefixLines(
        Blockly.ARDUINO.injectId(Blockly.ARDUINO.INFINITE_LOOP_TRAP, block),
        Blockly.ARDUINO.INDENT);
  }
  var branch = Blockly.ARDUINO.statementToCode(block, 'STACK');
  var returnValue = Blockly.ARDUINO.valueToCode(block, 'RETURN',
      Blockly.ARDUINO.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.ARDUINO.INDENT + 'return ' + returnValue + ';\n';
  }
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.ARDUINO.variableDB_.getName(variables[i],
        Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      globals + xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
  code = Blockly.ARDUINO.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.ARDUINO.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.ARDUINO['procedures_defnoreturn'] =
    Blockly.ARDUINO['procedures_defreturn'];

Blockly.ARDUINO['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.ARDUINO.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.ARDUINO.valueToCode(block, 'ARG' + i,
        Blockly.ARDUINO.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.ARDUINO['procedures_callreturn'](block);
  return tuple[0] + ';\n';
};

Blockly.ARDUINO['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.ARDUINO.valueToCode(block, 'CONDITION',
      Blockly.ARDUINO.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code += Blockly.ARDUINO.prefixLines(
        Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block),
        Blockly.ARDUINO.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.ARDUINO.valueToCode(block, 'VALUE',
        Blockly.ARDUINO.ORDER_NONE) || 'null';
    code += Blockly.ARDUINO.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.ARDUINO.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};
