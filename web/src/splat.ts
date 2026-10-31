   
                                                                            
                                                
  
                                                                           
                                                                         
                   
  
                                                                               
                                                                             
  
                                                                                   
                                                                                
                                                                             
   

import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import type { NavData } from './artifacts';

export interface SplatOptions {
                                                                
  alphaThreshold?: number;
                                                                                      
  maxScreenSpaceSplatSize?: number;
}

export interface SplatHit {
  point: THREE.Vector3;
  normal: THREE.Vector3;
  distance: number;
}

interface RawSplatHit {
  origin: THREE.Vector3;
  normal: THREE.Vector3;
  distance: number;
}

interface ViewerRaycaster {
  ray: { origin: THREE.Vector3; direction: THREE.Vector3 };
  intersectSplatMesh(mesh: unknown, out?: RawSplatHit[]): void;
}

export class SplatLayer {
  loaded = false;
  gaussianCount = 0;

  private viewer: GaussianSplats3D.Viewer;
  private options: Required<SplatOptions>;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera,
              options: SplatOptions = {}) {
    this.options = {
      alphaThreshold: options.alphaThreshold ?? 40,
      maxScreenSpaceSplatSize: options.maxScreenSpaceSplatSize ?? 1024,
    };
    this.viewer = new GaussianSplats3D.Viewer({
      threeScene: scene,
      selfDrivenMode: false,
      renderer,
      camera,
      useBuiltInControls: false,
                                                                          
                                                                            
      sharedMemoryForWorkers: false,
      gpuAcceleratedSort: false,
      sphericalHarmonicsDegree: 0,
      sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
      logLevel: GaussianSplats3D.LogLevel.None,
      focalAdjustment: 1.0,
      maxScreenSpaceSplatSize: this.options.maxScreenSpaceSplatSize,
    });
  }

  static placementMatrix(nav: NavData): THREE.Matrix4 | null {
    const a = nav.align;
    if (!a || !a.R_row_major) return null;
                                                                              
    const R = new THREE.Matrix3().fromArray(a.R_row_major.flat() as number[]).transpose();
    const Rt = R.clone().transpose();
    const A = new THREE.Matrix3().set(1, 0, 0, 0, 0, 1, 0, -1, 0);
    const M3 = A.multiply(Rt).multiplyScalar(a.scale_m_per_unit);               
    const M = new THREE.Matrix4().setFromMatrix3(M3);
    const origin = new THREE.Vector3(a.origin[0], a.origin[1], a.origin[2]);
    M.setPosition(origin.clone().applyMatrix3(M3).multiplyScalar(-1));
    return M;
  }

  async load(url: string, nav: NavData): Promise<void> {
    const m = SplatLayer.placementMatrix(nav);
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    if (m) m.decompose(position, rotation, scale);

                                                                   
                                                                              
                                                                               
                                                                              
                                                                               
                                                                             
    const res = await fetch(url);
    if (!res.ok) throw new Error(`splat fetch failed: ${res.status} ${res.statusText}`);
    const bytes = await res.arrayBuffer();
    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));

    try {
                                                                                
                                                                              
      await withTimeout(
        this.viewer.addSplatScene(blobUrl, {
          format: GaussianSplats3D.SceneFormat.Splat,                                
          showLoadingUI: false,
          splatAlphaRemovalThreshold: this.options.alphaThreshold,
          position: position.toArray(),
          rotation: rotation.toArray(),        
          scale: scale.toArray(),
        }) as unknown as Promise<void>,
        180_000,
        'splat build timed out',
      );
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
    this.loaded = true;
  }

     
                                                                              
                                                                              
                                                     
     
  raycastRay(origin: THREE.Vector3, direction: THREE.Vector3): SplatHit | null {
    if (!this.loaded) return null;
    const view = this.viewer as unknown as { raycaster?: ViewerRaycaster; splatMesh?: unknown };
    if (!view.raycaster || !view.splatMesh) return null;
    try {
      view.raycaster.ray.origin.copy(origin);
      view.raycaster.ray.direction.copy(direction).normalize();
      const hits: RawSplatHit[] = [];
      view.raycaster.intersectSplatMesh(view.splatMesh, hits);
      let hit: RawSplatHit | null = null;
      for (const h of hits) {
        if (h.distance < 0) continue;
        if (!hit || h.distance < hit.distance) hit = h;
      }
      if (!hit) return null;
      return {
        point: hit.origin.clone(),
        normal: hit.normal.clone(),
        distance: hit.distance,
      };
    } catch {
      return null;
    }
  }

  update(): void {
    this.viewer.update();
  }

  render(): void {
    this.viewer.render();
  }
}

                                                                                            
function withTimeout<T>(p: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    p.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}
