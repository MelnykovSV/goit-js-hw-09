const e=document.querySelector(".form");e.addEventListener("submit",(t=>{t.preventDefault();const o=new FormData(t.currentTarget);for(item of[...o])console.log(`${item[0]} value: ${item[1]}`);e.reset()}));
//# sourceMappingURL=03-promises.27a2f2af.js.map
