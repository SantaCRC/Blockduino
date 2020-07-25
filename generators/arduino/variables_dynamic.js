/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ARDUINO for dynamic variable blocks.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.ARDUINO.variablesDynamic');

goog.require('Blockly.ARDUINO');
goog.require('Blockly.ARDUINO.variables');


// ARDUINO is dynamically typed.
Blockly.ARDUINO['variables_get_dynamic'] = Blockly.ARDUINO['variables_get'];
Blockly.ARDUINO['variables_set_dynamic'] = Blockly.ARDUINO['variables_set'];
