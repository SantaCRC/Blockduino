/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ARDUINO for logic blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.ARDUINO.logic');

goog.require('Blockly.ARDUINO');


Blockly.ARDUINO['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.ARDUINO.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = Blockly.ARDUINO.valueToCode(block, 'IF' + n,
        Blockly.ARDUINO.ORDER_NONE) || 'false';
    branchCode = Blockly.ARDUINO.statementToCode(block, 'DO' + n);
    if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
      branchCode = Blockly.ARDUINO.prefixLines(
          Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block),
          Blockly.ARDUINO.INDENT) + branchCode;
    }
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.ARDUINO.STATEMENT_SUFFIX) {
    branchCode = Blockly.ARDUINO.statementToCode(block, 'ELSE');
    if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
      branchCode = Blockly.ARDUINO.prefixLines(
          Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block),
          Blockly.ARDUINO.INDENT) + branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.ARDUINO['controls_ifelse'] = Blockly.ARDUINO['controls_if'];

Blockly.ARDUINO['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.ARDUINO.ORDER_EQUALITY : Blockly.ARDUINO.ORDER_RELATIONAL;
  var argument0 = Blockly.ARDUINO.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.ARDUINO.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.ARDUINO['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.ARDUINO.ORDER_LOGICAL_AND :
      Blockly.ARDUINO.ORDER_LOGICAL_OR;
  var argument0 = Blockly.ARDUINO.valueToCode(block, 'A', order);
  var argument1 = Blockly.ARDUINO.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.ARDUINO['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.ARDUINO.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.ARDUINO.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.ARDUINO['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.ARDUINO.ORDER_ATOMIC];
};

Blockly.ARDUINO['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.ARDUINO.ORDER_ATOMIC];
};

Blockly.ARDUINO['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.ARDUINO.valueToCode(block, 'IF',
      Blockly.ARDUINO.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.ARDUINO.valueToCode(block, 'THEN',
      Blockly.ARDUINO.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.ARDUINO.valueToCode(block, 'ELSE',
      Blockly.ARDUINO.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.ARDUINO.ORDER_CONDITIONAL];
};
