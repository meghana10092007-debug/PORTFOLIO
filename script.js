(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const projects=[
 {badge:'PLANET 01 // HEALTH NETWORK',title:'BLOODCONNECT',subtitle:'PROACTIVE BLOOD SUPPLY & EMERGENCY DONOR NETWORK',desc:'A proactive digital network connecting hospitals, blood banks, colleges, donors and blood seekers. The system focuses on stock visibility, shortage prediction, early warnings and emergency donor coordination.',systems:['Blood stock monitoring','Demand & shortage prediction','Emergency donor matching','SOS / emergency request flow','College donation drives','Donor response tracking'],tech:['React','JavaScript','Node.js','AI/ML','Git/GitHub'],github:'https://github.com/meghana10092007-debug/PROJECT'},
 {badge:'PLANET 02 // CAMPUS EXCHANGE',title:'COLLEGE MARKETPLACE',subtitle:'MARKETPLACE FOR COLLEGE STUDENTS',desc:'A student-focused marketplace for buying, selling and exchanging useful products inside the college community, encouraging affordable reuse and easy campus interaction.',systems:['Product listings','Buyer interaction','Seller interaction','Campus exchange','Reuse workflow'],tech:['HTML','CSS','JavaScript','React','Git/GitHub'],github:'https://github.com/meghana10092007-debug'},
 {badge:'PLANET 03 // FOOD SYSTEM',title:'FOOD MANAGEMENT SYSTEM',subtitle:'DIGITAL FOOD MANAGEMENT WORKFLOW',desc:'A software project focused on organizing food-related information and workflows through a clear digital interface, making records easier to manage and access.',systems:['Digital records','Organized workflow','Information access','Management interface'],tech:['HTML','CSS','JavaScript','Python','Git/GitHub'],github:'https://github.com/meghana10092007-debug'}
];

// loader
window.addEventListener('load',()=>setTimeout(()=>$('#loader')?.classList.add('loaded'),800));
// cursor
const dot=$('#cursor-dot'), ring=$('#cursor-ring'); let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY; if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}});
function cursorLoop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursorLoop)}cursorLoop();

// smooth reveal
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal-item').forEach(el=>observer.observe(el));

// mobile nav
$('#menu-btn')?.addEventListener('click',()=>$('#mobile-nav')?.classList.toggle('hidden'));
$$('.nav-jump-link').forEach(a=>a.addEventListener('click',()=>$('#mobile-nav')?.classList.add('hidden')));

// scroll UI
let scrollP=0, warp=1; addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;scrollP=max?scrollY/max:0;$('#scroll-progress').style.width=(scrollP*100)+'%';$('#hud-progress-fill').style.height=(scrollP*100)+'%';const ids=['sector-hero','sector-about','sector-projects','sector-milestones','sector-contact','sector-archive'];let active=0;ids.forEach((id,i)=>{const r=document.getElementById(id).getBoundingClientRect();if(r.top<innerHeight*.5)active=i});fieldMode=active;$$('.side-link').forEach((x,i)=>x.classList.toggle('active',i===active));},{passive:true});
$('#warp-btn')?.addEventListener('click',()=>{warp=warp===1?2.2:1;$('#warp-btn').textContent='WARP '+warp.toFixed(1)});

// copy email
$('#copy-email')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('meghana10092007@gmail.com');$('#copy-email').textContent='COPIED!'}catch(e){$('#copy-email').textContent='EMAIL READY'}});
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const name=e.target[0].value,email=e.target[1].value,msg=e.target[2].value;const subject=encodeURIComponent('Portfolio Contact from '+name);const body=encodeURIComponent(msg+'\n\nReply to: '+email);window.location.href=`mailto:meghana10092007@gmail.com?subject=${subject}&body=${body}`;$('#form-status').classList.remove('hidden')});

// project modal
const modal=$('#project-modal');
function openProject(i){const p=projects[i];$('#modal-badge').textContent=p.badge;$('#modal-title').textContent=p.title;$('#modal-subtitle').textContent=p.subtitle;$('#modal-desc').textContent=p.desc;$('#modal-systems').innerHTML=p.systems.map(x=>`<li>${x}</li>`).join('');$('#modal-tech').innerHTML=p.tech.map(x=>`<span>${x}</span>`).join('');$('#modal-github').href=p.github;modal.classList.remove('hidden');modal.classList.add('flex')}
$$('.project-card,.inspect-dossier-btn').forEach(el=>el.addEventListener('click',e=>{const card=e.currentTarget.closest('.project-card');if(card)openProject(+card.dataset.projectIndex)}));
$('#modal-close')?.addEventListener('click',()=>{modal.classList.add('hidden');modal.classList.remove('flex')});$('#modal-backdrop')?.addEventListener('click',()=>$('#modal-close').click());

// THREE.JS reference-style WebGL scene
const canvas=$('#webgl-canvas'); const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(0x030712,.012); const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,200);camera.position.set(0,0,15);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
scene.add(new THREE.AmbientLight(0x335577,.7)); const key=new THREE.PointLight(0x22d3ee,18,35);key.position.set(4,4,8);scene.add(key);const violet=new THREE.PointLight(0x8b5cf6,12,30);violet.position.set(-6,-3,3);scene.add(violet);
function stars(n,r){const g=new THREE.BufferGeometry(),a=new Float32Array(n*3);for(let i=0;i<n;i++){const rad=r*(.25+Math.random()*.75),u=Math.random()*2-1,t=Math.random()*Math.PI*2,s=Math.sqrt(1-u*u);a[i*3]=rad*s*Math.cos(t);a[i*3+1]=rad*u;a[i*3+2]=rad*s*Math.sin(t)}g.setAttribute('position',new THREE.BufferAttribute(a,3));const m=new THREE.PointsMaterial({color:0x7dd3fc,size:.025,transparent:true,opacity:.55,depthWrite:false});const p=new THREE.Points(g,m);scene.add(p);return p}
const far=stars(2200,70),near=stars(650,30);far.rotation.y=.2;
const world=new THREE.Group();scene.add(world);
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(3.0,5),new THREE.MeshStandardMaterial({color:0x08131f,metalness:.7,roughness:.28,emissive:0x062c3d,emissiveIntensity:1.4}));world.add(core);
const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(3.15,3),new THREE.MeshBasicMaterial({color:0x22d3ee,wireframe:true,transparent:true,opacity:.22}));world.add(wire);
const inner=new THREE.Mesh(new THREE.SphereGeometry(2.35,48,48),new THREE.MeshBasicMaterial({color:0x07131f,transparent:true,opacity:.62}));world.add(inner);
function torus(rad,tube,color,rot){const m=new THREE.Mesh(new THREE.TorusGeometry(rad,tube,16,160),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.72}));m.rotation.set(...rot);world.add(m);return m}
const r1=torus(4.0,.035,0x22d3ee,[.55,.1,.1]),r2=torus(4.5,.025,0x8b5cf6,[1.05,.3,.55]),r3=torus(5.1,.018,0xec4899,[.15,.9,.25]);
const orbitGroup=new THREE.Group();world.add(orbitGroup);
const planetMeshes=[]; const cols=[0x22d3ee,0x8b5cf6,0xec4899]; const orbitR=[6.1,7.4,8.6];
for(let i=0;i<3;i++){const pivot=new THREE.Group();orbitGroup.add(pivot);const p=new THREE.Mesh(new THREE.SphereGeometry(.58,32,32),new THREE.MeshStandardMaterial({color:cols[i],emissive:cols[i],emissiveIntensity:.55,metalness:.25,roughness:.35}));p.position.x=orbitR[i];pivot.rotation.z=i*.65;pivot.add(p);planetMeshes.push({pivot,p,i})}
const trailMat=new THREE.LineBasicMaterial({color:0x22d3ee,transparent:true,opacity:.22});for(let i=0;i<4;i++){const pts=[];for(let j=0;j<80;j++){const t=j/79*Math.PI*2;const rr=6+i*.7;pts.push(new THREE.Vector3(Math.cos(t)*rr,Math.sin(t)*rr*.34,(j%2?-.05:.05)))}const g=new THREE.BufferGeometry().setFromPoints(pts);const l=new THREE.Line(g,trailMat);l.rotation.x=.35+i*.18;world.add(l)}
const dust=stars(500,12);dust.material.size=.018;dust.material.opacity=.35;

// ==================== ROTATING PLANETARY BACKDROP ====================
// This is the key visual from the supplied video: a dark glowing planet/core
// rotates behind the page content, with a cyan rim, translucent orbital waves,
// floating white/cyan planets, and a small constellation network above it.
const planetaryBackdrop=new THREE.Group();
planetaryBackdrop.position.set(0,-1.15,-2.6);
planetaryBackdrop.scale.setScalar(1.12);
scene.add(planetaryBackdrop);

const planetCore=new THREE.Mesh(
  new THREE.SphereGeometry(2.35,64,64),
  new THREE.MeshStandardMaterial({color:0x020811,emissive:0x061b30,emissiveIntensity:1.2,metalness:.65,roughness:.3,transparent:true,opacity:.94})
);
planetaryBackdrop.add(planetCore);

const planetRim=new THREE.Mesh(
  new THREE.TorusGeometry(2.48,.075,16,180),
  new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.92,blending:THREE.AdditiveBlending})
);
planetRim.rotation.x=Math.PI*.5;
planetaryBackdrop.add(planetRim);

const planetWire=new THREE.Mesh(
  new THREE.SphereGeometry(2.42,28,18),
  new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true,transparent:true,opacity:.14,depthWrite:false})
);
planetaryBackdrop.add(planetWire);

// Broad translucent wave/ring passing through the planet like the video.
const waveGroup=new THREE.Group();
waveGroup.rotation.set(.18,-.08,-.12);
planetaryBackdrop.add(waveGroup);
for(let k=0;k<4;k++){
  const pts=[];
  const count=180;
  for(let i=0;i<count;i++){
    const u=i/(count-1)*Math.PI*2;
    const rad=2.05+k*.18;
    pts.push(new THREE.Vector3(
      Math.cos(u)*rad,
      Math.sin(u)*rad*.20 + Math.sin(u*5+k)*.045,
      Math.sin(u)*rad*.42
    ));
  }
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:k%2?0x67e8f9:0x22d3ee,transparent:true,opacity:.20-k*.025,blending:THREE.AdditiveBlending,depthWrite:false}));
  waveGroup.add(line);
}

// Small orbiting bodies seen around the planetary core.
const backdropOrbits=[];
[[3.25,.18,0xf8fafc,0.0],[3.65,.14,0x67e8f9,2.1],[4.05,.11,0xc084fc,4.2]].forEach((cfg,i)=>{
  const [rad,size,color,start]=cfg;
  const pivot=new THREE.Group();
  pivot.rotation.z=.12+i*.55;
  pivot.rotation.x=.18+i*.18;
  planetaryBackdrop.add(pivot);
  const body=new THREE.Mesh(new THREE.SphereGeometry(size,24,24),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.75,metalness:.15,roughness:.22}));
  body.position.set(Math.cos(start)*rad,Math.sin(start)*rad*.28,Math.sin(start)*rad*.55);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(size*2.4,16,16),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.055,blending:THREE.AdditiveBlending,depthWrite:false}));
  body.add(halo); pivot.add(body);
  backdropOrbits.push({pivot,body,rad,start,speed:.002+i*.0008});
});

// Vertical constellation/network rising above the planet.
const backdropNetwork=new THREE.Group();
backdropNetwork.position.set(2.4,2.0,.2);
planetaryBackdrop.add(backdropNetwork);
const bn=[];
for(let i=0;i<18;i++){
  const v=new THREE.Vector3(
    (Math.random()-.5)*2.5,
    Math.random()*3.0-.3,
    (Math.random()-.5)*1.4
  );
  bn.push(v);
}
const bng=new THREE.BufferGeometry();
bng.setAttribute('position',new THREE.Float32BufferAttribute(bn.flatMap(v=>[v.x,v.y,v.z]),3));
const bnm=new THREE.PointsMaterial({color:0x38bdf8,size:.075,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false});
backdropNetwork.add(new THREE.Points(bng,bnm));
const bl=[];
for(let i=0;i<bn.length;i++)for(let j=i+1;j<bn.length;j++)if(bn[i].distanceTo(bn[j])<1.05 && Math.random()<.62)bl.push(bn[i].x,bn[i].y,bn[i].z,bn[j].x,bn[j].y,bn[j].z);
const blg=new THREE.BufferGeometry();blg.setAttribute('position',new THREE.Float32BufferAttribute(bl,3));
backdropNetwork.add(new THREE.LineSegments(blg,new THREE.LineBasicMaterial({color:0x38bdf8,transparent:true,opacity:.22,depthWrite:false})));

// Soft blue aura behind the planetary architecture.
const planetAura=new THREE.Mesh(new THREE.SphereGeometry(3.8,32,32),new THREE.MeshBasicMaterial({color:0x0878ff,transparent:true,opacity:.065,blending:THREE.AdditiveBlending,depthWrite:false}));
planetaryBackdrop.add(planetAura);


// ==================== VIDEO-REFERENCE DIAGONAL PARTICLE STREAM ====================
// Recreated from the user's supplied video: several dense diagonal bands of
// glowing square particles sweep from upper-left toward lower-right, with
// strong depth, blur-like size variation and cyan/violet/pink light.
function makeSquareTexture(){
  const c=document.createElement('canvas'); c.width=c.height=64;
  const x=c.getContext('2d');
  const g=x.createRadialGradient(32,32,3,32,32,31);
  g.addColorStop(0,'rgba(255,255,255,1)');
  g.addColorStop(.48,'rgba(255,255,255,.98)');
  g.addColorStop(.78,'rgba(255,255,255,.35)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g; x.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
}
const squareTexture=makeSquareTexture();
const ribbonGroup=new THREE.Group();
ribbonGroup.position.set(0,0,-3.2);
scene.add(ribbonGroup);
const ribbonStreams=[];
const ribbonColors=[0x22d3ee,0xa78bfa,0xec4899,0xf8fafc];
const streamOffsets=[-0.95,-0.30,0.30,0.95];
for(let stream=0;stream<4;stream++){
  const count=760;
  const positions=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const sizes=new Float32Array(count);
  const data=[];
  const col=new THREE.Color(ribbonColors[stream]);
  for(let i=0;i<count;i++){
    const u=Math.random();
    const lane=streamOffsets[stream]+(Math.random()-.5)*.72;
    const depth=(Math.random()-.5)*5.8;
    const p=i*3;
    positions[p]=0; positions[p+1]=0; positions[p+2]=0;
    col.toArray(colors,p);
    sizes[i]=.7+Math.random()*2.5;
    data.push({u,lane,depth,speed:.00045+Math.random()*.00125,phase:Math.random()*Math.PI*2,size:sizes[i]});
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  geo.setAttribute('aSize',new THREE.BufferAttribute(sizes,1));
  // PointsMaterial gives crisp square particles through the custom square texture.
  const mat=new THREE.PointsMaterial({
    size:.14,
    map:squareTexture,
    transparent:true,
    opacity:.78,
    vertexColors:true,
    depthWrite:false,
    blending:THREE.AdditiveBlending,
    sizeAttenuation:true
  });
  const pts=new THREE.Points(geo,mat);
  ribbonGroup.add(pts);
  ribbonStreams.push({pts,geo,data,stream});
}
function updateRibbonStreams(time){
  ribbonStreams.forEach((streamObj)=>{
    const pos=streamObj.geo.attributes.position.array;
    streamObj.data.forEach((d,i)=>{
      d.u+=d.speed*warp;
      if(d.u>1.08) d.u-=1.08;
      const u=d.u;
      // Long diagonal trajectory matching the supplied video.
      const x=-14.5+29*u;
      const centerY=6.5-13.0*u;
      const wave=Math.sin(u*10.0+d.phase)*.20 + Math.sin(u*23.0+d.phase*.6)*.10;
      const y=centerY+d.lane+wave;
      const z=d.depth + Math.sin(u*7+d.phase)*.25;
      const p=i*3;
      pos[p]=x; pos[p+1]=y; pos[p+2]=z;
    });
    streamObj.geo.attributes.position.needsUpdate=true;
    // Subtle depth breathing; closer particles appear larger.
    streamObj.pts.material.size=.11+streamObj.stream*.008+Math.sin(time*.8+streamObj.stream)*.006;
  });
}
// Bright blue atmospheric glow behind the particle stream.
const streamGlow=new THREE.Mesh(
  new THREE.SphereGeometry(3.8,32,32),
  new THREE.MeshBasicMaterial({color:0x0878ff,transparent:true,opacity:.10,blending:THREE.AdditiveBlending,depthWrite:false})
);
streamGlow.position.set(2.5,0,-4); streamGlow.scale.set(2.5,1.4,.7); scene.add(streamGlow);

// ==================== REFERENCE CONSTELLATION NETWORK ====================
// Small nodes + connecting lines reproduce the futuristic network/constellation
// visible beside the central object in the supplied reference image.
const constellation=new THREE.Group();
const nodeGeo=new THREE.SphereGeometry(.075,8,8);
const nodeMat=new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.9});
const nodeCount=38;
const nodeMesh=new THREE.InstancedMesh(nodeGeo,nodeMat,nodeCount);
const nodes=[];
for(let i=0;i<nodeCount;i++){
  const a=i/nodeCount*Math.PI*2;
  const rad=2.5+Math.random()*3.4;
  const pos=new THREE.Vector3(4.5+Math.cos(a)*rad, Math.sin(a)*rad*.72, -1+Math.sin(a*2.1)*2.2);
  nodes.push(pos);
  dummy.position.copy(pos); dummy.scale.setScalar(.7+Math.random()*1.5); dummy.updateMatrix(); nodeMesh.setMatrixAt(i,dummy.matrix);
}
nodeMesh.instanceMatrix.needsUpdate=true;
const linePositions=[];
for(let i=0;i<nodes.length;i++){
  for(let j=i+1;j<nodes.length;j++){
    if(nodes[i].distanceTo(nodes[j])<2.9 && Math.random()<.55){linePositions.push(nodes[i].x,nodes[i].y,nodes[i].z,nodes[j].x,nodes[j].y,nodes[j].z)}
  }
}
const networkGeo=new THREE.BufferGeometry();
networkGeo.setAttribute('position',new THREE.Float32BufferAttribute(linePositions,3));
const networkLines=new THREE.LineSegments(networkGeo,new THREE.LineBasicMaterial({color:0x22d3ee,transparent:true,opacity:.16,depthWrite:false}));
const networkViolet=new THREE.LineSegments(networkGeo.clone(),new THREE.LineBasicMaterial({color:0x8b5cf6,transparent:true,opacity:.055,depthWrite:false}));
const networkGroup=new THREE.Group();networkGroup.add(networkLines,networkViolet,nodeMesh);scene.add(networkGroup);

// ==================== MINI PROJECT ORBITAL STAGE ====================
// The project-section panel gets its own lightweight WebGL scene so it is never
// an empty rectangle when the user reaches the Projects sector.
function initProjectStage(){
  const host=document.getElementById('planet-stage');
  if(!host || !window.THREE) return;
  const s=new THREE.Scene();
  const c=new THREE.PerspectiveCamera(45,host.clientWidth/Math.max(host.clientHeight,1),.1,100);
  c.position.set(0,0,11);
  const r=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  r.setPixelRatio(Math.min(devicePixelRatio,1.6)); r.setSize(host.clientWidth,host.clientHeight); r.outputColorSpace=THREE.SRGBColorSpace;
  host.appendChild(r.domElement);
  s.add(new THREE.AmbientLight(0x173b55,1.15));
  const l1=new THREE.PointLight(0x22d3ee,14,25);l1.position.set(4,3,8);s.add(l1);
  const l2=new THREE.PointLight(0x8b5cf6,11,22);l2.position.set(-5,-2,6);s.add(l2);
  const l3=new THREE.PointLight(0xec4899,8,18);l3.position.set(3,-4,3);s.add(l3);

  const g=new THREE.Group();s.add(g);
  // Central futuristic planetary core
  const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(1.95,4),new THREE.MeshStandardMaterial({color:0x020a14,emissive:0x073c55,emissiveIntensity:1.8,metalness:.8,roughness:.2}));g.add(orb);
  const orbGlow=new THREE.Mesh(new THREE.SphereGeometry(2.08,32,32),new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.055,blending:THREE.AdditiveBlending,depthWrite:false}));g.add(orbGlow);
  const wire2=new THREE.Mesh(new THREE.IcosahedronGeometry(2.08,3),new THREE.MeshBasicMaterial({color:0x22d3ee,wireframe:true,transparent:true,opacity:.48}));g.add(wire2);
  const wirePurple=new THREE.Mesh(new THREE.IcosahedronGeometry(2.18,2),new THREE.MeshBasicMaterial({color:0x8b5cf6,wireframe:true,transparent:true,opacity:.18}));g.add(wirePurple);
  const rings=[];
  [[2.75,0x22d3ee,[.8,.15,.1]],[3.35,0x8b5cf6,[1.15,.5,.55]],[3.95,0xec4899,[.2,.9,.3]]].forEach(([rad,col,rot])=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(rad,.028,12,150),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.72,blending:THREE.AdditiveBlending}));ring.rotation.set(...rot);g.add(ring);rings.push(ring)});

  // Three project planets around the core
  const ps=[]; const cols=[0x22d3ee,0x8b5cf6,0xec4899];
  [4.25,4.65,5.0].forEach((rad,i)=>{
    const pivot=new THREE.Group();g.add(pivot);
    const m=new THREE.Mesh(new THREE.SphereGeometry(.28+i*.035,24,24),new THREE.MeshStandardMaterial({color:cols[i],emissive:cols[i],emissiveIntensity:1.5,metalness:.3,roughness:.2}));
    m.position.x=rad; pivot.rotation.z=i*2.05; pivot.rotation.y=i*.7; pivot.add(m);
    const halo=new THREE.Mesh(new THREE.SphereGeometry(.43+i*.04,16,16),new THREE.MeshBasicMaterial({color:cols[i],transparent:true,opacity:.08,blending:THREE.AdditiveBlending,depthWrite:false}));m.add(halo);
    ps.push({pivot,m,i});
  });

  // Diagonal particle ribbon: the key visual from the user's 2nd/3rd reference photos.
  const ribbon=new THREE.Group(); s.add(ribbon); ribbon.position.set(0,-.2,-1.8); ribbon.rotation.z=-.20;
  const box=new THREE.BoxGeometry(.055,.055,.055);
  const mat=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:.62,depthWrite:false,blending:THREE.AdditiveBlending});
  const mesh=new THREE.InstancedMesh(box,mat,760); ribbon.add(mesh);
  const data=[]; const dmy=new THREE.Object3D();
  for(let i=0;i<760;i++){
    const u=Math.random();
    const x=-8.7+17.4*u;
    const y=3.8-7.1*u + Math.sin(u*Math.PI*2.5)*.35 + (Math.random()-.5)*(.45+u*.85);
    const z=-1+(Math.random()-.5)*5.5;
    const sc=.18+Math.random()*1.25;
    const col=cols[(Math.random()*3)|0];
    data.push({x,y,z,sc,phase:Math.random()*Math.PI*2});
    mesh.setColorAt(i,new THREE.Color(col));
    dmy.position.set(x,y,z);dmy.scale.setScalar(sc);dmy.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);dmy.updateMatrix();mesh.setMatrixAt(i,dmy.matrix);
  }
  mesh.instanceMatrix.needsUpdate=true; if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;

  // Constellation network behind the core
  const network=new THREE.Group();s.add(network);network.position.set(3.0,.15,-2.6);
  const n=34,nodes=[];const ng=new THREE.SphereGeometry(.055,8,8);const nm=new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,opacity:.85,blending:THREE.AdditiveBlending});
  const ni=new THREE.InstancedMesh(ng,nm,n);
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,rad=1.5+Math.random()*2.8;const v=new THREE.Vector3(Math.cos(a)*rad,Math.sin(a)*rad*.72,(Math.random()-.5)*2.8);nodes.push(v);dmy.position.copy(v);dmy.scale.setScalar(.6+Math.random()*1.4);dmy.updateMatrix();ni.setMatrixAt(i,dmy.matrix)}
  ni.instanceMatrix.needsUpdate=true;network.add(ni);
  const lp=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(nodes[i].distanceTo(nodes[j])<2.15 && Math.random()<.42)lp.push(nodes[i].x,nodes[i].y,nodes[i].z,nodes[j].x,nodes[j].y,nodes[j].z);
  const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(lp,3));network.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x38bdf8,transparent:true,opacity:.20,depthWrite:false})));

  // Small floating depth particles around the stage
  const pg=new THREE.BufferGeometry(), pa=new Float32Array(420*3);
  for(let i=0;i<420;i++){pa[i*3]=(Math.random()-.5)*18;pa[i*3+1]=(Math.random()-.5)*9;pa[i*3+2]=(Math.random()-.5)*12-1}
  pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
  const pmat=new THREE.PointsMaterial({color:0x93c5fd,size:.018,transparent:true,opacity:.45,depthWrite:false});
  const dust=new THREE.Points(pg,pmat);s.add(dust);

  function rs(){const w=host.clientWidth,h=host.clientHeight;c.aspect=w/Math.max(h,1);c.updateProjectionMatrix();r.setSize(w,h)}
  addEventListener('resize',rs);
  return {s,c,r,g,orb,orbGlow,wire2,wirePurple,rings,ps,ribbon,data,mesh,network,dust,dmy};
}
const projectStage=initProjectStage();

// ==================== REFERENCE-STYLE FLYING 3D BACKGROUND ====================
// Multiple depth layers create the same kind of continuous WebGL space-flight feeling
// as the supplied reference: stars, glowing particles, rotating portals, flying shards
// and long perspective streaks all move toward the viewer.
const flyerGroup=new THREE.Group(); scene.add(flyerGroup);
const flyerGeo=new THREE.IcosahedronGeometry(.10,0);
const flyerMatA=new THREE.MeshStandardMaterial({color:0x22d3ee,emissive:0x0e7490,emissiveIntensity:2.1,metalness:.45,roughness:.25});
const flyerMatB=new THREE.MeshStandardMaterial({color:0x8b5cf6,emissive:0x5b21b6,emissiveIntensity:1.8,metalness:.45,roughness:.25});
const flyerMatC=new THREE.MeshStandardMaterial({color:0xec4899,emissive:0x9d174d,emissiveIntensity:1.7,metalness:.4,roughness:.3});
const flyerMats=[flyerMatA,flyerMatB,flyerMatC];
const flyers=[];
for(let i=0;i<95;i++){
  const m=new THREE.Mesh(flyerGeo,flyerMats[i%3]);
  m.position.set((Math.random()-.5)*34,(Math.random()-.5)*23,-8+Math.random()*72);
  const s=.25+Math.random()*1.7;m.scale.setScalar(s);
  m.userData={speed:.045+Math.random()*.20,spin:.004+Math.random()*.018,seed:Math.random()*Math.PI*2};
  flyerGroup.add(m);flyers.push(m);
}

// Glowing particle trails: thin line segments stretch in the direction of travel.
const streakGroup=new THREE.Group();scene.add(streakGroup);
for(let i=0;i<75;i++){
  const len=.35+Math.random()*3.8;
  const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,len*.5,0),new THREE.Vector3(0,-len*.5,0)]);
  const mat=new THREE.LineBasicMaterial({color:i%3===0?0xec4899:(i%3===1?0x8b5cf6:0x22d3ee),transparent:true,opacity:.18+Math.random()*.38,depthWrite:false});
  const line=new THREE.Line(geo,mat);
  line.position.set((Math.random()-.5)*38,(Math.random()-.5)*25,-8+Math.random()*70);
  line.rotation.z=(Math.random()-.5)*.35;
  line.userData={speed:.08+Math.random()*.28,baseLen:len};
  streakGroup.add(line);
}

// Perspective warp portals behind the content. They slowly rotate and pulse as the user scrolls.
const portalGroup=new THREE.Group();scene.add(portalGroup);
for(let i=0;i<7;i++){
  const ring=new THREE.Mesh(
    new THREE.TorusGeometry(5.8+i*1.8,.012+i*.004,10,100),
    new THREE.MeshBasicMaterial({color:i%2?0x8b5cf6:0x22d3ee,transparent:true,opacity:.10-i*.008,depthWrite:false})
  );
  ring.position.z=18+i*8;
  ring.rotation.x=Math.PI/2+(Math.random()-.5)*.6;
  ring.rotation.y=(Math.random()-.5)*.4;
  ring.userData={speed:.0007+i*.00015,phase:i*.7};
  portalGroup.add(ring);
}

// Soft 3D nebula volumes add depth without covering the HUD/text.
const nebulaGroup=new THREE.Group();scene.add(nebulaGroup);
for(let i=0;i<9;i++){
  const neb=new THREE.Mesh(
    new THREE.SphereGeometry(1.2+Math.random()*2.5,16,16),
    new THREE.MeshBasicMaterial({color:[0x22d3ee,0x8b5cf6,0xec4899][i%3],transparent:true,opacity:.018+Math.random()*.018,depthWrite:false,blending:THREE.AdditiveBlending})
  );
  neb.position.set((Math.random()-.5)*30,(Math.random()-.5)*20,5+Math.random()*45);
  neb.scale.set(2.5+Math.random()*4,1+Math.random()*2,1.5+Math.random()*3);
  nebulaGroup.add(neb);
}

// ==================== VIDEO-REFERENCE FIELD EFFECTS ====================
// The supplied reference video changes the background mood by sector: a diagonal
// particle stream in the opening, a network/orbital field around Projects, a
// radial hyperspace tunnel for Education, and a flowing mesh for Contact.
// These are procedural WebGL effects so Meghana's page gets the same visual idea
// without embedding the reference person's video/content.
const warpField=new THREE.Group(); scene.add(warpField);
const warpLines=[];
for(let i=0;i<150;i++){
  const a=Math.random()*Math.PI*2;
  const r=.8+Math.random()*17;
  const z=-8+Math.random()*58;
  const len=.6+Math.random()*4.8;
  const x=Math.cos(a)*r, y=Math.sin(a)*r*.58;
  const dir=new THREE.Vector3(x,y,0).normalize();
  const p1=new THREE.Vector3(x-dir.x*len,y-dir.y*len,z);
  const p2=new THREE.Vector3(x+dir.x*len,y+dir.y*len,z);
  const g=new THREE.BufferGeometry().setFromPoints([p1,p2]);
  const col=i%4===0?0xec4899:(i%4===1?0x8b5cf6:0x67e8f9);
  const line=new THREE.Line(g,new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.0,depthWrite:false,blending:THREE.AdditiveBlending}));
  line.userData={speed:.08+Math.random()*.25,baseOpacity:.14+Math.random()*.38};
  warpField.add(line); warpLines.push(line);
}

const waveField=new THREE.Group(); scene.add(waveField);
const waveLines=[];
const waveRows=14, waveCols=34;
for(let row=0;row<waveRows;row++){
  const pts=[];
  const y=(row/(waveRows-1)-.5)*8;
  for(let col=0;col<waveCols;col++){
    const x=(col/(waveCols-1)-.5)*18;
    const z=(row/(waveRows-1)-.5)*5;
    pts.push(new THREE.Vector3(x,y,z));
  }
  const g=new THREE.BufferGeometry().setFromPoints(pts);
  const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:row%3===0?0x22d3ee:0x8b5cf6,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));
  l.userData={row}; waveField.add(l); waveLines.push(l);
}
for(let col=0;col<waveCols;col++){
  const pts=[];
  const x=(col/(waveCols-1)-.5)*18;
  for(let row=0;row<waveRows;row++){
    const y=(row/(waveRows-1)-.5)*8; const z=(row/(waveRows-1)-.5)*5;
    pts.push(new THREE.Vector3(x,y,z));
  }
  const g=new THREE.BufferGeometry().setFromPoints(pts);
  const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:0x67e8f9,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));
  l.userData={col}; waveField.add(l); waveLines.push(l);
}

let fieldMode=0;

let targetX=0,targetY=0;addEventListener('pointermove',e=>{targetX=(e.clientX/innerWidth-.5)*1.4;targetY=(e.clientY/innerHeight-.5)*1.0},{passive:true});
let audioCtx=null,osc=null;$('#audio-btn')?.addEventListener('click',()=>{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();osc=audioCtx.createOscillator();const gain=audioCtx.createGain();osc.type='sine';osc.frequency.value=55;gain.gain.value=.018;osc.connect(gain).connect(audioCtx.destination);osc.start();$('#audio-btn').textContent='AUDIO ON'}else if(audioCtx.state==='running'){audioCtx.suspend();$('#audio-btn').textContent='AUDIO OFF'}else{audioCtx.resume();$('#audio-btn').textContent='AUDIO ON'}});
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}addEventListener('resize',resize);
let t=0;function animate(){requestAnimationFrame(animate);t+=.008*warp;world.rotation.y+=(targetX*.18+scrollP*2.4-world.rotation.y)*.035;world.rotation.x+=(targetY*.12-scrollP*.75-world.rotation.x)*.035;core.rotation.x+=.0025*warp;core.rotation.y+=.004*warp;wire.rotation.x-=.0018*warp;wire.rotation.y+=.0028*warp;r1.rotation.z+=.004*warp;r2.rotation.x-=.003*warp;r3.rotation.y+=.002*warp;orbitGroup.rotation.y+=.0025*warp;planetMeshes.forEach((o,i)=>{o.pivot.rotation.y+=.004*(i+1)*warp;o.p.rotation.y+=.01*warp});far.rotation.y+=.00012*warp;near.rotation.y-=.00025*warp;dust.rotation.y+=.0007*warp;
flyers.forEach((m,i)=>{m.position.z-=m.userData.speed*warp;if(m.position.z<-10){m.position.z=58+Math.random()*24;m.position.x=(Math.random()-.5)*34;m.position.y=(Math.random()-.5)*23}m.rotation.x+=m.userData.spin*warp;m.rotation.y+=m.userData.spin*.8*warp;m.position.x+=Math.sin(t+m.userData.seed)*.0018;m.position.y+=Math.cos(t*.8+m.userData.seed)*.001;});
streakGroup.children.forEach(s=>{s.position.z-=s.userData.speed*warp;if(s.position.z<-12){s.position.z=58+Math.random()*26;s.position.x=(Math.random()-.5)*38;s.position.y=(Math.random()-.5)*25}s.scale.y=1+warp*.65;});
portalGroup.children.forEach((r,i)=>{r.rotation.z+=r.userData.speed*warp;r.material.opacity=.055+.025*Math.sin(t*1.2+r.userData.phase);r.scale.setScalar(1+Math.sin(t*.8+r.userData.phase)*.035+scrollP*.08);});
nebulaGroup.children.forEach((n,i)=>{n.rotation.y+=.0005*(i+1)*warp;n.position.x+=Math.sin(t*.12+i)*.0007;});

// Sector-aware background choreography inspired by the supplied video.
const ribbonTarget=fieldMode<=1?(.72):(fieldMode===2?.10:.025);
ribbonMat.opacity+=(ribbonTarget-ribbonMat.opacity)*.045;
const networkTarget=fieldMode===2?.34:(fieldMode===3?.10:.16);
networkLines.material.opacity+=(networkTarget-networkLines.material.opacity)*.045;
networkViolet.material.opacity+=(networkTarget*.42-networkViolet.material.opacity)*.045;
const warpTarget=fieldMode===3?.62:(fieldMode===2?.08:0);
warpLines.forEach((line,i)=>{line.material.opacity+=(warpTarget*line.userData.baseOpacity-line.material.opacity)*.055;line.position.z-=line.userData.speed*warp;if(line.position.z<-12)line.position.z=48+Math.random()*18;});
const waveTarget=fieldMode>=4?.36:0;
waveLines.forEach((line,i)=>{line.material.opacity+=(waveTarget-line.material.opacity)*.05;const pos=line.geometry.attributes.position;for(let j=0;j<pos.count;j++){const x=pos.getX(j), y=pos.getY(j);pos.setZ(j,Math.sin(x*.65+t*1.25+y*.72)*.55+Math.cos(y*.55-t*.7)*.28);}pos.needsUpdate=true;});
// The diagonal particle stream is the hero background movement from the supplied video.
ribbonGroup.position.x=Math.sin(t*.10)*.35;
ribbonGroup.position.y=Math.cos(t*.08)*.14;
ribbonGroup.rotation.z=-.015+Math.sin(t*.07)*.008;
updateRibbonStreams(t);
streamGlow.position.x=2.0+Math.sin(t*.22)*.7; streamGlow.position.y=-.15+Math.cos(t*.18)*.25;
streamGlow.material.opacity=.075+.025*Math.sin(t*.9);
networkGroup.rotation.y+=.0009*warp;networkGroup.rotation.z=Math.sin(t*.18)*.025;
planetaryBackdrop.rotation.y += .0018*warp;
planetCore.rotation.y += .0028*warp;
planetCore.rotation.x += .0007*warp;
planetWire.rotation.y -= .0019*warp;
planetRim.rotation.z += .0022*warp;
waveGroup.rotation.y += .0016*warp;
waveGroup.rotation.z = -.12 + Math.sin(t*.32)*.035;
backdropNetwork.rotation.y = Math.sin(t*.35)*.12;
backdropNetwork.rotation.x = Math.sin(t*.22)*.045;
backdropOrbits.forEach((o,i)=>{
  o.pivot.rotation.y += o.speed*warp;
  o.pivot.rotation.z += o.speed*.55*warp;
});
if(projectStage){projectStage.g.rotation.y+=.0026*warp;projectStage.g.rotation.x+=(targetY*.035-projectStage.g.rotation.x)*.02;projectStage.orb.rotation.x+=.0018*warp;projectStage.orb.rotation.y+=.0032*warp;projectStage.wire2.rotation.x-=.0014*warp;projectStage.wire2.rotation.y+=.0023*warp;projectStage.wirePurple.rotation.z+=.0011*warp;projectStage.rings.forEach((q,i)=>{q.rotation.x+=.0007*(i+1)*warp;q.rotation.z-=.001*(i+1)*warp});projectStage.ps.forEach((o,i)=>{o.pivot.rotation.y+=.004*(i+1)*warp;o.m.rotation.y+=.01*warp});projectStage.network.rotation.y+=.0012*warp;projectStage.network.rotation.z=Math.sin(t*.25)*.025;projectStage.dust.rotation.y+=.0008*warp;projectStage.data.forEach((d,i)=>{const pulse=d.sc*(.72+.28*Math.sin(t*.9+d.phase));projectStage.dmy.position.set(d.x+Math.sin(t*.25+d.phase)*.035,d.y+Math.cos(t*.22+d.phase)*.035,d.z);projectStage.dmy.scale.setScalar(pulse);projectStage.dmy.rotation.set(t*.18+d.phase,t*.25+d.phase*.7,t*.15+d.phase);projectStage.dmy.updateMatrix();projectStage.mesh.setMatrixAt(i,projectStage.dmy.matrix)});projectStage.mesh.instanceMatrix.needsUpdate=true;projectStage.ribbon.rotation.y=Math.sin(t*.12)*.03;projectStage.c.position.x+=(targetX*.22-projectStage.c.position.x)*.03;projectStage.c.position.y+=(-targetY*.12-projectStage.c.position.y)*.03;projectStage.r.render(projectStage.s,projectStage.c);}
camera.position.x+=(targetX*1.1-camera.position.x)*.025;camera.position.y+=(-targetY*.7-camera.position.y)*.025;camera.position.z+=(15-scrollP*4.5+Math.sin(scrollP*Math.PI)*1.2-camera.position.z)*.035;renderer.render(scene,camera)}animate();
})();
