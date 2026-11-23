/* Original Canvas artwork. Arthur is a stylised human, not an actor portrait. */
const TAU=Math.PI*2;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const circle=(c,x,y,r,fill,stroke,lineWidth=1)=>{c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lineWidth;c.stroke();}};
const ellipse=(c,x,y,rx,ry,fill,stroke,lineWidth=1,rotation=0)=>{c.beginPath();c.ellipse(x,y,rx,ry,rotation,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lineWidth;c.stroke();}};
const path=(c,points,fill,stroke,lineWidth=1)=>{c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=lineWidth;c.stroke();}};
const line=(c,points,stroke,width=1)=>{c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=stroke;c.lineWidth=width;c.stroke();};
const rounded=(c,x,y,w,h,r,fill,stroke,width=1)=>{c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}};
function gradient(c,x,y,x2,y2,stops){const g=c.createLinearGradient(x,y,x2,y2);for(const [position,colour] of stops)g.addColorStop(position,colour);return g;}
function glow(c,x,y,r,colour){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,colour);g.addColorStop(1,'rgba(0,0,0,0)');circle(c,x,y,r,g);}
const stars=Array.from({length:75},(_,i)=>({x:(Math.sin(i*723.39)*10000)%1,y:(Math.sin(i*211.79+5)*10000)%1,p:i*.7})).map(s=>({...s,x:Math.abs(s.x),y:Math.abs(s.y)}));

function landscape(c,w,h,t,night=false){
  const horizon=h*.63;
  c.fillStyle=gradient(c,0,0,0,horizon,night?[[0,'#071524'],[.65,'#253844'],[1,'#5e6156']]:[[0,'#10202f'],[.55,'#3b4b50'],[.88,'#8e7860'],[1,'#b2936c']]);c.fillRect(0,0,w,h);
  for(const s of stars){const a=(.18+.18*Math.sin(t*.25+s.p))*(1-s.y*.8);circle(c,s.x*w,s.y*horizon*.75,.5+s.x,`rgba(223,230,201,${a})`);}
  glow(c,w*.73,horizon*.74,w*.24,night?'rgba(136,168,170,.08)':'rgba(248,203,139,.16)');
  circle(c,w*.77,horizon*.56,18,night?'#b1bbaa':'#d8c99f');circle(c,w*.79,horizon*.53,17,night?'#2c3f4a':'#697064');
  // Low clouds and an untouched horizon: no anachronistic buildings or roads.
  for(let i=0;i<6;i++){
    const y=horizon*(.18+i*.095),x=((i*.23+t*.001)%1)*w;
    ellipse(c,x,y,w*(.15+.035*(i%2)),7+i,'rgba(157,164,151,.055)');
  }
  path(c,[[0,horizon+20],[w*.08,horizon-10],[w*.21,horizon+2],[w*.35,horizon-38],[w*.5,horizon-17],[w*.68,horizon-44],[w*.83,horizon-8],[w,horizon-23],[w,h],[0,h]],'#253d3a');
  path(c,[[0,horizon+58],[w*.17,horizon+16],[w*.34,horizon+37],[w*.51,horizon+16],[w*.71,horizon+45],[w,horizon+7],[w,h],[0,h]],'#1a3531');
  c.fillStyle=gradient(c,0,horizon+32,0,h,[[0,'#243c30'],[1,'#0d2425']]);c.fillRect(0,horizon+55,w,h-horizon);
  for(let i=0;i<42;i++){
    const x=((i*.139)%1)*w,y=horizon+50+Math.abs(Math.sin(i*5.7))*(h-horizon-50);
    line(c,[[x-4,y+4],[x,y-6],[x+2,y+3],[x+7,y-2]],i%3?'#375141':'#53604a',1);
  }
  // Ferns provide scale without making a statement about prehistoric fauna.
  for(const [x,y,s] of [[w*.06,h*.9,.9],[w*.93,h*.91,1.1],[w*.48,h*.97,.65]]){
    c.save();c.translate(x,y);c.scale(s,s);line(c,[[0,0],[-3,-30],[0,-49]],'#617154',2);
    for(let j=0;j<5;j++){line(c,[[-2,-8-j*8],[-15-j*1.5,-16-j*8]],'#405c45',3);line(c,[[-2,-9-j*8],[12+j,-17-j*8]],'#405c45',3);}c.restore();
  }
}

function cave(c,x,ground,scale=1){
  c.save();c.translate(x,ground);c.scale(scale,scale);
  ellipse(c,4,0,131,14,'rgba(0,0,0,.25)');
  path(c,[[-143,0],[-131,-66],[-101,-104],[-68,-139],[-10,-157],[33,-137],[87,-99],[114,-46],[133,0]],gradient(c,-130,-140,110,0,[[0,'#526051'],[.5,'#394b43'],[1,'#243a34']]),'#69715d',1.2);
  path(c,[[-73,0],[-67,-57],[-41,-87],[0,-102],[37,-83],[61,-47],[66,0]],'#081a21','#1b2e2c',3);
  path(c,[[-143,0],[-100,-31],[-73,0]],'#52624a');path(c,[[67,0],[80,-32],[115,-18],[133,0]],'#44563f');
  line(c,[[-96,-106],[-68,-79],[-72,-54]],'#253f36',3);line(c,[[7,-150],[25,-113],[53,-111]],'#6b7158',2);
  line(c,[[-121,-58],[-104,-57],[-85,-27]],'#72806a',2);line(c,[[75,-90],[63,-67],[77,-42]],'#273e35',2);
  // A small unlit hearth. No modern infrastructure has arrived yet.
  ellipse(c,55,10,25,6,'#102525');for(let i=0;i<7;i++)ellipse(c,55+Math.cos(i*TAU/7)*21,10+Math.sin(i*TAU/7)*5,5,3,'#65725d','#26392f');
  line(c,[[45,9],[65,12]],'#3a2e25',4);line(c,[[48,13],[63,7]],'#423528',4);
  c.restore();
}

function ship(c,x,y,scale,t,{flying=false}={}){
  c.save();c.translate(x,y+(flying?Math.sin(t*.7)*3:0));c.scale(scale,scale);
  if(!flying){
    ellipse(c,0,93,128,12,'rgba(0,0,0,.24)');
    for(const side of [-1,1]){
      line(c,[[side*65,26],[side*92,56],[side*106,86]],'#9dada9',7);
      line(c,[[side*65,26],[side*92,56],[side*106,86]],'#d4dad0',2);
      ellipse(c,side*109,89,21,5,'#6d847e','#b0c0b4',1);
    }
  }
  glow(c,0,0,135,'rgba(179,216,199,.07)');
  const metal=gradient(c,0,-74,0,57,[[0,'#ced7cc'],[.22,'#a7b9b0'],[.5,'#7f9991'],[.7,'#c0cac0'],[1,'#3e5f5c']]);
  c.beginPath();c.moveTo(-145,9);c.bezierCurveTo(-98,-39,-40,-61,20,-47);c.bezierCurveTo(76,-44,127,-22,151,4);c.bezierCurveTo(117,40,17,58,-69,38);c.bezierCurveTo(-112,29,-137,17,-145,9);c.closePath();c.fillStyle=metal;c.fill();c.strokeStyle='#a6bbb0';c.lineWidth=1.5;c.stroke();
  path(c,[[-82,-23],[-38,-47],[15,-46],[48,-32],[32,-12],[-32,-8]],'#193b43','#82a9a3',1.2);
  line(c,[[-33,-46],[-32,-9]],'#87ada5',2);line(c,[[11,-45],[17,-14]],'#87ada5',2);
  line(c,[[-138,9],[-76,14],[-5,12],[76,6],[143,3]],'#dae0cf',1.2);
  line(c,[[-101,24],[-48,32],[18,32],[97,19]],'#46645e',2);
  for(const p of [[-105,4],[-89,8],[102,-1],[118,-1]])circle(c,...p,2.1,'#e2f9af');
  ellipse(c,0,39,44,7,'#334d4c','#8eb5a1');
  if(flying){
    glow(c,0,56,50,'rgba(172,235,181,.22)');
    const exhaust=gradient(c,0,47,0,135,[[0,'rgba(220,245,174,.55)'],[1,'rgba(130,200,180,0)']]);path(c,[[-20,45],[20,45],[37,138],[-33,138]],exhaust);
  }else{
    rounded(c,-36,-2,48,43,5,'#d9e2b5','#6f8f7c',2);
    rounded(c,-29,3,35,34,2,'#7b9c80');
    // Extended ramp, with the absurdly inviting light of a vehicle going elsewhere.
    path(c,[[-36,31],[12,31],[-42,102],[-111,102]],'#829a83','#b4c4a0',1.2);
    for(let i=0;i<5;i++){const u=(i+1)/6;line(c,[[-36-75*u,31+71*u],[12-54*u,31+71*u]],'#c6d2ac',1);}
    path(c,[[-36,0],[12,0],[-18,132],[-151,132]],'rgba(214,231,158,.07)');
  }
  c.restore();
}

function arthur(c,x,y,s=1,{pose='hope',t=0}={}){
  c.save();c.translate(x,y);c.scale(s,s);c.translate(0,Math.sin(t*.65)*.6);
  ellipse(c,0,2,40,7,'rgba(0,0,0,.35)');
  path(c,[[-22,-64],[-27,0],[-10,0],[-2,-45],[8,0],[26,0],[19,-66]],'#343f36','#4b5848');
  rounded(c,-30,-3,23,10,3,'#302d27');rounded(c,7,-3,26,10,3,'#302d27');
  // Match the portrait's brown dressing gown and pale woven towel.
  path(c,[[-28,-128],[-40,-106],[-36,-54],[-24,-33],[28,-35],[38,-64],[33,-109],[20,-128]],gradient(c,-37,-120,32,-30,[[0,'#a08a6d'],[.5,'#76604c'],[1,'#493c36']]),'#bfa88c',1.2);
  path(c,[[-11,-125],[0,-91],[13,-125],[13,-72],[-13,-72]],'#ded8b7');
  path(c,[[-28,-128],[-9,-132],[1,-94],[-17,-107]],'#b79a74');path(c,[[22,-128],[8,-132],[0,-94],[20,-111]],'#8f7558');
  line(c,[[-26,-77],[27,-77]],'#a58d6c',5);line(c,[[3,-77],[13,-51]],'#c6af83',3);
  path(c,[[-31,-122],[-24,-127],[-13,-121],[-17,-62],[-35,-65]],'#b4d1c3','#e5e4c5',.8);
  for(let y=-111;y<-66;y+=8)line(c,[[-31,y],[-16,y+2]],'#5c908388',.8);
  for(let x=-29;x<-16;x+=5)line(c,[[x,-117],[x-2,-66]],'#ebf0d977',.7);
  rounded(c,-10,-149,20,28,5,'#c5a47f');
  ellipse(c,0,-158,27,33,gradient(c,-27,-180,27,-134,[[0,'#e2c3a2'],[.65,'#c9a88b'],[1,'#aa866e']]),'#806c50',1);
  circle(c,-26,-154,5,'#c9a47a');circle(c,26,-154,5,'#bb9770');
  // Irregular brown hair and a few days of stubble give the human warmth.
  path(c,[[-27,-161],[-30,-179],[-22,-193],[-13,-188],[-3,-198],[5,-190],[16,-191],[27,-181],[28,-163],[16,-176],[4,-174],[-7,-181],[-18,-173]],'#4b443d','#786045',1);
  line(c,[[-17,-164],[-8,-166]],'#534f3b',2);line(c,[[8,-165],[17,-164]],'#534f3b',2);
  circle(c,-12,-157,2,'#253b34');circle(c,12,-157,2,'#253b34');line(c,[[1,-156],[-2,-145],[3,-143]],'#a28361',1.5);
  if(pose==='hope')c.strokeStyle='#674d3a';else c.strokeStyle='#674d3a';c.lineWidth=1.4;c.beginPath();c.moveTo(-7,-135);c.quadraticCurveTo(0,pose==='hope'?-130:-139,8,-135);c.stroke();
  for(let i=0;i<9;i++)line(c,[[-19+i*4.5,-136+(i%2)*5],[-18+i*4.5,-133+(i%2)*5]],'#957d5b',.7);
  if(pose==='hold'){
    path(c,[[-30,-116],[-46,-83],[-22,-73],[-15,-85],[-27,-95]],'#8e775b','#b4a080');
    path(c,[[29,-116],[43,-83],[20,-73],[14,-85],[28,-95]],'#6b5746','#a38a6e');
    ellipse(c,-14,-79,11,6,'#c6a580');ellipse(c,15,-79,11,6,'#c6a580');
  }else if(pose==='bewildered'){
    path(c,[[-29,-115],[-42,-84],[-58,-96],[-64,-87],[-43,-65],[-26,-80]],'#8e775b','#b4a080');ellipse(c,-64,-91,7,10,'#c7a681',null,1,-.4);
    path(c,[[29,-115],[40,-78],[53,-92],[64,-88],[44,-60],[27,-79]],'#6b5746','#a38a6e');ellipse(c,64,-91,7,10,'#c7a681',null,1,.4);
  }else{
    path(c,[[-29,-115],[-39,-89],[-42,-61],[-28,-59],[-23,-94]],'#8e775b');ellipse(c,-35,-55,6,9,'#c7a681');
    const wave=Math.sin(t*1.1)*4;
    path(c,[[27,-119],[43,-103],[56,-137],[68+wave,-135],[55,-82],[38,-79],[20,-101]],'#7b654e','#a38a6e');
    ellipse(c,63+wave,-145,7,13,'#c7a681',null,1,.3);line(c,[[60+wave,-147],[55+wave,-153]],'#c7a681',4);
  }
  // One conspicuous repair rather than a pristine costume.
  path(c,[[-33,-91],[-24,-89],[-25,-78],[-35,-80]],'#a8996e','#c2b287',.8);
  c.restore();
}

function wowbagger(c,x,y,s=1,{giving=false,t=0}={}){
  c.save();c.translate(x,y);c.scale(s,s);c.translate(0,Math.sin(t*.5+1)*.5);
  ellipse(c,0,1,48,8,'rgba(0,0,0,.3)');
  const cloth=gradient(c,-40,-120,44,0,[[0,'#d0bb76'],[.5,'#ac914b'],[1,'#695831']]);
  path(c,[[-31,-126],[-44,-103],[-51,-2],[-20,4],[38,1],[46,-7],[34,-106],[24,-126]],cloth,'#bda863',1.2);
  path(c,[[-22,-117],[-6,-4],[7,0],[11,-120]],'rgba(232,220,158,.13)');
  line(c,[[-28,-87],[-23,-5]],'#6e5b33',1.5);line(c,[[23,-93],[33,-7]],'#826e3b',1.5);
  path(c,[[-33,-128],[-47,-153],[-6,-132],[0,-108]],'#ddc57e','#e8d38c');
  path(c,[[29,-128],[44,-152],[10,-135],[0,-108]],'#b09550','#d4bb73');
  rounded(c,-10,-151,20,25,4,'#9bb19c');
  c.beginPath();c.moveTo(-33,-174);c.bezierCurveTo(-31,-193,30,-193,34,-175);c.lineTo(29,-153);c.quadraticCurveTo(0,-138,-28,-155);c.closePath();c.fillStyle=gradient(c,-31,-182,32,-150,[[0,'#c3d1b2'],[.5,'#a4ba9f'],[1,'#789885']]);c.fill();c.strokeStyle='#9caf91';c.lineWidth=1;c.stroke();
  path(c,[[-31,-172],[-43,-175],[-33,-161]],'#a6ba9c');path(c,[[31,-172],[42,-174],[33,-160]],'#8fa98d');
  line(c,[[-23,-169],[-9,-168]],'#294738',2.7);line(c,[[10,-168],[24,-171]],'#294738',2.7);line(c,[[0,-167],[-3,-157],[2,-157]],'#5f8267',1.2);line(c,[[-7,-150],[10,-151]],'#3b6147',1.4);
  if(giving){
    path(c,[[30,-123],[49,-92],[71,-94],[76,-79],[44,-74],[22,-100]],cloth,'#bfa568');ellipse(c,81,-87,12,6,'#a9bca1');
  }else{
    path(c,[[29,-122],[44,-94],[35,-66],[23,-70],[27,-96]],'#a78d48');ellipse(c,29,-65,7,9,'#a2b89b');
  }
  path(c,[[-32,-124],[-45,-97],[-40,-66],[-24,-65],[-25,-96]],'#bb9f59');ellipse(c,-32,-59,7,10,'#acc1a2');
  c.restore();
}

function clipboard(c,x,y,s,locale,t){
  c.save();c.translate(x,y);c.rotate(-.06+Math.sin(t*.3)*.005);c.scale(s,s);
  glow(c,0,0,125,'rgba(140,210,178,.08)');
  rounded(c,-90,-108,180,213,9,'#173c3b','#90b7a0',1.5);rounded(c,-79,-96,158,190,5,'#102b2e','#41675e');
  rounded(c,-29,-116,58,16,4,'#738778','#b7b79b');
  c.font='10px monospace';c.fillStyle='#a8cfa5';c.textAlign='left';c.fillText(locale==='ja'?'氏名照合':'IDENTITY CHECK',-63,-71);
  c.font='17px sans-serif';c.fillStyle='#dfedcd';['ARTHUR','PHILIP','DENT'].forEach((text,i)=>c.fillText(text,-63,-40+i*26));
  line(c,[[-63,32],[63,32]],'#4b7d69',1);
  c.font='10px monospace';c.fillStyle='#7fb6a6';c.fillText(locale==='ja'?'地球 / 太陽系':'EARTH / SOL',-63,52);
  c.fillStyle='#d3ed9b';c.font='11px sans-serif';c.fillText(locale==='ja'?'本人確認済み':'IDENTITY VERIFIED',-63,77);
  circle(c,60,-68,4,'#d9f78b');
  c.restore();
}

function crystal(c,x,y,s,t){
  c.save();c.translate(x,y);c.scale(s,s);glow(c,0,0,65,'rgba(181,225,137,.2)');
  const angle=t*.19,points=[[-30,10],[0,-43],[31,12],[0,30]].map(([x,y])=>[x*Math.cos(angle)+y*.25*Math.sin(angle),y]);
  for(const [a,b] of [[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]])line(c,[points[a],points[b]],'#a7d8ba',2);
  path(c,[points[0],points[1],points[2]],'rgba(157,209,174,.08)');
  points.forEach(([x,y])=>circle(c,x,y,6,'#e2cb72','#fff0ac',1));circle(c,0,0,7,'#ad9bdb','#d8c9fa',1);
  for(let i=0;i<6;i++){const a=i*TAU/6+angle;circle(c,Math.cos(a)*45,Math.sin(a)*18+4,3,'#bce29d','#e2f6ad',.6);}
  ellipse(c,0,43,46,8,'#1d4040','#83b39c');rounded(c,-36,41,72,9,3,'#354f49','#89a18b');
  c.restore();
}

function shot(c,w,h,t,index,locale){
  const ground=h*.85,mobile=w<620,unit=mobile?.82:1;
  landscape(c,w,h,t,index===3);
  if(index===0){
    cave(c,w*.19,ground,mobile?.72:.9);
    ship(c,w*.69,ground-93*unit,unit,t);
    arthur(c,w*.31,ground+8,unit*.82,{pose:'hope',t});
    glow(c,w*.62,ground+10,w*.18,'rgba(192,219,143,.07)');
    wowbagger(c,w*.51,ground+3,unit*.49,{t});
  }else if(index===1){
    c.save();c.globalAlpha=.25;cave(c,w*.16,ground,.76);ship(c,w*.8,ground-98,.7,t);c.restore();
    arthur(c,w*.2,ground+8,unit*1.12,{pose:'bewildered',t});
    wowbagger(c,w*.8,ground+9,unit*1.2,{t});
    clipboard(c,w*.5,h*.5,unit*.97,locale,t);
  }else if(index===2){
    c.save();c.globalAlpha=.48;cave(c,w*.74,ground,.8);ship(c,w*.21,ground-70,.67,t);c.restore();
    wowbagger(c,w*.3,ground+4,unit*1.09,{giving:true,t});
    arthur(c,w*.67,ground+7,unit*1.11,{pose:'hold',t});
    crystal(c,w*.67,ground-90*unit,unit*.9,t);
    // A small display line identifies this as the playful extra, not canon.
    c.font='12px monospace';c.textAlign='center';c.fillStyle='#d9daac';c.fillText('Li₁₀GeP₂S₁₂',w*.67,ground+29);
  }else{
    cave(c,w*.2,ground,mobile?.78:.95);
    arthur(c,w*.34,ground+9,unit*.84,{pose:'left-behind',t});
    const sx=w*.7,sy=h*.34;
    for(let i=0;i<17;i++){const p=i/17;circle(c,sx-18*p,h*.39+p*h*.23,1.5*(1-p),`rgba(174,215,170,${.22*(1-p)})`);}
    ship(c,sx,sy,unit*.56,t,{flying:true});
    path(c,[[w*.48,ground+16],[w*.49,ground-13],[w*.55,ground-24],[w*.6,ground-5],[w*.61,ground+16]],'#405244','#69745a');
    crystal(c,w*.55,ground-43,unit*.38,t);
    // Enough empty sky to make a very small human's disappointment legible.
  }
  const vignette=c.createRadialGradient(w*.5,h*.48,w*.14,w*.5,h*.48,w*.68);vignette.addColorStop(0,'rgba(4,13,19,0)');vignette.addColorStop(1,'rgba(4,13,19,.5)');c.fillStyle=vignette;c.fillRect(0,0,w,h);
}

export class ArthurScene {
  constructor(canvas,{reducedMotion}={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.index=0;this.previous=0;this.locale='ja';this.active=false;this.destroyed=false;this.frame=null;this.elapsed=0;this.last=0;this.changed=0;
    this.motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');this.reducedMotion=reducedMotion??this.motionQuery.matches;
    this.width=800;this.height=500;
    this.onVisibility=()=>{if(document.hidden)this.cancel();else this.wake();};document.addEventListener('visibilitychange',this.onVisibility);
    this.onMotion=()=>{if(reducedMotion!==undefined)return;this.reducedMotion=this.motionQuery.matches;this.draw(performance.now());this.wake();};this.motionQuery.addEventListener?.('change',this.onMotion);
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas);this.resize();
  }
  visible(){return !document.hidden&&this.canvas.getClientRects().length>0;}
  resize(){
    if(this.destroyed)return;const box=this.canvas.getBoundingClientRect();if(box.width<=0||box.height<=0){this.cancel();return;}
    this.width=box.width;this.height=box.height;const dpr=Math.min(globalThis.devicePixelRatio||1,2);this.canvas.width=Math.round(box.width*dpr);this.canvas.height=Math.round(box.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);this.draw(performance.now());this.wake();
  }
  setScene(index,locale='ja'){
    const next=clamp(Math.trunc(Number(index)||0),0,3);this.locale=locale==='en'?'en':'ja';
    if(next!==this.index){this.previous=this.reducedMotion||!this.active?next:this.index;this.index=next;this.changed=performance.now();}
    if(this.visible())this.draw(performance.now());this.wake();
  }
  start(){if(this.destroyed)return;this.active=true;this.resize();this.wake();}
  stop(){this.active=false;this.cancel();}
  cancel(){if(this.frame!==null)cancelAnimationFrame(this.frame);this.frame=null;this.last=0;}
  wake(){if(this.active&&!this.destroyed&&this.visible()&&this.frame===null)this.frame=requestAnimationFrame(now=>this.tick(now));}
  tick(now){this.frame=null;if(!this.active||this.destroyed||!this.visible()){this.last=0;return;}const dt=this.last?Math.min((now-this.last)/1000,.05):0;this.last=now;if(!this.reducedMotion)this.elapsed+=dt;this.draw(now);if(!this.reducedMotion)this.wake();}
  draw(now){
    if(!this.ctx)return;const c=this.ctx,w=this.width,h=this.height;c.clearRect(0,0,w,h);
    const designWidth=w<540?560:800,scale=w/designWidth,designHeight=h/scale;
    c.save();c.scale(scale,scale);
    const progress=this.reducedMotion?1:clamp((now-this.changed)/400,0,1),fade=progress*progress*(3-2*progress);
    if(this.previous!==this.index&&fade<1){c.save();c.globalAlpha=1-fade;shot(c,designWidth,designHeight,this.elapsed,this.previous,this.locale);c.restore();}
    c.save();c.globalAlpha=this.previous===this.index?1:fade;shot(c,designWidth,designHeight,this.elapsed,this.index,this.locale);c.restore();c.restore();
  }
  destroy(){this.stop();this.destroyed=true;this.observer.disconnect();document.removeEventListener('visibilitychange',this.onVisibility);this.motionQuery.removeEventListener?.('change',this.onMotion);}
}
