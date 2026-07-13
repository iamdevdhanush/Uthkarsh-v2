import { useRef, useMemo, type ReactNode } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

function Numeral({ position, children }: { position: [number, number, number]; children: ReactNode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    targetRot.current = { x: y * 0.15, y: x * 0.15 }
  }

  useFrame(() => {
    if (!meshRef.current) return
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.05
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.05
    meshRef.current.rotation.x = currentRot.current.x
    meshRef.current.rotation.y = currentRot.current.y
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[2.2, 3.2, 1.2]} />
      {children}
    </mesh>
  )
}

function ExtrudedText({ text, position, color = '#0A0A0A', size = 2 }: {
  text: string
  position: [number, number, number]
  color?: string
  size?: number
}) {
  return (
    <Text
      position={position}
      fontSize={size}
      font="https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqG40C9M.woff"
      fontWeight={900}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

export default function Three26() {
  const isLowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const conn = (navigator as any).connection
    if (conn) {
      if (conn.saveData) return true
    }
    return false
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={isLowPower ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !isLowPower, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <Numeral position={[-1.7, 0, 0]}>
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.1} />
        </Numeral>
        <ExtrudedText text="2" position={[-1.7, 0, 0.7]} />
      </Float>

      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <Numeral position={[1.7, 0, 0]}>
          <meshStandardMaterial color="#FF4D00" roughness={0.4} metalness={0} />
        </Numeral>
        <ExtrudedText text="6" position={[1.7, 0, 0.7]} color="#FFFFFF" />
      </Float>
    </Canvas>
  )
}
