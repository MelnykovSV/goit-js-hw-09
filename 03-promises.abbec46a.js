const e=document.querySelector(".form");e.addEventListener("submit",(t=>{t.preventDefault();const o=new FormData(t.currentTarget),n={};for(item of[...o])console.log(`${item[0]} value: ${item[1]}`),n[item[0]]=item[1];e.reset();const r=function({delay:e,step:t,amount:o}){const n=[];for(let r=0;r<o;r++)n.push(parseInt(e)+r*parseInt(t));return n}(n).map(((e,t)=>new Promise(((o,n)=>{const r=Math.random()>.3;setTimeout((()=>{r?o(`✅ Fulfilled promise ${t+1} in ${e}ms`):n(`❌ Rejected promise ${t+1} in ${e}ms`)}),e)}))));for(ele of r)ele.then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}));
//# sourceMappingURL=03-promises.abbec46a.js.map
