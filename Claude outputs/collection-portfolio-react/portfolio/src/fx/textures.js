// Loads every post image once as a Three.js texture (shared by both WebGL scenes).
import * as THREE from 'three';
import { img } from '../lib/img.js';
import { ALL } from '../data/content.js';

let cache;
export function loadPostTextures() {
  if (cache) return cache;
  const loader = new THREE.TextureLoader();
  cache = Promise.all(
    ALL.map(
      (k) =>
        new Promise((res) =>
          loader.load(img(k), (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 4;
            res(t);
          }, undefined, () => res(null))
        )
    )
  ).then((list) => list.filter(Boolean));
  return cache;
}

// Shader used by every post plane: bends with scroll velocity, splits RGB,
// fades into the ink background with depth.
export const postVertex = /* glsl */ `
  uniform float uTime;
  uniform float uVel;
  uniform float uBend;
  varying vec2 vUv;
  varying float vDepth;
  varying float vFacing;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(uv.x * 3.14159) * uVel * uBend;
    p.z += wave + sin(uTime * 1.6 + position.x * 1.5 + position.y) * 0.04;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vec3 n = normalize(normalMatrix * normal);
    vFacing = dot(n, normalize(-mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

export const postFragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uVel;
  uniform float uNear;
  uniform float uFar;
  uniform float uAlpha;
  uniform vec3 uFog;
  uniform float uBack;
  varying vec2 vUv;
  varying float vDepth;
  varying float vFacing;
  void main() {
    vec2 uv = vUv;
    if (vFacing < 0.0) uv.x = 1.0 - uv.x;
    float shift = 0.004 + abs(uVel) * 0.035;
    vec4 c;
    c.r = texture2D(uTex, uv + vec2(shift, 0.0)).r;
    c.g = texture2D(uTex, uv).g;
    c.b = texture2D(uTex, uv - vec2(shift, 0.0)).b;
    c.a = 1.0;
    // rounded corners
    vec2 q = abs(uv - 0.5) - (0.5 - 0.03);
    float r = length(max(q, 0.0)) - 0.03;
    if (r > 0.0) discard;
    float fog = smoothstep(uNear, uFar, vDepth);
    vec3 col = mix(c.rgb, uFog, fog);
    if (vFacing < 0.0) col = mix(col, uFog, uBack);
    gl_FragColor = vec4(col, uAlpha);
    #include <colorspace_fragment>
  }
`;
