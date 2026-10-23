import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------ */
/*  Wireframe core — fractured icosahedron                       */
/* ------------------------------------------------------------ */
function NetCore() {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const shell = useRef<THREE.Mesh>(null!);

  useFrame((state, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.22;
      group.current.rotation.x += dt * 0.07;
    }
    if (inner.current) {
      const m = inner.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 1.3) * 0.05;
    }
    if (shell.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      shell.current.scale.setScalar(scale);
    }
  });

  const geom = useMemo(() => new THREE.IcosahedronGeometry(2.4, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geom), [geom]);

  return (
    <group ref={group}>
      {/* magenta inner core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#ff1f8e" transparent opacity={0.1} />
      </mesh>
      {/* wireframe shell */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.95} />
      </lineSegments>
      {/* animated outer halo */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
      </mesh>
      {/* innermost solid */}
      <mesh>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#defb00" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------ */
/*  Orbiting node rings                                           */
/* ------------------------------------------------------------ */
function OrbitRing({
  radius,
  count,
  color,
  speed,
  tilt,
}: {
  radius: number;
  count: number;
  color: string;
  speed: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  const positions = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const a = (i / count) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
    });
  }, [count, radius]);

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 6, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------ */
/*  Procedural wireframe terrain — low-poly mountains            */
/* ------------------------------------------------------------ */
/**
 * Seamless tileable terrain — heights computed with sin/cos whose period
 * exactly divides plane width, so wrapping at width is invisible.
 */
function Terrain({
  z,
  color,
  opacity,
  speed = 1.2,
}: {
  z: number;
  color: string;
  opacity: number;
  speed?: number;
}) {
  const W = 60;
  const D = 14;
  const SEGX = 96;
  const SEGY = 28;
  const ref = useRef<THREE.LineSegments>(null!);

  const geom = useMemo(() => {
    const plane = new THREE.PlaneGeometry(W, D, SEGX, SEGY);
    const pos = plane.attributes.position;
    const TWO_PI_W = (Math.PI * 2) / W;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const factor = (y + D / 2) / D; // 0 near viewer, 1 at horizon
      // periodic terms — periods divide W cleanly so wrap is seamless
      const h =
        Math.sin(x * TWO_PI_W * 3) * 0.9 +
        Math.cos(x * TWO_PI_W * 5 + y * 0.3) * 0.55 +
        Math.sin(x * TWO_PI_W * 8 - y * 0.2) * 0.35;
      pos.setZ(i, h * factor * 1.4);
    }
    pos.needsUpdate = true;
    return new THREE.EdgesGeometry(plane);
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    let x = ref.current.position.x + dt * speed;
    if (x >= W) x -= W; // seamless wrap (period = full plane width)
    ref.current.position.x = x;
  });

  return (
    <lineSegments
      ref={ref}
      geometry={geom}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -3.4, z]}
    >
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

/* ------------------------------------------------------------ */
/*  Camera mouse parallax — listens to global window mousemove   */
/*  so it keeps moving even when the cursor is over UI overlays  */
/*  (R3F's state.pointer only updates while pointer is on canvas)*/
/* ------------------------------------------------------------ */
function Parallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const tx = target.current.x * 0.6;
    const ty = target.current.y * 0.3;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 6.5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 8, 22]} />
      <ambientLight intensity={0.3} />

      <Parallax />

      {/* Tron grid floor — drei gridHelper */}
      <GridFloor />

      {/* Mountain terrain horizon */}
      <Terrain z={-6} color="#00f0ff" opacity={0.6} />
      <Terrain z={-10} color="#ff1f8e" opacity={0.35} />

      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
        <NetCore />
      </Float>

      <OrbitRing radius={3.2} count={22} color="#00f0ff" speed={0.32} tilt={Math.PI * 0.25} />
      <OrbitRing radius={3.9} count={30} color="#ff1f8e" speed={-0.22} tilt={-Math.PI * 0.2} />
      <OrbitRing radius={4.6} count={42} color="#defb00" speed={0.12} tilt={Math.PI * 0.5} />

      <Sparkles count={160} scale={[14, 8, 8]} size={2} speed={0.4} color="#00f0ff" opacity={0.8} />
      <Sparkles count={120} scale={[14, 8, 8]} size={1.5} speed={0.3} color="#ff1f8e" opacity={0.7} />
      <Sparkles count={60} scale={[14, 8, 8]} size={1.2} speed={0.2} color="#defb00" opacity={0.6} />

      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.6} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0012] as any}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.position.z = (ref.current.position.z + dt * 0.8) % 2;
    }
  });
  return <gridHelper ref={ref} args={[120, 120, "#00f0ff", "#ff1f8e"]} position={[0, -3.4, 0]} />;
}
