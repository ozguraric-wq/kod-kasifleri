const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const cp=require('node:child_process');
const E=require('../dist/assets/engine.js');
const root=path.join(__dirname,'../dist');
for(const name of ['data.js','engine.js','site.js','demo.js'])cp.execFileSync(process.execPath,['--check',path.join(root,'assets',name)]);
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8'),context);const themes=context.window.KK_DATA.themes;
assert.equal(themes.length,12);assert.equal(new Set(themes.map(t=>t.id)).size,12);
const moves={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]};
function solve(b){const queue=[{p:b.start,cmd:[]}],seen=new Set([b.start.join()]);while(queue.length){const a=queue.shift();if(a.p.join()===b.goal.join())return a.cmd;for(const [c,d]of Object.entries(moves)){const p=[a.p[0]+d[0],a.p[1]+d[1]];if(p.some(n=>n<0||n>=b.size)||b.obstacles.some(o=>o.join()===p.join())||seen.has(p.join()))continue;seen.add(p.join());queue.push({p,cmd:[...a.cmd,c]})}}throw new Error('Unsolvable board')}
let solved=0;
for(const age of ['4-5','6-8','9-12'])for(const task of ['T01','T04']){
 const b=E.board(task,age),solution=solve(b),out=E.simulate(b,solution);
 assert.ok(out.success,`${task}/${age} has a working solution`);assert.ok(solution.length<=24);assert.equal(E.simulate(b,[]).success,false);assert.equal(E.simulate(b,['L']).index,0);assert.equal(E.simulate(b,['D']).index,0);
 if(task==='T04')assert.ok(E.simulate(b,['R','U','U','R']).error,'Initial bug is observable at every age');
 solved++;
}
for(let n=1;n<=6;n++)assert.equal(E.simulate(E.board('T03','6-8'),Array.from({length:n},()=>['R','U']).flat()).success,n===3);
for(let t=0;t<=100;t++)assert.equal(E.watering(t),(25<t)&&(70>=t));
for(let l=1;l<=5;l++)for(let r=1;r<=5;r++)assert.equal(E.motor(l,r),l===r&&l<=3);
const s=E.seed();E.record(s,'k01','T01',{type:'attempt'});E.record(s,'k01','T01',{type:'hint'});E.record(s,'k01','T01',{type:'complete'});E.record(s,'k01','T01',{type:'complete'});
assert.equal(E.stats(s,'k01').completed,1,'Repeated completion does not count as two tasks');assert.equal(E.stats(s,'k01').physical,0,'Digital completion does not falsely verify a physical task');
E.record(s,'k01','T01',{type:'physical'});E.record(s,'k02','T08',{type:'complete'});assert.equal(E.stats(s,'k01').physical,1);assert.equal(E.stats(s,'k02').physical,0);assert.equal(E.stats(s).completed,2);
const restored=JSON.parse(JSON.stringify(s));assert.deepEqual(E.stats(restored),E.stats(s),'State survives storage round trip');assert.equal(E.stats(restored,'k03').completed,0,'Profile isolation');
for(let i=0;i<220;i++)E.record(s,'k01','T01',{type:'attempt'});assert.equal(s.events.length,200,'Event history remains bounded');
console.log(JSON.stringify({status:'passed',themes:themes.length,solvableAgeBoards:solved,loopCases:6,thresholdCases:101,motorCases:25,checked:['script syntax','routes and obstacles','age-specific bug','loop endpoint','sensor rule boundaries','motor balance','digital versus physical status','profile isolation','storage round trip','event history cap']}));
