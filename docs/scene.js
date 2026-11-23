/* Original vector artwork and flight renderer. No network assets. */
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mix = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const defaults = [{x:.16,y:.3},{x:.49,y:.17},{x:.81,y:.33},{x:.68,y:.7},{x:.34,y:.78},{x:.15,y:.58}];
const palette = ['#c2f276', '#8edcda', '#c1a5f6', '#eaa780', '#86b8e8', '#d1d992'];

function random(seed) {
  let s = seed >>> 0;
  return () => { s += 0x6D2B79F5; let t=s; t=Math.imul(t ^ t >>> 15,t | 1); t ^= t + Math.imul(t ^ t >>> 7,t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function hash(value) { let h=5381; for (const c of String(value)) h=(Math.imul(h,33)^c.charCodeAt(0))>>>0; return h; }
function circle(c, x, y, r) { c.beginPath(); c.arc(x,y,r,0,TAU); }
function stroke(c, color, width=1) { c.strokeStyle=color; c.lineWidth=width; c.stroke(); }
function rgba(color, alpha) {
  if (/^#[0-9a-f]{6}$/i.test(color)) return `rgba(${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)},${alpha})`;
  return `rgba(180,220,200,${alpha})`;
}
function bezier(a,b,t) {
  const bend = Math.min(60,Math.hypot(b.x-a.x,b.y-a.y)*.17);
  const cx=(a.x+b.x)/2-(b.y-a.y)*.15, cy=(a.y+b.y)/2+(b.x-a.x)*.15-bend;
  return {x:(1-t)*(1-t)*a.x+2*(1-t)*t*cx+t*t*b.x,y:(1-t)*(1-t)*a.y+2*(1-t)*t*cy+t*t*b.y};
}

export class SpaceScene {
  constructor(canvas, options={}) {
    this.canvas=canvas;
    this.ctx=canvas.getContext('2d');
    this.options=options;
    this.locale=options.locale==='en'?'en':'ja';
    this.view={targets:[],currentIndex:0,selectedIndex:0,phase:'map',sector:1};
    this.width=1; this.height=1; this.ship={x:.11,y:.86}; this.flight=null; this.effects=[];
    this.destroyed=false; this.last=0; this.elapsed=0; this.hover=-1; this.frame=null; this.pausedAt=null;
    this.reduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    const rng=random(426121);
    this.stars=Array.from({length:130},()=>({x:rng(),y:rng(),r:rng()<.86?.4+rng()*.7:1.1+rng()*.6,a:.15+rng()*.65,phase:rng()*TAU,tint:rng()}));
    this.handlePointer = e => {
      const r=this.canvas.getBoundingClientRect();
      const i=this.hit(e.clientX-r.left,e.clientY-r.top);
      if (i>=0 && !this.flight) this.options.onSelect?.(i);
    };
    this.handleMove=e=>{
      const r=this.canvas.getBoundingClientRect();
      this.hover=this.hit(e.clientX-r.left,e.clientY-r.top);
      this.canvas.style.cursor=this.hover>=0&&!this.flight?'pointer':'default';
      this.wake();
    };
    this.handleLeave=()=>{this.hover=-1;this.wake();};
    this.handleVisibility=()=>{if(document.hidden)this.sleep();else this.wake();};
    canvas.addEventListener('pointerup',this.handlePointer);
    canvas.addEventListener('pointermove',this.handleMove);
    canvas.addEventListener('pointerleave',this.handleLeave);
    document.addEventListener('visibilitychange',this.handleVisibility);
    this.resizeObserver = new ResizeObserver(()=>this.resize());
    this.resizeObserver.observe(canvas);
    canvas.setAttribute('role','img');
    this.updateAria();
    this.resize();
  }
  updateAria() {
    const count=this.view.targets.length;
    this.canvas.setAttribute('aria-label',this.locale==='en'
      ? `Galactic route chart${count?` with ${count} destinations`:''}. The highlighted planet is the next recipient.`
      : `銀河の航路図${count?`。${count}か所の訪問先`:''}。光っている惑星が次の配達先です。`);
  }
  setLocale(locale) { this.locale=locale==='en'?'en':'ja';this.updateAria();this.wake(); }
  isVisible() { return !document.hidden && this.canvas.getClientRects().length>0 && this.canvas.clientWidth>0 && this.canvas.clientHeight>0; }
  sleep() {
    if(this.frame!==null)cancelAnimationFrame(this.frame);
    this.frame=null;
    if(this.pausedAt===null)this.pausedAt=performance.now();
  }
  wake() {
    if(this.destroyed || !this.isVisible())return;
    if(this.pausedAt!==null){if(this.flight)this.flight.start+=performance.now()-this.pausedAt;this.pausedAt=null;this.last=0;}
    if(this.frame===null)this.frame=requestAnimationFrame(t=>this.tick(t));
  }
  resize() {
    const box=this.canvas.getBoundingClientRect();
    // Keep the last geometry while a different game screen is showing.
    if(box.width<=0 || box.height<=0){this.sleep();return;}
    this.width=Math.max(1,box.width); this.height=Math.max(1,box.height);
    const dpr=Math.min(globalThis.devicePixelRatio||1,2);
    this.canvas.width=Math.round(this.width*dpr); this.canvas.height=Math.round(this.height*dpr);
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.wake();
  }
  setView(view) {
    const previous=this.view;
    this.view={...previous,...view};
    if(view.locale!==undefined)this.locale=view.locale==='en'?'en':'ja';
    this.updateAria();
    if (view.reducedMotion!==undefined) this.reduced=Boolean(view.reducedMotion);
    const sectorChanged=previous.sector!==this.view.sector;
    const phaseChanged=previous.phase!==this.view.phase;
    const initial=previous.targets.length===0;
    if (sectorChanged) { this.ship={x:.11,y:.86}; this.cancelFlight(); }
    // The engine stores planet-center coordinates; the visible ship docks beside them.
    if (!this.flight && view.player && Number.isFinite(view.player.x) && Number.isFinite(view.player.y) && (initial || sectorChanged || phaseChanged)) {
      const normal={x:view.player.x,y:view.player.y};
      const atPlanet=this.view.targets.some(t=>Math.hypot((t.x??-1)-normal.x,(t.y??-1)-normal.y)<.005);
      this.ship=atPlanet?this.normalize(this.dockPoint(this.point(normal))):normal;
    }
    // Loading a saved encounter should put the ship beside its recipient.
    else if (!this.flight && initial && this.view.phase!=='map' && this.view.targets.length) {
      const p=this.targetPosition(this.view.currentIndex); this.ship=this.normalize(this.dockPoint(p));
    }
    this.wake();
  }
  plotBounds() {
    const compact=this.width<520;
    const left=compact?28:55,top=150,bottom=compact?65:80;
    return {left,top,width:Math.max(1,this.width-left*2),height:Math.max(1,this.height-top-bottom)};
  }
  point(normal) {
    const b=this.plotBounds();
    return {x:b.left+normal.x*b.width,y:b.top+normal.y*b.height};
  }
  normalize(p) {
    const b=this.plotBounds();
    return {x:(p.x-b.left)/b.width,y:(p.y-b.top)/b.height};
  }
  dockPoint(p) {
    return {x:clamp(p.x-(this.width<520?31:38),20,this.width-20),y:clamp(p.y+32,this.plotBounds().top+10,this.height-45)};
  }
  targetPosition(i) {
    const t=this.view.targets[i]||{};
    const fallback=defaults[i%defaults.length];
    return this.point({x:Number.isFinite(t.x)?t.x:fallback.x,y:Number.isFinite(t.y)?t.y:fallback.y});
  }
  hit(x,y) {
    for (let i=0;i<this.view.targets.length;i++) { const p=this.targetPosition(i); if (Math.hypot(x-p.x,y-p.y)<42) return i; }
    return -1;
  }
  cancelFlight() { if (this.flight) { this.flight.resolve(false); this.flight=null; } }
  travelTo(index, mode='normal') {
    this.cancelFlight();
    const destination=this.targetPosition(index);
    const to=this.normalize(this.dockPoint(destination));
    if (this.reduced) {this.ship=to;this.wake();return Promise.resolve(true);}
    return new Promise(resolve=>{const now=performance.now();if(this.pausedAt!==null)this.pausedAt=now;this.flight={from:{...this.ship},to,start:now,duration:mode==='warp'?820:1350,mode,resolve};this.wake();});
  }
  burst(kind='success') {
    const rng=random(Math.round(performance.now()));
    const p=this.targetPosition(this.view.currentIndex);
    for (let i=0;i<28;i++) {
      const angle=rng()*TAU, speed=22+rng()*58;
      this.effects.push({x:p.x,y:p.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,age:0,life:.8+rng()*.6,color:kind==='fail'?'#ef8f7b':i%3?'#b9ef78':'#8cdddb',r:1+rng()*2});
    }
    this.wake();
  }
  tick(now) {
    this.frame=null;
    if (this.destroyed) return;
    if(!this.isVisible()){this.sleep();return;}
    const delta=this.last?Math.min((now-this.last)/1000,.05):.016;
    this.last=now; this.elapsed+=delta;
    if (this.flight) {
      const f=this.flight, t=clamp((now-f.start)/f.duration,0,1), a=this.point(f.from),b=this.point(f.to);
      const p=bezier(a,b,ease(t)); this.ship=this.normalize(p);
      if (t>=1) {this.ship=f.to;this.flight=null;f.resolve(true);}
    }
    this.effects=this.effects.filter(p=>(p.age+=delta)<p.life);
    for (const p of this.effects) {p.x+=p.vx*delta;p.y+=p.vy*delta;}
    this.draw();
    if(!this.reduced || this.flight || this.effects.length)this.frame=requestAnimationFrame(t=>this.tick(t));
  }
  draw() {
    const c=this.ctx,w=this.width,h=this.height,time=this.reduced?0:this.elapsed;
    c.clearRect(0,0,w,h);
    const background=c.createLinearGradient(0,0,w,h);background.addColorStop(0,'#0a181f');background.addColorStop(.5,'#09141d');background.addColorStop(1,'#101923');
    c.fillStyle=background;c.fillRect(0,0,w,h);
    const glow=c.createRadialGradient(w*.68,h*.22,0,w*.68,h*.22,w*.68);glow.addColorStop(0,'rgba(46,101,103,.13)');glow.addColorStop(.6,'rgba(30,69,71,.035)');glow.addColorStop(1,'rgba(20,40,55,0)');c.fillStyle=glow;c.fillRect(0,0,w,h);
    const lower=c.createRadialGradient(w*.16,h*.9,0,w*.16,h*.9,w*.5);lower.addColorStop(0,'rgba(76,60,109,.10)');lower.addColorStop(1,'rgba(76,60,109,0)');c.fillStyle=lower;c.fillRect(0,0,w,h);
    c.save();c.strokeStyle='rgba(144,179,183,.038)';c.lineWidth=1;
    for(let x=34;x<w;x+=56){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
    for(let y=34;y<h;y+=56){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
    c.restore();
    for (const star of this.stars) {
      const alpha=star.a*(.82+.18*Math.sin(time*.7+star.phase));
      c.fillStyle=star.tint>.85?`rgba(163,202,211,${alpha})`:`rgba(224,232,222,${alpha})`;
      circle(c,star.x*w,star.y*h,star.r);c.fill();
      if(star.r>1.5){c.fillStyle=`rgba(224,232,222,${alpha*.2})`;c.fillRect(star.x*w-4,star.y*h-.4,8,.8);c.fillRect(star.x*w-.4,star.y*h-4,.8,8);}
    }
    // Large observational arcs feel like a ship's chart without obscuring play.
    c.save();c.translate(w*.51,h*.51);c.scale(1,.6);c.rotate(-.35);c.setLineDash([2,10]);
    for (const radius of [w*.26,w*.45,w*.67]) {circle(c,0,0,radius);stroke(c,'rgba(153,184,187,.07)');}
    c.restore();
    const targets=this.view.targets;
    for(let i=0;i<targets.length-1;i++)this.drawRoute(i,i+1);
    for(let i=0;i<targets.length;i++)this.drawPlanet(i,time);
    if(this.flight)this.drawFlightTrail(time);
    this.drawShip(time);
    for(const p of this.effects){c.globalAlpha=1-p.age/p.life;c.fillStyle=p.color;circle(c,p.x,p.y,p.r);c.fill();}c.globalAlpha=1;
    // Fine scope corners.
    c.strokeStyle='rgba(155,192,185,.2)';c.lineWidth=1;
    for(const [x,y,dx,dy] of [[18,18,1,1],[w-18,18,-1,1],[18,h-18,1,-1],[w-18,h-18,-1,-1]]){c.beginPath();c.moveTo(x+dx*15,y);c.lineTo(x,y);c.lineTo(x,y+dy*15);c.stroke();}
  }
  drawRoute(ai,bi) {
    const c=this.ctx,a=this.targetPosition(ai),b=this.targetPosition(bi);
    const done=bi<this.view.currentIndex,active=bi===this.view.currentIndex;
    c.save();c.beginPath();
    for(let j=0;j<=30;j++){const p=bezier(a,b,j/30);if(j===0)c.moveTo(p.x,p.y);else c.lineTo(p.x,p.y);}
    c.setLineDash(done?[2,6]:[3,8]);c.lineDashOffset=0;
    stroke(c,done?'rgba(169,227,124,.23)':active?'rgba(187,235,130,.35)':'rgba(148,180,190,.17)');c.restore();
  }
  drawPlanet(i,time) {
    const c=this.ctx,t=this.view.targets[i],p=this.targetPosition(i),current=i===this.view.currentIndex;
    const selected=i===this.view.selectedIndex,done=i<this.view.currentIndex || Boolean(t.completed);
    const compact=this.width<520;const r=compact?18+(i%3)*1.5:27+(i%3)*3;
    const earth=t.kind==='arthur';
    const color=earth?'#6bafcf':t.color||palette[i%palette.length];
    const rng=random(hash(t.id||t.name||i));
    c.save();c.translate(p.x,p.y);if(done)c.globalAlpha=.48;
    if(current){const g=c.createRadialGradient(0,0,r*.8,0,0,r*3.3);g.addColorStop(0,rgba(color,.13));g.addColorStop(1,rgba(color,0));c.fillStyle=g;circle(c,0,0,r*3.3);c.fill();}
    // Satellite track and small moon.
    if(earth||i%2===0){c.save();c.rotate(-.55);c.beginPath();c.ellipse(0,0,r*1.65,r*.8,0,Math.PI,TAU);stroke(c,'rgba(173,200,205,.17)');const m=time*.08+i;c.fillStyle='#8b9da6';circle(c,Math.cos(m)*r*1.65,Math.sin(m)*r*.8,2.5);c.fill();c.restore();}
    if(!earth&&i%3===2)this.ring(c,r,color,true);
    c.save();circle(c,0,0,r);c.clip();
    const base=c.createRadialGradient(-r*.4,-r*.45,r*.05,r*.18,r*.25,r*1.5);base.addColorStop(0,color);base.addColorStop(.45,rgba(color,.92));base.addColorStop(1,'#12232d');c.fillStyle=base;c.fillRect(-r,-r,r*2,r*2);
    if(earth||i%3===0){
      // Ragged islands, generated once from the name's seed.
      for(let j=0;j<6;j++){const x=(rng()-.5)*r*1.8,y=(rng()-.5)*r*1.7,s=4+rng()*r*.33;c.beginPath();for(let k=0;k<8;k++){const a=k*TAU/8,rr=s*(.5+rng()*.65);const xx=x+Math.cos(a)*rr,yy=y+Math.sin(a)*rr;if(k)c.lineTo(xx,yy);else c.moveTo(xx,yy);}c.closePath();c.fillStyle=j%2?'rgba(20,70,65,.26)':'rgba(24,53,51,.25)';c.fill();}
      c.fillStyle='rgba(227,255,224,.22)';c.beginPath();c.ellipse(-r*.24,-r*.75,r*.65,r*.15,-.1,0,TAU);c.fill();
    }else{
      c.save();c.rotate(-.24);
      for(let j=0;j<7;j++){const y=-r+j*r*.34;c.beginPath();c.ellipse(-r*.05,y,r*1.3,3+rng()*3,.08,0,TAU);c.fillStyle=j%2?'rgba(18,38,47,.13)':'rgba(248,247,217,.17)';c.fill();}c.restore();
      if(i%3===1){circle(c,r*.32,r*.24,r*.18);c.fillStyle='rgba(25,41,54,.2)';c.fill();circle(c,r*.3,r*.2,r*.13);stroke(c,'rgba(255,245,212,.17)',1.5);}
    }
    const shade=c.createLinearGradient(-r,-r,r,r);shade.addColorStop(0,'rgba(2,12,21,0)');shade.addColorStop(.45,'rgba(2,12,21,0)');shade.addColorStop(1,'rgba(2,12,21,.73)');c.fillStyle=shade;c.fillRect(-r,-r,r*2,r*2);c.restore();
    circle(c,0,0,r);stroke(c,rgba(color,.48),.8);
    if(!earth&&i%3===2)this.ring(c,r,color,false);
    if(current || selected || this.hover===i){
      c.save();c.rotate(time*.08);c.setLineDash(current?[12,5,2,5]:[3,5]);circle(c,0,0,r+10);stroke(c,current?'#c2ed8a':'rgba(188,221,210,.55)',current?1.3:1);c.restore();
      if(current){c.fillStyle='#c2ed8a';c.font='600 12px ui-monospace, monospace';c.textAlign='center';c.fillText(this.locale==='en'?'NEXT':'次の被害者',0,-r-18);}
    }
    if(done){c.fillStyle='#bce991';circle(c,r*.75,-r*.7,8);c.fill();c.beginPath();c.moveTo(r*.75-3,-r*.7);c.lineTo(r*.75-1,-r*.7+2);c.lineTo(r*.75+3,-r*.7-2);stroke(c,'#122822',1.6);}
    const unknown=this.locale==='en'?'UNKNOWN':'記録なし';
    const label=compact?`${String(i+1).padStart(2,'0')} ${(t.name||t.planetName||unknown).slice(0,this.locale==='en'?8:4)}`:t.planetName||t.name||unknown;
    c.textAlign='center';c.font='500 12px system-ui, sans-serif';c.fillStyle=current?'#e1efcc':'#a3b4bc';
    const chars=compact?(this.locale==='en'?13:10):(this.locale==='en'?21:12);const short=label.length>chars?label.slice(0,chars-1)+'…':label;
    c.fillText(short,0,r+27);
    if(!compact){c.font='12px ui-monospace, monospace';c.fillStyle='#79909a';const roman=t.romanName||t.name||'';c.fillText(roman.length>17?roman.slice(0,15)+'…':roman,0,r+44);}
    c.restore();
  }
  ring(c,r,color,back) {
    c.save();c.rotate(-.48);c.beginPath();c.ellipse(0,0,r*1.85,r*.45,0,back?Math.PI:0,back?TAU:Math.PI);stroke(c,rgba(color,.3),5);c.beginPath();c.ellipse(0,0,r*1.85,r*.45,0,back?Math.PI:0,back?TAU:Math.PI);stroke(c,rgba(color,.6),1);c.restore();
  }
  drawFlightTrail() {
    const c=this.ctx,f=this.flight;if(!f)return;
    const a=this.point(f.from),b=this.point(f.to),t=ease(clamp((performance.now()-f.start)/f.duration,0,1));
    c.save();
    for(let j=0;j<15;j++){const s=t-j*.012;if(s<0)continue;const p=bezier(a,b,s);c.globalAlpha=(1-j/15)*.45;c.fillStyle=f.mode==='warp'?'#bdb4ff':'#b9e98e';circle(c,p.x,p.y,1.2+(1-j/15)*2);c.fill();}
    if(f.mode==='warp'){c.globalAlpha=Math.sin(t*Math.PI)*.25;c.strokeStyle='#b0bbf0';for(let j=0;j<18;j++){const star=this.stars[j],x=star.x*this.width,y=star.y*this.height;c.beginPath();c.moveTo(x,y);c.lineTo(x-(b.x-a.x)*.16,y-(b.y-a.y)*.16);c.stroke();}}
    c.restore();
  }
  drawShip(time) {
    const c=this.ctx,p=this.point(this.ship),f=this.flight;
    let angle=-.4;
    if(f){const a=this.point(f.from),b=this.point(f.to),t=ease(clamp((performance.now()-f.start)/f.duration,0,1));const q=bezier(a,b,Math.min(1,t+.01));angle=Math.atan2(q.y-p.y,q.x-p.x)+Math.PI/2;}
    c.save();c.translate(p.x,p.y+(f?0:Math.sin(time*1.5)*2));c.rotate(angle);
    const length=f?24+Math.sin(time*35)*7:11+Math.sin(time*7)*3;
    const glow=c.createRadialGradient(0,9,0,0,9,29);glow.addColorStop(0,'rgba(190,238,131,.15)');glow.addColorStop(1,'rgba(190,238,131,0)');c.fillStyle=glow;circle(c,0,9,29);c.fill();
    c.beginPath();c.moveTo(-3,8);c.quadraticCurveTo(-5,length,0,length+6);c.quadraticCurveTo(5,length,3,8);c.fillStyle=f?'rgba(194,242,129,.8)':'rgba(159,224,168,.6)';c.fill();
    c.beginPath();c.moveTo(0,-17);c.lineTo(13,11);c.lineTo(4,7);c.lineTo(0,10);c.lineTo(-4,7);c.lineTo(-13,11);c.closePath();c.fillStyle='#dbe8cb';c.fill();stroke(c,'#94b3a6',1);
    c.beginPath();c.moveTo(0,-13);c.lineTo(4,4);c.lineTo(-4,4);c.closePath();c.fillStyle='#23424b';c.fill();
    c.fillStyle='#d5ef90';c.fillRect(-1.5,-6,3,7);c.fillStyle='#a2cd98';c.fillRect(-9,7,2,3);c.fillRect(7,7,2,3);c.restore();
  }
  destroy() {
    this.destroyed=true;cancelAnimationFrame(this.frame);this.cancelFlight();this.resizeObserver.disconnect();
    this.canvas.removeEventListener('pointerup',this.handlePointer);this.canvas.removeEventListener('pointermove',this.handleMove);this.canvas.removeEventListener('pointerleave',this.handleLeave);
    document.removeEventListener('visibilitychange',this.handleVisibility);
  }
}

/** An original human design, with no film or television actor as a reference. */
export function drawHumanArthur(canvas,{mood='neutral',locale='ja'}={}) {
  if(!canvas)return;
  const rect=canvas.getBoundingClientRect(),w=rect.width||260,h=rect.height||220,dpr=Math.min(globalThis.devicePixelRatio||1,2);
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label',locale==='en'
    ? 'Arthur Philip Dent, a bewildered human in a brown dressing gown, with a towel over one shoulder.'
    : '茶色のガウンを着て肩にタオルをかけた、困惑する地球人アーサー・フィリップ・デント。');
  const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
  const scale=Math.min(w/260,h/230),angry=['angry','offended','fail'].includes(mood),surprised=['confused','gift','surprised'].includes(mood);
  c.save();c.translate(w/2,h/2);c.scale(scale,scale);
  const halo=c.createRadialGradient(0,-6,2,0,-6,112);halo.addColorStop(0,'rgba(111,185,198,.18)');halo.addColorStop(1,'rgba(111,185,198,0)');c.fillStyle=halo;circle(c,0,-6,112);c.fill();
  c.save();c.setLineDash([3,7]);circle(c,0,-7,83);stroke(c,'rgba(143,205,196,.18)');c.restore();
  c.beginPath();c.ellipse(0,92,76,10,0,0,TAU);c.fillStyle='rgba(0,0,0,.23)';c.fill();
  // A dressing gown that has outlived its intended commute to the bathroom.
  c.beginPath();c.moveTo(-21,23);c.bezierCurveTo(-52,24,-70,50,-70,91);c.quadraticCurveTo(0,107,70,91);c.bezierCurveTo(70,50,48,26,21,23);c.closePath();
  const robe=c.createLinearGradient(-65,20,60,100);robe.addColorStop(0,'#a08a6d');robe.addColorStop(.5,'#76604c');robe.addColorStop(1,'#493c36');c.fillStyle=robe;c.fill();stroke(c,'#bfa88c66',1.3);
  c.beginPath();c.moveTo(-22,24);c.lineTo(0,73);c.lineTo(22,24);c.fillStyle='#ded8b7';c.fill();
  c.beginPath();c.moveTo(-28,24);c.lineTo(-8,86);c.lineTo(5,67);c.lineTo(-11,27);c.closePath();c.fillStyle='#b79a74';c.fill();
  c.beginPath();c.moveTo(24,24);c.lineTo(8,89);c.lineTo(-2,71);c.lineTo(11,26);c.closePath();c.fillStyle='#8f7558';c.fill();
  c.fillStyle='#a58d6c';c.fillRect(-56,82,109,7);
  c.beginPath();c.moveTo(0,84);c.lineTo(12,96);stroke(c,'#c6af83',4);
  // The towel is useful even when the person offering assistance is not.
  c.beginPath();c.moveTo(-47,30);c.quadraticCurveTo(-35,23,-25,34);c.lineTo(-28,87);c.quadraticCurveTo(-40,91,-51,86);c.closePath();c.fillStyle='#b4d1c3';c.fill();stroke(c,'#e5e4c577',1);
  for(let y=43;y<84;y+=9){c.beginPath();c.moveTo(-48,y);c.lineTo(-29,y+2);stroke(c,'#5c908366',1);}
  for(let x=-46;x<-28;x+=6){c.beginPath();c.moveTo(x,39);c.lineTo(x-2,86);stroke(c,'#ebf0d944',1);}
  c.fillStyle='#c6a081';c.fillRect(-12,12,24,24);
  for(const sign of [-1,1]){c.beginPath();c.ellipse(sign*31,-18,7,12,sign*.2,0,TAU);c.fillStyle='#bd977c';c.fill();}
  const skin=c.createLinearGradient(-30,-55,30,28);skin.addColorStop(0,'#e2c3a2');skin.addColorStop(.65,'#c9a88b');skin.addColorStop(1,'#aa866e');
  c.beginPath();c.moveTo(-30,-42);c.bezierCurveTo(-35,-75,35,-75,32,-41);c.lineTo(28,2);c.quadraticCurveTo(20,28,0,31);c.quadraticCurveTo(-23,25,-29,3);c.closePath();c.fillStyle=skin;c.fill();
  c.beginPath();c.moveTo(-30,-21);c.lineTo(-38,-44);c.lineTo(-29,-61);c.lineTo(-34,-70);c.lineTo(-15,-72);c.lineTo(-5,-83);c.lineTo(5,-72);c.lineTo(23,-77);c.lineTo(22,-66);c.lineTo(37,-56);c.lineTo(35,-30);c.lineTo(27,-35);c.lineTo(22,-50);c.lineTo(7,-43);c.lineTo(4,-55);c.lineTo(-12,-44);c.lineTo(-23,-49);c.lineTo(-25,-23);c.closePath();c.fillStyle='#4b443d';c.fill();
  c.beginPath();c.moveTo(-22,-62);c.quadraticCurveTo(-8,-71,6,-63);stroke(c,'#9b826333',3);
  for(const sign of [-1,1]){
    const x=sign*14;
    c.beginPath();c.ellipse(x,-22,9,surprised?10:7,0,0,TAU);c.fillStyle='#ede5cf';c.fill();
    c.beginPath();c.ellipse(x+1,-21,3.2,4.8,0,0,TAU);c.fillStyle='#344348';c.fill();circle(c,x,-23,1.2);c.fillStyle='#fffbea';c.fill();
    c.beginPath();c.moveTo(x-9,-34+(angry?-sign*3:sign*2));c.quadraticCurveTo(x,-38+(surprised?-3:0),x+9,-34+(angry?sign*3:-sign*2));stroke(c,'#5b4a3d',2.8);
  }
  c.beginPath();c.moveTo(1,-19);c.lineTo(-4,-4);c.quadraticCurveTo(0,0,5,-4);stroke(c,'#947360',1.8);
  c.beginPath();if(surprised)c.ellipse(1,12,5,7,0,0,TAU);else{c.moveTo(-10,12);c.quadraticCurveTo(0,angry?3:8,11,14);}stroke(c,'#765343',2);
  for(const [x,y] of [[-20,4],[-16,9],[-11,20],[0,23],[11,21],[20,8],[24,1]]){c.beginPath();c.moveTo(x,y);c.lineTo(x+.5,y+2);stroke(c,'#76685c77',.9);}
  c.restore();
}

/** Static original recipient portrait; call again after a card resize. */
export function drawAlien(canvas, {species='bureaucrat',color='#a3d9b7',mood='neutral',kind,locale='ja'}={}) {
  if(!canvas)return;
  if(kind==='arthur')return drawHumanArthur(canvas,{mood,locale});
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label',locale==='en'?'Portrait of the alien recipient.':'訪問先の宇宙人の肖像。');
  const rect=canvas.getBoundingClientRect(),w=rect.width||260,h=rect.height||220,dpr=Math.min(globalThis.devicePixelRatio||1,2);
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
  const type=typeof species==='number'?species%9:hash(species)%9;
  const angry=['angry','offended','fail'].includes(mood),happy=['happy','delighted','success'].includes(mood),confused=['confused','gift','surprised'].includes(mood);
  const scale=Math.min(w/260,h/230);c.save();c.translate(w/2,h/2);c.scale(scale,scale);
  const halo=c.createRadialGradient(0,-10,10,0,-10,110);halo.addColorStop(0,rgba(color,.14));halo.addColorStop(1,rgba(color,0));c.fillStyle=halo;circle(c,0,-10,110);c.fill();
  c.save();c.setLineDash([3,7]);circle(c,0,-7,83);stroke(c,rgba(color,.17));c.restore();
  c.beginPath();c.ellipse(0,91,75,9,0,0,TAU);c.fillStyle='rgba(0,0,0,.2)';c.fill();
  // Coat and shoulders.
  c.beginPath();c.moveTo(-22,28);c.quadraticCurveTo(-75,39,-73,90);c.quadraticCurveTo(0,110,73,90);c.quadraticCurveTo(75,39,22,28);c.closePath();
  const coat=c.createLinearGradient(-60,30,40,100);coat.addColorStop(0,'#52646c');coat.addColorStop(1,'#1d303d');c.fillStyle=coat;c.fill();stroke(c,'rgba(163,189,189,.3)',1.5);
  c.beginPath();c.moveTo(-22,33);c.lineTo(-10,86);c.lineTo(0,66);c.lineTo(10,86);c.lineTo(22,33);c.fillStyle='#8a9d99';c.fill();
  c.beginPath();c.moveTo(-16,29);c.lineTo(0,58);c.lineTo(16,29);c.fillStyle='#132c34';c.fill();
  c.fillStyle='#d0ce8c';c.fillRect(29,63,15,3);c.fillStyle='#9fa69b';c.fillRect(29,70,9,2);
  // Thin neck.
  c.fillStyle=color;c.fillRect(-15,9,30,34);
  const skin=c.createLinearGradient(-50,-65,40,40);skin.addColorStop(0,color);skin.addColorStop(1,'#3f646a');
  if(type===0){
    // Broad alien with two floating sensory antennae.
    for(const direction of [-1,1]){c.beginPath();c.moveTo(direction*30,-53);c.quadraticCurveTo(direction*60,-87,direction*45,-94);stroke(c,color,5);circle(c,direction*45,-94,7);c.fillStyle=color;c.fill();circle(c,direction*43,-96,2.5);c.fillStyle='#eaf3d8';c.fill();}
    c.beginPath();c.moveTo(-48,-40);c.bezierCurveTo(-55,-78,55,-78,48,-40);c.lineTo(37,7);c.quadraticCurveTo(0,41,-37,7);c.closePath();c.fillStyle=skin;c.fill();
    c.beginPath();c.moveTo(-46,-25);c.lineTo(-64,-36);c.lineTo(-51,-1);c.closePath();c.fillStyle=color;c.fill();c.beginPath();c.moveTo(46,-25);c.lineTo(64,-36);c.lineTo(51,-1);c.closePath();c.fill();
  }else if(type===1){
    // Dome-headed, bespectacled bureaucrat.
    c.beginPath();c.ellipse(0,-23,47,62,0,0,TAU);c.fillStyle=skin;c.fill();
    for(const d of [-1,1]){circle(c,d*48,-8,9);c.fillStyle=color;c.fill();}
    c.beginPath();c.moveTo(-33,-62);c.quadraticCurveTo(0,-91,33,-62);stroke(c,rgba(color,.6),3);
  }else if(type===2){
    // Ceramic service robot.
    c.beginPath();c.roundRect(-49,-66,98,93,17);c.fillStyle=skin;c.fill();stroke(c,'rgba(222,245,220,.4)',2);
    for(const d of [-1,1]){c.fillStyle='#354b55';c.beginPath();c.roundRect(d===-1?-58:48,-35,10,32,3);c.fill();}
    c.fillStyle='#203743';c.beginPath();c.roundRect(-37,-48,74,39,9);c.fill();
    c.beginPath();c.moveTo(0,-66);c.lineTo(0,-84);stroke(c,'#8ea6a5',3);circle(c,0,-88,5);c.fillStyle='#e8d98f';c.fill();
  }else if(type===3){
    // Squidlike academic, three short neck tentacles.
    c.beginPath();c.moveTo(-46,-19);c.bezierCurveTo(-64,-87,59,-93,49,-17);c.quadraticCurveTo(40,17,28,23);c.lineTo(22,38);c.quadraticCurveTo(8,48,10,24);c.lineTo(-4,24);c.quadraticCurveTo(-5,46,-18,40);c.lineTo(-22,22);c.quadraticCurveTo(-41,27,-46,-19);c.closePath();c.fillStyle=skin;c.fill();
    c.save();c.globalAlpha=.18;c.fillStyle='#f3f4d8';for(const [x,y,r] of [[-26,-57,8],[-10,-68,5],[20,-60,7],[35,-43,4]]){circle(c,x,y,r);c.fill();}c.restore();
  }else if(type===4){
    // Tall angular observer with a fin.
    c.beginPath();c.moveTo(-39,-53);c.lineTo(0,-75);c.lineTo(40,-50);c.lineTo(48,-8);c.lineTo(17,29);c.lineTo(-17,29);c.lineTo(-47,-10);c.closePath();c.fillStyle=skin;c.fill();
    c.beginPath();c.moveTo(-7,-69);c.lineTo(4,-100);c.lineTo(18,-64);c.closePath();c.fillStyle=color;c.fill();
    c.beginPath();c.moveTo(-42,-29);c.lineTo(-64,-16);c.lineTo(-46,5);c.closePath();c.fillStyle=color;c.fill();c.beginPath();c.moveTo(42,-29);c.lineTo(64,-16);c.lineTo(46,5);c.closePath();c.fill();
  }else if(type===5){
    // Bowler-hatted British-style alien with a monocle.
    c.beginPath();c.ellipse(0,-17,44,48,0,0,TAU);c.fillStyle=skin;c.fill();
    for(const d of [-1,1]){c.beginPath();c.ellipse(d*46,-16,7,13,d*.2,0,TAU);c.fillStyle=color;c.fill();}
    c.beginPath();c.ellipse(0,-58,54,9,0,0,TAU);c.fillStyle='#2a3b45';c.fill();stroke(c,'#89a29f',1.5);
    c.beginPath();c.arc(0,-60,34,Math.PI,TAU);c.closePath();c.fillStyle='#1f303b';c.fill();stroke(c,'#7b9491',1.5);
    c.fillStyle='#d2c483';c.fillRect(-33,-66,66,5);
  }else if(type===6){
    // Halo-crowned mystic / strict proprietor with a forehead gem.
    c.beginPath();c.moveTo(-44,-44);c.quadraticCurveTo(0,-84,44,-44);c.quadraticCurveTo(50,10,0,31);c.quadraticCurveTo(-50,10,-44,-44);c.closePath();c.fillStyle=skin;c.fill();
    c.beginPath();c.arc(0,-54,48,Math.PI*1.12,Math.PI*1.88);stroke(c,'#e4cf8b',2.5);
    c.beginPath();c.moveTo(0,-66);c.lineTo(8,-54);c.lineTo(0,-42);c.lineTo(-8,-54);c.closePath();c.fillStyle='#d9f78b';c.fill();
    for(const d of [-1,1]){circle(c,d*48,-24,8);c.fillStyle=rgba(color,.75);c.fill();}
  }else if(type===7){
    // Spiky-crested, fast-talking tech/hipster alien.
    c.beginPath();c.moveTo(-43,-35);c.lineTo(-47,-64);c.lineTo(-22,-55);c.lineTo(0,-82);c.lineTo(22,-55);c.lineTo(47,-64);c.lineTo(43,-35);c.lineTo(35,16);c.quadraticCurveTo(0,36,-35,16);c.closePath();c.fillStyle=skin;c.fill();
    c.beginPath();c.roundRect(-24,18,48,20,6);c.fillStyle='#192831';c.fill();stroke(c,'rgba(190,220,210,.25)',1);
  }else{
    // Round-cheeked, ear-frilled chatterbox / TV pundit alien.
    for(const d of [-1,1]){c.beginPath();c.ellipse(d*50,-24,14,22,d*-.25,0,TAU);c.fillStyle=rgba(color,.8);c.fill();stroke(c,'rgba(230,245,220,.3)',1.5);}
    c.beginPath();c.ellipse(0,-18,48,50,0,0,TAU);c.fillStyle=skin;c.fill();
    c.beginPath();c.arc(0,-62,22,Math.PI,TAU);c.fillStyle='rgba(235,244,225,.32)';c.fill();
  }
  // Eye sockets and eyes.
  for(const d of [-1,1]){
    const ex=d*21,ey=-28;
    c.fillStyle=type===2?'#b9ecaa':'#e2ebc8';c.beginPath();c.ellipse(ex,ey,13,type===2?8:11,0,0,TAU);c.fill();
    c.fillStyle='#102b35';c.beginPath();c.ellipse(ex+(confused?d*1:1),ey+(happy?0:1),4,6,0,0,TAU);c.fill();
    circle(c,ex,ey-2,1.5);c.fillStyle='#fff8da';c.fill();
    if(angry){c.beginPath();c.moveTo(ex-d*15,ey-17);c.lineTo(ex+d*13,ey-7);stroke(c,'#25434c',5);}
    else if(confused){c.beginPath();c.moveTo(ex-10,ey-17-(d===1?5:0));c.quadraticCurveTo(ex,ey-24-(d===1?4:0),ex+10,ey-17-(d===1?5:0));stroke(c,'#426668',3);}
    else if(!happy){c.beginPath();c.moveTo(ex-13,ey-5);c.lineTo(ex+13,ey-5);stroke(c,rgba(color,.84),5);}
  }
  if(type===1||type===7){
    for(const d of [-1,1]){circle(c,d*21,-28,16);stroke(c,type===7?'#23333d':'#d4d0a8',type===7?3.2:2.5);}
    c.beginPath();c.moveTo(-5,-28);c.quadraticCurveTo(0,-33,5,-28);stroke(c,type===7?'#23333d':'#d4d0a8',2.2);
  }else if(type===5){
    circle(c,21,-28,16);stroke(c,'#e6d28a',2.2);
    c.beginPath();c.moveTo(37,-24);c.quadraticCurveTo(44,6,32,36);stroke(c,'#d4c078',1.3);
  }
  // Nose and expression.
  c.beginPath();c.moveTo(0,-21);c.lineTo(-4,-8);c.lineTo(3,-8);stroke(c,'rgba(20,53,60,.28)',2);
  c.beginPath();
  if(angry){c.moveTo(-13,13);c.quadraticCurveTo(0,1,13,13);}
  else if(happy){c.moveTo(-13,4);c.quadraticCurveTo(0,20,13,4);}
  else if(confused){c.ellipse(0,9,5,7,0,0,TAU);}
  else{c.moveTo(-12,9);c.lineTo(11,9);}
  stroke(c,'#203e46',2.5);
  if(angry){c.fillStyle='rgba(232,137,112,.28)';for(const d of [-1,1]){c.beginPath();c.ellipse(d*32,-3,9,4,0,0,TAU);c.fill();}}
  c.restore();
}
