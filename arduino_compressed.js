// Do not edit this file; automatically generated by build.py.
'use strict';

Blockly.ARDUINO=new Blockly.Generator("ARDUINO");Blockly.ARDUINO.stackSize=80;Blockly.ARDUINO.RESERVED_WORDS_="auto,const,double,float,int,short,struct,unsigned,break,continue,else,for,long,signed,switch,void,case,default,enum,goto,register,sizeof,typedef,volatile,char,do,extern,if,return,static,union,while,asm,dynamic_cast,namespace,reinterpret_cast,try,bool,explicit,new,static_cast,typeid,catch,false,operator,template,typename,class,friend,private,this,using,const_cast,inline,public,throw,virtual,delete,mutable,protected,true,wchar_t";
Blockly.ARDUINO.init=function(){Blockly.ARDUINO.definitions_={};if(Blockly.Variables){Blockly.ARDUINO.variableDB_?Blockly.ARDUINO.variableDB_.reset():Blockly.ARDUINO.variableDB_=new Blockly.Names(Blockly.ARDUINO.RESERVED_WORDS_.split(","));for(var a=[],b=Blockly.Variables.allVariables(),c=0;c<b.length;c++){var d="int",e=b[c].match(/^_([^_]+)/);e&&(d=e[1]);a[c]=d+" "+Blockly.ARDUINO.variableDB_.getDistinctName(b[c],Blockly.Variables.NAME_TYPE)+";"}Blockly.ARDUINO.definitions_.variables=a.join("\n");
Blockly.ARDUINO.threads=[]}};
Blockly.ARDUINO.finish=function(a){var b=[];for(d in Blockly.ARDUINO.definitions_)b.push(Blockly.ARDUINO.definitions_[d]);var c="";var d=Blockly.Procedures.allProcedures();d[0].forEach(function(e){c+="void "+e+"();\n"});d[1].forEach(function(e){var g="int",f=e.match(/^_([^_]+)/);f&&(g=f[1]);c+=g+" "+e+"();\n"});c+="\n\n";c+=b.join("\n")+"\n\n";c+=a+"\n\n";c+="void init(){\n";for(x in Blockly.mainWorkspace.wiring)a=Blockly.mainWorkspace.wiring[x].type,c="servo"==a||"led"==a||"output"==a?c+("pinMode("+
x+", OUTPUT);\n"):c+("pinMode("+x+", INPUT);\n");for(a=1;a<Blockly.ARDUINO.threads.length;a++)b=Blockly.ARDUINO.threads[a],c+=" avr_thread_start(&"+b+"_context, "+b+", "+b+"_stack, sizeof("+b+"_stack));\n";c+="}\n";Blockly.ARDUINO.threads.length||(c+="void thread_0(){for(;;);}");return c};Blockly.ARDUINO.scrubNakedValue=function(a){return a+";\n"};Blockly.ARDUINO.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.ARDUINO.scrub_=function(a,b){if(null===b)return"";var c="";if(!a.outputConnection||!a.outputConnection.targetConnection){var d=a.getCommentText();d&&(c+=Blockly.Generator.prefixLines(d,"// ")+"\n");for(var e=0;e<a.inputList.length;e++)a.inputList[e].type==Blockly.INPUT_VALUE&&(d=a.inputList[e].targetBlock())&&(d=Blockly.Generator.allNestedComments(d))&&(c+=Blockly.Generator.prefixLines(d,"// "))}e=a.nextConnection&&a.nextConnection.targetBlock();e=this.blockToCode(e);return c+b+e};
Blockly.ARDUINO.topBlockInit=function(){var a="thread_"+Blockly.ARDUINO.threads.length;Blockly.ARDUINO.threads.push(a);return Blockly.ARDUINO.threads.length-1?"uint8_t "+a+"_stack[80];\navr_thread_context "+a+"_context;\nvoid "+a+"(){":"void "+a+"(){"};Blockly.ARDUINO.topBlockFinish=function(){return" for(;;)avr_thread_sleep(1000);\n}\n\n"};
Blockly.ARDUINO.colour={};Blockly.ARDUINO.colour_picker=function(a){return[Blockly.ARDUINO.quote_(a.getFieldValue("COLOUR")),Blockly.ARDUINO.ORDER_ATOMIC]};Blockly.ARDUINO.colour_random=function(a){return[Blockly.ARDUINO.provideFunction_("colour_random",["function "+Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_+"() {","  return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);","}"])+"()",Blockly.ARDUINO.ORDER_FUNCTION_CALL]};
Blockly.ARDUINO.colour_rgb=function(a){var b=Blockly.ARDUINO.valueToCode(a,"RED",Blockly.ARDUINO.ORDER_COMMA)||0,c=Blockly.ARDUINO.valueToCode(a,"GREEN",Blockly.ARDUINO.ORDER_COMMA)||0;a=Blockly.ARDUINO.valueToCode(a,"BLUE",Blockly.ARDUINO.ORDER_COMMA)||0;return[Blockly.ARDUINO.provideFunction_("colour_rgb",["function "+Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_+"($r, $g, $b) {","  $r = round(max(min($r, 100), 0) * 2.55);","  $g = round(max(min($g, 100), 0) * 2.55);","  $b = round(max(min($b, 100), 0) * 2.55);",
"  $hex = '#';","  $hex .= str_pad(dechex($r), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($g), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($b), 2, '0', STR_PAD_LEFT);","  return $hex;","}"])+"("+b+", "+c+", "+a+")",Blockly.ARDUINO.ORDER_FUNCTION_CALL]};
Blockly.ARDUINO.colour_blend=function(a){var b=Blockly.ARDUINO.valueToCode(a,"COLOUR1",Blockly.ARDUINO.ORDER_COMMA)||"'#000000'",c=Blockly.ARDUINO.valueToCode(a,"COLOUR2",Blockly.ARDUINO.ORDER_COMMA)||"'#000000'";a=Blockly.ARDUINO.valueToCode(a,"RATIO",Blockly.ARDUINO.ORDER_COMMA)||.5;return[Blockly.ARDUINO.provideFunction_("colour_blend",["function "+Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_+"($c1, $c2, $ratio) {","  $ratio = max(min($ratio, 1), 0);","  $r1 = hexdec(substr($c1, 1, 2));","  $g1 = hexdec(substr($c1, 3, 2));",
"  $b1 = hexdec(substr($c1, 5, 2));","  $r2 = hexdec(substr($c2, 1, 2));","  $g2 = hexdec(substr($c2, 3, 2));","  $b2 = hexdec(substr($c2, 5, 2));","  $r = round($r1 * (1 - $ratio) + $r2 * $ratio);","  $g = round($g1 * (1 - $ratio) + $g2 * $ratio);","  $b = round($b1 * (1 - $ratio) + $b2 * $ratio);","  $hex = '#';","  $hex .= str_pad(dechex($r), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($g), 2, '0', STR_PAD_LEFT);","  $hex .= str_pad(dechex($b), 2, '0', STR_PAD_LEFT);","  return $hex;","}"])+
"("+b+", "+c+", "+a+")",Blockly.ARDUINO.ORDER_FUNCTION_CALL]};Blockly.ARDUINO=new Blockly.Generator("ARDUINO");Blockly.ARDUINO.controls_if=function(){var a=0,b=Blockly.ARDUINO.valueToCode(this,"IF"+a,!0)||"false",c=Blockly.ARDUINO.statementToCode(this,"DO"+a),d="if ("+b+") {\n"+c+"}";for(a=1;a<=this.elseifCount_;a++)b=Blockly.ARDUINO.valueToCode(this,"IF"+a,!0)||"false",c=Blockly.ARDUINO.statementToCode(this,"DO"+a),d+=" else if ("+b+") {\n"+c+"}";this.elseCount_&&(c=Blockly.ARDUINO.statementToCode(this,"ELSE"),d+=" else {\n"+c+"}");return d+"\n"};
Blockly.ARDUINO.controls_whileUntil=function(){var a=Blockly.ARDUINO.valueToCode(this,"BOOL",!0)||"false",b=Blockly.ARDUINO.statementToCode(this,"DO");"UNTIL"==this.getTitleValue("MODE")&&(a.match(/^\w+$/)||(a="("+a+")"),a="!"+a);return"while ("+a+") {\n"+b+"}\n"};
Blockly.ARDUINO.controls_for=function(){var a=Blockly.ARDUINO.variableDB_.getName(this.getInputVariable("VAR"),Blockly.Variables.NAME_TYPE),b=Blockly.ARDUINO.valueToCode(this,"FROM",!0)||"0",c=Blockly.ARDUINO.valueToCode(this,"TO",!0)||"0",d=Blockly.ARDUINO.statementToCode(this,"DO");if(c.match(/^\w+$/))a="for ("+a+" = "+b+"; "+a+" <= "+c+"; "+a+"++) {\n"+d+"}\n";else{var e=Blockly.ARDUINO.variableDB_.getDistinctName(a+"_end",Blockly.Variables.NAME_TYPE);a="var "+e+" = "+c+";\nfor ("+a+" = "+b+"; "+
a+" <= "+e+"; "+a+"++) {\n"+d+"}\n"}return a};
Blockly.ARDUINO.controls_forEach=function(){var a=Blockly.ARDUINO.variableDB_.getName(this.getInputVariable("VAR"),Blockly.Variables.NAME_TYPE),b=Blockly.ARDUINO.valueToCode(this,"LIST",!0)||"[]",c=Blockly.ARDUINO.statementToCode(this,"DO"),d=Blockly.ARDUINO.variableDB_.getDistinctName(a+"_index",Blockly.Variables.NAME_TYPE);if(b.match(/^\w+$/))a="for (var "+d+" in  "+b+") {\n  "+(a+" = "+b+"["+d+"];\n"+c)+"}\n";else{var e=Blockly.ARDUINO.variableDB_.getDistinctName(a+"_list",Blockly.Variables.NAME_TYPE);
a="var "+e+" = "+b+";\nfor (var "+d+" in "+e+") {\n  "+(a+" = "+e+"["+d+"];\n"+c)+"}\n"}return a};Blockly.ARDUINO.controls_flow_statements=function(){switch(this.getTitleValue("FLOW")){case "BREAK":return"break;\n";case "CONTINUE":return"continue;\n"}throw"Unknown flow statement.";};Blockly.ARDUINO.controls_sleep=function(){return"avr_thread_sleep("+(Blockly.ARDUINO.valueToCode(this,"A",!0)||"0")+");\n"};Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.lists_create_empty=function(){return"[]"};Blockly.ARDUINO.lists_create_with=function(){var a=Array(this.itemCount_);for(n=0;n<this.itemCount_;n++)a[n]=Blockly.ARDUINO.valueToCode(this,"ADD"+n,!0)||"null";return"["+a.join(", ")+"]"};
Blockly.ARDUINO.lists_repeat=function(){if(!Blockly.ARDUINO.definitions_.lists_repeat){var a=Blockly.ARDUINO.variableDB_.getDistinctName("lists_repeat",Blockly.Generator.NAME_TYPE);Blockly.ARDUINO.lists_repeat.repeat=a;var b=[];b.push("function "+a+"(value, n) {");b.push("  var array = [];");b.push("  for (var i = 0; i < n; i++) {");b.push("    array[i] = value;");b.push("  }");b.push("  return array;");b.push("}");Blockly.ARDUINO.definitions_.lists_repeat=b.join("\n")}a=Blockly.ARDUINO.valueToCode(this,
"ITEM",!0)||"null";b=Blockly.ARDUINO.valueToCode(this,"NUM",!0)||"0";return Blockly.ARDUINO.lists_repeat.repeat+"("+a+", "+b+")"};Blockly.ARDUINO.lists_length=function(a){return Blockly.ARDUINO.text_length.call(this,a)};Blockly.ARDUINO.lists_isEmpty=function(a){return Blockly.ARDUINO.text_isEmpty.call(this,a)};Blockly.ARDUINO.lists_indexOf=function(a){return Blockly.ARDUINO.text_indexOf.call(this,a)};Blockly.ARDUINO.lists_getIndex=function(a){return Blockly.ARDUINO.text_charAt.call(this,a)};
Blockly.ARDUINO.lists_setIndex=function(){var a=Blockly.ARDUINO.valueToCode(this,"AT",!0)||"1",b=Blockly.ARDUINO.valueToCode(this,"LIST")||"[]",c=Blockly.ARDUINO.valueToCode(this,"TO",!0)||"null";a=a.match(/^\d+$/)?parseInt(a,10)-1:a+" - 1";return b+"["+a+"] = "+c+";\n"};Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.logic_compare=function(a){var b=this.getInputLabelValue("B");b=Blockly.ARDUINO.logic_compare.OPERATORS[b];var c=Blockly.ARDUINO.valueToCode(this,"A")||"0",d=Blockly.ARDUINO.valueToCode(this,"B")||"0";b=c+" "+b+" "+d;a||(b="("+b+")");return b};Blockly.ARDUINO.logic_compare.OPERATORS={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="};
Blockly.ARDUINO.logic_operation=function(a){var b=Blockly.ARDUINO.valueToCode(this,"A")||"false",c=Blockly.ARDUINO.valueToCode(this,"B")||"false",d="AND"==this.getInputLabelValue("B")?"&&":"||";b=b+" "+d+" "+c;a||(b="("+b+")");return b};Blockly.ARDUINO.logic_negate=function(a){var b="!"+(Blockly.ARDUINO.valueToCode(this,"BOOL")||"false");a||(b="("+b+")");return b};Blockly.ARDUINO.logic_boolean=function(){return"TRUE"==this.getTitleValue("BOOL")?"true":"false"};Blockly.ARDUINO.loops={};
Blockly.ARDUINO.controls_repeat_ext=function(a){var b=a.getField("TIMES")?String(Number(a.getFieldValue("TIMES"))):Blockly.ARDUINO.valueToCode(a,"TIMES",Blockly.ARDUINO.ORDER_ASSIGNMENT)||"0",c=Blockly.ARDUINO.statementToCode(a,"DO");c=Blockly.ARDUINO.addLoopTrap(c,a);a="";var d=Blockly.ARDUINO.variableDB_.getDistinctName("count",Blockly.VARIABLE_CATEGORY_NAME),e=b;b.match(/^\w+$/)||Blockly.isNumber(b)||(e=Blockly.ARDUINO.variableDB_.getDistinctName("repeat_end",Blockly.VARIABLE_CATEGORY_NAME),a+=
e+" = "+b+";\n");return a+("for ("+d+" = 0; "+d+" < "+e+"; "+d+"++) {\n"+c+"}\n")};Blockly.ARDUINO.controls_repeat=Blockly.ARDUINO.controls_repeat_ext;Blockly.ARDUINO.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.ARDUINO.valueToCode(a,"BOOL",b?Blockly.ARDUINO.ORDER_LOGICAL_NOT:Blockly.ARDUINO.ORDER_NONE)||"false",d=Blockly.ARDUINO.statementToCode(a,"DO");d=Blockly.ARDUINO.addLoopTrap(d,a);b&&(c="!"+c);return"while ("+c+") {\n"+d+"}\n"};
Blockly.ARDUINO.controls_for=function(a){var b=Blockly.ARDUINO.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),c=Blockly.ARDUINO.valueToCode(a,"FROM",Blockly.ARDUINO.ORDER_ASSIGNMENT)||"0",d=Blockly.ARDUINO.valueToCode(a,"TO",Blockly.ARDUINO.ORDER_ASSIGNMENT)||"0",e=Blockly.ARDUINO.valueToCode(a,"BY",Blockly.ARDUINO.ORDER_ASSIGNMENT)||"1",g=Blockly.ARDUINO.statementToCode(a,"DO");g=Blockly.ARDUINO.addLoopTrap(g,a);if(Blockly.isNumber(c)&&Blockly.isNumber(d)&&Blockly.isNumber(e)){var f=
Number(c)<=Number(d);a="for ("+b+" = "+c+"; "+b+(f?" <= ":" >= ")+d+"; "+b;b=Math.abs(Number(e));a=(1==b?a+(f?"++":"--"):a+((f?" += ":" -= ")+b))+(") {\n"+g+"}\n")}else a="",f=c,c.match(/^\w+$/)||Blockly.isNumber(c)||(f=Blockly.ARDUINO.variableDB_.getDistinctName(b+"_start",Blockly.VARIABLE_CATEGORY_NAME),a+=f+" = "+c+";\n"),c=d,d.match(/^\w+$/)||Blockly.isNumber(d)||(c=Blockly.ARDUINO.variableDB_.getDistinctName(b+"_end",Blockly.VARIABLE_CATEGORY_NAME),a+=c+" = "+d+";\n"),d=Blockly.ARDUINO.variableDB_.getDistinctName(b+
"_inc",Blockly.VARIABLE_CATEGORY_NAME),a+=d+" = ",a=Blockly.isNumber(e)?a+(Math.abs(e)+";\n"):a+("abs("+e+");\n"),a=a+("if ("+f+" > "+c+") {\n")+(Blockly.ARDUINO.INDENT+d+" = -"+d+";\n"),a+="}\n",a+="for ("+b+" = "+f+"; "+d+" >= 0 ? "+b+" <= "+c+" : "+b+" >= "+c+"; "+b+" += "+d+") {\n"+g+"}\n";return a};
Blockly.ARDUINO.controls_forEach=function(a){var b=Blockly.ARDUINO.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),c=Blockly.ARDUINO.valueToCode(a,"LIST",Blockly.ARDUINO.ORDER_ASSIGNMENT)||"[]",d=Blockly.ARDUINO.statementToCode(a,"DO");d=Blockly.ARDUINO.addLoopTrap(d,a);return"foreach ("+c+" as "+b+") {\n"+d+"}\n"};
Blockly.ARDUINO.controls_flow_statements=function(a){var b="";Blockly.ARDUINO.STATEMENT_PREFIX&&(b+=Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_PREFIX,a));Blockly.ARDUINO.STATEMENT_SUFFIX&&(b+=Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_SUFFIX,a));if(Blockly.ARDUINO.STATEMENT_PREFIX){var c=Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(a);c&&!c.suppressPrefixSuffix&&(b+=Blockly.ARDUINO.injectId(Blockly.ARDUINO.STATEMENT_PREFIX,c))}switch(a.getFieldValue("FLOW")){case "BREAK":return b+
"break;\n";case "CONTINUE":return b+"continue;\n"}throw Error("Unknown flow statement.");};Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.math_number=function(){return window.parseFloat(this.getTitleText("NUM"))};Blockly.ARDUINO.math_arithmetic=function(a){var b=Blockly.ARDUINO.valueToCode(this,"A")||"0",c=Blockly.ARDUINO.valueToCode(this,"B")||"0",d=this.getInputLabelValue("B");"POWER"==d?b="Math.pow("+b+", "+c+")":(b=b+Blockly.ARDUINO.math_arithmetic.OPERATORS[d]+c,a||(b="("+b+")"));return b};Blockly.ARDUINO.math_arithmetic.OPERATORS={ADD:" + ",MINUS:" - ",MULTIPLY:" * ",DIVIDE:" / "};
Blockly.ARDUINO.math_change=function(){var a=Blockly.ARDUINO.valueToCode(this,"DELTA")||"0",b=Blockly.ARDUINO.variableDB_.getName(this.getTitleText("VAR"),Blockly.Variables.NAME_TYPE);return b+" = (typeof "+b+" == 'number' ? "+b+" : 0) + "+a+";\n"};
Blockly.ARDUINO.math_single=function(a){var b=Blockly.ARDUINO.valueToCode(this,"NUM",!0)||"0",c=Blockly.ARDUINO.valueToCode(this,"NUM",!1)||"0",d=this.getInputLabelValue("NUM");switch(d){case "ABS":var e="Math.abs("+b+")";break;case "ROOT":e="Math.sqrt("+b+")";break;case "LN":e="Math.log("+b+")";break;case "EXP":e="Math.exp("+b+")";break;case "POW10":e="Math.pow(10,"+b+")";break;case "ROUND":e="Math.round("+b+")";break;case "ROUNDUP":e="Math.ceil("+b+")";break;case "ROUNDDOWN":e="Math.floor("+b+")";
break;case "SIN":e="Math.sin("+c+" / 180 * Math.PI)";break;case "COS":e="Math.cos("+c+" / 180 * Math.PI)";break;case "TAN":e="Math.tan("+c+" / 180 * Math.PI)"}if(e)return e;switch(d){case "NEG":e="-"+c;break;case "LOG10":e="Math.log("+b+") / Math.log(10)";break;case "ASIN":e="Math.asin("+b+") / Math.PI * 180";break;case "ACOS":e="Math.acos("+b+") / Math.PI * 180";break;case "ATAN":e="Math.atan("+b+") / Math.PI * 180";break;default:throw"Unknown math operator.";}a||(e="("+e+")");return e};
Blockly.ARDUINO.math_round=Blockly.ARDUINO.math_single;Blockly.ARDUINO.math_trig=Blockly.ARDUINO.math_single;
Blockly.ARDUINO.math_on_list=function(){b=this.getTitleValue("OP");list=Blockly.ARDUINO.valueToCode(this,"LIST",!0)||"[]";switch(b){case "SUM":var a=list+".reduce(function(x, y) {return x + y;})";break;case "MIN":a="Math.min.apply(null,"+list+")";break;case "MAX":a="Math.max.apply(null,"+list+")";break;case "AVERAGE":a="("+list+".reduce(function(x, y) {return x + y;})/"+list+".length)";break;case "MEDIAN":if(!Blockly.ARDUINO.definitions_.math_median){a=Blockly.ARDUINO.variableDB_.getDistinctName("math_median",
Blockly.Generator.NAME_TYPE);Blockly.ARDUINO.math_on_list.math_median=a;var b=[];b.push("function "+a+"(myList) {");b.push("  var localList = myList.filter(function (x) {return typeof x == 'number';});");b.push("  if (!localList.length) return null;");b.push("  localList.sort(function(a, b) {return b - a;});");b.push("  if (localList.length % 2 == 0) {");b.push("    return (localList[localList.length / 2 - 1] + localList[localList.length / 2]) / 2;");b.push("  } else {");b.push("    return localList[(localList.length - 1) / 2];");
b.push("  }");b.push("}");Blockly.ARDUINO.definitions_.math_median=b.join("\n")}a=Blockly.ARDUINO.math_on_list.math_median+"("+list+")";break;case "MODE":Blockly.ARDUINO.definitions_.math_modes||(a=Blockly.ARDUINO.variableDB_.getDistinctName("math_modes",Blockly.Generator.NAME_TYPE),Blockly.ARDUINO.math_on_list.math_modes=a,b=[],b.push("function "+a+"(values) {"),b.push("  var modes = [];"),b.push("  var counts = [];"),b.push("  var maxCount = 0;"),b.push("  for (var i = 0; i < values.length; i++) {"),
b.push("    var value = values[i];"),b.push("    var found = false;"),b.push("    var thisCount;"),b.push("    for (var j = 0; j < counts.length; j++) {"),b.push("      if (counts[j][0] === value) {"),b.push("        thisCount = ++counts[j][1];"),b.push("        found = true;"),b.push("        break;"),b.push("      }"),b.push("    }"),b.push("    if (!found) {"),b.push("      counts.push([value, 1]);"),b.push("      thisCount = 1;"),b.push("    }"),b.push("    maxCount = Math.max(thisCount, maxCount);"),
b.push("  }"),b.push("  for (var j = 0; j < counts.length; j++) {"),b.push("    if (counts[j][1] == maxCount) {"),b.push("        modes.push(counts[j][0]);"),b.push("    }"),b.push("  }"),b.push("  return modes;"),b.push("}"),Blockly.ARDUINO.definitions_.math_modes=b.join("\n"));a=Blockly.ARDUINO.math_on_list.math_modes+"("+list+")";break;case "STD_DEV":Blockly.ARDUINO.definitions_.math_standard_deviation||(a=Blockly.ARDUINO.variableDB_.getDistinctName("math_standard_deviation",Blockly.Generator.NAME_TYPE),
Blockly.ARDUINO.math_on_list.math_standard_deviation=a,b=[],b.push("function "+a+"(numbers) {"),b.push("  var n = numbers.length;"),b.push("  if (!n) return null;"),b.push("  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;"),b.push("  var variance = 0;"),b.push("  for (var j = 0; j < n; j++) {"),b.push("    variance += Math.pow(numbers[j] - mean, 2);"),b.push("  }"),b.push("  variance = variance / n;"),b.push("  standard_dev = Math.sqrt(variance);"),b.push("  return standard_dev;"),
b.push("}"),Blockly.ARDUINO.definitions_.math_standard_deviation=b.join("\n"));a=Blockly.ARDUINO.math_on_list.math_standard_deviation+"("+list+")";break;case "RANDOM":a=list+"[Math.floor(Math.random() * "+list+".length)]";break;default:throw"Unknown operator.";}return a};
Blockly.ARDUINO.math_constrain=function(){var a=Blockly.ARDUINO.valueToCode(this,"VALUE",!0)||"0",b=Blockly.ARDUINO.valueToCode(this,"LOW",!0)||"0",c=Blockly.ARDUINO.valueToCode(this,"HIGH",!0)||"0";return"Math.min(Math.max("+a+", "+b+"), "+c+")"};Blockly.ARDUINO.math_modulo=function(a){var b=Blockly.ARDUINO.valueToCode(this,"DIVIDEND")||"0",c=Blockly.ARDUINO.valueToCode(this,"DIVISOR")||"0";b=b+" % "+c;a||(b="("+b+")");return b};
Blockly.ARDUINO.math_random_int=function(){var a=Blockly.ARDUINO.valueToCode(this,"FROM")||"0",b=Blockly.ARDUINO.valueToCode(this,"TO")||"0",c="Math.floor(Math.random() * ("+b+" - "+a+" + 1) + "+a+")",d="Math.floor(Math.random() * ("+a+" - "+b+" + 1) + "+b+")";return a.match(/^[\d\.]+$/)&&b.match(/^[\d\.]+$/)?parseFloat(a)<parseFloat(b)?c:d:a+" < "+b+" ? "+c+" : "+d};Blockly.ARDUINO.math_random_float=function(){return"Math.random()"};Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.procedures_defreturn=function(){var a=Blockly.ARDUINO.variableDB_.getName(this.getTitleText("NAME"),Blockly.Procedures.NAME_TYPE),b=Blockly.ARDUINO.statementToCode(this,"STACK"),c=Blockly.ARDUINO.valueToCode(this,"RETURN",!0)||"";c&&(c="  return "+c+";\n");var d="int",e=a.match(/^_([^_]+)/);e&&(d=e[1]);b=Blockly.ARDUINO.scrub_(this,d+" "+a+"() {\n"+b+c+"}\n");Blockly.ARDUINO.definitions_[a]=b;return null};
Blockly.ARDUINO.procedures_defnoreturn=function(){var a=Blockly.ARDUINO.variableDB_.getName(this.getTitleText("NAME"),Blockly.Procedures.NAME_TYPE),b=Blockly.ARDUINO.statementToCode(this,"STACK");b=Blockly.ARDUINO.scrub_(this,"void "+a+"() {\n"+b+"}\n");Blockly.ARDUINO.definitions_[a]=b;return null};Blockly.ARDUINO.procedures_callreturn=function(){return Blockly.ARDUINO.variableDB_.getName(this.getTitleText("NAME"),Blockly.Procedures.NAME_TYPE)+"()"};
Blockly.ARDUINO.procedures_callnoreturn=function(){return Blockly.ARDUINO.variableDB_.getName(this.getTitleText("NAME"),Blockly.Procedures.NAME_TYPE)+"();\n"};Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.text=function(){return Blockly.ARDUINO.quote_(this.getTitleText("TEXT"))};
Blockly.ARDUINO.text_join=function(a){if(0==this.itemCount_)return"''";if(1==this.itemCount_){var b=Blockly.ARDUINO.valueToCode(this,"ADD0",!0)||"''";return"String("+b+")"}if(2==this.itemCount_){b=Blockly.ARDUINO.valueToCode(this,"ADD0",!0)||"''";var c=Blockly.ARDUINO.valueToCode(this,"ADD1",!0)||"''";b="String("+b+") + String("+c+")";a||(b="("+b+")");return b}b=Array(this.itemCount_);for(n=0;n<this.itemCount_;n++)b[n]=Blockly.ARDUINO.valueToCode(this,"ADD"+n,!0)||"''";return"["+b.join(",")+"].join('')"};
Blockly.ARDUINO.text_length=function(){return(Blockly.ARDUINO.valueToCode(this,"VALUE")||"''")+".length"};Blockly.ARDUINO.text_isEmpty=function(){return"!"+(Blockly.ARDUINO.valueToCode(this,"VALUE")||"''")+".length"};
Blockly.ARDUINO.text_endString=function(){if("FIRST"==this.getInputLabelValue("NUM")){var a=Blockly.ARDUINO.valueToCode(this,"NUM",!0)||"1";var b=Blockly.ARDUINO.valueToCode(this,"TEXT")||"''";a=b+".substring(0, "+a+")"}else{a=Blockly.ARDUINO.valueToCode(this,"NUM")||"1";b=Blockly.ARDUINO.valueToCode(this,"TEXT",!0)||"''";var c=Blockly.ARDUINO.variableDB_.getDistinctName("temp_text",Blockly.Variables.NAME_TYPE);Blockly.ARDUINO.definitions_.variables+="\nvar "+c+";";a="["+c+" = "+b+", "+c+".substring("+
c+".length - "+a+")][1]"}return a};Blockly.ARDUINO.text_indexOf=function(a){var b="FIRST"==this.getTitleValue("END")?"indexOf":"lastIndexOf",c=Blockly.ARDUINO.valueToCode(this,"FIND")||"''";b=(Blockly.ARDUINO.valueToCode(this,"VALUE")||"''")+"."+b+"("+c+") + 1";a||(b="("+b+")");return b};Blockly.ARDUINO.text_charAt=function(){var a=Blockly.ARDUINO.valueToCode(this,"AT",!0)||"1",b=Blockly.ARDUINO.valueToCode(this,"VALUE")||"[]";a=a.match(/^\d+$/)?parseInt(a,10)-1:a+" - 1";return b+"["+a+"]"};
Blockly.ARDUINO.text_changeCase=function(){var a=this.getInputLabelValue("TEXT");if(a=Blockly.ARDUINO.text_changeCase.OPERATORS[a]){var b=Blockly.ARDUINO.valueToCode(this,"TEXT")||"''";a=b+a}else Blockly.ARDUINO.definitions_.text_toTitleCase||(a=Blockly.ARDUINO.variableDB_.getDistinctName("text_toTitleCase",Blockly.Generator.NAME_TYPE),Blockly.ARDUINO.text_changeCase.toTitleCase=a,b=[],b.push("function "+a+"(str) {"),b.push("  return str.replace(/\\w\\S*/g,"),b.push("      function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});"),
b.push("}"),Blockly.ARDUINO.definitions_.text_toTitleCase=b.join("\n")),b=Blockly.ARDUINO.valueToCode(this,"TEXT",!0)||"''",a=Blockly.ARDUINO.text_changeCase.toTitleCase+"("+b+")";return a};Blockly.ARDUINO.text_changeCase.OPERATORS={UPPERCASE:".toUpperCase()",LOWERCASE:".toLowerCase()",TITLECASE:null};Blockly.ARDUINO.text_trim=function(){var a=this.getTitleValue("MODE");a=Blockly.ARDUINO.text_trim.OPERATORS[a];return(Blockly.ARDUINO.valueToCode(this,"TEXT")||"''")+a};
Blockly.ARDUINO.text_trim.OPERATORS={LEFT:".replace(/^\\s+/, '')",RIGHT:".replace(/\\s+$/, '')",BOTH:".replace(/^\\s+|\\s+$/g, '')"};Blockly.ARDUINO.text_print=function(){return"window.alert("+(Blockly.ARDUINO.valueToCode(this,"TEXT",!0)||"''")+");\n"};Blockly.ARDUINO.text_prompt=function(){var a="window.prompt("+Blockly.ARDUINO.quote_(this.getTitleValue("TEXT"))+")";"NUMBER"==this.getTitleValue("TYPE")&&(a="window.parseFloat("+a+")");return a};Blockly.ARDUINO.variables={};Blockly.ARDUINO.variables_get=function(){return Blockly.ARDUINO.variableDB_.getName(this.getTitleText("VAR"),Blockly.Variables.NAME_TYPE)};Blockly.ARDUINO.variables_set=function(){var a=Blockly.ARDUINO.valueToCode(this,"VALUE",!0)||"0";return Blockly.ARDUINO.variableDB_.getName(this.getTitleText("VAR"),Blockly.Variables.NAME_TYPE)+" = "+a+";\n"};
Blockly.ARDUINO.variablesDynamic={};Blockly.ARDUINO.variables_get_dynamic=Blockly.ARDUINO.variables_get;Blockly.ARDUINO.variables_set_dynamic=Blockly.ARDUINO.variables_set;Blockly.C=Blockly.Generator.get("C");Blockly.ARDUINO.led=function(){var a=this.getTitleValue("PIN"),b=this.getTitleValue("VAL");return"digitalWrite("+a+", "+("ON"==b?"HIGH":"LOW")+");\n"};Blockly.ARDUINO.output=function(){var a=this.getTitleValue("PIN"),b=this.getTitleValue("VAL");return"digitalWrite("+a+", "+b+");\n"};Blockly.ARDUINO.input=function(){var a=this.getTitleValue("PIN");return("LOW"==this.getTitleValue("VAL")?"!":"")+"digitalRead("+a+")"};
Blockly.ARDUINO.servo=function(){var a=this.getTitleValue("PIN"),b=Blockly.ARDUINO.valueToCode(this,"A",!0)||"0";return"set_servo("+a+", "+b+");\n"};Blockly.ARDUINO.optocoupler=function(){var a=this.getTitleValue("PIN");return("ACTIVE"==this.getTitleValue("VAL")?"!":"")+"digitalRead("+a+")"};