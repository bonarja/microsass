/*
    https://github.com/bonarja/microsass 
    bonarja.com
*/
var microsass = new (function(props) {
    var self = this;
    var global = {};
    var colors = ["black","navy","darkblue","mediumblue","blue","darkgreen","green","teal","darkcyan","deepskyblue","darkturquoise","mediumspringgreen","lime","springgreen","aqua","cyan","midnightblue","dodgerblue","lightseagreen","forestgreen","seagreen","darkslategray","darkslategrey","limegreen","mediumseagreen","turquoise","royalblue","steelblue","darkslateblue","mediumturquoise","indigo  ","darkolivegreen","cadetblue","cornflowerblue","rebeccapurple","mediumaquamarine","dimgray","dimgrey","slateblue","olivedrab","slategray","slategrey","lightslategray","lightslategrey","mediumslateblue","lawngreen","chartreuse","aquamarine","maroon","purple","olive","gray","grey","skyblue","lightskyblue","blueviolet","darkred","darkmagenta","saddlebrown","darkseagreen","lightgreen","mediumpurple","darkviolet","palegreen","darkorchid","yellowgreen","sienna","brown","darkgray","darkgrey","lightblue","greenyellow","paleturquoise","lightsteelblue","powderblue","firebrick","darkgoldenrod","mediumorchid","rosybrown","darkkhaki","silver","mediumvioletred","indianred ","peru","chocolate","tan","lightgray","lightgrey","thistle","orchid","goldenrod","palevioletred","crimson","gainsboro","plum","burlywood","lightcyan","lavender","darksalmon","violet","palegoldenrod","lightcoral","khaki","aliceblue","honeydew","azure","sandybrown","wheat","beige","whitesmoke","mintcream","ghostwhite","salmon","antiquewhite","linen","lightgoldenrodyellow","oldlace","red","fuchsia","magenta","deeppink","orangered","tomato","hotpink","coral","darkorange","lightsalmon","orange","lightpink","pink","gold","peachpuff","navajowhite","moccasin","bisque","mistyrose","blanchedalmond","papayawhip","lavenderblush","seashell","cornsilk","lemonchiffon","floralwhite","snow","yellow","lightyellow","ivory","white","aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgrey","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred ","indigo  ","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
    var native_list = ["animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","backface-visibility","background-clip","background-composite","background-origin","background-size","border-bottom-left-radius","border-bottom-right-radius","border-horizontal-spacing","border-image","border-radius","border-top-left-radius","border-top-right-radius","border-vertical-spacing","box-align","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-reflect","box-shadow","box-sizing","column-break-after","column-break-before","column-break-inside","column-count","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-width","columns","dashboard-region","line-break","margin-bottom-collapse","margin-collapse","margin-start","margin-top-collapse","marquee","marquee-direction","marquee-increment","marquee-repetition","marquee-speed","marquee-style","mask","mask-attachment","mask-box-image","mask-clip","mask-composite","mask-image","mask-origin","mask-position","mask-position-x","mask-position-y","mask-repeat","mask-size","nbsp-mode","padding-start","perspective","perspective-origin","rtl-ordering","tap-highlight-color","text-fill-color","text-security","text-size-adjust","text-stroke","text-stroke-color","text-stroke-width","touch-callout","transform","transform-origin","transform-origin-x","transform-origin-y","transform-origin-z","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","user-drag","user-modify","user-select"];
    var native = ["-webkit-","-moz-","-o-","-ms"];
    var _regex = function(string, regex, callback) {
        var m;
        while ((m = regex.exec(string)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach(function(match, groupIndex) {
                callback(match, groupIndex);
            });
        }
    };
    var isNumber = function(num){
        return !isNaN(parseFloat(num)) && isFinite(num);
    }
    var removeComents = function(scss){
        return scss.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"");
    }
    var clear = function() {
        global = {
            json: [], // final json css result
            vars: {},
            remove: [], // save vars for remove after
            brackets: [], // brackets count syntax
            media_brackets: false, // media brackets count for determinate if no have in @media converting this in array
            keyframes_brackets: false, // keyframes brackets count for determinate if no have in @media converting this in array
            json_end: [] // save pointers from the json and omited the unused selector
        }
    }
    var native_property = function(property, callback) {
        // verify the property and turn natives property in loop callback
        property = property.split(":");
        property[0] = property[0].trim();
        property[1] = property[1].trim();
        if (native_list.includes(property[0])) {
            native.forEach(function(nav) {
                callback(nav + property[0] + ":" + property[1]);
            });
        }
        // return the normal property
        callback(property[0] + ":" + property[1]);
    }
    var getSize = function(operation) {
        var initial_value = operation;
        // get size from variable
        var size = "";
        var regex = /px|em|wv|ex|ch|rem|vh|vmin|vmax|%|ms|s|cm|mm|pt|pc/g;
        operation = operation.toLowerCase().match(regex);
        if (operation) {
            size = operation[0];
        }
        return {
            size: size, 
            result: initial_value.replace(regex, "")
        };
    };
    var eval_value_result_in_property = function(operation) {
       
        // evaluate the operations in property
        var re = /([^ ]*)[0-9](px|em|vw|ex|ch|rem|vh|vmin|vmax|%|ms|s|cm|mm|pt|pc)/g;
        var size = /px|em|vw|ex|ch|rem|vh|vmin|vmax|%|ms|s|cm|mm|pt|pc/g;
        var re2 = /([^]*)[0-9]([^]*)([^]-|\+|\/|\*)([^]*)[0-9]([^]*)/;
        
        var match_size = operation.match(size);
        var saved_size = false;
        
        if (re2.test(operation) && match_size) {
            saved_size = match_size[0];
            operation = operation.replace(size, "");
        }

        var result = getSize(operation); // {size, result}

        if (saved_size){
            _regex(result.result, /([0-9 +-/*.()]*)([^;]\+|-|\/|\*)([0-9 +-/*.(){}]*)/g, function(match,index) {
                if (index !== 0) return;
                try {
                    // eval and add final symbol
                    var replace = eval(match) + result.size;
                    
                    // remove all sise symbols
                    _regex(operation, re, function(a,b){
                        if (b !== 0) return
                        operation = operation.replace(a, a.replace(/[A-z]/g,""));
                    })
                    
                    // replace in operation with removed symbol the match witout symbol for replace (eval value result)
                    operation = operation.replace(match, " "+replace);
                } catch (error) {}
            })
            operation += saved_size;
        }
        return operation;
    };
    var customSCSS = function(scss) {
        var regex = /@if/;
        if (regex.test(scss)) {
            // search if
            _regex(scss, /@if([^{]*){/g, function(match, index) {
                if (index === 0) {
                    var arg = [];
                    match.split(" ").forEach(function(x) {
                        if (x !== "") arg.push(x);
                    });
                    var widthorheight = "width";
                    if (arg[1] === "y") widthorheight = "height";
                    var maxormin = "max";
                    if (arg[2] === ">=") maxormin = "min";
                    var size = arg[3];
                    if (!size.includes("px")) size = size + "px";
                    scss = scss.replace(
                        match,
                        "@media screen and (" +
                            maxormin +
                            "-" +
                            widthorheight +
                            ": " +
                            size +
                            "){"
                    );
                }
            });

            return scss;
        } else {
            return scss;
        }
    };
    var processVars = function(scss) { // search all declaration variables
        var regex = /\$([^-;!:(){}]*):([^-;!:(){}]*);/g;
        _regex(scss, regex, function(match, index) {
            if (index === 0) {
                var val = match
                    .trim()
                    .replace(/\$|;/g, "")
                    .split(":");
                global.remove.push(match);
                global.vars["$" + val[0].replace(/ /g, "")] = val[1].trim();
            }
        });
        global.remove.forEach(function(x) {
            scss = scss.replace(x, "");
        });
        return scss;
    };
    var get_var_value_in_property = function(property) {
        // replace vars in property
        _regex(property, /\$([^;{() ]*)/g, function(match, index) {
            if (index === 1) return;

            if (global.vars[match]) {
                property = property.replace(match, global.vars[match]);
            }
        });
        return property;
    }
    var eval_property = function(line) {  // <-- MAIN EVAL PROPERTY VARS AND VALUES

        line = line.split(":");
        line[1] = line[1].trim();

        // prevent infinite while iteration, compare values ant with line[1]
        var ant;
        while(line[1].includes("$") && ant !== line[1]) {
            ant = line[1];
            line[1] = get_var_value_in_property(line[1]);
        }

        // eval
        var result = eval_value_result_in_property(line[1]);
        if (result) {
            line[1] = result;
        }        
        return line[0] + ": " + line[1];
    }
    var json_to_css = function() {
        if (global.options.format || global.options.html) {
            return json_to_css_with_format();
        }
        var css = ""; // concatenate final css in string
        global.json.forEach(function(x) {
            var selector = x[0];
            css += selector + "{";

            if (selector.indexOf("@keyframe") === 0) { // if selector is keyframe
                x[1].forEach(function(select) { 
                    css += select[0] + "{" // select is from or to o percentage
                    select[1].forEach(function(property){
                        native_property(property, function(result) {
                            css += result + ";";
                        });
                    });
                    css += "}";
                });
            
            } else if (selector.indexOf("@media") === 0) {
                x[1].forEach(function(select) {
                    css += select[0] + "{";
                    select[1].forEach(function(property) {
                        native_property(property, function(result) {
                            css += result + ";";
                        });
                    })
                    css += "}";
                })
            } else {     // no keyframe
                x[1].forEach(function(property){
                    native_property(property, function(result) {
                        css += result + ";";
                    });
                });
            }
            css += "}";
        });
        return css;
    }
    var get_span_from_css = function(val , _class) {
        return '<span class="_microsass_'+_class+'">'+ val +'</span>';
    }
    var inject_scss_for_css_color_style = function() {
        var head = document.querySelector("head");
        var exist_css = head.querySelector("style#_microsass_css");
        if (!exist_css) {
            var style = document.createElement("style");
            style.id = "_microsass_css";
            style.innerHTML = "._mirosass_wrap{color:#aab1bf;background-color: #343842;font-family: sans-serif;font-size: 16px;letter-spacing: 0.17px;line-height: 20px;padding: 20px;}._mirosass_wrap label{position:relative}._mirosass_wrap label div{    width: 10px;height: 10px;position: absolute;top: 4px;right: -21px;}._microsass_id,._microsass_colon{color:#5dadec}._microsass_class, ._microsass_property, ._microsass_attr_left{color:#d19965}._microsass_decorator,._microsass_attr,._microsass_important{color:#d57cda}._microsass_attr_right{color:#97c279}._microsass_base{color:#aab1bf}";
            head.appendChild(style);
        }
    }
    var get_color_css = function(val, type) { 
        // return the color and element from css if format and html is true
        if (type === "normal") {
            return get_span_from_css(val, "base");
        }
        if (type === "selector") {
            val = get_span_from_css(val, "base");
            

            // @decorator
            _regex(val, /@([^#.,:<{} ]*)/g, function(a,b) {
                if (b === 1) return;
                val = val.replace(new RegExp(a, "g"), get_span_from_css(a, "decorator"));
            })

            // [] attr
            _regex(val, /\[([^#.,:<{} ]*)]/g, function(a,b) {
                if (b === 1) return;
                var result;
                var content = a.slice(1, a.length -1);
                
                if (content.includes("=")) {
                        // if include =
                    content = content.split("=");
                    result = get_span_from_css("[", "attr") + 
                    get_span_from_css(content[0], "attr_left") + "=" +
                    get_span_from_css(content[1], "attr_right") +
                    get_span_from_css("]", "attr");
                } else {
                    // if no include =
                    result = get_span_from_css("[", "attr") +
                    get_span_from_css(content, "attr_left") +
                    get_span_from_css("]", "attr");
                }
                val = val.replace(a, result);
            })

            // id
            _regex(val, /#([^#.,:<{} ]*)/g, function(a,b) {
                if (b === 1) return;
                val = val.replace(new RegExp(a, "g"), get_span_from_css(a, "id"));
            })
            // class
            _regex(val, /\.([^#.,:<{} ]*)/g, function(a,b) {
                if (b === 1) return;
                val = val.replace(new RegExp(a, "g"), get_span_from_css(a, "class"));
            })
            // :hover etc
            _regex(val, /:([^#;{}:<,. ]){2,}/g, function(a,b) {
                if (b === 1) return;

                // remove :
                a = a.slice(1, a.length);
                val = val.replace(":" + a, get_span_from_css(":", "colon") + get_span_from_css(a, "colon"));
            })
            return val;
        }
        if (type === "property"){
            var property = val.split(":");
            var is_important = "";

            // !important
            if (property[1].includes("!important")) {
                // create importan html
                is_important = get_span_from_css(" !important", "important");
                // remove importante in property
                property[1] = property[1].replace(/!important/g, "").trim();
            } 

            // check if is color property
            if (property[1].indexOf("#") === 0 || property[1].indexOf("rgb") === 0 || colors.includes(property[1])) {
                property[1] = '<label class="_microsass_property">'+ property[1] + is_important +'<div style="background:'+ property[1] +'"></div></label>';
            } else {
                property[1] = get_span_from_css(property[1], "property") + is_important;
            }

            return get_span_from_css(property[0], "base") + ": " + property[1];
        }
    }
    var json_to_css_with_format = function() {
        var spaces = [""]; // num of tabs
        var css = ""; // contatenate string result
        var newline = "\n";
        var blank_space = "    ";
        if (global.options.html) {
            newline = "<br>";
            blank_space = "&nbsp;&nbsp;&nbsp;&nbsp;";
            if (global.options.colors === undefined) {
                global.options.colors = true;
                inject_scss_for_css_color_style();
            }
            css += '<div class="_mirosass_wrap">';
        }
        global.json.forEach(function(x) {
            var selector = x[0];

            // \n from all , in selector
            selector = selector.replace(/,/g, "," + newline + spaces.join(blank_space));
            css += get_color_css(selector, "selector");
            css += get_color_css(" {" + newline, "normal")
            spaces.push("");
            if (selector.indexOf("@keyframes") === 0) { // if selector is keyframe
                x[1].forEach(function(select) {
                    css += spaces.join(blank_space);

                    select[0] = select[0].replace(/,/g, "," + newline + spaces.join(blank_space));

                    css += get_color_css(select[0], "selector") + "{" + newline; // select is from or to o percentage
                    spaces.push("");
                    select[1].forEach(function(property){
                        native_property(property, function(result) {
                            css += spaces.join(blank_space);
                            css += get_color_css(result, "property") + ";" + newline; // property in keyframe
                        });
                    });
                    spaces.pop();
                    css += spaces.join(blank_space);
                    css += "}" + newline;
                });
            
            } else if (selector.indexOf("@media") === 0) { 
                x[1].forEach(function(select) {
                    css += spaces.join(blank_space);
                    select[0] = select[0].replace(/,/g, "," + newline + spaces.join(blank_space));
                    css += get_color_css(select[0], "selector") + "{" + newline;
                    spaces.push("");
                    select[1].forEach(function(property) {
                        native_property(property, function(result) {
                            css += spaces.join(blank_space);
                            css += get_color_css(result, "property") + ";" + newline; // property in media
                        });
                    })
                    spaces.pop();
                    css += spaces.join(blank_space);
                    css += "}" + newline;
                    
                })
            } else {     // no keyframe
                x[1].forEach(function(property){
                    native_property(property, function(result) {
                        css += spaces.join(blank_space);
                        css += get_color_css(result, "property") + ";" + newline; // normal property
                    })
                });
            }
            spaces.pop();
            css += "}" + newline;
            
        });

        if (global.options.html) {
            css += '</div>';
        }
        return css;
    }
    var scsstocss = function(scss, options) { // main process 
         // remove coments
        scss = removeComents(scss);
        // remove spaces
        scss = scss.replace(/\n|\r/g,""); 
        // reset global data
        clear();
        
        // save options in global --------------------
        /**/    if (typeof options !== "object") {  //
        /**/        options = {};                   //
        /**/    }                                   //
        /**/    global.options = options;           //
        // end save options in global ---------------

        // load variables and remove variables declaration from scss
        scss = processVars(scss);
        // process custom scss structures
        scss = customSCSS(scss);
        // get lines separate by brackets and includes in list
        var list = scss.split(/({|})|;|\n/);
        list.forEach(function(line,index) {
            if (!line) return;
            line = line.trim();
            if (!line) return;
            var next = false;

            if(index+1 < list.length){
                next = list[index+1];
            }
            processLine(line, next);
        });
        // convert json data to css
        var css = json_to_css();
        return css;
    };
    var is_close_media_bracket = function(val) {
        // set o remove media brack with parameter, if exist parameter it return if is close media bracket
        if (val === true) {
            if (global.media_brackets === false) {
                global.media_brackets = [];
            }
            global.media_brackets.push(true);
            return false;
        }
        if (val === false) {
            global.media_brackets.pop();
            if (!global.media_brackets.length) {
                global.media_brackets = false;
                return true;
            } else {
                return false;
            }
        }
        if (global.media_brackets === false) {
            return true;
        } else {
            return false;
        }
    }
    var is_close_keyframes_bracket = function(val) {
        // set o remove media brack with parameter, if exist parameter it return if is close keyframes bracket
        if (val === true) {
            if (global.keyframes_brackets === false) {
                global.keyframes_brackets = [];
            }
            global.keyframes_brackets.push(true);
            return false;
        }
        if (val === false) {
            global.keyframes_brackets.pop();
            if (!global.keyframes_brackets.length) {
                global.keyframes_brackets = false;
                return true;
            } else {
                return false;
            }
        }
        if (global.keyframes_brackets === false) {
            return true;
        } else {
            return false;
        }
    }
    var get_last_selector = function() { // return the last selector from list

        // search the last selector in json_end, 
        // if this is @ in start search one space up more, if not return []
        if(global.json_end.length) {
            var index = global.json_end.length -1;
            var repeat = true;
            while(repeat) {
                var last = global.json_end[index][0];
                if (last.indexOf("@") === 0) {
                    if (index === 0) {
                        repeat = false;
                        last = "";
                    } else {
                        index--;
                    }
                } else {
                    repeat = false;
                }
            }
            return last.split(",");
        } else {
            return [];
        }
    }
    var save_in_json_end = function() {
        // save end selector from json data in the json_end
        global.json_end.push(global.json[global.json.length - 1]);
    }
    var remove_in_json_end = function() {
        if(global.json_end.length) {
            global.json_end.pop();
        }
    }
    var get_last_json = function() { // return the last array property from json
        // var last =  global.json[global.json.length - 1][1];
        var last = global.json_end[global.json_end.length -1][1];
        // var last =  global.json[global.json.length - 1][1];
        return last;
    }
    var create_new_selector = function(current) { // create new selector last selector + current selector
        var result = []; // array result for save new selector

        // separate selector line in array
        current = current.split(",");
        // get last selector from array
        var last_selector = get_last_selector(); // return the last selector

        // concatenate last selector with current selector
        last_selector.forEach(function(last_item) {
            current.forEach(function(current_item) {
                result.push(last_item.trim() + " " + current_item.trim());
            })
        });
        return result.join(","); // return new selector in string
    }
    var process_selector = function(line) {
        // if exist selector save in current parent
        if (global.json_end.length) {
            // create new selector last selector + current selector and save in selectors
            var new_selector = create_new_selector(line); 
            global.json.push([new_selector,[]]); // save css in json data
        } else {
            // save selector in json
            global.json.push([line,[]]); // save css in json data
        }
        // set last with last json data
    }
    var process_decorator = function(line) { // process decorator that start with @

        if (line.indexOf("@media") === 0) {
            // add media breacket array count for determinate media breackend main end in the end bracket function
            is_close_media_bracket(true);
        } else {
            // @keyframes
            is_close_keyframes_bracket(true);
        }
        global.json.push([line,[]]);
        save_in_json_end();
    }
    var process_property = function(line) { // process property from inside selector
        line = eval_property(line); // eval vars in property
        // return the last array property from json
        var last_selector = get_last_json();
        var property = line.split(":");
        last_selector.push( 
            property[0].trim()+ ":"+ property[1].trim() 
        );
    }
    var brackets_count = function(add /*true o false*/) { // brackets count in array, add o remove
        if (add) {
            global.brackets.push(true);
        } else {
            // check sintaxy bracket
            if (!global.brackets.length) return console.error("Bracket close error");
            // remove bracket
            global.brackets.pop();
        }
    }
    var process_bracket = function(bracket) {
        if (bracket === "{") {  // open bracket
            // save breackets array 
            brackets_count(true);
        } else {  // close bracket
            brackets_count(false);

            var decorator_type = type_decorator();

            if(decorator_type) {
                if (decorator_type === "@media") {
                    // close media bracket
                    if (is_close_media_bracket(false)) {
                        // remove last selector in json_end
                        remove_in_json_end();
                    }
                } else {
                    // close keyframes bracket
                    if (is_close_keyframes_bracket(false)) {
                        // remove last selector in json_end
                        remove_in_json_end();
                    }
                }
                
            } else {
                // remove last selector in json_end
                remove_in_json_end();
            }
        }
    }
    var process_keyframes_property = function(line) {
        line = eval_property(line); // eval vars in property
        // get the last keyframe
        var last_keyframe = global.json[global.json.length - 1][1];
        last_keyframe = last_keyframe[last_keyframe.length -1][1]; 

        // separate for remove blank spaces in property with trim function
        line = line.split(":");
        // save in the json last keyframe
        last_keyframe.push(
            line[0].trim() + ":" + line[1].trim()
        );
    }
    var process_media_selector = function(line) {
        // create new selector from previus selectores and add in the selector list
        var new_selector = create_new_selector(line); 
        
        var last_media = global.json[global.json.length -1][1];
        last_media.push([new_selector, []]);
        is_close_media_bracket(true);
    }
    var process_media_property = function(line) {
        line = eval_property(line); // eval vars in property
        var property = line.split(":");
        var last_media_selector = global.json[global.json.length-1][1];
        last_media_selector = last_media_selector[last_media_selector.length-1][1];
        
        last_media_selector.push(
            property[0] + ":" + property[1]
        );
    }
    var process_self_selector = function(line) { // process & selector (self selector)
        var result = []; // new selector result
        // get last selector from json
        var last_selector = get_last_selector();
        // remove fist character & from line
        line = line.slice(1, line.length);
        // lopp last selector and concatenate line without & symbol
        last_selector.forEach(function(selector){
            // create the new selector result
            result.push(selector + line);
        });
        result = result.join(",");
        // add new selector in the json data
        global.json.push([result, []]);
    }
    var process_self_selector_in_media = function(line) {
        // result selector
        var result = [];
        // get last selector
        var last_selector = get_last_selector();
        // remove & character from line
        line = line.slice(1, line.length);
        // loop last selector and concatenate with line
        last_selector.forEach(function(selector) {
            result.push(selector + line);
        });
        // get last media
        var last_media = global.json[global.json.length -1][1];
        // conver array selector in string
        var new_selector = result.join(",");
        // save selector in last media
        last_media.push([new_selector, []]);
        // add new breacked open in array media bracket
        global.media_brackets.push(true);
    }
    var type_decorator = function() {
        var last = global.json_end[global.json_end.length - 1];
        if (!last) return false;
    
        if (last[0].indexOf("@keyframes") === 0) return "@keyframes";
        if (last[0].indexOf("@media") === 0) return "@media";

        return false;
    }
    var if_exist_capsulaid_in_options_replace = function(line) {
        // if exist capsula id in options, replace this for capsula id from options
        if (global.options.dabu_id) {
            if (line === "this") {
                line = "#" + global.options.dabu_id;
            }
        }
        return line;
    }
    var processLine = function(line, next) { // lopp process from all lines y the scss
        if (/{|}/.test(line)) {  // is bracket ?
            // capture brackets
            process_bracket(line);
            return;
        }

        if(line.indexOf("@") === 0) { // is decorator ?
            // debugger;
            process_decorator(line);
            return;
        }

        if (line === "from" || line === "to" || isNumber(line[0])) {  // is animation parameter  ?

            // save parameter in the last json
            get_last_json().push([line,[]]);
            is_close_keyframes_bracket(true);
            return;
        }
        var decorator_type = type_decorator();  //  get type decortar or false 

        if ( !decorator_type && next === "{") { // is normal selector ? <-

            line = if_exist_capsulaid_in_options_replace(line);

            if (line.indexOf("&") === 0) {
                process_self_selector(line);
            } else {
                process_selector(line);
            }
            save_in_json_end();
            return;
        }

        if (!decorator_type) {
            process_property(line);  // process normal property  <-
            return;
        }

        if (decorator_type === "@keyframes") {   // process @keyframe property <-

            process_keyframes_property(line);
            return;
        }

        // @media property or selector -------------------

        if (!line.includes(":")) { // process @media selector
            if (line.indexOf("&") === 0) {
                process_self_selector_in_media(line);
            } else {
                process_media_selector(line);
            }
        } else {
            process_media_property(line) // process @media property
        }
    }
    var injectcss = function(data) {
        return new Promise(function(done) {
            var head = document.querySelector("head");
            for (var key in data) {
                var style = document.createElement("style");
                style.innerHTML = self.convert(data[key]);
                head.appendChild(style);
            }
            done();
        });
    };
    this.convert = function(scss, options) {
        return scsstocss(scss, options);
    };
    this.import = function(data) {
        return new Promise(function(done) {
            if (!Array.isArray(data)) data = [data];
            var count = 0;
            var list = {};
            function check(index, css) {
                list[index] = css;
                count++;
                if (count === data.length) {
                    injectcss(list).then(function() {
                        done();
                    });
                }
            }
            data.forEach(function(x, i) {
                var request = new XMLHttpRequest();
                if(!x.includes(".scss")) {
                    x = x + ".scss";
                }
                request.open("GET", x, true);
                request.onreadystatechange = function() {
                    if (
                        this.readyState === 4 &&
                        this.status >= 200 &&
                        this.status < 400
                    ) {
                        check(i, this.responseText);
                    } else if (this.status >= 400) {
                        console.error("Error: " + this.status + " in -> " + x);
                    }
                };
                request.send();
            });
        });
    };
    this.load = function() {
        if (typeof window !== "object") return;
        var list = [];
        Array.prototype.forEach.call(document.querySelectorAll('link[sass]'), function (item) {
            item.getAttribute("sass").replace(/\n| /g, "").split(",").forEach(function(x){
                list.push(x);
            });
            item.remove();
        });
        this.import(list);
    }
    this.load();
})();
try { module.exports = microsass; } catch (error) {}