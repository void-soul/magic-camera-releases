/**
 * three.js 渲染探针 —— 用于在**真机/云真机**上回答一个问题:
 * "three.js 的渲染结果能不能在 HarmonyOS 的 ArkWeb 里上屏?"
 *
 * 设计成"一眼可判"的形式:
 *   - 画布**不透明**(深蓝底) + 一个橙色立方体 —— 只要画面出现深蓝底与橙盒,就是通过;
 *   - HUD 同时显示 WebGL 版本 / GPU / fps / tris / calls / glErr,便于描述失败形态。
 * 刻意不用任何模型与外部资源(零授权风险,也排除资源加载失败这一干扰因素)。
 */
import * as THREE from 'three';

const $ = (id) => document.getElementById(id);
const set = (k, v, ok) => {
  const e = $('st-' + k);
  if (!e) return;
  e.textContent = String(v);
  if (ok === true) e.className = 'v ok';
  if (ok === false) e.className = 'v bad';
};

window.addEventListener('error', (e) => {
  set('err', 'JS: ' + (e && e.message ? e.message : e), false);
});

const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
renderer.setPixelRatio(1);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101040);   // 不透明:底色本身就说明"画布在合成"
const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
cam.position.z = 4;

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 1.6, 1.6),
  new THREE.MeshBasicMaterial({ color: 0xff8800 })
);
scene.add(box);

// WebGL 环境信息
const gl = renderer.getContext();
const isV2 = renderer.capabilities.isWebGL2;
set('ver', (isV2 ? 'WebGL2' : 'WebGL1(回退)') + ' · ' + gl.getParameter(gl.VERSION), isV2);
try {
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  set('gpu', dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '(no debug ext)');
} catch (e) {
  set('gpu', 'unknown');
}
set('ua', navigator.userAgent);

function resize() {
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  renderer.setSize(w, h, false);
  cam.aspect = w / h;
  cam.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

let frames = 0;
let last = performance.now();
(function loop() {
  requestAnimationFrame(loop);
  const now = performance.now();
  frames++;
  if (now - last >= 1000) {
    set('fps', Math.round((frames * 1000) / (now - last)) + ' fps', true);
    set('draw', 'tris=' + renderer.info.render.triangles + ' calls=' + renderer.info.render.calls,
      renderer.info.render.calls > 0);
    set('glerr', 'glErr=' + gl.getError());
    frames = 0;
    last = now;
    resize();
  }
  box.rotation.x += 0.010;
  box.rotation.y += 0.013;
  renderer.render(scene, cam);
})();
