import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { Product } from '../types/index.ts';

interface Device3DViewerProps {
  product?: Product;
  deviceType?: 'smartphone' | 'laptop' | 'tv' | 'headphones';
}

export const Device3DViewer: React.FC<Device3DViewerProps> = ({
  product,
  deviceType = 'smartphone',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#1e2430');
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const mainGroupRef = useRef<THREE.Group | null>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const chipsGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const colors = [
    { name: 'Natural Titanium', hex: '#1e2430' },
    { name: 'Electric Blue', hex: '#1d4ed8' },
    { name: 'Cyber Purple', hex: '#6d28d9' },
    { name: 'Silver Frost', hex: '#cbd5e1' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Dark Futuristic Lights: Pure White Key + Electric Blue Fill + Cyber Purple Rim + Cyan Point
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(4, 6, 4);
    scene.add(dirLight1);

    const blueFillLight = new THREE.PointLight(0x2563eb, 3.0, 14);
    blueFillLight.position.set(-4, -1, 3);
    scene.add(blueFillLight);

    const purpleRimLight = new THREE.PointLight(0x7c3aed, 2.8, 12);
    purpleRimLight.position.set(2, 5, -3);
    scene.add(purpleRimLight);

    const cyanAccentLight = new THREE.PointLight(0x06b6d4, 2.2, 10);
    cyanAccentLight.position.set(0, -3, 2);
    scene.add(cyanAccentLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Body chassis with metallic finish
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor),
      metalness: 0.88,
      roughness: 0.2,
    });
    const bodyGeo = new THREE.BoxGeometry(1.2, 2.3, 0.12);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    mainGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // High res OLED Screen with Electric Blue / Cyber Purple wallpaper
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 1024;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#07111F';
      ctx.fillRect(0, 0, 512, 1024);

      // Deep Blue to Purple futuristic radial glow
      const rad = ctx.createRadialGradient(256, 450, 10, 256, 450, 320);
      rad.addColorStop(0, '#2563eb');
      rad.addColorStop(0.4, '#7c3aed');
      rad.addColorStop(0.8, '#06b6d4');
      rad.addColorStop(1, '#07111f');
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(256, 450, 280, 0, Math.PI * 2);
      ctx.fill();

      // Top notch / dynamic island
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(196, 36, 120, 32, 16);
      ctx.fill();

      // Product Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(product?.name || 'ElectroPulse Pro 3D', 256, 300);

      // Neon Cyan Specification Badges
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('120Hz ProMotion HDR OLED', 256, 350);

      ctx.fillStyle = '#a7b4c7';
      ctx.font = '20px monospace';
      ctx.fillText('3nm Flagship Silicon • AI Engine', 256, 395);
    }
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.14, 2.22), screenMat);
    screenMesh.position.set(0, 0, 0.062);
    mainGroup.add(screenMesh);
    screenMeshRef.current = screenMesh;

    // Triple Camera lenses on back
    const bumpMat = new THREE.MeshStandardMaterial({ color: 0x0d1b2a, metalness: 0.7, roughness: 0.2 });
    const bump = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.6, 0.05), bumpMat);
    bump.position.set(-0.25, 0.75, -0.065);
    mainGroup.add(bump);

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 })
      );
      ring.rotation.x = Math.PI / 2;
      const ox = i === 2 ? -0.15 : i === 0 ? -0.35 : -0.15;
      const oy = i === 2 ? 0.75 : i === 0 ? 0.9 : 0.6;
      ring.position.set(ox, oy, -0.09);
      mainGroup.add(ring);
    }

    // Exploded View Internal Layers (Silicon Chip, Vapor Chamber, Battery)
    const chipsGroup = new THREE.Group();
    chipsGroup.position.set(0, 0, 0);
    chipsGroup.visible = false;
    chipsGroupRef.current = chipsGroup;
    mainGroup.add(chipsGroup);

    // Copper / Graphite vapor chamber plate
    const copperMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.9, roughness: 0.2 });
    const vaporChamber = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.02), copperMat);
    vaporChamber.position.set(0, 0, 0.2);
    chipsGroup.add(vaporChamber);

    // Flagship Processor Die
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x111f33, metalness: 0.85, roughness: 0.2 });
    const procChip = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.04), chipMat);
    procChip.position.set(0, 0.4, 0.3);
    chipsGroup.add(procChip);

    // Cyber Purple core center
    const purpleCore = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x7c3aed, metalness: 0.9, roughness: 0.1 })
    );
    purpleCore.position.set(0, 0.4, 0.32);
    chipsGroup.add(purpleCore);

    // Drag interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging && mainGroupRef.current) {
        const dx = (e.clientX - prevX) * 0.008;
        const dy = (e.clientY - prevY) * 0.008;
        mainGroupRef.current.rotation.y += dx;
        mainGroupRef.current.rotation.x = THREE.MathUtils.clamp(
          mainGroupRef.current.rotation.x + dy,
          -0.6,
          0.6
        );
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (isRotating && !isDragging && mainGroupRef.current) {
        mainGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Color
  useEffect(() => {
    if (bodyMeshRef.current) {
      (bodyMeshRef.current.material as THREE.MeshStandardMaterial).color.set(selectedColor);
    }
  }, [selectedColor]);

  // Update Exploded View
  useEffect(() => {
    if (chipsGroupRef.current && screenMeshRef.current && bodyMeshRef.current) {
      chipsGroupRef.current.visible = explodedView;
      if (explodedView) {
        screenMeshRef.current.position.z = 0.55;
        bodyMeshRef.current.position.z = -0.3;
      } else {
        screenMeshRef.current.position.z = 0.062;
        bodyMeshRef.current.position.z = 0;
      }
    }
  }, [explodedView]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#07111F] via-[#0D1B2A] to-[#111F33] border border-[#2563EB]/40 p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(37,99,235,0.25),0_0_50px_rgba(124,58,237,0.2)] relative overflow-hidden backdrop-blur-md">
      {/* Ambient Blue and Purple glow circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 z-10">
        <div>
          <span className="text-[11px] font-mono text-[#06B6D4] uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
            360° Interactive 3D Model
          </span>
          <h3 className="font-display text-lg font-bold text-white tracking-tight">
            {product?.name || 'Flagship Hardware Viewer'}
          </h3>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExplodedView(!explodedView)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              explodedView
                ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/30'
                : 'bg-[#111F33] hover:bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/30'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{explodedView ? 'Chassis Assembly' : 'Explode Architecture'}</span>
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl text-xs transition-colors border ${
              isRotating
                ? 'bg-[#2563EB]/20 text-[#06B6D4] border-[#2563EB]/40'
                : 'bg-[#111F33] text-[#A7B4C7] border-[#2563EB]/20 hover:text-white'
            }`}
            title="Auto Rotate"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount with Blue/Purple Halo */}
      <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center my-2">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
        <div className="absolute inset-x-12 inset-y-16 rounded-full bg-gradient-to-r from-[#2563EB]/15 via-[#7C3AED]/15 to-[#06B6D4]/15 blur-2xl pointer-events-none" />
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#A7B4C7] bg-[#07111F]/80 px-2.5 py-1 rounded-full border border-[#2563EB]/30 pointer-events-none">
          Click & Drag to Rotate in 3D
        </div>
      </div>

      {/* Color Customizer and Hardware Features */}
      <div className="pt-4 border-t border-[#2563EB]/20 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-xs font-semibold text-[#A7B4C7]">Finish:</span>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === c.hex ? 'border-[#06B6D4] scale-110 shadow-lg shadow-[#06B6D4]/40' : 'border-[#2563EB]/30'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#A7B4C7]">
          <span className="flex items-center gap-1 text-[#06B6D4]">
            <CheckCircle className="w-3.5 h-3.5 text-[#06B6D4]" />
            OLED 120Hz ProMotion
          </span>
          <span className="flex items-center gap-1 text-[#7C3AED]">
            <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
            3nm Silicon Engine
          </span>
        </div>
      </div>
    </div>
  );
};
