(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(8),r=a.n(c),o=(a(15),a(16),a(17),a(1)),i=a(2),l=a(4),u=a(3),m=a(5),h=(a(18),a(9)),v=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).$css=s.a.createRef(),a.$scss=s.a.createRef(),a.state={is_convert:!0},a.covert_show=function(){!0===a.state.is_convert&&a.setState({is_convert:!1})},a.update=function(e){!1===a.state.is_convert&&a.setState({is_convert:!0});try{var t=window.microsass.convert(e.value,{html:!0,format:!0});a.$css.current.innerHTML=t}catch(n){}},a.close_show_save=function(){!1===a.state.is_convert&&a.setState({is_convert:!0})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.scss=new h.a(this.$scss.current,{language:"css",lineNumbers:!0}),this.$scss.current.onchange=function(t){return e.update(t.target)},this.load_example()}},{key:"load_example",value:function(){var e=this;fetch("./example.scss",{method:"get"}).then(function(e){return e.text()}).then(function(t){e.scss.updateCode(t),e.update(e.$scss.current.querySelector("textarea"))})}},{key:"render",value:function(){return s.a.createElement("div",{className:"Lab cover"},s.a.createElement("div",{className:"sections cover center"},s.a.createElement("div",{className:"section"},s.a.createElement("div",{className:"header center"},"SCSS"),s.a.createElement("div",{className:"cover scss",ref:this.$scss,onChange:this.update,onKeyDown:this.covert_show})),s.a.createElement("div",{className:"section css"},s.a.createElement("div",{className:"header center"},"CSS"),s.a.createElement("div",{className:"css cover ".concat(!1===this.state.is_convert&&"show_save"),ref:this.$css,onClick:this.close_show_save}))))}}]),t}(s.a.Component),d=(a(19),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"card"},this.props.children)}}]),t}(s.a.Component));var p=function(){var e="https://github.com/bonarja/microsass",t="https://www.npmjs.com/package/microsass";return s.a.createElement("div",{className:"App cover center y"},s.a.createElement(d,null,s.a.createElement("h1",{className:"title"},"microsass"),s.a.createElement("p",null,"Microsass is a script that can convert the basic structures of ",s.a.createElement("b",null,"SCSS")," into ",s.a.createElement("b",null,"CSS")," directly in the browser."),s.a.createElement("p",null,"Microsass can process the staggered selectors of ",s.a.createElement("b",null,"SCSS"),", and supports the declaration and use of basic variables, as well as the basic arithmetic processing of variables."),s.a.createElement("p",null,"It also interprets the properties to add the -webkit, -moz-, -o and -ms required."),s.a.createElement("div",{className:"links"},s.a.createElement("h2",{className:"title"}," Doc "),s.a.createElement("p",null,s.a.createElement("b",null,"Github:"),s.a.createElement("a",{href:e},e)),s.a.createElement("p",null,s.a.createElement("b",null,"Npm:"),s.a.createElement("a",{href:t},t))),s.a.createElement("h1",{className:""})),s.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.958d9003.chunk.js.map