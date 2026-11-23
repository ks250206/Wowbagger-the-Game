/* Four original, animated illustrations for the game's story prologue. */
const TAU=Math.PI*2;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
const colors={lime:'#d9f78b',cyan:'#82dcce',gold:'#c6a85c',coral:'#ff9c79',ink:'#0a1420',skin:'#a8b9a5'};
function circle(c,x,y,r,fill,edge,width=1){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(edge){c.strokeStyle=edge;c.lineWidth=width;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill,edge,width=1,rotation=0){c.beginPath();c.ellipse(x,y,rx,ry,rotation,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(edge){c.strokeStyle=edge;c.lineWidth=width;c.stroke();}}
function poly(c,points,fill,edge,width=1){c.beginPath();points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(edge){c.strokeStyle=edge;c.lineWidth=width;c.stroke();}}
function line(c,points,color,width=1){c.beginPath();points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function rect(c,x,y,w,h,r,fill,edge,width=1){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(edge){c.strokeStyle=edge;c.lineWidth=width;c.stroke();}}
function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');circle(c,x,y,r,g);}
function gradient(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach(([t,col])=>g.addColorStop(t,col));return g;}
function rng(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const random=rng(428841);
const stars=Array.from({length:96},()=>({x:random()*680,y:random()*350,r:.4+random()*1.1,a:.15+random()*.65,p:random()*TAU}));

function backdrop(c,t,variant){
  c.fillStyle=gradient(c,0,0,680,420,[[0,'#0c1b27'],[.5,'#0c1420'],[1,'#111a25']]);c.fillRect(0,0,680,420);
  glow(c,variant===1?500:340,160,300,variant===1?'rgba(77,75,105,.15)':'rgba(50,103,100,.13)');
  for(const s of stars){const alpha=s.a*(.83+.17*Math.sin(t*.4+s.p));circle(c,s.x,s.y,s.r,`rgba(192,217,215,${alpha})`);}
  c.save();c.strokeStyle='rgba(115,160,164,.035)';c.lineWidth=1;
  for(let i=0;i<8;i++){c.beginPath();c.moveTo(i*100-80,420);c.lineTo(340+(i-3.4)*22,260);c.stroke();}
  for(const y of [295,320,359,410]){c.beginPath();c.moveTo(0,y);c.lineTo(680,y);c.stroke();}
  c.restore();
  // A subtle vignette keeps the illustration distinct from the story caption.
  const vignette=c.createRadialGradient(340,210,100,340,210,390);vignette.addColorStop(0,'rgba(6,13,22,0)');vignette.addColorStop(1,'rgba(6,13,22,.6)');c.fillStyle=vignette;c.fillRect(0,0,680,420);
}

function hero(c,x,y,scale=1,{pose='stand',time=0}={}){
  c.save();c.translate(x,y);c.scale(scale,scale);
  if(pose==='slump')c.rotate(-.1);
  const idle=pose==='slump'?Math.sin(time*.4)*.7:Math.sin(time*.8)*1.1;c.translate(0,idle);
  ellipse(c,2,3,59,10,'rgba(0,0,0,.35)');
  // Monumental, folded gold robe and extravagant angular collar.
  const cloth=gradient(c,-55,-90,58,5,[[0,'#64502e'],[.2,'#b79b56'],[.5,'#d0b774'],[.7,'#a48643'],[1,'#5f4c2a']]);
  poly(c,[[-37,-101],[-49,-72],[-57,1],[-28,6],[6,3],[54,0],[43,-74],[31,-102]],cloth,'#b59c5b',1.2);
  poly(c,[[-26,-91],[-12,-1],[2,4],[5,-91]],'rgba(245,227,164,.12)');
  line(c,[[-29,-83],[-23,-5]],'rgba(51,41,25,.38)',1.2);line(c,[[25,-81],[35,-4]],'rgba(51,41,25,.45)',1.2);line(c,[[10,-74],[13,-8]],'rgba(243,222,161,.25)',1.1);
  poly(c,[[-41,-104],[-50,-127],[-14,-111],[0,-85]],'#cfb36b','#dcc686',1);
  poly(c,[[36,-103],[48,-129],[13,-111],[0,-85]],'#a78743','#d4bb75',1);
  rect(c,-35,-53,70,8,1,'#705d35');rect(c,-8,-57,16,14,2,'#cbb16b','#e1cd8d',1);
  circle(c,0,-50,3,'#516c61');
  // Pale gray-green alien head, notably flattened and broad.
  rect(c,-12,-122,24,23,4,'#91a494');
  const skin=gradient(c,-40,-158,45,-111,[[0,'#c0cdb4'],[.45,colors.skin],[1,'#6b8b7c']]);
  c.beginPath();c.moveTo(-39,-145);c.bezierCurveTo(-39,-166,39,-167,40,-145);c.lineTo(35,-123);c.quadraticCurveTo(4,-104,-30,-120);c.closePath();c.fillStyle=skin;c.fill();c.strokeStyle='#9cad98';c.lineWidth=1;c.stroke();
  poly(c,[[-36,-141],[-47,-140],[-39,-128]],'#9aaa94');poly(c,[[36,-141],[47,-140],[39,-128]],'#7e9a87');
  // Eyes remain dryly unimpressed in every epoch.
  line(c,[[-27,-139],[-12,-138]],'#203e37',3);line(c,[[12,-138],[28,-140]],'#203e37',3);
  line(c,[[-2,-138],[-5,-126],[2,-125]],'rgba(45,72,58,.4)',1.5);
  line(c,[[-11,-118],[12,-119]],'#3c5b4a',1.5);
  line(c,[[-27,-151],[-12,-152]],'rgba(237,240,213,.3)',1.5);line(c,[[9,-152],[28,-152]],'rgba(237,240,213,.24)',1.5);
  if(pose==='give'||pose==='point'){
    poly(c,[[34,-101],[48,-87],[80,-79],[87,-59],[58,-60],[30,-76]],cloth,'#b79a57',1.1);
    ellipse(c,91,-66,12,6,'#aabcaa');
    if(pose==='point')line(c,[[95,-69],[111,-79]],'#aabcaa',5);
    else line(c,[[94,-62],[110,-62]],'#aabcaa',4);
    poly(c,[[-37,-96],[-43,-62],[-22,-48],[-15,-57],[-28,-73]],'#a88a48');
    ellipse(c,-15,-51,10,6,'#9bb09c',null,1,-.4);
  }else if(pose==='slump'){
    poly(c,[[-35,-94],[-53,-72],[-42,-56],[-9,-103],[-16,-112],[-39,-85]],'#b59a58','#c3a96a',1);
    ellipse(c,-12,-112,7,13,'#a6b89f',null,1,-.25);
    poly(c,[[36,-95],[57,-69],[68,-22],[54,-19],[37,-57]],'#9b7f43');ellipse(c,61,-15,7,12,'#91aa97');
  }else{
    poly(c,[[-37,-99],[-49,-71],[-47,-33],[-32,-31],[-27,-72]],'#b19756');ellipse(c,-39,-27,7,10,'#9eaf98');
    poly(c,[[35,-100],[49,-72],[47,-32],[31,-32],[26,-73]],'#a48846');ellipse(c,39,-26,7,10,'#91a794');
  }
  c.restore();
}

function drink(c,x,y,rotation){
  c.save();c.translate(x,y);c.rotate(rotation);
  ellipse(c,0,34,19,5,'rgba(135,180,182,.12)','#62898a',1);line(c,[[0,6],[0,32]],'#a5bfc0',3);
  poly(c,[[-25,-25],[25,-25],[13,2],[0,9],[-13,2]],'rgba(130,220,206,.11)','#a4c6bf',1.6);
  poly(c,[[-17,-12],[17,-12],[11,1],[0,6],[-11,1]],'rgba(244,170,98,.75)');
  line(c,[[6,-9],[21,-38],[28,-37]],'#e4d2a2',2);circle(c,-11,-18,6,'#d4e989','#8caa5b',1);
  c.restore();
}

function accident(c,t){
  // The huge machine frames the player, while its misbehaving beam feeds the mishap.
  const pulse=.5+.5*Math.sin(t*1.4);
  glow(c,340,218,178,`rgba(130,220,206,${.06+pulse*.05})`);
  for(const x of [65,565]){
    rect(c,x,104,49,234,8,'#142d35','#3b5b5b',1.2);
    rect(c,x+9,121,31,53,4,'#091b25','#385956',1);
    for(let j=0;j<4;j++)rect(c,x+12,192+j*27,25,7,2,j===Math.floor(t*.8)%4?'#b2d97b':'#35524c');
    poly(c,[[x-8,337],[x+58,337],[x+69,358],[x-18,358]],'#1b343b','#49625c',1);
    line(c,[[x+24,104],[x+24,68],[x===65?181:499,68],[x===65?199:481,103]],'#274a4e',7);
  }
  c.save();c.translate(340,217);
  circle(c,0,0,154,null,'#152f38',30);circle(c,0,0,167,null,'#43615f',1.2);circle(c,0,0,140,null,'#7da591',1.2);
  for(let i=0;i<16;i++){
    const a=i*TAU/16;c.save();c.rotate(a);rect(c,-4,-164,8,20,2,i%3===0?'#8aab88':'#355651');c.restore();
  }
  c.save();c.rotate(t*.15);c.strokeStyle='rgba(130,220,206,.74)';c.lineWidth=2;
  for(let i=0;i<3;i++){c.beginPath();c.arc(0,0,155,i*TAU/3,i*TAU/3+.65);c.stroke();}c.restore();
  // Oscillating beam is placed behind the character.
  c.beginPath();for(let i=0;i<90;i++){const x=-142+i*284/89,y=Math.sin(i*.38+t*3)*8*Math.sin(i/89*Math.PI);if(i)c.lineTo(x,y);else c.moveTo(x,y);}c.strokeStyle=`rgba(194,247,157,${.3+pulse*.25})`;c.lineWidth=3;c.stroke();
  c.restore();
  // Ring accelerator controls and a carelessly suspended liquid lunch.
  rect(c,123,305,86,40,6,'#18313b','#4c6b65',1);rect(c,133,314,33,18,2,'#0c1e25');line(c,[[137,324],[143,320],[148,326],[155,318],[162,322]],'#9bd49b',1.4);
  circle(c,183,324,8,'#4c5850','#a7a979',1.1);line(c,[[183,324],[187,318]],'#d5dba2',1.2);
  drink(c,184+Math.sin(t*.7)*5,219+Math.cos(t*.6)*5,-.33);
  for(let i=0;i<7;i++){const p=(t*.12+i/7)%1;circle(c,212+p*71,220-Math.sin(p*Math.PI)*35,1.5+i%2,'rgba(255,181,111,.8)');}
  c.save();c.translate(484,153);c.rotate(-.4+Math.sin(t*.5)*.08);ellipse(c,0,0,25,11,null,'#b6a4ec',5);ellipse(c,11,15,25,11,null,'#e2aa7f',5,.6);c.restore();
  for(let i=0;i<10;i++){const p=(t*.12+i/10)%1;const a=p*TAU;circle(c,340+Math.cos(a)*112,217+Math.sin(a)*105,1.5,'#d9f78b');}
  ellipse(c,340,365,99,17,'#10252c','#3d5851',1);hero(c,340,354,1.09,{time:t});
  // Small sparks, clearly a malfunction rather than a combat attack.
  for(const [x,y,a] of [[460,285,.1],[246,119,.5],[497,100,1.1]]){
    c.save();c.translate(x,y);c.rotate(a);const flicker=.5+.5*Math.sin(t*2+a);c.globalAlpha=.35+flicker*.4;line(c,[[-11,0],[-3,-4],[2,5],[12,-1]],colors.coral,2);line(c,[[0,-12],[2,-7]],colors.lime,1.5);c.restore();
  }
}

function ruinedColumn(c,x,y,h,scale=1){
  c.save();c.translate(x,y);c.scale(scale,scale);
  poly(c,[[-15,0],[-17,-h+14],[-10,-h+7],[-4,-h+19],[4,-h],[14,-h+12],[16,0]],'#1c2935','#35424a',1);
  for(const dx of [-8,0,8])line(c,[[dx,-h+32],[dx,0]],'#30404a',1);
  rect(c,-23,0,46,12,2,'#293742','#3c4850',1);line(c,[[-15,-70],[0,-57],[-4,-31]],'#101c28',2);
  c.restore();
}

function eternity(c,t){
  // Broken architecture and overlapping clockwork put geological time in one frame.
  ruinedColumn(c,75,350,170,.83);ruinedColumn(c,609,350,220,1.07);
  ruinedColumn(c,116,353,66,.7);poly(c,[[569,358],[582,330],[596,338],[600,358]],'#25333e','#39464d');
  line(c,[[56,202],[66,181],[83,188]],'#3c4850',7);line(c,[[597,131],[612,112],[627,123]],'#35424a',8);
  // Dying sun on the left and its long, trailing dust.
  glow(c,112,94,63,'rgba(242,159,105,.12)');circle(c,112,94,23,'#bb8960','#dfb078',1);
  c.save();circle(c,112,94,23);c.clip();ellipse(c,122,101,21,31,'#674a43');c.restore();
  for(let i=0;i<15;i++){const p=(i/15+t*.025)%1;circle(c,146+p*115,90-Math.sin(p*Math.PI)*30,1.3*(1-p),`rgba(230,167,121,${.5*(1-p)})`);}
  c.save();c.translate(480,184);c.rotate(-.12);
  glow(c,0,0,140,'rgba(158,169,178,.05)');circle(c,0,0,108,'rgba(16,28,39,.76)','#3a5159',2);circle(c,0,0,98,null,'#69777a',1);circle(c,0,0,93,null,'rgba(136,158,158,.2)',1);
  for(let i=0;i<60;i++){const a=i*TAU/60,r=i%5?89:84;line(c,[[Math.sin(a)*r,-Math.cos(a)*r],[Math.sin(a)*94,-Math.cos(a)*94]],i%5?'#354b52':'#9aaca6',i%5?1:2);}
  // The persistent hands say three o'clock; translucent hands race through centuries.
  c.save();c.rotate(t*.34);line(c,[[0,0],[0,-74]],'rgba(130,220,206,.13)',3);c.rotate(.5);line(c,[[0,0],[0,-67]],'rgba(130,220,206,.07)',2);c.restore();
  line(c,[[0,-74],[0,0],[53,0]],'#b8c3ae',4);circle(c,0,0,5,colors.gold);circle(c,0,0,2,'#173036');
  // Clock face crack: nothing, including the furniture, shares the player's immortality.
  line(c,[[43,-97],[28,-71],[44,-51],[32,-38]],'#0d1a27',3);line(c,[[28,-71],[11,-68]],'#0d1a27',2);
  c.restore();
  // The same chair has survived considerably less well than its occupant.
  ellipse(c,244,367,105,15,'rgba(0,0,0,.3)');
  rect(c,167,200,115,127,17,gradient(c,167,200,282,330,[[0,'#27404a'],[1,'#142a34']]),'#43616a',1.3);
  rect(c,176,213,97,99,11,'#203841','#3f5960',1);line(c,[[208,215],[213,258],[207,282]],'#132b34',2);
  rect(c,162,311,130,33,9,'#2a424b','#49616a',1);rect(c,149,277,28,58,10,'#34505a','#4d6267',1);rect(c,281,282,26,54,10,'#263e49','#465b66',1);
  line(c,[[179,339],[173,362]],'#283d45',9);line(c,[[281,338],[285,361]],'#283d45',9);
  hero(c,242,350,1.02,{pose:'slump',time:t});
  // One cup, no refill, a few particles of dust.
  ellipse(c,338,341,22,6,'#273a41','#4b5d5e');line(c,[[338,341],[338,365]],'#3a4d52',4);ellipse(c,338,365,14,3,'#283e46');
  rect(c,327,318,20,18,4,'#7e8e83','#b3bc9f',1);c.beginPath();c.arc(347,326,6,-Math.PI/2,Math.PI/2);c.strokeStyle='#a3b09d';c.lineWidth=2;c.stroke();
  for(let i=0;i<11;i++){const p=(t*.015+i/11)%1;circle(c,150+i*33,135+p*194,1,'rgba(210,216,188,.24)');}
  c.save();c.setLineDash([3,8]);c.strokeStyle='rgba(142,170,164,.14)';c.lineWidth=1;c.beginPath();c.ellipse(344,195,280,145,-.2,.15,Math.PI+.2);c.stroke();c.restore();
}

function smallPlanet(c,x,y,r,color,ring=false){
  glow(c,x,y,r*2.5,'rgba(130,220,206,.04)');
  const g=c.createRadialGradient(x-r*.4,y-r*.45,1,x,y,r*1.1);g.addColorStop(0,color);g.addColorStop(1,'#233d48');circle(c,x,y,r,g,'rgba(174,209,198,.4)',.8);
  c.save();circle(c,x,y,r);c.clip();ellipse(c,x-3,y-r*.3,r*1.2,r*.17,'rgba(245,239,206,.12)',null,1,-.25);ellipse(c,x,y+r*.3,r*1.1,r*.1,'rgba(4,22,30,.18)',null,1,-.25);c.restore();
  if(ring)ellipse(c,x,y,r*1.65,r*.4,null,'rgba(193,193,153,.6)',2,-.4);
}
function ship(c,x,y,scale=1,t=0){
  c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(.3);
  glow(c,0,28,35,'rgba(165,233,162,.15)');
  poly(c,[[-6,23],[0,51+Math.sin(t*4)*3],[6,23]],'rgba(176,237,169,.65)');
  poly(c,[[0,-50],[38,33],[11,22],[0,30],[-11,22],[-38,33]],'#b7c7bc','#d8e3c6',1.5);
  poly(c,[[0,-37],[9,12],[-9,12]],'#193943','#668b88',1);rect(c,-3,-17,6,20,2,'#b3e89a');line(c,[[-24,23],[-15,17]],'#6c958b',2);line(c,[[24,23],[15,17]],'#6c958b',2);
  c.restore();
}

function mission(c,t){
  const worlds=[[82,97,19,'#a8c891'],[223,73,14,'#9dc9d2'],[281,190,22,'#af9bd5'],[81,228,16,'#d7a687']];
  c.save();c.setLineDash([3,7]);c.strokeStyle='rgba(133,202,180,.3)';c.lineWidth=1;line(c,[[82,97],[223,73],[281,190],[81,228],[82,97]],'rgba(133,202,180,.3)',1);c.restore();
  worlds.forEach((p,i)=>smallPlanet(c,...p,i===2));
  // Faint continuation of the census extends off the visible hologram.
  glow(c,460,202,205,'rgba(130,220,206,.10)');
  ellipse(c,460,358,76,16,'#16313b','#4b7670',1);ellipse(c,460,355,59,10,'#1e4c4b','#7aa58a',1);circle(c,460,355,8,'#c8e998');
  poly(c,[[415,352],[340,60],[611,60],[505,352]],'rgba(130,220,206,.025)');
  c.save();c.translate(343,52);c.transform(1,.035,-.035,1,0,0);
  rect(c,0,0,268,274,10,'rgba(11,37,43,.80)','#5d968a',1.2);rect(c,8,8,252,258,5,null,'rgba(130,220,206,.12)',1);
  // Registration marks and alphabetical rows are the visual story, not narration.
  line(c,[[16,20],[16,14],[39,14]],'#a4d4ac',1.5);line(c,[[229,258],[251,258],[251,249]],'#a4d4ac',1.5);
  for(let i=0;i<3;i++){
    const y=58+i*75;c.font='400 45px ui-monospace,monospace';c.fillStyle=i===0?'#d9f78b':'#83b4a3';c.fillText(['A','B','C'][i],25,y+10);
    rect(c,88,y-16,121-i*14,5,2,i===0?'#92cfa6':'#3c6b64');rect(c,88,y-3,143-i*13,3,1,'#355b59');rect(c,88,y+8,95+i*10,3,1,'#2a4b4d');
    circle(c,238,y-7,5,null,i===0?'#bbdf93':'#46716a',1.3);
    line(c,[[22,y+34],[246,y+34]],'rgba(130,220,206,.1)',1);
  }
  // A line scans the limitless population list.
  const scan=23+(t*22)%225;c.fillStyle='rgba(169,231,170,.07)';c.fillRect(12,scan,244,3);
  c.restore();
  hero(c,178,361,1.13,{pose:'point',time:t});
  ship(c,583,350,.56,t);
  c.save();c.setLineDash([2,6]);c.beginPath();c.moveTo(263,272);c.quadraticCurveTo(312,280,330,174);c.strokeStyle='rgba(217,247,139,.45)';c.lineWidth=1.3;c.stroke();c.restore();
  for(let i=0;i<3;i++)circle(c,306+i*12,367,2,'#547d71');
}

function recipient(c,x,y,scale=1,t=0){
  c.save();c.translate(x,y);c.scale(scale,scale);c.translate(0,Math.sin(t*.75)*.8);
  ellipse(c,0,4,58,8,'rgba(0,0,0,.3)');
  poly(c,[[-31,-95],[-49,-70],[-46,0],[49,0],[48,-66],[30,-94]],gradient(c,-45,-90,48,0,[[0,'#6b637d'],[.6,'#433f60'],[1,'#2c3652']]),'#7a718d',1.2);
  poly(c,[[-25,-93],[0,-57],[27,-93],[17,-53],[-20,-53]],'#9996a4','#b4aeb7',1);
  rect(c,-12,-113,24,30,5,'#8bb5af');
  const skin=gradient(c,-44,-160,44,-104,[[0,'#b5dbcc'],[.5,'#8fbbb1'],[1,'#577f82']]);
  c.beginPath();c.moveTo(-42,-133);c.bezierCurveTo(-54,-180,53,-180,43,-132);c.lineTo(32,-108);c.quadraticCurveTo(0,-91,-32,-108);c.closePath();c.fillStyle=skin;c.fill();
  for(const d of [-1,1]){
    line(c,[[d*29,-158],[d*44,-181],[d*40,-195]],'#87b3a5',4);circle(c,d*40,-197,6,'#b3d7b6','#8cad98',1);
    ellipse(c,d*20,-135,13,17,'#e6edce');ellipse(c,d*20-2,-134,4.5,9,'#254957');circle(c,d*20-3,-138,2,'#fff8dc');
    line(c,[[d*20-10,-157],[d*20+10,-159]],'#628c80',3);
  }
  ellipse(c,0,-109,6,8,'#355963');
  // An involuntary receiving gesture.
  poly(c,[[-36,-91],[-58,-74],[-90,-65],[-92,-48],[-49,-49],[-29,-71]],'#6a617b','#82788d',1);
  ellipse(c,-99,-56,11,6,'#99c5b5');line(c,[[-102,-59],[-114,-60]],'#a4cfbc',4);
  poly(c,[[34,-91],[50,-66],[42,-29],[27,-32],[32,-65]],'#554d6c');ellipse(c,36,-23,7,10,'#8ab7aa');
  // A tiny ID pin makes this recipient recognizably an ordinary citizen.
  rect(c,19,-65,13,6,1,'#c7bb9b');line(c,[[20,-53],[32,-53]],'#8c859b',1);
  c.restore();
}

function crystal(c,x,y,t){
  c.save();c.translate(x,y);const rotation=t*.25+.4;
  glow(c,0,-8,78,'rgba(130,220,206,.15)');
  const tetra=[{c:[-17,-8,-6],r:24,col:'#b591ff'},{c:[14,-32,7],r:21,col:'#69d8eb'},{c:[13,20,-4],r:21,col:'#69d8eb'}];
  const vertices=[],bonds=[];
  const project=([xx,yy,zz])=>({x:xx*Math.cos(rotation)+zz*Math.sin(rotation),y:yy*.9+(zz*Math.cos(rotation)-xx*Math.sin(rotation))*.27,z:zz*Math.cos(rotation)-xx*Math.sin(rotation)});
  for(const unit of tetra){
    const start=vertices.length;
    for(const d of [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]])vertices.push({p:project([unit.c[0]+d[0]*unit.r*.6,unit.c[1]+d[1]*unit.r*.6,unit.c[2]+d[2]*unit.r*.6]),r:4.4,col:'#f1d769'});
    const center=project(unit.c);vertices.push({p:center,r:5.1,col:unit.col});
    for(let i=0;i<4;i++){bonds.push([vertices[start+i].p,center,'rgba(190,233,209,.65)']);for(let j=i+1;j<4;j++)bonds.push([vertices[start+i].p,vertices[start+j].p,'rgba(130,220,206,.24)']);}
  }
  for(let i=0;i<10;i++){const a=i*TAU/5+(i>4?.3:0);vertices.push({p:project([Math.cos(a)*34,i>4?26:-28,Math.sin(a)*30]),r:2.4,col:'#b8f4c6'});}
  for(const [a,b,col] of bonds)line(c,[[a.x,a.y],[b.x,b.y]],col,1.3);
  vertices.sort((a,b)=>a.p.z-b.p.z).forEach(v=>{circle(c,v.p.x,v.p.y,v.r,v.col,'rgba(234,249,221,.32)',.6);circle(c,v.p.x-v.r*.28,v.p.y-v.r*.3,v.r*.24,'rgba(255,255,255,.55)');});
  // A sculptural gift base, conspicuously well-made for this interaction.
  poly(c,[[-43,47],[42,47],[48,54],[-48,54]],'#ae9a61','#d2bd7b',1);rect(c,-48,54,96,10,2,'#5b5338','#9a8d59',1);rect(c,-10,58,20,2,1,'#d5ca9c');
  c.restore();
}

function gift(c,t){
  // A planet hangs behind the two people; their absurd exchange fills the foreground.
  smallPlanet(c,560,81,38,'#87b5bd',true);smallPlanet(c,88,80,16,'#a8b78b');
  c.save();c.setLineDash([3,7]);c.beginPath();c.ellipse(342,340,257,40,0,0,TAU);c.strokeStyle='rgba(130,220,206,.12)';c.lineWidth=1;c.stroke();c.restore();
  hero(c,202,359,1.1,{pose:'give',time:t});recipient(c,510,356,1.03,t);
  // Spiky speech is drawn with symbols: the HTML supplies actual narration.
  c.save();c.translate(185,104);c.rotate(-.045);
  poly(c,[[-74,-32],[54,-32],[70,-17],[70,17],[54,31],[5,31],[-9,51],[-15,31],[-74,31],[-86,14],[-86,-16]],'rgba(85,49,48,.5)','#d78e76',1.2);
  line(c,[[-57,1],[-44,-12],[-29,10],[-13,-12],[2,9],[18,-7],[32,6],[46,-6]],'#ffb694',3);
  line(c,[[-56,18],[-32,18]],'rgba(255,182,148,.4)',2);line(c,[[16,18],[46,18]],'rgba(255,182,148,.4)',2);c.restore();
  // Light rays and surprise marks, gentle enough that the gift stays primary.
  for(const [x,y,a] of [[571,165,.5],[588,193,1.25],[552,144,-.2]]){c.save();c.translate(x,y);c.rotate(a);line(c,[[0,0],[0,-13]],'#d8e5c6',2);c.restore();}
  crystal(c,352,231+Math.sin(t*.8)*2,t);
  // Hands and tray align at about y=290. Neither character appears to understand why.
  glow(c,352,279,105,'rgba(217,247,139,.04)');
}

const scenes=[accident,eternity,mission,gift];

export class IntroScene {
  constructor(canvas,{reducedMotion}={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.index=0;this.previous=0;this.changed=0;this.elapsed=0;this.last=0;
    this.width=680;this.height=420;this.frame=null;this.active=false;this.destroyed=false;
    this.reducedMotion=reducedMotion??(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false);
    this.visibility=()=>{if(document.hidden)this.cancel();else this.wake();};document.addEventListener('visibilitychange',this.visibility);
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas);this.resize();
  }
  visible(){return !document.hidden&&this.canvas.getClientRects().length>0&&this.canvas.clientWidth>0&&this.canvas.clientHeight>0;}
  resize(){
    const box=this.canvas.getBoundingClientRect();if(box.width<=0||box.height<=0){this.cancel();return;}
    this.width=box.width;this.height=box.height;const dpr=Math.min(globalThis.devicePixelRatio||1,2);
    this.canvas.width=Math.round(box.width*dpr);this.canvas.height=Math.round(box.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.draw(performance.now());this.wake();
  }
  setScene(index){
    const next=clamp(Math.trunc(Number(index)||0),0,3);if(next===this.index){this.wake();return;}
    this.previous=this.reducedMotion||!this.active?next:this.index;this.index=next;this.changed=performance.now();
    if(this.visible())this.draw(performance.now());this.wake();
  }
  start(){if(this.destroyed)return;this.active=true;this.last=0;this.resize();this.wake();}
  stop(){this.active=false;this.cancel();}
  cancel(){if(this.frame!==null)cancelAnimationFrame(this.frame);this.frame=null;this.last=0;}
  wake(){if(!this.destroyed&&this.active&&this.visible()&&this.frame===null)this.frame=requestAnimationFrame(now=>this.tick(now));}
  tick(now){
    this.frame=null;if(this.destroyed||!this.active||!this.visible()){this.last=0;return;}
    const dt=this.last?Math.min((now-this.last)/1000,.05):0;this.last=now;if(!this.reducedMotion)this.elapsed+=dt;
    this.draw(now);if(!this.reducedMotion)this.wake();
  }
  draw(now){
    const c=this.ctx,w=this.width,h=this.height;c.clearRect(0,0,w,h);c.fillStyle='#0b1420';c.fillRect(0,0,w,h);
    const scale=Math.min(w/680,h/420);c.save();c.translate((w-680*scale)/2,(h-420*scale)/2);c.scale(scale,scale);
    const transition=this.reducedMotion?1:clamp((now-this.changed)/460,0,1),t=smooth(transition);
    if(this.previous!==this.index&&t<1){c.save();c.globalAlpha=1-t;backdrop(c,this.elapsed,this.previous);scenes[this.previous](c,this.elapsed);c.restore();}
    c.save();c.globalAlpha=this.previous===this.index?1:t;backdrop(c,this.elapsed,this.index);scenes[this.index](c,this.elapsed);c.restore();c.restore();
  }
  destroy(){this.destroyed=true;this.stop();this.observer.disconnect();document.removeEventListener('visibilitychange',this.visibility);}
}
