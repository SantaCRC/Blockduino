/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ARDUINO for variable blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.ARDUINO.variables');

goog.require('Blockly.ARDUINO');


Blockly.ARDUINO['variables_get'] = function(block) {
    // Variable getter.
    var code = Blockly.ARDUINO.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME);
    return [code, Blockly.ARDUINO.ORDER_ATOMIC];
};

Blockly.ARDUINO['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.ARDUINO.valueToCode(block, 'VALUE',
            Blockly.ARDUINO.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.ARDUINO.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' = ' + argument0 + ';\n';
};
