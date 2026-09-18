import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

const MODEL_PATH = '/Shanallote.glb'
const MAX_YAW = THREE.MathUtils.degToRad(25)
const MAX_PITCH = THREE.MathUtils.degToRad(15)

interface ShanalloteModelProps {
  isReducedMotion: boolean
}

export function ShanalloteModel({ isReducedMotion }: ShanalloteModelProps): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Group | null>(null)
  const { gl, scene, camera } = useThree()

  const mouseNorm = useRef({ x: 0, y: 0 })
  const rotationTarget = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const floatOffset = useRef(0)
  const breathOffset = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNorm.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      MODEL_PATH,
      (gltf) => {
        const gltfScene = gltf.scene
        const box = new THREE.Box3().setFromObject(gltfScene)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        gltfScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.0 / maxDim
        gltfScene.scale.setScalar(scale)
        gltfScene.position.sub(center.multiplyScalar(scale))
        gltfScene.rotation.x = Math.PI * 0.1

        setModel(gltfScene)
      },
      undefined,
      (error) => {
        console.error('Error loading GLB:', error)
      }
    )
  }, [gl])

  useFrame((_, delta) => {
    if (!groupRef.current || !model) return

    if (isReducedMotion) {
      rotationTarget.current = { x: 0, y: 0 }
    } else {
      rotationTarget.current.x = -mouseNorm.current.y * MAX_PITCH
      rotationTarget.current.y = mouseNorm.current.x * MAX_YAW
    }

    const lerpFactor = isReducedMotion ? 0.02 : 0.08
    currentRotation.current.x += (rotationTarget.current.x - currentRotation.current.x) * lerpFactor
    currentRotation.current.y += (rotationTarget.current.y - currentRotation.current.y) * lerpFactor

    if (!isReducedMotion) {
      floatOffset.current += delta * 0.8
      breathOffset.current += delta * 1.2

      const floatY = Math.sin(floatOffset.current) * 0.015
      const breathScale = 1 + Math.sin(breathOffset.current) * 0.005

      groupRef.current.position.y = floatY
      groupRef.current.scale.setScalar(1 + breathScale * 0.01)
    }

    groupRef.current.rotation.x = currentRotation.current.x
    groupRef.current.rotation.y = currentRotation.current.y

    gl.render(scene, camera)
  })

  if (!model) return <group />

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  )
}
