"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FynaroHero from "./fynaro-hero";
import FynaroOriginPhase from "./origin-phase";
import FynaroServicesPhase from "./service-phase";
import FynaroProcessPhase from "./process-phase";
import PhaseFiveSelectedWork from "./selected-work";
import PhaseSixWhoFynaroIsFor from "./who-we";
import PhaseSevenHowToEngage from "./to-engage";
import PhaseEightGetInTouch from "./social-proof";
import PhaseTenTechNotes from "./tech-note";
import PhaseNineFinalCTA from "./final";
gsap.registerPlugin(ScrollTrigger);

export default function Fynaro3DScroll() {
  // ❌ remove <HTMLDivElement>
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // === Three.js scene ===
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Background canvas
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "-10";

    mount.appendChild(renderer.domElement);

    // Cube placeholder
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Scroll animations
    gsap.to(cube.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(cube.scale, {
      x: 2,
      y: 2,
      z: 2,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top+=200 top",
        end: "bottom-=200 bottom",
        scrub: true,
      },
    });

    const renderLoop = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={(el) => {
        mountRef.current = el;
      }}
      className="relative w-full bg-[#050507] text-white"
    >
      <div className="relative z-10">
        <FynaroHero />
        <FynaroOriginPhase />
        <FynaroServicesPhase />
        <FynaroProcessPhase />
        <PhaseFiveSelectedWork />
        <PhaseSixWhoFynaroIsFor />
        <PhaseSevenHowToEngage />
        <PhaseEightGetInTouch />
        <PhaseNineFinalCTA />
        <PhaseTenTechNotes />
      </div>
    </div>
  );
}
