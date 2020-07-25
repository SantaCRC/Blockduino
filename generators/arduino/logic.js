/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating C for logic blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */
goog.provide('Blockly.ARDUINO.logic');
goog.require('Blockly.ARDUINO');
Blockly.ARDUINO = new Blockly.Generator('ARDUINO');

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
        Blockly.ARDUINO.ORDER_NONE) || 'False';
    branchCode = Blockly.ARDUINO.statementToCode(block, 'DO' + n) ||
        Blockly.ARDUINO.PASS;
    if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
      branchCode = Blockly.ARDUINO.prefixLines(
          Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block),
          Blockly.ARDUINO.INDENT) + branchCode;
    }
    code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.ARDUINO.STATEMENT_SUFFIX) {
    branchCode = Blockly.ARDUINO.statementToCode(block, 'ELSE') ||
        Blockly.ARDUINO.PASS;
    if (Blockly.ARDUINO.STATEMENT_SUFFIX) {
      branchCode = Blockly.ARDUINO.prefixLines(
          Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX, block),
          Blockly.ARDUINO.INDENT) + branchCode;
    }
    code += 'else:\n' + branchCode;
  }
  return code;
};


Blockly.ARDUINO.logic_compare = function(opt_dropParens) {
  // Comparison operator.
  var mode = this.getInputLabelValue('B');
  var operator = Blockly.ARDUINO.logic_compare.OPERATORS[mode];
  var argument0 = Blockly.ARDUINO.valueToCode(this, 'A') || '0';
  var argument1 = Blockly.ARDUINO.valueToCode(this, 'B') || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  if (!opt_dropParens) {
    code = '(' + code + ')';
  }
  return code;
};

Blockly.ARDUINO.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.ARDUINO.logic_operation = function(opt_dropParens) {
  // Operations 'and', 'or'.
  var argument0 = Blockly.ARDUINO.valueToCode(this, 'A') || 'false';
  var argument1 = Blockly.ARDUINO.valueToCode(this, 'B') || 'false';
  var operator = (this.getInputLabelValue('B') == 'AND') ? '&&' : '||';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  if (!opt_dropParens) {
    code = '(' + code + ')';
  }
  return code;
};

Blockly.ARDUINO.logic_negate = function(opt_dropParens) {
  // Negation.
  var argument0 = Blockly.ARDUINO.valueToCode(this, 'BOOL') || 'false';
  var code = '!' + argument0;
  if (!opt_dropParens) {
    code = '(' + code + ')';
  }
  return code;
};

Blockly.ARDUINO.logic_boolean = function() {
  // Boolean values true and false.
  return (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
};
