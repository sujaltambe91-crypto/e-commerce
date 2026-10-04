import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(4, 8, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const orangeLight = new THREE.PointLight(0xf97316, 3, 10);
    orangeLight.position.set(-3, 2, 2);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 1.5, 8);
    cyanLight.position.set(3, -1, 2);
    scene.add(cyanLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Laptop Base & Screen
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.3, -0.2, 0);

    // Base
    const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.8,
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopGroup.add(laptopBase);

    // Keyboard recess
    const kbGeo = new THREE.BoxGeometry(2.1, 0.02, 0.9);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0, 0.045, -0.15);
    laptopGroup.add(kb);

    // Screen Lid (angled)
    const screenLid = new THREE.Group();
    screenLid.position.set(0, 0.04, -0.78);
    screenLid.rotation.x = -Math.PI / 10; // angled open

    const lidGeo = new THREE.BoxGeometry(2.4, 1.5, 0.06);
    const lidMesh = new THREE.Mesh(lidGeo, metalMat);
    lidMesh.position.set(0, 0.75, 0);
    screenLid.add(lidMesh);

    // Display Surface
    const displayGeo = new THREE.PlaneGeometry(2.26, 1.36);
    // Canvas texture for screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Draw simulated ShopKart store
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 512, 320);

      // Top nav
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, 512, 40);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('ShopKart', 24, 28);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '12px sans-serif';
      ctx.fillText('Home    Shop    Categories    Deals', 180, 26);

      // Hero banner inside laptop
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.roundRect(24, 55, 464, 130, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Upgrade Your Shopping', 44, 100);
      ctx.font = '14px sans-serif';
      ctx.fillText('Quality Products. Great Prices. Happier You.', 44, 126);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(44, 142, 100, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#c2410c';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Shop Now →', 60, 161);

      // Products row
      const prods = ['🎧 Audio', '👟 Shoes', '⌚ Smartwatch'];
      for (let p = 0; p < 3; p++) {
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.roundRect(24 + p * 160, 200, 144, 100, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(prods[p], 36 + p * 160, 240);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('₹ 4,999', 36 + p * 160, 275);
      }
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(displayGeo, screenMat);
    screenMesh.position.set(0, 0.75, 0.035);
    screenLid.add(screenMesh);

    laptopGroup.add(screenLid);
    mainGroup.add(laptopGroup);

    // 2. Smartphone beside laptop
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.5, -0.2, 0.5);
    phoneGroup.rotation.y = -Math.PI / 8;
    phoneGroup.rotation.x = -Math.PI / 18;

    const phoneBodyGeo = new THREE.BoxGeometry(0.75, 1.5, 0.06);
    const phoneMesh = new THREE.Mesh(phoneBodyGeo, metalMat);
    phoneGroup.add(phoneMesh);

    // Phone screen
    const phoneScreenGeo = new THREE.PlaneGeometry(0.7, 1.42);
    const phoneCanvas = document.createElement('canvas');
    phoneCanvas.width = 256;
    phoneCanvas.height = 512;
    const pCtx = phoneCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = '#09090b';
      pCtx.fillRect(0, 0, 256, 512);

      pCtx.fillStyle = '#ea580c';
      pCtx.font = 'bold 18px sans-serif';
      pCtx.fillText('ShopKart Mobile', 16, 40);

      pCtx.fillStyle = '#f97316';
      pCtx.beginPath();
      pCtx.roundRect(16, 60, 224, 100, 8);
      pCtx.fill();
      pCtx.fillStyle = '#ffffff';
      pCtx.font = 'bold 16px sans-serif';
      pCtx.fillText('Best Deals Today', 30, 105);
      pCtx.font = '12px sans-serif';
      pCtx.fillText('Shop More, Save More.', 30, 130);

      // Card
      pCtx.fillStyle = '#18181b';
      pCtx.beginPath();
      pCtx.roundRect(16, 180, 224, 280, 8);
      pCtx.fill();
      pCtx.fillStyle = '#ffffff';
      pCtx.font = 'bold 16px sans-serif';
      pCtx.fillText('👟 Running Shoes', 32, 230);
      pCtx.fillStyle = '#f59e0b';
      pCtx.font = 'bold 18px monospace';
      pCtx.fillText('₹ 5,799', 32, 280);

      pCtx.fillStyle = '#ea580c';
      pCtx.beginPath();
      pCtx.roundRect(32, 330, 192, 40, 6);
      pCtx.fill();
      pCtx.fillStyle = '#ffffff';
      pCtx.font = 'bold 14px sans-serif';
      pCtx.fillText('Buy Now on Amazon', 54, 355);
    }
    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.035);
    phoneGroup.add(phoneScreen);

    mainGroup.add(phoneGroup);

    // 3. Floating 3D Orange Diamond Crystal Shapes (from flyer!)
    const diamondGroup = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(0.24, 0);
    const orangeCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 0.5,
    });

    const diamonds: THREE.Mesh[] = [];
    const positions = [
      [-1.9, 1.4, 0.4],
      [2.1, 1.2, -0.3],
      [-1.5, -0.6, 0.8],
      [1.8, -0.5, 0.9],
      [0.2, 1.8, -0.6],
    ];

    positions.forEach((pos, i) => {
      const mesh = new THREE.Mesh(octGeo, orangeCrystalMat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.scale.setScalar(0.7 + (i % 3) * 0.3);
      diamondGroup.add(mesh);
      diamonds.push(mesh);
    });

    mainGroup.add(diamondGroup);

    // Mouse interactive tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera tilt
      targetX += (mouseX * 0.35 - targetX) * 0.05;
      targetY += (mouseY * 0.25 - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.6;
      mainGroup.rotation.x = -targetY * 0.4;

      // Floating gentle hover for laptop
      laptopGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.5) * 0.05;
      laptopGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.04;

      // Floating phone
      phoneGroup.position.y = -0.2 + Math.cos(elapsedTime * 1.8) * 0.06;

      // Rotating floating diamonds
      diamonds.forEach((d, idx) => {
        d.rotation.x += 0.01 * (idx + 1);
        d.rotation.y += 0.015 * (idx + 1);
        d.position.y += Math.sin(elapsedTime * 2 + idx) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] sm:h-[480px] lg:h-[560px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
