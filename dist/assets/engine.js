'use strict';
(function(root){
 function board(task,age){
  if(task==='T03')return{size:5,start:[0,4],goal:[3,1],obstacles:[]};
  const size=age==='4-5'?3:age==='9-12'?6:5;
  const obstacles=task==='T04'?(age==='4-5'?[[1,size-1]]:[[1,size-1],[2,size-3]]):age==='4-5'?[]:[[1,size-2],[2,size-3],[3,size-4]];
  return{size,start:[0,size-1],goal:[size-1,0],obstacles};
 }
 function simulate(config,commands){
  let pos=[...config.start],path=[pos],error=null,index=-1;const delta={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]};
  for(let i=0;i<commands.length;i++){
   const d=delta[commands[i]];if(!d){error='Geçersiz komut';index=i;break}
   const next=[pos[0]+d[0],pos[1]+d[1]];
   if(next.some(v=>v<0||v>=config.size)){error='Parkurun dışına çıkılıyor.';index=i;break}
   if(config.obstacles.some(o=>o[0]===next[0]&&o[1]===next[1])){error='Bu hücrede bir engel var.';index=i;break}
   pos=next;path.push(pos);
  }
  return{path,error,index,position:pos,success:!error&&pos[0]===config.goal[0]&&pos[1]===config.goal[1]};
 }
 function watering(threshold){return threshold>25&&threshold<=70}
 function motor(left,right){return left===right&&left>=1&&left<=3}
 function seed(){return{version:1,profile:'k01',age:'6-8',color:'mint',results:{},assignments:[],observations:[],events:[],scene:'empty',tour:0}}
 function record(state,profile,task,event){
  const key=profile+':'+task;const old=state.results[key]||{attempts:0,hints:0,complete:false,physical:false,reflected:false};
  if(event.type==='attempt')old.attempts++;
  if(event.type==='hint')old.hints++;
  if(event.type==='complete'){old.complete=true;old.completedAt=new Date().toISOString()}
  if(event.type==='physical')old.physical=true;
  if(event.type==='reflect')old.reflected=true;
  state.results[key]=old;state.events.unshift({profile,task,type:event.type,at:new Date().toISOString()});state.events=state.events.slice(0,200);return old;
 }
 function stats(state,profile){const list=Object.entries(state.results).filter(([k])=>!profile||k.startsWith(profile+':')).map(([,v])=>v);return{completed:list.filter(x=>x.complete).length,physical:list.filter(x=>x.physical).length,attempts:list.reduce((n,x)=>n+x.attempts,0),hints:list.reduce((n,x)=>n+x.hints,0),reflected:list.filter(x=>x.reflected).length}}
 const api={board,simulate,watering,motor,seed,record,stats};root.KK_ENGINE=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
