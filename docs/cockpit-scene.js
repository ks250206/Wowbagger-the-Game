/*
 * Original cockpit illustration for the pre-flight monologue.
 * All artwork is drawn locally. The scene never reads or changes game state.
 */
import { LGPS_GEOMETRY } from './crystal.js';

const TAU = Math.PI * 2;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = n => n * n * (3 - 2 * n);
const COLOR = { Li:'#b6ffd7', Ge:'#c29aff', P:'#77d7ee', S:'#f8cf63' };
const FONT = 'ui-monospace, SFMono-Regular, Consolas, monospace';

function hash(value) { let n = 2166136261; for (const c of String(value)) n = Math.imul(n ^ c.charCodeAt(0),16777619); return n >>> 0; }
function seeded(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ t >>> 15,t | 1); t ^= t + Math.imul(t ^ t >>> 7,t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function rgba(hex, a) { if (!/^#[\da-f]{6}$/i.test(hex)) return `rgba(130,220,206,${a})`; return `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${a})`; }
function path(c, points, close = true) { c.beginPath(); points.forEach(([x,y],i) => i ? c.lineTo(x,y) : c.moveTo(x,y)); if (close) c.closePath(); }
function circle(c,x,y,r) { c.beginPath(); c.arc(x,y,r,0,TAU); }
function ellipse(c,x,y,rx,ry,rotation=0) { c.beginPath(); c.ellipse(x,y,rx,ry,rotation,0,TAU); }
function line(c,points,color,width=1) { path(c,points,false); c.strokeStyle=color; c.lineWidth=width; c.stroke(); }
function rounded(c,x,y,w,h,r=8) { c.beginPath(); c.roundRect(x,y,w,h,r); }
function glow(c,x,y,r,color,alpha=.3) { const g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,rgba(color,alpha)); g.addColorStop(1,rgba(color,0)); c.fillStyle=g; circle(c,x,y,r); c.fill(); }
function shorten(value,n=18) { const chars=Array.from(String(value||'')); return chars.length>n ? chars.slice(0,n-1).join('')+'…' : chars.join(''); }

export class CockpitScene {
  constructor(canvas,{reducedMotion}={}) {
    if (!canvas?.getContext) throw new TypeError('CockpitScene needs a canvas');
    this.canvas=canvas; this.ctx=canvas.getContext('2d');
    if (!this.ctx) throw new Error('Canvas2D is unavailable');
    this.target=null; this.beat=0; this.oldBeat=0; this.blend=1;
    this.elapsed=0; this.width=1; this.height=1; this.scale=1;
    this.running=false; this.destroyed=false; this.frame=null; this.lastTime=0; this.lastDraw=0;
    this.parallax={x:0,y:0}; this.aim={x:0,y:0};
    this.motionQuery=typeof matchMedia==='function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    this.motionOverride=typeof reducedMotion==='boolean';
    this.reducedMotion=this.motionOverride ? reducedMotion : !!this.motionQuery?.matches;
    const rng=seeded(427760);
    this.stars=Array.from({length:108},()=>({x:rng(),y:rng(),r:.45+rng()*1.3,opacity:.25+rng()*.65,phase:rng()*TAU}));
    this.terrain=[];
    this.tick=this.tick.bind(this); this.resize=this.resize.bind(this);
    this.visibility=()=>{ if (document.hidden) this.cancelFrame(); else if(this.running) this.wake(); };
    this.motion=e=>{ if(this.motionOverride)return; this.reducedMotion=e.matches; if(this.reducedMotion){this.blend=1;this.cancelFrame();this.draw();} else this.wake(); };
    this.pointer=e=>{ if(this.reducedMotion)return;const r=canvas.getBoundingClientRect();this.aim={x:clamp((e.clientX-r.left)/r.width-.5,-.5,.5),y:clamp((e.clientY-r.top)/r.height-.5,-.5,.5)};this.wake();};
    this.leave=()=>{this.aim={x:0,y:0};};
    canvas.addEventListener('pointermove',this.pointer,{passive:true});
    canvas.addEventListener('pointerleave',this.leave,{passive:true});
    document.addEventListener('visibilitychange',this.visibility);
    this.motionQuery?.addEventListener?.('change',this.motion);
    this.observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(this.resize);
    this.observer?.observe(canvas);
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label','宇宙船の操縦席。金色のローブを着たワウバッガーが、窓外の目的地と住民の立体資料を確認している。');
    this.resize(); this.start();
  }
  isVisible() { return !document.hidden && this.canvas.getClientRects().length>0 && this.canvas.clientWidth>0 && this.canvas.clientHeight>0; }
  cancelFrame() { if(this.frame!==null)cancelAnimationFrame(this.frame);this.frame=null;this.lastTime=0; }
  wake() {
    if(this.destroyed||!this.running||!this.isVisible())return;
    if(this.reducedMotion){this.draw();return;}
    if(this.frame===null)this.frame=requestAnimationFrame(this.tick);
  }
  resize() {
    const box=this.canvas.getBoundingClientRect();
    if(box.width<=0||box.height<=0){this.cancelFrame();return;}
    this.width=box.width;this.height=box.height;
    const dpr=Math.min(2,window.devicePixelRatio||1);
    this.canvas.width=Math.round(this.width*dpr);this.canvas.height=Math.round(this.height*dpr);
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.draw();this.wake();
  }
  setTarget(target) {
    if(this.destroyed)return;
    const changed=this.target?.id!==target?.id;
    this.target=target||null;
    if(changed){
      const rng=seeded(hash(target?.id||target?.name||'unknown'));
      this.terrain=Array.from({length:9},()=>{
        const cx=(rng()-.5)*1.55,cy=(rng()-.5)*1.5,r=.12+rng()*.3;
        return Array.from({length:12},(_,i)=>{const a=i*TAU/12,rr=r*(.55+rng()*.7);return [cx+Math.cos(a)*rr,cy+Math.sin(a)*rr];});
      });
      this.beat=0;this.oldBeat=0;this.blend=1;
    }
    const place=target?.dossier?.planet||target?.planetName||'次の配達先';
    this.canvas.setAttribute('aria-label',`宇宙船内のブリーフィング。窓外には${place}。金色のローブのワウバッガーが${target?.name||'住民'}の立体資料を読み、独白している。`);
    this.draw();this.wake();
  }
  setBeat(index) {
    const next=clamp(Math.floor(Number(index)||0),0,3);
    if(next===this.beat){this.wake();return;}
    this.oldBeat=this.beat;this.beat=next;this.blend=this.reducedMotion?1:0;
    this.draw();this.wake();
  }
  start() { if(this.destroyed)return;this.running=true;this.lastTime=0;this.wake(); }
  stop() { this.running=false;this.cancelFrame(); }
  destroy() {
    this.stop();this.destroyed=true;this.observer?.disconnect();
    this.canvas.removeEventListener('pointermove',this.pointer);this.canvas.removeEventListener('pointerleave',this.leave);
    document.removeEventListener('visibilitychange',this.visibility);this.motionQuery?.removeEventListener?.('change',this.motion);
  }
  tick(now) {
    this.frame=null;
    if(this.destroyed||!this.running||!this.isVisible()){this.lastTime=0;return;}
    const dt=this.lastTime?Math.min(.06,(now-this.lastTime)/1000):0;
    this.lastTime=now;this.elapsed+=dt;this.blend=Math.min(1,this.blend+dt/.4);
    this.parallax.x=lerp(this.parallax.x,this.aim.x,Math.min(1,dt*5));this.parallax.y=lerp(this.parallax.y,this.aim.y,Math.min(1,dt*5));
    if(now-this.lastDraw>=30){this.draw();this.lastDraw=now;}
    if(!this.reducedMotion)this.frame=requestAnimationFrame(this.tick);
  }
  draw() {
    if(this.destroyed||this.width<2||this.height<2)return;
    const c=this.ctx,w=this.width,h=this.height;
    this.scale=w/760;
    const H=h/this.scale,W=760,t=this.reducedMotion?0:this.elapsed,px=this.parallax.x*7,py=this.parallax.y*4;
    c.clearRect(0,0,w,h);c.save();c.scale(this.scale,this.scale);
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#07111d');bg.addColorStop(.6,'#0a1a25');bg.addColorStop(1,'#030a11');c.fillStyle=bg;c.fillRect(0,0,W,H);
    this.drawWindow(c,W,H,t,px,py);
    this.drawCabin(c,W,H,t);
    this.drawSeat(c,W,H);
    this.drawPilot(c,W*.22,H*.79,t);
    this.drawConsole(c,W,H,t);
    this.drawProjector(c,W*.69,H*.84,t);
    const blend=ease(this.blend);
    if(blend<1){c.save();c.globalAlpha=1-blend;this.drawBeat(c,this.oldBeat,W,H,t);c.restore();}
    c.save();c.globalAlpha=blend;this.drawBeat(c,this.beat,W,H,t);c.restore();
    this.drawForeground(c,W,H,t);
    c.restore();
  }
  drawWindow(c,W,H,t,px,py) {
    const ceiling=26,base=H*.70;
    path(c,[[32,ceiling+18],[W*.36,ceiling],[W-30,ceiling+20],[W-18,base-20],[W*.69,base+15],[28,base-8]]);
    c.save();c.clip();
    const space=c.createRadialGradient(W*.66,H*.32,0,W*.6,H*.3,W*.65);space.addColorStop(0,'#173743');space.addColorStop(.5,'#0d1b2b');space.addColorStop(1,'#050d1a');c.fillStyle=space;c.fillRect(0,0,W,H);
    glow(c,W*.64+px,H*.27+py,230,this.target?.color||'#8edcda',.14);
    glow(c,W*.22,H*.17,160,'#8c74ca',.06);
    for(const s of this.stars){const x=(s.x*W+t*(1.1+s.r*.55)+px)%W,y=s.y*base+py;c.fillStyle=`rgba(220,236,229,${s.opacity*(.8+.2*Math.sin(t*.7+s.phase))})`;circle(c,x,y,s.r);c.fill();if(s.r>1.45){c.fillStyle='rgba(188,225,222,.13)';c.fillRect(x-4,y-.4,8,.8);c.fillRect(x-.4,y-4,.8,8);}}
    c.save();c.translate(W*.66+px,H*.31+py);c.rotate(-.25);c.scale(1,.32);c.setLineDash([3,8]);for(const r of [136,181,228]){circle(c,0,0,r);c.strokeStyle='rgba(130,220,206,.12)';c.lineWidth=1;c.stroke();}c.restore();
    const cx=W*.67+px,cy=H*.30+py,r=Math.min(106,H*.205);
    this.drawPlanet(c,cx,cy,r,t);
    for(const [xx,yy,rr] of [[W*.41,H*.17,10],[W*.87,H*.44,6]]){const g=c.createRadialGradient(xx-rr*.4,yy-rr*.5,1,xx,yy,rr*1.4);g.addColorStop(0,'#829da8');g.addColorStop(1,'#152c38');c.fillStyle=g;circle(c,xx,yy,rr);c.fill();}
    // A soft reflection from the cabin gives the window a physical surface.
    path(c,[[60,65],[140,46],[W*.60,base],[W*.53,base]]);c.fillStyle='rgba(156,219,222,.025)';c.fill();
    c.restore();
    path(c,[[32,ceiling+18],[W*.36,ceiling],[W-30,ceiling+20],[W-18,base-20],[W*.69,base+15],[28,base-8]]);c.strokeStyle='#334a55';c.lineWidth=12;c.lineJoin='round';c.stroke();c.strokeStyle='#68817e';c.lineWidth=1.4;c.stroke();
    path(c,[[44,ceiling+28],[W*.36,ceiling+11],[W-42,ceiling+31],[W-31,base-29],[W*.69,base+2],[41,base-19]]);c.strokeStyle='#8bd5c01c';c.lineWidth=2;c.stroke();
    line(c,[[W*.34,27],[W*.38,base+3]],'#132b36',13);line(c,[[W*.344,28],[W*.384,base+3]],'#36505a',2);
    line(c,[[W*.83,44],[W*.80,base-1]],'#10232f',8);line(c,[[W*.832,45],[W*.802,base-1]],'#314653',1);
    const textSize=Math.max(13,12/this.scale);
    c.font=`${textSize}px ${FONT}`;c.fillStyle='rgba(179,221,207,.65)';c.textAlign='right';
    c.fillText(shorten(this.target?.dossier?.system||'LOCAL STELLAR SYSTEM',18),W-55,80);
    c.textAlign='left';
    c.save();c.translate(cx,cy);c.strokeStyle='rgba(213,246,139,.55)';c.lineWidth=1.1;
    for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;c.beginPath();c.arc(0,0,r+17,a-.10,a+.10);c.stroke();}
    const markerAngle=-.48+t*.025,mx=Math.cos(markerAngle)*r*.68,my=Math.sin(markerAngle)*r*.68;
    glow(c,mx,my,14,'#d9f78b',.32);c.fillStyle='#e4ff9e';circle(c,mx,my,3);c.fill();circle(c,mx,my,8+Math.sin(t*2)*1.3);c.strokeStyle='rgba(225,255,155,.55)';c.stroke();
    c.restore();
  }
  drawPlanet(c,x,y,r,t) {
    const color=this.target?.color||'#93cdb6';
    glow(c,x,y,r*1.24,color,.17);
    c.save();circle(c,x,y,r);c.clip();
    const base=c.createRadialGradient(x-r*.52,y-r*.45,r*.08,x+r*.35,y+r*.28,r*1.45);base.addColorStop(0,color);base.addColorStop(.4,rgba(color,.8));base.addColorStop(1,'#061623');c.fillStyle=base;c.fillRect(x-r,y-r,r*2,r*2);
    const movement=Math.sin(t*.045)*r*.12;
    for(let i=0;i<this.terrain.length;i++){path(c,this.terrain[i].map(([a,b])=>[x+a*r+movement,y+b*r]));c.fillStyle=i%2?'rgba(19,64,61,.34)':'rgba(9,38,43,.22)';c.fill();}
    c.save();c.translate(x,y);c.rotate(-.28);
    for(let j=0;j<5;j++){const yy=-r*.72+j*r*.34;c.beginPath();c.ellipse(Math.sin(j+t*.05)*r*.2,yy,r*.82,r*.055,j*.1,0,TAU);c.fillStyle=`rgba(238,250,229,${.035+(j%2)*.045})`;c.fill();}c.restore();
    const shadow=c.createLinearGradient(x-r,y-r,x+r,y+r);shadow.addColorStop(0,'rgba(4,13,24,0)');shadow.addColorStop(.5,'rgba(4,13,24,.03)');shadow.addColorStop(.74,'rgba(4,13,24,.42)');shadow.addColorStop(1,'rgba(4,13,24,.94)');c.fillStyle=shadow;c.fillRect(x-r,y-r,r*2,r*2);
    const rng=seeded(44532);
    for(let i=0;i<28;i++){const xx=(rng()-.15)*r,yy=(rng()-.4)*r;if(Math.hypot(xx,yy)>r*.88)continue;c.fillStyle=`rgba(245,207,119,${.2+rng()*.45})`;c.fillRect(x+xx,y+yy,1.4,1.4);}
    c.restore();circle(c,x,y,r);c.strokeStyle=rgba(color,.5);c.lineWidth=1;c.stroke();
    c.beginPath();c.arc(x,y,r+1,-Math.PI*.93,-Math.PI*.22);c.strokeStyle=rgba('#caffee',.5);c.lineWidth=2;c.stroke();
  }
  drawCabin(c,W,H,t) {
    const ceiling=c.createLinearGradient(0,0,0,65);ceiling.addColorStop(0,'#192b36');ceiling.addColorStop(1,'#0b1823');
    path(c,[[0,0],[W,0],[W,48],[W*.83,37],[W*.35,18],[0,49]]);c.fillStyle=ceiling;c.fill();
    line(c,[[0,54],[W*.35,22],[W-28,45]],'#75837138',2);
    for(let i=0;i<6;i++){rounded(c,66+i*28,11,15,6,2);c.fillStyle=i<3?'#99c8ac66':'#354d54';c.fill();}
    rounded(c,W*.45,4,143,18,5);c.fillStyle='#05101b';c.fill();
    for(let i=0;i<7;i++){c.fillStyle=i===Math.floor(t*.4)%7?'#d7eb8e':'#32453e';c.fillRect(W*.47+i*17,10,10,4);}
    path(c,[[0,H*.62],[W*.23,H*.70],[W*.47,H*.75],[W*.73,H*.65],[W,H*.60],[W,H],[0,H]]);c.fillStyle='#07111c';c.fill();
    line(c,[[0,H*.63],[W*.23,H*.71],[W*.47,H*.76],[W*.73,H*.66],[W,H*.61]],'#36484d',3);
    path(c,[[0,H*.75],[W*.22,H*.82],[W*.46,H*.89],[W,H*.79],[W,H],[0,H]]);c.fillStyle='#06101a';c.fill();
    line(c,[[0,H*.91],[W,H*.95]],'#6f807e11',1);
    for(let i=0;i<4;i++){const x=20+i*37;line(c,[[x,H*.78],[x+15,H*.86]],'#26373c',2);}
  }
  drawSeat(c,W,H) {
    const x=W*.20,y=H*.66;
    c.save();c.translate(x,y);c.rotate(-.08);
    rounded(c,-76,-121,142,221,26);c.fillStyle='#020911';c.fill();
    rounded(c,-68,-124,128,214,23);const seat=c.createLinearGradient(-68,0,60,0);seat.addColorStop(0,'#243844');seat.addColorStop(.6,'#13222f');seat.addColorStop(1,'#08131e');c.fillStyle=seat;c.fill();c.strokeStyle='#50645f';c.lineWidth=1.3;c.stroke();
    rounded(c,-44,-153,84,42,12);c.fillStyle='#162936';c.fill();c.strokeStyle='#344c56';c.stroke();
    line(c,[[-57,-90],[-57,35]],'#7fc9b177',2);line(c,[[52,-90],[52,35]],'#2c474c',2);
    rounded(c,-87,57,42,28,10);c.fillStyle='#203341';c.fill();rounded(c,37,57,47,28,10);c.fillStyle='#162731';c.fill();
    path(c,[[-16,82],[21,82],[36,151],[-34,151]]);c.fillStyle='#112531';c.fill();ellipse(c,0,151,77,12);c.fillStyle='#07111c';c.fill();c.strokeStyle='#263e49';c.stroke();
    c.restore();
  }
  drawPilot(c,x,y,t) {
    const breathe=this.reducedMotion?0:Math.sin(t*.9)*1.4;
    c.save();c.translate(x,y+breathe);
    // Draped shoulders and folded golden robe, lit by the navigation glass.
    path(c,[[-43,-162],[-80,-125],[-91,-53],[-73,23],[-12,47],[71,26],[79,-56],[58,-133],[25,-162]]);
    const robe=c.createLinearGradient(-90,-130,80,35);robe.addColorStop(0,'#65714c');robe.addColorStop(.27,'#c4b86b');robe.addColorStop(.49,'#a59853');robe.addColorStop(1,'#454932');c.fillStyle=robe;c.fill();c.strokeStyle='#d7d28c55';c.lineWidth=1;c.stroke();
    path(c,[[-43,-158],[-27,-115],[6,-70],[35,-158],[27,-173],[-26,-175]]);c.fillStyle='#dbcd82';c.fill();
    path(c,[[-22,-143],[-2,-107],[19,-149],[10,-166],[-14,-167]]);c.fillStyle='#213c3a';c.fill();
    path(c,[[-62,-116],[-32,-75],[-10,32],[-41,23]]);c.fillStyle='#d6c77b42';c.fill();
    path(c,[[36,-113],[21,-22],[31,35],[52,24],[59,-52]]);c.fillStyle='#53523466';c.fill();
    line(c,[[-55,-118],[-44,-48],[-28,26]],'#efe0a447',1.2);line(c,[[47,-109],[35,-37],[45,28]],'#5b633a',1.3);
    // Neck and the peculiarly flattened head, shown in three-quarter profile.
    rounded(c,-17,-180,30,40,8);c.fillStyle='#709c87';c.fill();
    c.save();c.translate(-2,-208);c.rotate(-.075+Math.sin(t*.55)*.012);
    path(c,[[-35,-21],[-28,-38],[22,-38],[40,-24],[34,12],[17,35],[-15,29],[-33,9]]);
    const face=c.createLinearGradient(-35,-15,40,25);face.addColorStop(0,'#8fbaa0');face.addColorStop(.52,'#a4cdb1');face.addColorStop(1,'#577b6b');c.fillStyle=face;c.fill();
    path(c,[[-31,-7],[-48,-15],[-38,16],[-29,5]]);c.fillStyle='#86af99';c.fill();path(c,[[34,-3],[47,-11],[39,15],[31,8]]);c.fillStyle='#537e70';c.fill();
    c.strokeStyle='#273f3d';c.lineWidth=3;c.lineCap='round';
    c.beginPath();c.moveTo(-22,-12);c.lineTo(-7,-9);c.moveTo(11,-10);c.lineTo(26,-14);c.stroke();
    c.fillStyle='#cfe0ad';ellipse(c,-14,-2,9,4);c.fill();ellipse(c,20,-3,7,3.5);c.fill();
    c.fillStyle='#193d3b';ellipse(c,-10,-2,2.6,3);c.fill();ellipse(c,22,-3,2.3,2.7);c.fill();
    line(c,[[7,-1],[2,11],[10,11]],'#426d5c',1.5);
    const mouth=1.6+Math.sin(t*2.1)*.45;
    c.strokeStyle='#31534b';c.lineWidth=2;c.beginPath();c.moveTo(-8,20);c.quadraticCurveTo(4,20+mouth,17,18);c.stroke();
    c.restore();
    // Resting elbow and a long hand pointed toward the dossier.
    path(c,[[-70,-83],[-54,-62],[4,-63],[33,-83],[42,-68],[13,-43],[-47,-35],[-77,-50]]);c.fillStyle='#b9aa60';c.fill();
    path(c,[[19,-69],[33,-78],[64,-82],[74,-75],[67,-71],[44,-67],[29,-60]]);c.fillStyle='#8db69e';c.fill();
    line(c,[[42,-76],[65,-76]],'#567f6b',1);line(c,[[41,-71],[62,-73]],'#567f6b',1);
    c.restore();
  }
  drawConsole(c,W,H,t) {
    const y=H*.81;
    path(c,[[W*.27,y-42],[W*.46,y-81],[W*.87,y-75],[W,y-31],[W,y+43],[W*.51,y+54],[W*.28,y+8]]);
    const front=c.createLinearGradient(0,y-80,0,y+55);front.addColorStop(0,'#263d47');front.addColorStop(.25,'#172d39');front.addColorStop(1,'#081723');c.fillStyle=front;c.fill();c.strokeStyle='#526c6d';c.lineWidth=1.1;c.stroke();
    path(c,[[W*.29,y-42],[W*.47,y-72],[W*.85,y-67],[W*.96,y-31],[W*.51,y+18]]);c.fillStyle='#0a1a24';c.fill();c.strokeStyle='#304b52';c.stroke();
    // Angled pilot tablet, a row of touch controls and a waveform.
    c.save();c.translate(W*.39,y-27);c.transform(1,-.22,.48,.72,0,0);
    rounded(c,-48,-26,95,59,6);c.fillStyle='#18373e';c.fill();c.strokeStyle='#83cbb255';c.stroke();
    c.strokeStyle='#9cd5b4';c.lineWidth=1.5;c.beginPath();for(let i=0;i<18;i++){const xx=-36+i*4,yy=2+Math.sin(i*.7+t*.7)*3+(i===10?-10:0);i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.stroke();
    for(let i=0;i<4;i++){c.fillStyle=i===this.beat?'#d9f78b':'#3a6461';c.fillRect(-33+i*17,19,11,3);}c.restore();
    c.save();c.translate(W*.85,y-28);c.transform(1,.22,-.4,.8,0,0);
    for(let row=0;row<3;row++)for(let col=0;col<4;col++){rounded(c,col*17,row*13,11,7,2);c.fillStyle=(row+col+this.beat)%5===0?'#d8df8b':(row+col)%3===0?'#82c9be':'#28464e';c.fill();}c.restore();
    line(c,[[W*.30,y+14],[W*.51,y+58],[W,y+47]],'#0a111a',5);
    // The unhurried traveller's cup and an unchanging Sunday on its coaster.
    c.save();c.translate(W*.94,y+8);ellipse(c,0,13,16,6);c.fillStyle='#04101b';c.fill();
    path(c,[[-11,-13],[11,-13],[8,12],[-8,12]]);c.fillStyle='#637d70';c.fill();ellipse(c,0,-13,11,4);c.fillStyle='#aac7a5';c.fill();ellipse(c,0,-13,8,2.5);c.fillStyle='#253a32';c.fill();c.beginPath();c.arc(12,-2,7,-Math.PI*.6,Math.PI*.6);c.strokeStyle='#66836f';c.lineWidth=3;c.stroke();c.restore();
  }
  drawProjector(c,x,y,t) {
    c.save();c.translate(x,y);
    ellipse(c,0,0,92,21);c.fillStyle='#05101a';c.fill();c.strokeStyle='#48656b';c.lineWidth=2;c.stroke();ellipse(c,0,-4,76,16);c.strokeStyle='#92dcca77';c.lineWidth=1;c.stroke();
    for(let i=0;i<9;i++){const a=i*TAU/9+t*.05;circle(c,Math.cos(a)*81,Math.sin(a)*17-3,1.8);c.fillStyle=i%3===0?'#d9f78b':'#73b7ac';c.fill();}
    const cone=c.createLinearGradient(0,-195,0,0);cone.addColorStop(0,'rgba(109,223,202,0)');cone.addColorStop(.75,'rgba(109,223,202,.035)');cone.addColorStop(1,'rgba(109,223,202,.12)');path(c,[[-82,-4],[-112,-195],[112,-195],[82,-4]]);c.fillStyle=cone;c.fill();
    glow(c,0,-15,118,'#78dcc9',.065);c.restore();
  }
  drawBeat(c,beat,W,H,t) {
    const x=W*.69,y=H*.84-95,unit=this.scale;
    c.save();c.translate(x,y);
    const float=this.reducedMotion?0:Math.sin(t*.9)*3;c.translate(0,float);
    if(beat===0)this.drawNavigation(c,t);
    else if(beat===1)this.drawResident(c,t);
    else if(beat===2)this.drawArchive(c,t);
    else this.drawModel(c,t);
    c.font=`${Math.max(13,11.5/unit)}px ${FONT}`;c.fillStyle='#b7e9d8';c.textAlign='center';
    const captions=['DESTINATION LOCKED','RESIDENT DOSSIER',`FAMILY · ${this.target?.dossier?.familyCount||3}`, 'Li₁₀GeP₂S₁₂'];
    c.fillText(captions[beat],0,77);
    c.restore();
  }
  drawNavigation(c,t) {
    const r=68,angle=t*.16;
    glow(c,0,-28,100,'#84d7c6',.08);
    c.save();c.translate(0,-25);c.rotate(-.13);
    circle(c,0,0,r);c.fillStyle='rgba(74,158,145,.06)';c.fill();c.strokeStyle='#84cdbb99';c.lineWidth=1.2;c.stroke();
    for(let i=0;i<5;i++){const a=angle+i*Math.PI/5;c.beginPath();c.ellipse(0,0,Math.max(1,Math.abs(Math.cos(a))*r),r,0,0,TAU);c.strokeStyle='rgba(134,222,202,.33)';c.stroke();}
    for(const yy of [-.65,-.32,0,.32,.65]){const width=r*Math.sqrt(1-yy*yy);c.beginPath();c.ellipse(0,yy*r,width,8,0,0,TAU);c.strokeStyle='rgba(134,222,202,.22)';c.stroke();}
    const targetAngle=-.45;const mx=Math.cos(targetAngle)*r*.55,my=Math.sin(targetAngle)*r*.55;
    circle(c,mx,my,4);c.fillStyle='#e8ff99';c.fill();circle(c,mx,my,10+Math.sin(t*2)*2);c.strokeStyle='#d9f78b88';c.stroke();
    line(c,[[-75,42],[-42,20],[mx,my]],'#e2faaa77',1.4);c.restore();
    const route=[[-105,45],[-75,28],[-92,7],[-111,-15]];
    for(let i=0;i<route.length;i++){if(i)line(c,[route[i-1],route[i]],'#79bbab77',1);circle(c,...route[i],i===0?4:2.5);c.fillStyle=i===0?'#e6ff96':'#77beac';c.fill();}
    line(c,[[65,-37],[98,-59],[119,-59]],'#c0e9bc66',1);
    c.font=`${Math.max(12,10/this.scale)}px ${FONT}`;c.textAlign='right';c.fillStyle='#a3c7b7';c.fillText('05',119,-65);
  }
  drawResident(c,t) {
    const color=this.target?.color||'#82dcce',type=Number(this.target?.portrait||0)%6;
    rounded(c,-96,-129,192,182,10);c.fillStyle='rgba(11,38,46,.43)';c.fill();c.strokeStyle=rgba(color,.5);c.lineWidth=1;c.stroke();
    for(const [x,y,sx,sy] of [[-96,-129,1,1],[96,-129,-1,1],[-96,53,1,-1],[96,53,-1,-1]])line(c,[[x+sx*13,y],[x,y],[x,y+sy*13]],rgba(color,.95),1.8);
    c.save();c.translate(0,-33);
    path(c,[[-66,69],[-54,27],[-26,15],[29,15],[54,31],[65,69]]);c.fillStyle=rgba(color,.24);c.fill();c.strokeStyle=rgba(color,.7);c.stroke();
    rounded(c,-13,1,26,29,5);c.fillStyle=rgba(color,.45);c.fill();
    if(type===2){rounded(c,-43,-67,86,84,15);c.fillStyle=rgba(color,.44);c.fill();c.strokeStyle=rgba(color,.9);c.stroke();rounded(c,-32,-39,64,26,7);c.fillStyle='#091d26';c.fill();for(let i=0;i<3;i++){circle(c,-18+i*18,-26,4);c.fillStyle=color;c.fill();}}
    else{
      const broad=type===4?48:40;
      path(c,[[-broad,-47],[-broad+8,-70],[broad-8,-70],[broad,-45],[broad-8,5],[16,23],[-15,22],[-broad+7,4]]);c.fillStyle=rgba(color,.43);c.fill();c.strokeStyle=rgba(color,.85);c.stroke();
      if(type===0||type===5){for(const sign of [-1,1]){c.beginPath();c.moveTo(sign*24,-64);c.quadraticCurveTo(sign*46,-83,sign*39,-101);c.strokeStyle=rgba(color,.85);c.lineWidth=3;c.stroke();circle(c,sign*39,-101,5);c.fillStyle=color;c.fill();}}
      if(type===4){path(c,[[-38,-67],[-45,-93],[-18,-81],[0,-103],[19,-81],[43,-94],[38,-66]]);c.strokeStyle='#d7d291';c.lineWidth=2;c.stroke();c.fillStyle='rgba(221,207,114,.2)';c.fill();}
      const eyes=type===3?3:2;
      for(let i=0;i<eyes;i++){const xx=eyes===3?-24+i*24:-18+i*36;circle(c,xx,-31,eyes===3?8:10);c.fillStyle='rgba(223,250,228,.8)';c.fill();circle(c,xx+2,-29,3.8);c.fillStyle='#123637';c.fill();}
      if(type===1){circle(c,-18,-31,15);c.strokeStyle=rgba(color,.9);c.lineWidth=1.5;c.stroke();circle(c,18,-31,15);c.stroke();line(c,[[-3,-31],[3,-31]],color,1.5);}
      line(c,[[-11,7],[13,7]],rgba(color,.9),2);
    }
    c.restore();
    c.save();rounded(c,-96,-129,192,182,10);c.clip();const scanY=-129+((t*24)%182);const scan=c.createLinearGradient(0,scanY-10,0,scanY+2);scan.addColorStop(0,rgba(color,0));scan.addColorStop(1,rgba(color,.18));c.fillStyle=scan;c.fillRect(-96,scanY-10,192,12);c.restore();
    line(c,[[-80,-112],[-59,-112]],rgba(color,.7),2);line(c,[[63,38],[80,38]],rgba(color,.6),2);
  }
  drawArchive(c,t) {
    for(let i=2;i>=0;i--){c.save();c.translate(-14+i*13,-15-i*14);c.rotate(-.06+i*.05);rounded(c,-88,-103,176,144,6);c.fillStyle=`rgba(16,44,51,${.44+i*.07})`;c.fill();c.strokeStyle=`rgba(141,215,194,${.26+i*.12})`;c.lineWidth=1;c.stroke();
      if(i===0){c.fillStyle='#b6d6be';c.fillRect(-68,-84,54,3);for(let j=0;j<4;j++){c.fillStyle='rgba(138,202,184,.23)';c.fillRect(-68,-70+j*9,117-(j%3)*19,2);}line(c,[[-68,-26],[66,-26]],'#8ed1b544',1);}
      c.restore();}
    const count=clamp(Number(this.target?.dossier?.familyCount)||3,1,8),spacing=count>5?22:29,total=(count-1)*spacing;
    c.save();c.translate(0,23);
    line(c,[[0,-43],[0,-30]],'#bddfbb99',1);line(c,[[-total/2,-30],[total/2,-30]],'#bddfbb77',1);
    for(let i=0;i<count;i++){const xx=-total/2+i*spacing;line(c,[[xx,-30],[xx,-16]],'#9cc6b555',1);circle(c,xx,-9,6);c.fillStyle=i===0?'#d9f78b':'#93bfb2';c.fill();path(c,[[xx-7,1],[xx+7,1],[xx+9,17],[xx-9,17]]);c.fillStyle=i===0?'rgba(217,247,139,.65)':'rgba(147,191,178,.35)';c.fill();}
    c.restore();
    c.save();c.translate(-91,-100);c.rotate(-.12);rounded(c,-22,-16,44,31,4);c.strokeStyle='#d9f78b99';c.lineWidth=1.4;c.stroke();c.font=`${Math.max(12,10/this.scale)}px ${FONT}`;c.fillStyle='#d9f78b';c.textAlign='center';c.fillText('ID',0,5);c.restore();
  }
  drawModel(c,t) {
    const angle=t*.20-.45,tilt=-.18;
    const project=([x,y,z])=>{const xx=x*Math.cos(angle)-z*Math.sin(angle),zz=x*Math.sin(angle)+z*Math.cos(angle),yy=y*Math.cos(tilt)-zz*Math.sin(tilt),depth=y*Math.sin(tilt)+zz*Math.cos(tilt);return {x:xx*44,y:-yy*44-34,z:depth};};
    const points=LGPS_GEOMETRY.atoms.map(a=>({...project(a.position),element:a.element}));
    c.save();c.translate(0,10);
    // A small open presentation box below the hovering model.
    path(c,[[-80,32],[0,14],[81,31],[0,53]]);c.fillStyle='#173841';c.fill();c.strokeStyle='#739d8c';c.lineWidth=1;c.stroke();
    path(c,[[-80,32],[0,53],[0,66],[-80,45]]);c.fillStyle='#102a36';c.fill();path(c,[[0,53],[81,31],[81,45],[0,66]]);c.fillStyle='#16333c';c.fill();
    path(c,[[-80,32],[-93,15],[-14,-5],[0,14]]);c.fillStyle='#223e41';c.fill();c.strokeStyle='#697f5b';c.stroke();
    for(const tetra of LGPS_GEOMETRY.tetrahedra){const indices=tetra.vertices;for(const face of [[0,1,2],[0,1,3],[0,2,3],[1,2,3]]){path(c,face.map(i=>[points[indices[i]].x,points[indices[i]].y]));c.fillStyle=rgba(tetra.color,.06);c.fill();c.strokeStyle=rgba(tetra.color,.38);c.lineWidth=.8;c.stroke();}}
    for(const [a,b] of LGPS_GEOMETRY.bonds)line(c,[[points[a].x,points[a].y],[points[b].x,points[b].y]],'rgba(182,222,209,.45)',1.5);
    for(const atom of points.sort((a,b)=>a.z-b.z)){const r=atom.element==='Li'?3:atom.element==='S'?4.5:5.5;const g=c.createRadialGradient(atom.x-r*.3,atom.y-r*.4,.2,atom.x,atom.y,r);g.addColorStop(0,'#f2ffe7');g.addColorStop(.4,COLOR[atom.element]);g.addColorStop(1,rgba(COLOR[atom.element],.5));c.fillStyle=g;circle(c,atom.x,atom.y,r);c.fill();}
    c.restore();
    for(let i=0;i<5;i++){const a=i*TAU/5+t*.3,x=Math.cos(a)*97,y=-42+Math.sin(a)*52;c.fillStyle='rgba(215,245,160,.55)';circle(c,x,y,1.5);c.fill();}
  }
  drawForeground(c,W,H,t) {
    // Near-camera rails and edge instruments frame the passenger's view.
    path(c,[[0,H*.88],[W*.15,H*.92],[W*.27,H],[0,H]]);const rail=c.createLinearGradient(0,H*.88,0,H);rail.addColorStop(0,'#1c303a');rail.addColorStop(.2,'#12252f');rail.addColorStop(1,'#050c15');c.fillStyle=rail;c.fill();line(c,[[0,H*.88],[W*.15,H*.92],[W*.27,H]],'#496160',2);
    path(c,[[W,H*.88],[W*.87,H*.94],[W*.81,H],[W,H]]);c.fillStyle='#0a1923';c.fill();line(c,[[W,H*.88],[W*.87,H*.94],[W*.81,H]],'#35534f',2);
    // A quiet heartbeat line says that the immortal captain is still here.
    const x=33,y=H-28;c.strokeStyle='#90b79588';c.lineWidth=1;c.beginPath();for(let i=0;i<50;i++){const xx=x+i*2,phase=(i+Math.floor(t*5))%30,yy=y+(phase===10?-5:phase===11?8:phase===12?-12:0);i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.stroke();
    c.font=`${Math.max(13,11/this.scale)}px ${FONT}`;c.fillStyle='#b6cf9a99';c.textAlign='right';c.fillText('∞',W-30,H-25);
    const vignette=c.createRadialGradient(W*.55,H*.45,W*.25,W*.55,H*.45,W*.75);vignette.addColorStop(0,'rgba(0,5,12,0)');vignette.addColorStop(1,'rgba(0,5,12,.46)');c.fillStyle=vignette;c.fillRect(0,0,W,H);
  }
}
