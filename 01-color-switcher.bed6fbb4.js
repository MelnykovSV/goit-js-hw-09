!function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");function o(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}e.addEventListener("click",(function(){o(),t=setInterval(o,1e3),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(t),e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.bed6fbb4.js.map