import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  Smartphone,
  Laptop,
  Shirt,
  Headphones as HeadphonesIcon,
  Home as HomeIcon,
  ShoppingBag,
  Cpu,
  Layers,
  Zap,
  Tag,
  CheckCircle,
  SkipForward,
  ExternalLink,
} from 'lucide-react';
import { navigateTo } from '../lib/router.ts';

type ActiveDevice = 'all' | 'phone' | 'laptop' | 'shoes' | 'headphones' | 'home' | 'beauty';

interface HeroSpecBadge {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  device: string;
  pos3D: [number, number, number];
  screenPos?: { x: number; y: number; visible: boolean };
}

interface FloatingProductCard {
  id: string;
  name: string;
  price: string;
  category: string;
  slug: string;
  pos3D: [number, number, number];
  screenPos?: { x: number; y: number; visible: boolean };
}

export const Electronics3DHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDevice, setActiveDevice] = useState<ActiveDevice>('all');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Cinematic Sequence State
  const [sequenceStage, setSequenceStage] = useState<number>(7);
  const [isCinematicPlaying, setIsCinematicPlaying] = useState<boolean>(false);

  // Floating Specification Badges
  const [badges, setBadges] = useState<HeroSpecBadge[]>([
    {
      id: 'spec-phone',
      title: 'A18 Pro / 3nm Silicon',
      subtitle: '6-Core GPU Ray-Tracing • ProMotion',
      tag: 'SMARTPHONE',
      device: 'Electronics',
      pos3D: [-1.8, 1.3, 0.4],
    },
    {
      id: 'spec-laptop',
      title: 'Apple M4 Max & RTX 4090',
      subtitle: '64GB Unified RAM • 240Hz Mini-LED',
      tag: 'COMPUTING',
      device: 'Pro Laptop',
      pos3D: [-0.2, 0.9, 0.7],
    },
    {
      id: 'spec-shoes',
      title: 'Nike Air Cyber Pulse 3D',
      subtitle: 'Responsive Air Soles • Flyknit Mesh',
      tag: 'FASHION',
      device: 'Footwear',
      pos3D: [1.4, -0.2, 0.5],
    },
    {
      id: 'spec-headphones',
      title: 'Hi-Res Spatial ANC Audio',
      subtitle: '40mm Neodymium Drivers • 40h Battery',
      tag: 'AUDIO',
      device: 'Headphones',
      pos3D: [0.1, 1.4, -0.2],
    },
    {
      id: 'spec-home',
      title: 'Smart Luminaire Ambient Hub',
      subtitle: '16M RGB Circadian • Alexa & HomeKit',
      tag: 'HOME & KITCHEN',
      device: 'Smart Home',
      pos3D: [2.2, 0.8, -0.6],
    },
    {
      id: 'spec-beauty',
      title: 'Dior Sauvage Elixir Parfum',
      subtitle: 'Concentrated French Spices & Woods',
      tag: 'BEAUTY',
      device: 'Luxury Perfume',
      pos3D: [-1.1, 1.2, -0.4],
    },
  ]);

  // Floating Product Cards with Direct Navigation
  const [floatingCards, setFloatingCards] = useState<FloatingProductCard[]>([
    {
      id: 'card-1',
      name: 'iPhone 16 Pro Max',
      price: '₹1,44,900',
      category: 'Electronics',
      slug: 'apple-iphone-16-pro-max',
      pos3D: [-2.2, -0.7, 0.5],
    },
    {
      id: 'card-2',
      name: 'Nike Air Cyber Pulse',
      price: '₹12,995',
      category: 'Fashion',
      slug: 'nike-air-cyber-pulse-3d-sneaker',
      pos3D: [1.8, -0.9, 0.4],
    },
    {
      id: 'card-3',
      name: 'Nordic Smart Lamp',
      price: '₹6,499',
      category: 'Home',
      slug: 'nordic-minimalist-smart-ambient-table-lamp',
      pos3D: [2.4, 1.5, -0.5],
    },
    {
      id: 'card-4',
      name: 'Dior Sauvage Elixir',
      price: '₹16,500',
      category: 'Beauty',
      slug: 'dior-sauvage-elixir-eau-de-parfum-100ml',
      pos3D: [-1.4, -1.1, -0.2],
    },
  ]);

  // Three.js object references
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 6.2));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const mainGroupRef = useRef<THREE.Group | null>(null);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const laptopGroupRef = useRef<THREE.Group | null>(null);
  const shoeGroupRef = useRef<THREE.Group | null>(null);
  const headphonesGroupRef = useRef<THREE.Group | null>(null);
  const homeGroupRef = useRef<THREE.Group | null>(null);
  const beautyGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 6.2);
    cameraRef.current = camera;

    // 3. Renderer with high performance & antialias
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Dark Futuristic Lighting Setup (Electric Blue, Cyber Purple, Neon Cyan)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const cyanFillLight = new THREE.PointLight(0x06b6d4, 2.8, 14);
    cyanFillLight.position.set(-4, 2, 4);
    scene.add(cyanFillLight);

    const bluePrimaryLight = new THREE.PointLight(0x2563eb, 3.5, 14);
    bluePrimaryLight.position.set(4, -1, 3);
    scene.add(bluePrimaryLight);

    const purpleRimLight = new THREE.PointLight(0x7c3aed, 3.0, 12);
    purpleRimLight.position.set(0, 5, -3);
    scene.add(purpleRimLight);

    // Master container for all 3D products
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    materialsRef.current = [];
    const regMat = <T extends THREE.Material>(mat: T): T => {
      materialsRef.current.push(mat);
      return mat;
    };

    // Shared high-grade materials
    const titaniumMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x1e2430,
        metalness: 0.88,
        roughness: 0.2,
      })
    );
    const goldMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const darkGlossMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x07111f,
        metalness: 0.6,
        roughness: 0.1,
      })
    );
    const cyberBlueMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.2,
      })
    );
    const cyberPurpleMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.2,
      })
    );
    const glassMat = regMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.9,
      })
    );

    // ==========================================
    // A. 3D FLOATING PARTICLES
    // ==========================================
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#2563eb'), // Blue
      new THREE.Color('#7c3aed'), // Purple
      new THREE.Color('#10b981'), // Emerald
      new THREE.Color('#f59e0b'), // Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 5.0;
      const angle = Math.random() * Math.PI * 2;
      const heightVal = (Math.random() - 0.5) * 4.5;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = heightVal;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = regMat(
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
    );

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // ==========================================
    // B. 3D SMARTPHONE (Electronics)
    // ==========================================
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(-1.8, 0, 0.4);
    phoneGroup.rotation.set(0, -0.25, 0.05);
    phoneGroupRef.current = phoneGroup;
    mainGroup.add(phoneGroup);

    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.05, 0.09), titaniumMat);
    phoneGroup.add(phoneBody);

    // Glowing OLED Screen
    const phoneCanvas = document.createElement('canvas');
    phoneCanvas.width = 512;
    phoneCanvas.height = 1024;
    const phoneCtx = phoneCanvas.getContext('2d');
    if (phoneCtx) {
      phoneCtx.fillStyle = '#07111F';
      phoneCtx.fillRect(0, 0, 512, 1024);

      const rad = phoneCtx.createRadialGradient(256, 450, 10, 256, 450, 280);
      rad.addColorStop(0, '#2563eb');
      rad.addColorStop(0.4, '#7c3aed');
      rad.addColorStop(1, '#07111f');
      phoneCtx.fillStyle = rad;
      phoneCtx.beginPath();
      phoneCtx.arc(256, 450, 260, 0, Math.PI * 2);
      phoneCtx.fill();

      phoneCtx.fillStyle = '#ffffff';
      phoneCtx.font = 'bold 64px sans-serif';
      phoneCtx.textAlign = 'center';
      phoneCtx.fillText('09:41', 256, 210);

      phoneCtx.font = 'bold 22px monospace';
      phoneCtx.fillStyle = '#06b6d4';
      phoneCtx.fillText('120Hz ProMotion • 3nm', 256, 270);
    }
    const phoneScreenTex = new THREE.CanvasTexture(phoneCanvas);
    const phoneScreenMat = regMat(new THREE.MeshBasicMaterial({ map: phoneScreenTex }));
    const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 1.94), phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.047);
    phoneGroup.add(phoneScreen);

    // Triple Camera Ring
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.02, 24),
        cyberBlueMat
      );
      ring.rotation.x = Math.PI / 2;
      const ox = i === 2 ? -0.1 : i === 0 ? -0.28 : -0.12;
      const oy = i === 2 ? 0.65 : i === 0 ? 0.78 : 0.52;
      ring.position.set(ox, oy, -0.06);
      phoneGroup.add(ring);
    }

    // ==========================================
    // C. 3D PRO LAPTOP (Computing)
    // ==========================================
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.3, -0.3, 0.6);
    laptopGroup.rotation.set(0, 0.15, 0);
    laptopGroupRef.current = laptopGroup;
    mainGroup.add(laptopGroup);

    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 1.4), titaniumMat);
    laptopGroup.add(laptopBase);

    // Keyboard well
    const kbMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.015, 0.8), darkGlossMat);
    kbMesh.position.set(0, 0.035, -0.15);
    laptopGroup.add(kbMesh);

    // Screen Lid
    const laptopLid = new THREE.Group();
    laptopLid.position.set(0, 0.03, -0.68);
    laptopLid.rotation.x = -Math.PI / 7;
    laptopGroup.add(laptopLid);

    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.35, 0.03), titaniumMat);
    lidMesh.position.set(0, 0.68, 0);
    laptopLid.add(lidMesh);

    const lapCanvas = document.createElement('canvas');
    lapCanvas.width = 1024;
    lapCanvas.height = 640;
    const lapCtx = lapCanvas.getContext('2d');
    if (lapCtx) {
      lapCtx.fillStyle = '#07111F';
      lapCtx.fillRect(0, 0, 1024, 640);

      const lapGrad = lapCtx.createLinearGradient(0, 0, 1024, 640);
      lapGrad.addColorStop(0, '#2563eb');
      lapGrad.addColorStop(0.5, '#7c3aed');
      lapGrad.addColorStop(1, '#07111f');
      lapCtx.fillStyle = lapGrad;
      lapCtx.fillRect(0, 0, 1024, 640);

      lapCtx.fillStyle = '#ffffff';
      lapCtx.font = 'bold 44px sans-serif';
      lapCtx.textAlign = 'center';
      lapCtx.fillText('M4 Max • 16-Core Neural Engine', 512, 300);

      lapCtx.fillStyle = '#06b6d4';
      lapCtx.font = 'bold 24px monospace';
      lapCtx.fillText('Liquid Retina XDR 120Hz ProMotion', 512, 360);
    }
    const lapScreenTex = new THREE.CanvasTexture(lapCanvas);
    const lapScreenMat = regMat(new THREE.MeshBasicMaterial({ map: lapScreenTex }));
    const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.92, 1.25), lapScreenMat);
    lapScreen.position.set(0, 0.68, 0.02);
    laptopLid.add(lapScreen);

    // ==========================================
    // D. 3D CYBER SNEAKER (Shoes & Fashion)
    // ==========================================
    const shoeGroup = new THREE.Group();
    shoeGroup.position.set(1.4, -0.2, 0.5);
    shoeGroup.rotation.set(-0.15, -0.35, 0.2);
    shoeGroupRef.current = shoeGroup;
    mainGroup.add(shoeGroup);

    // Sole with Air Pocket
    const soleMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.16, 0.6),
      regMat(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }))
    );
    soleMesh.position.set(0, -0.1, 0);
    shoeGroup.add(soleMesh);

    // Glowing Air cushion insert
    const airCushion = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.5), glassMat);
    airCushion.position.set(-0.2, -0.09, 0);
    shoeGroup.add(airCushion);

    // Aerodynamic Upper
    const upperMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 0.55), cyberBlueMat);
    upperMesh.position.set(0, 0.18, 0);
    shoeGroup.add(upperMesh);

    // Heel collar
    const heelCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.4, 16), cyberPurpleMat);
    heelCollar.position.set(-0.35, 0.35, 0);
    shoeGroup.add(heelCollar);

    // Cyber Swoosh
    const swoosh = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.03, 8, 16, Math.PI * 0.8),
      goldMat
    );
    swoosh.position.set(0.05, 0.18, 0.3);
    swoosh.rotation.z = Math.PI / 4;
    shoeGroup.add(swoosh);

    // ==========================================
    // E. 3D STUDIO HEADPHONES (Audio)
    // ==========================================
    const headphonesGroup = new THREE.Group();
    headphonesGroup.position.set(0.1, 1.3, -0.2);
    headphonesGroup.rotation.set(0.2, 0.3, -0.1);
    headphonesGroupRef.current = headphonesGroup;
    mainGroup.add(headphonesGroup);

    // Arch Headband
    const headband = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.04, 16, 32, Math.PI),
      titaniumMat
    );
    headband.rotation.z = Math.PI;
    headphonesGroup.add(headband);

    // Earcups
    for (let side = -1; side <= 1; side += 2) {
      const earcup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.14, 24),
        darkGlossMat
      );
      earcup.rotation.z = Math.PI / 2;
      earcup.position.set(side * 0.58, -0.2, 0);
      headphonesGroup.add(earcup);

      // Cyber purple accent ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.02, 12, 24),
        cyberPurpleMat
      );
      ring.rotation.y = Math.PI / 2;
      ring.position.set(side * 0.58, -0.2, 0);
      headphonesGroup.add(ring);
    }

    // ==========================================
    // F. 3D SMART HOME LUMINAIRE (Home & Kitchen)
    // ==========================================
    const homeGroup = new THREE.Group();
    homeGroup.position.set(2.2, 0.7, -0.6);
    homeGroup.rotation.set(0, -0.2, 0);
    homeGroupRef.current = homeGroup;
    mainGroup.add(homeGroup);

    // Cylindrical Brushed Metallic Base
    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.45, 32),
      titaniumMat
    );
    homeGroup.add(lampBase);

    // Glowing Sphere Orb (16M colors)
    const lampOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 32, 32),
      regMat(
        new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.8,
          roughness: 0.2,
        })
      )
    );
    lampOrb.position.set(0, 0.55, 0);
    homeGroup.add(lampOrb);

    // ==========================================
    // G. 3D LUXURY PERFUME BOTTLE (Beauty & Fragrance)
    // ==========================================
    const beautyGroup = new THREE.Group();
    beautyGroup.position.set(-1.1, 1.1, -0.4);
    beautyGroup.rotation.set(0.1, 0.4, 0);
    beautyGroupRef.current = beautyGroup;
    mainGroup.add(beautyGroup);

    // Heavy Glass Bottle Body
    const bottleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.6, 24), glassMat);
    beautyGroup.add(bottleBody);

    // Internal Indigo/Gold Fragrance Fluid
    const fluidCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.52, 24),
      cyberPurpleMat
    );
    beautyGroup.add(fluidCore);

    // Golden Spray Cap
    const sprayCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.22, 24), goldMat);
    sprayCap.position.set(0, 0.4, 0);
    beautyGroup.add(sprayCap);

    // ==========================================
    // INTERACTION & ORBIT CONTROL
    // ==========================================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !mainGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      mainGroupRef.current.rotation.y += deltaX * 0.007;
      mainGroupRef.current.rotation.x += deltaY * 0.005;

      mainGroupRef.current.rotation.x = Math.max(
        -0.4,
        Math.min(0.4, mainGroupRef.current.rotation.x)
      );

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ==========================================
    // ANIMATION LOOP & 2D PROJECTION
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous ambient motions
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
      }

      if (phoneGroupRef.current) {
        phoneGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.05;
      }

      if (shoeGroupRef.current) {
        shoeGroupRef.current.position.y = -0.2 + Math.cos(elapsedTime * 1.8) * 0.04;
        shoeGroupRef.current.rotation.y += 0.004;
      }

      if (headphonesGroupRef.current) {
        headphonesGroupRef.current.position.y = 1.3 + Math.sin(elapsedTime * 1.3 + 1) * 0.04;
      }

      if (homeGroupRef.current) {
        homeGroupRef.current.position.y = 0.7 + Math.cos(elapsedTime * 1.2) * 0.03;
      }

      if (beautyGroupRef.current) {
        beautyGroupRef.current.position.y = 1.1 + Math.sin(elapsedTime * 1.4 + 2) * 0.03;
        beautyGroupRef.current.rotation.y += 0.005;
      }

      // Auto rotation
      if (isRotating && !isDragging && mainGroupRef.current) {
        mainGroupRef.current.rotation.y += 0.003;
      }

      // Smooth camera interpolation towards target
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
        currentLookAt.current.lerp(targetLookAt.current, 0.06);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Project 3D badge and card positions to 2D screen coordinates
      if (cameraRef.current && container) {
        const w = container.clientWidth || 700;
        const h = container.clientHeight || 560;

        setBadges((prevBadges) =>
          prevBadges.map((badge) => {
            const v = new THREE.Vector3(...badge.pos3D);
            v.project(cameraRef.current!);
            const isVisible = v.z < 1;
            const x = (v.x * 0.5 + 0.5) * w;
            const y = (-(v.y * 0.5) + 0.5) * h;
            return {
              ...badge,
              screenPos: { x, y, visible: isVisible },
            };
          })
        );

        setFloatingCards((prevCards) =>
          prevCards.map((card) => {
            const v = new THREE.Vector3(...card.pos3D);
            v.project(cameraRef.current!);
            const isVisible = v.z < 1;
            const x = (v.x * 0.5 + 0.5) * w;
            const y = (-(v.y * 0.5) + 0.5) * h;
            return {
              ...card,
              screenPos: { x, y, visible: isVisible },
            };
          })
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current) return;
      const w = container.clientWidth || 700;
      const h = container.clientHeight || 560;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  // Handle active camera target switcher
  useEffect(() => {
    if (!cameraRef.current) return;

    if (activeDevice === 'all') {
      targetCameraPos.current.set(0, 0.8, 6.2);
      targetLookAt.current.set(0, 0, 0);
    } else if (activeDevice === 'phone') {
      targetCameraPos.current.set(-1.8, 0.2, 3.2);
      targetLookAt.current.set(-1.8, 0, 0.4);
    } else if (activeDevice === 'laptop') {
      targetCameraPos.current.set(-0.3, 0.2, 3.4);
      targetLookAt.current.set(-0.3, 0, 0.6);
    } else if (activeDevice === 'shoes') {
      targetCameraPos.current.set(1.4, 0.1, 3.0);
      targetLookAt.current.set(1.4, -0.2, 0.5);
    } else if (activeDevice === 'headphones') {
      targetCameraPos.current.set(0.1, 1.4, 2.8);
      targetLookAt.current.set(0.1, 1.3, -0.2);
    } else if (activeDevice === 'home') {
      targetCameraPos.current.set(2.2, 0.8, 3.2);
      targetLookAt.current.set(2.2, 0.7, -0.6);
    } else if (activeDevice === 'beauty') {
      targetCameraPos.current.set(-1.1, 1.2, 2.6);
      targetLookAt.current.set(-1.1, 1.1, -0.4);
    }
  }, [activeDevice]);

  // Wireframe toggle
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as any).wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('/shop');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07111F] via-[#0D1B2A] to-[#111F33] border border-[#2563EB]/30 shadow-2xl shadow-[#2563EB]/10">
      {/* Deep Navy -> Purple -> Blue ambient glowing radial backdrop */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#2563EB]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Status Notification Strip */}
      <div className="px-6 sm:px-10 pt-4 pb-2 border-b border-[#2563EB]/20 bg-[#07111F]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
          <span className="font-mono text-[#A7B4C7] uppercase tracking-widest text-[11px]">
            INTERACTIVE 3D MEGA MALL:
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#2563EB]/20 text-[#06B6D4] font-mono font-bold text-[10px] border border-[#2563EB]/40">
            8 Departments Online
          </span>
        </div>

        {/* 3D Viewport Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              isRotating
                ? 'bg-[#2563EB]/25 text-[#06B6D4] border-[#2563EB]/50'
                : 'bg-[#111F33] text-[#A7B4C7] border-[#2563EB]/20 hover:text-white'
            }`}
            title="Toggle 3D Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Auto Orbiting' : 'Paused Orbit'}</span>
          </button>

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              isWireframe
                ? 'bg-[#7C3AED]/25 text-[#7C3AED] border-[#7C3AED]/50'
                : 'bg-[#111F33] text-[#A7B4C7] border-[#2563EB]/20 hover:text-white'
            }`}
            title="Toggle Wireframe CAD Mode"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>CAD View</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] items-center">
        {/* Left Column: Hero Text: "SHOP EVERYTHING YOU LOVE", "ALL PRODUCTS. ONE PLACE.", [ SHOP NOW ] */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-black uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
            <span>UNIVERSAL 3D SHOPPING PLATFORM</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <span className="block text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#06B6D4] uppercase">
              SHOP EVERYTHING YOU LOVE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#2563EB]">
                ALL PRODUCTS.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                ONE PLACE.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#A7B4C7] max-w-lg leading-relaxed pt-1">
              From titanium smartphones & M4 laptops to designer fashion, luxury perfumes, athletic gear, and gourmet groceries — explore with 360° interactive 3D inspection.
            </p>
          </div>

          {/* Interactive Focus Switcher: All, Phone, Laptop, Shoes, Audio, Home, Beauty */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono text-[#A7B4C7] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#06B6D4]" />
              Focus 3D Viewport:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Showcase', icon: Layers },
                { id: 'phone', label: 'Smartphone', icon: Smartphone },
                { id: 'laptop', label: 'Pro Laptop', icon: Laptop },
                { id: 'shoes', label: '3D Shoes & Fashion', icon: Shirt },
                { id: 'headphones', label: 'Headphones', icon: HeadphonesIcon },
                { id: 'home', label: 'Smart Home', icon: HomeIcon },
                { id: 'beauty', label: 'Luxury Beauty', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeDevice === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDevice(tab.id as ActiveDevice)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-[#2563EB]/40 scale-105'
                        : 'bg-[#111F33] hover:bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* [ SHOP NOW ] Button with Smooth Scroll Animation */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToCategories}
              className="px-8 py-4 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-black text-base rounded-2xl shadow-xl shadow-[#2563EB]/35 transition-all active:scale-95 flex items-center gap-3 group cursor-pointer"
            >
              <span className="tracking-wide">[ SHOP NOW ]</span>
              <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1.5 transition-transform text-[#06B6D4]" />
            </button>

            <button
              onClick={() => {
                const deals = document.getElementById('todays-deals');
                if (deals) deals.scrollIntoView({ behavior: 'smooth' });
                else navigateTo('/deals');
              }}
              className="px-6 py-4 bg-[#111F33] hover:bg-[#0D1B2A] text-white font-bold text-sm rounded-2xl border border-[#2563EB]/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Tag className="w-4 h-4 text-[#EF4444]" />
              <span>Flash Sale & Deals</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#2563EB]/20 text-[11px] font-semibold text-[#A7B4C7]">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              <span>100% Genuine Brands</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
              <span>0% No-Cost EMI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
              <span>Free Express Prime</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas + Floating Product Cards & Floating Spec Badges (6 cols) */}
        <div className="lg:col-span-6 relative h-[460px] sm:h-[520px] lg:h-[640px] w-full">
          {/* Floating Product Cards projected around the 3D scene */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {floatingCards.map((card) => {
              if (!card.screenPos || !card.screenPos.visible) return null;
              const left = Math.max(12, Math.min(card.screenPos.x - 70, 380));
              const top = Math.max(20, Math.min(card.screenPos.y - 25, 480));

              return (
                <div
                  key={card.id}
                  style={{ left: `${left}px`, top: `${top}px` }}
                  className="absolute pointer-events-auto transition-transform hover:scale-105"
                >
                  <button
                    onClick={() => navigateTo(`/product/${card.slug}`)}
                    className="p-2.5 rounded-2xl bg-[#07111F]/90 backdrop-blur-md border border-[#2563EB]/40 hover:border-[#06B6D4] shadow-xl text-left flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shrink-0 shadow">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-[#06B6D4] font-bold uppercase tracking-wider">
                        {card.category}
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#06B6D4] transition-colors leading-tight">
                        {card.name}
                      </div>
                      <div className="text-[11px] font-mono font-black text-[#22C55E] mt-0.5">
                        {card.price}
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#A7B4C7] group-hover:text-white shrink-0 ml-1" />
                  </button>
                </div>
              );
            })}

            {/* Floating Hardware Specification Badges */}
            {badges.map((b) => {
              if (!b.screenPos || !b.screenPos.visible) return null;
              const left = Math.max(15, Math.min(b.screenPos.x - 90, 360));
              const top = Math.max(30, Math.min(b.screenPos.y - 25, 470));

              return (
                <div
                  key={b.id}
                  style={{ left: `${left}px`, top: `${top}px` }}
                  className="absolute transition-all duration-300 animate-in fade-in-50"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#2563EB]/30 shadow-xl max-w-[210px]">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#06B6D4] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
                      <span>{b.tag}</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{b.title}</div>
                    <div className="text-[10px] text-[#A7B4C7] truncate">{b.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3D Canvas Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
        </div>
      </div>
    </section>
  );
};
