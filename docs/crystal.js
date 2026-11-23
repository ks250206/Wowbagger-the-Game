/**
 * LGPS gift model. Original schematic geometry, NOT a crystallographic unit cell.
 * The 25 spheres preserve Li10 Ge1 P2 S12 stoichiometry. Mixed-site occupancy,
 * lattice coordinates, bond lengths and diffusion pathways are not reproduced.
 */

export const LGPS_META = Object.freeze({
  formula: 'Li₁₀GeP₂S₁₂',
  title: 'LGPS 結晶模型',
  caption: '組成と配位を示す模式模型。結晶座標・占有率は再現していません。',
  legend: [
    { element: 'Li', color: '#b6ffd7', count: 10 },
    { element: 'Ge', color: '#c29aff', count: 1 },
    { element: 'P', color: '#77d7ee', count: 2 },
    { element: 'S', color: '#f8cf63', count: 12 },
  ],
  sourceUrl: 'https://www.nature.com/articles/nmat3066',
  sourceLabel: 'Kamaya et al., Nature Materials (2011)',
});

/** Localised display metadata; the chemical formula and geometry are unchanged. */
export function getLgpsMeta(locale='ja') {
  return locale==='en' ? {
    ...LGPS_META,
    title:'LGPS crystal model',
    caption:'Schematic composition and coordination. Crystallographic coordinates and site occupancy are not reproduced.',
  } : {...LGPS_META};
}

const COLORS = {
  Li: { light: '#f1fff9', mid: '#b6ffd7', dark: '#2e9e82', radius: .082 },
  Ge: { light: '#faf1ff', mid: '#c29aff', dark: '#7149ae', radius: .152 },
  P:  { light: '#edffff', mid: '#77d7ee', dark: '#237b91', radius: .128 },
  S:  { light: '#fff5c6', mid: '#f8cf63', dark: '#9d702c', radius: .116 },
};

function makeGeometry() {
  const atoms = [], bonds = [], tetrahedra = [];
  const corners = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
  const groups = [
    { element: 'Ge', position: [-.66, .58, -.08], size: .54, turn: .16 },
    { element: 'P', position: [.69, .57, .13], size: .49, turn: -.28 },
    { element: 'P', position: [.02, -.88, .01], size: .52, turn: .75 },
  ];
  for (const group of groups) {
    const center = atoms.length;
    atoms.push({ element: group.element, position: group.position });
    const vertices = [];
    for (const corner of corners) {
      const x = corner[0] * group.size, z = corner[2] * group.size;
      const rx = x * Math.cos(group.turn) - z * Math.sin(group.turn);
      const rz = x * Math.sin(group.turn) + z * Math.cos(group.turn);
      const p = [group.position[0] + rx, group.position[1] + corner[1] * group.size, group.position[2] + rz];
      vertices.push(atoms.length);
      bonds.push([center, atoms.length]);
      atoms.push({ element: 'S', position: p });
    }
    tetrahedra.push({ vertices, color: COLORS[group.element].mid, center });
  }
  const paths = [];
  for (let channel = 0; channel < 2; channel++) {
    const path = [];
    for (let i = 0; i < 5; i++) {
      const direction = channel === 0 ? -1 : 1;
      const p = [direction * (1.18 + (i % 2) * .11), 1.28 - i * .64, (i % 2 ? .5 : -.4) * direction];
      path.push(atoms.length);
      atoms.push({ element: 'Li', position: p });
    }
    paths.push(path);
  }
  return { atoms, bonds, tetrahedra, paths };
}

export const LGPS_GEOMETRY = makeGeometry();

export class CrystalModel {
  constructor(canvas, { interactive = true, compact = false, locale = 'ja' } = {}) {
    if (!canvas || !canvas.getContext) throw new TypeError('CrystalModel needs a canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.interactive = interactive;
    this.compact = compact;
    this.locale = locale==='en'?'en':'ja';
    this.meta = getLgpsMeta(this.locale);
    this.angle = -.48;
    this.tilt = -.17;
    this.time = 0;
    this.width = 1;
    this.height = 1;
    this.running = false;
    this.destroyed = false;
    this.celebrating = false;
    this.drag = null;
    this.previousTime = 0;
    this.pauseUntil = 0;
    this.media = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    this.reducedMotion = !!this.media?.matches;
    this.tick = this.tick.bind(this);
    this.resize = this.resize.bind(this);
    this.visibility = () => { this.previousTime = 0; if (!document.hidden && this.running && !this.frame && !this.reducedMotion) this.frame = requestAnimationFrame(this.tick); };
    this.motion = e => {
      this.reducedMotion = e.matches;
      this.previousTime = 0;
      this.draw();
      if (!this.reducedMotion && this.running && !this.frame) this.frame = requestAnimationFrame(this.tick);
    };
    this.media?.addEventListener?.('change', this.motion);
    this.canvas.setAttribute('role', 'img');
    this.updateAria();
    if (interactive) {
      this.canvas.style.touchAction = 'pan-y';
      this.canvas.style.cursor = 'grab';
      this.down = e => {
        this.drag = { x: e.clientX, y: e.clientY, angle: this.angle, tilt: this.tilt, pointer: e.pointerId };
        this.canvas.setPointerCapture?.(e.pointerId);
        this.canvas.style.cursor = 'grabbing';
      };
      this.move = e => {
        if (!this.drag || e.pointerId !== this.drag.pointer) return;
        this.angle = this.drag.angle + (e.clientX - this.drag.x) * .009;
        this.tilt = Math.max(-.7, Math.min(.7, this.drag.tilt + (e.clientY - this.drag.y) * .005));
        this.pauseUntil = performance.now() + 2200;
        this.draw();
      };
      this.up = e => {
        if (!this.drag || e.pointerId !== this.drag.pointer) return;
        this.drag = null;
        this.canvas.style.cursor = 'grab';
        this.pauseUntil = performance.now() + 1600;
      };
      canvas.addEventListener('pointerdown', this.down);
      canvas.addEventListener('pointermove', this.move);
      canvas.addEventListener('pointerup', this.up);
      canvas.addEventListener('pointercancel', this.up);
      canvas.addEventListener('lostpointercapture', this.up);
    }
    this.observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(this.resize) : null;
    this.observer?.observe(canvas);
    document.addEventListener('visibilitychange', this.visibility);
    this.resize();
    this.start();
  }

  updateAria() {
    this.canvas.setAttribute('aria-label',this.locale==='en'
      ? 'Schematic LGPS Li10GeP2S12 model. Yellow: sulphur; purple: germanium; blue: phosphorus; green: lithium. These are not crystallographic coordinates.'
      : 'LGPS Li10GeP2S12 の構造模式模型。黄色は硫黄、紫はゲルマニウム、水色はリン、緑はリチウム。実際の結晶座標ではありません。');
  }

  setLocale(locale) {
    this.locale=locale==='en'?'en':'ja';
    this.meta=getLgpsMeta(this.locale);
    this.updateAria();
  }

  resize() {
    if (this.destroyed) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, rect.width || this.canvas.clientWidth || 320);
    this.height = Math.max(1, rect.height || this.canvas.clientHeight || 260);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  start() {
    if (this.destroyed || this.running) return;
    this.running = true;
    this.previousTime = 0;
    if (!this.reducedMotion) this.frame = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frame);
    this.frame = null;
  }

  setCelebrating(value) {
    this.celebrating = !!value;
    this.draw();
  }

  tick(now) {
    this.frame = null;
    if (!this.running || this.destroyed || document.hidden) return;
    const dt = Math.min(.06, this.previousTime ? (now - this.previousTime) / 1000 : 0);
    this.previousTime = now;
    if (!this.reducedMotion) {
      this.time += dt;
      if (!this.drag && now > this.pauseUntil) this.angle += dt * (this.celebrating ? .32 : .115);
    }
    this.draw();
    if (!this.reducedMotion) this.frame = requestAnimationFrame(this.tick);
  }

  project(p) {
    const ca = Math.cos(this.angle), sa = Math.sin(this.angle), ct = Math.cos(this.tilt), st = Math.sin(this.tilt);
    const x = p[0] * ca + p[2] * sa;
    const z1 = -p[0] * sa + p[2] * ca;
    const y = p[1] * ct - z1 * st;
    const z = p[1] * st + z1 * ct;
    const perspective = 6 / (6 - z);
    const scale = Math.min(this.width / 4.4, this.height / 4.0);
    const float = this.reducedMotion ? 0 : Math.sin(this.time * .8) * 3;
    return { x: this.width / 2 + x * scale * perspective, y: this.height * .46 - y * scale * perspective + float, z, scale: scale * perspective };
  }

  draw() {
    if (!this.ctx || this.destroyed) return;
    const ctx = this.ctx, w = this.width, h = this.height;
    ctx.clearRect(0, 0, w, h);
    if (w < 2 || h < 2) return;
    ctx.save();
    const glow = ctx.createRadialGradient(w*.5,h*.46,1,w*.5,h*.46,Math.max(w,h)*.45);
    glow.addColorStop(0,this.celebrating ? 'rgba(150,245,183,.18)' : 'rgba(94,215,200,.10)');
    glow.addColorStop(.55,'rgba(109,111,211,.045)');
    glow.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);

    // A display stand communicates that this is a gift, rather than a floating molecule.
    const ground = h*.86, radius = Math.min(w*.32,h*.40);
    ctx.beginPath();ctx.ellipse(w/2,ground,radius,radius*.19,0,0,Math.PI*2);
    ctx.fillStyle='rgba(3,12,21,.5)';ctx.fill();
    ctx.strokeStyle='rgba(145,238,207,.25)';ctx.lineWidth=1;ctx.stroke();
    ctx.beginPath();ctx.ellipse(w/2,ground-3,radius*.83,radius*.15,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(145,238,207,.12)';ctx.stroke();
    ctx.beginPath();ctx.moveTo(w/2-radius*.8,ground+8);ctx.lineTo(w/2+radius*.8,ground+8);
    ctx.strokeStyle='rgba(145,238,207,.10)';ctx.stroke();

    const points = LGPS_GEOMETRY.atoms.map(a=>this.project(a.position));
    const drawables = [];
    for (const t of LGPS_GEOMETRY.tetrahedra) {
      for (const indexes of [[0,1,2],[0,1,3],[0,2,3],[1,2,3]]) {
        const ps=indexes.map(i=>points[t.vertices[i]]);
        drawables.push({kind:'face',ps,color:t.color,z:ps.reduce((sum,p)=>sum+p.z,0)/3});
      }
    }
    for (const [a,b] of LGPS_GEOMETRY.bonds) drawables.push({kind:'bond',a:points[a],b:points[b],z:(points[a].z+points[b].z)/2+.015});
    LGPS_GEOMETRY.atoms.forEach((a,i)=>drawables.push({kind:'atom',a,p:points[i],z:points[i].z+.02}));
    drawables.sort((a,b)=>a.z-b.z);

    // Dotted rails are a visual motif for Li transport, not a computed diffusion path.
    for (const path of LGPS_GEOMETRY.paths) {
      ctx.beginPath();
      path.forEach((index,i)=>{ const p=points[index];i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y); });
      ctx.strokeStyle='rgba(182,255,215,.22)';ctx.lineWidth=1;ctx.setLineDash([2,5]);ctx.stroke();ctx.setLineDash([]);
    }

    for (const object of drawables) {
      if (object.kind==='face') {
        const {ps,color}=object;
        ctx.beginPath();ps.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
        ctx.globalAlpha=.10+(object.z+1.4)*.026;ctx.fillStyle=color;ctx.fill();ctx.globalAlpha=.34;ctx.strokeStyle=color;ctx.lineWidth=.8;ctx.stroke();ctx.globalAlpha=1;
      } else if (object.kind==='bond') {
        ctx.beginPath();ctx.moveTo(object.a.x,object.a.y);ctx.lineTo(object.b.x,object.b.y);
        ctx.strokeStyle='rgba(200,227,230,.46)';ctx.lineWidth=Math.max(1.5,Math.min(w,h)*.009);ctx.lineCap='round';ctx.stroke();
        ctx.strokeStyle='rgba(247,255,255,.45)';ctx.lineWidth=.8;ctx.stroke();
      } else {
        const {a,p}=object, c=COLORS[a.element];
        const r=Math.max(2,c.radius*p.scale);
        if (a.element==='Li') {
          ctx.beginPath();ctx.arc(p.x,p.y,r*1.9,0,Math.PI*2);ctx.fillStyle='rgba(182,255,215,.06)';ctx.fill();
        }
        const sphere=ctx.createRadialGradient(p.x-r*.35,p.y-r*.4,r*.04,p.x,p.y,r);
        sphere.addColorStop(0,c.light);sphere.addColorStop(.3,c.mid);sphere.addColorStop(1,c.dark);
        ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=sphere;ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,.24)';ctx.lineWidth=.65;ctx.stroke();
        if (!this.compact && (a.element==='Ge'||a.element==='P') && r>=8) {
          ctx.font=`600 ${Math.max(9,Math.round(r*.85))}px ui-monospace, SFMono-Regular, monospace`;
          ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=a.element==='Ge'?'#251337':'#10343c';ctx.fillText(a.element,p.x,p.y+.5);
        }
      }
    }

    if (this.celebrating) {
      for (let i=0;i<18;i++) {
        const phase=this.time*.23+i*.61803399;
        const f=phase-Math.floor(phase), angle=i*2.399963;
        const r=(.18+f*.3)*Math.min(w,h);
        const x=w*.5+Math.cos(angle)*r,y=h*.48+Math.sin(angle)*r*.72-f*20;
        ctx.globalAlpha=(1-f)*.7;
        ctx.fillStyle=i%3===0?'#f8cf63':'#b6ffd7';
        ctx.fillRect(x,y,2,2);
      }
      ctx.globalAlpha=1;
    }
    ctx.restore();
  }

  destroy() {
    if (this.destroyed) return;
    this.stop();this.destroyed=true;this.observer?.disconnect();
    this.media?.removeEventListener?.('change',this.motion);
    document.removeEventListener('visibilitychange',this.visibility);
    if (this.interactive) {
      this.canvas.removeEventListener('pointerdown',this.down);
      this.canvas.removeEventListener('pointermove',this.move);
      this.canvas.removeEventListener('pointerup',this.up);
      this.canvas.removeEventListener('pointercancel',this.up);
      this.canvas.removeEventListener('lostpointercapture',this.up);
    }
  }
}
