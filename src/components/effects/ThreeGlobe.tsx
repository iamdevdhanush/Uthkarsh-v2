import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(1, 1)
    container.appendChild(renderer.domElement)

    const radius = 1.8
    const segments = 48

    const wireframeGeo = new THREE.SphereGeometry(radius, segments, segments)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x4d7cfe,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat)
    scene.add(wireframeSphere)

    const innerGeo = new THREE.SphereGeometry(radius * 0.98, segments, segments)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x4d7cfe,
      transparent: true,
      opacity: 0.04,
      wireframe: false,
    })
    const innerSphere = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerSphere)

    const particlesCount = 400
    const particlesGeo = new THREE.BufferGeometry()
    const particlesPos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius + 0.1 + Math.random() * 0.08
      particlesPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlesPos[i * 3 + 1] = r * Math.cos(phi)
      particlesPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlesPos, 3))
    const particlesMat = new THREE.PointsMaterial({
      color: 0x4d7cfe,
      size: 0.015,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particlesGeo, particlesMat)
    scene.add(particles)

    const orbitRingGeo = new THREE.RingGeometry(radius + 0.25, radius + 0.27, 64)
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x4d7cfe,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    })
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat)
    orbitRing.rotation.x = Math.PI / 3
    scene.add(orbitRing)

    const orbitRing2Geo = new THREE.RingGeometry(radius + 0.35, radius + 0.37, 64)
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x4d7cfe,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    })
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat)
    orbitRing2.rotation.x = -Math.PI / 4
    orbitRing2.rotation.z = Math.PI / 6
    scene.add(orbitRing2)

    const satelliteGeo = new THREE.SphereGeometry(0.025, 8, 8)
    const satelliteMat = new THREE.MeshBasicMaterial({
      color: 0x4d7cfe,
      transparent: true,
      opacity: 0.4,
    })
    const satellite = new THREE.Mesh(satelliteGeo, satelliteMat)
    scene.add(satellite)

    const satellite2 = new THREE.Mesh(satelliteGeo, satelliteMat)
    scene.add(satellite2)

    const dotCount = 12
    const dotGeo = new THREE.BufferGeometry()
    const dotPos = new Float32Array(dotCount * 3)
    const dotSizes = new Float32Array(dotCount)
    for (let i = 0; i < dotCount; i++) {
      const theta = (i / dotCount) * Math.PI * 2
      const phi = Math.sin(i * 1.5) * 0.5
      const r = radius + 0.05
      dotPos[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      dotPos[i * 3 + 1] = r * Math.sin(phi)
      dotPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)
      dotSizes[i] = 0.02 + Math.random() * 0.02
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3))
    dotGeo.setAttribute('size', new THREE.BufferAttribute(dotSizes, 1))
    const dotMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.025,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })
    const dots = new THREE.Points(dotGeo, dotMat)
    scene.add(dots)

    const latLineCount = 6
    const latLines: THREE.Line[] = []
    for (let i = 1; i < latLineCount; i++) {
      const phi = (i / latLineCount) * Math.PI
      const points: THREE.Vector3[] = []
      const segments = 32
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2
        const r = radius + 0.02
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ))
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x4d7cfe,
        transparent: true,
        opacity: 0.04,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)
      latLines.push(line)
    }

    const lonLineCount = 8
    const lonLines: THREE.Line[] = []
    for (let i = 0; i < lonLineCount; i++) {
      const theta = (i / lonLineCount) * Math.PI
      const points: THREE.Vector3[] = []
      const segments = 32
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI
        const r = radius + 0.02
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ))
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x4d7cfe,
        transparent: true,
        opacity: 0.03,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)
      lonLines.push(line)
    }

    const networkCount = 30
    const networkPositions: THREE.Vector3[] = []
    for (let i = 0; i < networkCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius + 0.05
      networkPositions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      ))
    }

    const networkLines: THREE.Line[] = []
    for (let i = 0; i < networkCount; i++) {
      const a = networkPositions[i]
      const b = networkPositions[(i + 3) % networkCount]
      const points = [a, b]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.03,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)
      networkLines.push(line)
    }

    let time = 0
    let angle = 0

    const handleResize = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const w = rect.width || 1
      const h = rect.height || 1
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    const handleMouse = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    window.addEventListener('mousemove', handleMouse)

    handleResize()

    let pulsePhase = 0
    let pulseActive = false

    setInterval(() => {
      pulseActive = true
      setTimeout(() => { pulseActive = false }, 600)
    }, 4000)

    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.003
      angle += 0.002

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      wireframeSphere.rotation.x = Math.sin(time * 0.3) * 0.05 + my * 0.3
      wireframeSphere.rotation.y = time * 0.15 + mx * 0.5

      innerSphere.rotation.x = wireframeSphere.rotation.x
      innerSphere.rotation.y = wireframeSphere.rotation.y

      particles.rotation.x = wireframeSphere.rotation.x * 0.8
      particles.rotation.y = wireframeSphere.rotation.y * 0.8

      orbitRing.rotation.z = time * 0.1 + mx * 0.2
      orbitRing.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.05

      orbitRing2.rotation.z = Math.PI / 6 + time * 0.08 + mx * 0.15
      orbitRing2.rotation.x = -Math.PI / 4 + Math.cos(time * 0.15) * 0.03

      const satAngle = angle * 0.5
      satellite.position.x = (radius + 0.5) * Math.cos(satAngle)
      satellite.position.z = (radius + 0.5) * Math.sin(satAngle)
      satellite.position.y = (radius + 0.3) * Math.sin(satAngle * 0.7)

      const satAngle2 = angle * 0.5 + Math.PI
      satellite2.position.x = (radius + 0.6) * Math.cos(satAngle2)
      satellite2.position.z = (radius + 0.6) * Math.sin(satAngle2)
      satellite2.position.y = (radius + 0.2) * Math.sin(satAngle2 * 0.5)

      dots.rotation.y = time * 0.1

      for (const line of latLines) {
        line.rotation.y = wireframeSphere.rotation.y
      }
      for (const line of lonLines) {
        line.rotation.x = wireframeSphere.rotation.x
        line.rotation.y = wireframeSphere.rotation.y
      }
      for (const line of networkLines) {
        line.rotation.y = wireframeSphere.rotation.y
      }

      if (pulseActive) {
        pulsePhase += 0.05
        const pulseIntensity = Math.sin(pulsePhase * Math.PI) * 0.08
        wireframeMat.opacity = 0.12 + pulseIntensity
        particlesMat.opacity = 0.3 + pulseIntensity * 2
        if (pulsePhase >= 1) {
          pulsePhase = 0
          pulseActive = false
          wireframeMat.opacity = 0.12
          particlesMat.opacity = 0.3
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      resizeObserver.disconnect()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="three-globe" aria-hidden="true" />
}
