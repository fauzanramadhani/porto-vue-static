<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

// Import Vanta.js effects using dynamic imports
let FOG, CLOUDS, NET, RINGS, HALO

const DEFAULT_SETTINGS = {
  solid: {
    solidColor: '#18052b' // deep purple
  },

  // Default options aligned with Vanta FOG official API
  fog: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0xe1b228,
    midtoneColor: 0xfa3a20,
    lowlightColor: 0x3c12ff,
    baseColor: 0xffffff,
    blurFactor: 0.52,
    speed: 1.1,
    zoom: 0.9
  },

  // Default options aligned with Vanta CLOUDS official API
  clouds: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    skyColor: 0x5fb9dc,
    cloudColor: 0x96b2d9,
    cloudShadowColor: 0x203d57,
    sunColor: 0xf5a23a,
    sunGlareColor: 0xf5774d,
    sunlightColor: 0xfaa44f,
    speed: 0.5
  },

  // Default options aligned with Vanta NET official API
  net: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xff357c,
    backgroundColor: 0x261741,
    points: 11.0,
    maxDistance: 22.0,
    spacing: 14.0
  },

  // Default options aligned with Vanta RINGS official API (type: 'ring')
  ring: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    backgroundColor: 0x1f2022,
    color: 0x87ed15,
    backgroundAlpha: 0.93
  },

  // Default options aligned with Vanta HALO official API
  halo: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    baseColor: 0xb225c,
    backgroundColor: 0x151b3e,
    amplitudeFactor: 0.8,
    xOffset: -0.00,
    yOffset: -0.00,
    size: 0.7
  },

  // Elegant purple gradient background (CSS, not Vanta)
  gradient: {
    gradientStart: '#2e026d',
    gradientEnd: '#8b5cf6',
    gradientDirection: '135deg'
  }
}

const getDefaultSettings = (type = 'solid') => {
  return DEFAULT_SETTINGS[type] || DEFAULT_SETTINGS.solid
}

// Load Vanta.js effects dynamically
const loadVantaEffects = async () => {
  try {
    // Import all Vanta.js effects - they will be available on window.VANTA
    await Promise.all([
      import('vanta/dist/vanta.fog.min'),
      import('vanta/dist/vanta.clouds.min'),
      import('vanta/dist/vanta.net.min'),
      import('vanta/dist/vanta.rings.min'),
      import('vanta/dist/vanta.halo.min')
    ])

    // Access effects from global window.VANTA object
    FOG = window.VANTA?.FOG
    CLOUDS = window.VANTA?.CLOUDS
    NET = window.VANTA?.NET
    RINGS = window.VANTA?.RINGS
    HALO = window.VANTA?.HALO

  } catch (error) {
    console.error('Error loading Vanta.js effects:', error)
  }
}

const props = defineProps({
  backgroundSettings: {
    type: Object,
    default: () => ({})
  }
})

const vantaRef = ref(null)
let vantaEffect = null

// Normalize color value: accept hex string ("#fff" / "0xffffff") or number (0xffffff)
const toColorValue = (value) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const v = value.trim()
    if (v.startsWith('#')) return parseInt(v.slice(1), 16)
    if (v.startsWith('0x') || v.startsWith('0X')) return parseInt(v.slice(2), 16)
    return parseInt(v, 16)
  }
  return value
}

// Make size/scale values responsive to screen size
const responsiveScalar = (base = 1) => {
  if (typeof window === 'undefined') return base
  const minDim = Math.min(window.innerWidth, window.innerHeight)
  if (minDim < 480) return base * 0.7
  if (minDim < 768) return base * 0.85
  if (minDim > 1440) return base * 1.1
  return base
}

const initializeBackground = () => {
  if (!vantaRef.value) return

  // Check if Vanta.js effects are loaded
  if (!FOG || !CLOUDS || !NET || !RINGS || !HALO) {
    console.warn('Vanta.js effects not loaded yet, retrying...')
    setTimeout(initializeBackground, 100)
    return
  }

  // Destroy existing effect
  if (vantaEffect) {
    vantaEffect.destroy()
    vantaEffect = null
  }

  const type = props.backgroundSettings.type || 'solid'

  const settings = {
    type,
    ...getDefaultSettings(type),
    ...props.backgroundSettings
  }

  // Clear any existing CSS background
  vantaRef.value.style.background = ''

  if (settings.type === 'fog') {
    vantaEffect = FOG({
      el: vantaRef.value,
      THREE,
      mouseControls: settings.mouseControls,
      touchControls: settings.touchControls,
      gyroControls: settings.gyroControls,
      minHeight: settings.minHeight,
      minWidth: settings.minWidth,
      highlightColor: toColorValue(settings.highlightColor),
      midtoneColor: toColorValue(settings.midtoneColor),
      lowlightColor: toColorValue(settings.lowlightColor),
      baseColor: toColorValue(settings.baseColor),
      blurFactor: settings.blurFactor,
      speed: settings.speed,
      zoom: settings.zoom
    })
  } else if (settings.type === 'clouds') {
    vantaEffect = CLOUDS({
      el: vantaRef.value,
      THREE,
      mouseControls: settings.mouseControls,
      touchControls: settings.touchControls,
      gyroControls: settings.gyroControls,
      minHeight: settings.minHeight,
      minWidth: settings.minWidth,
      skyColor: toColorValue(settings.skyColor),
      cloudColor: toColorValue(settings.cloudColor),
      cloudShadowColor: toColorValue(settings.cloudShadowColor),
      sunColor: toColorValue(settings.sunColor),
      sunGlareColor: toColorValue(settings.sunGlareColor),
      sunlightColor: toColorValue(settings.sunlightColor),
      speed: settings.speed,
      mouseEase: true
    })
  } else if (settings.type === 'net') {
    vantaEffect = NET({
      el: vantaRef.value,
      THREE,
      mouseControls: settings.mouseControls,
      touchControls: settings.touchControls,
      gyroControls: settings.gyroControls,
      minHeight: settings.minHeight,
      minWidth: settings.minWidth,
      color: toColorValue(settings.color),
      backgroundColor: toColorValue(settings.backgroundColor),
      points: settings.points,
      maxDistance: settings.maxDistance,
      spacing: settings.spacing,
      scale: responsiveScalar(settings.scale),
      scaleMobile: responsiveScalar(settings.scaleMobile)
    })
  } else if (settings.type === 'ring') {
    vantaEffect = RINGS({
      el: vantaRef.value,
      THREE,
      mouseControls: settings.mouseControls,
      touchControls: settings.touchControls,
      gyroControls: settings.gyroControls,
      minHeight: settings.minHeight,
      minWidth: settings.minWidth,
      color: toColorValue(settings.color),
      backgroundColor: toColorValue(settings.backgroundColor),
      backgroundAlpha: settings.backgroundAlpha,
      scale: responsiveScalar(settings.scale),
      scaleMobile: responsiveScalar(settings.scaleMobile)
    })
  } else if (settings.type === 'halo') {
    vantaEffect = HALO({
      el: vantaRef.value,
      THREE,
      mouseControls: settings.mouseControls,
      touchControls: settings.touchControls,
      gyroControls: settings.gyroControls,
      minHeight: settings.minHeight,
      minWidth: settings.minWidth,
      baseColor: toColorValue(settings.baseColor),
      backgroundColor: toColorValue(settings.backgroundColor),
      amplitudeFactor: settings.amplitudeFactor,
      xOffset: settings.xOffset,
      yOffset: settings.yOffset,
      size: responsiveScalar(settings.size)
    })
  } else if (settings.type === 'gradient') {
    // For gradient backgrounds, we'll use CSS instead of Vanta.js
    vantaRef.value.style.background = `linear-gradient(${settings.gradientDirection}, ${settings.gradientStart}, ${settings.gradientEnd})`
  } else if (settings.type === 'solid') {
    // For solid color backgrounds
    vantaRef.value.style.background = settings.solidColor
  }
}

onMounted(async () => {
  await loadVantaEffects()
  initializeBackground()
})

// Watch for changes in background settings
watch(() => props.backgroundSettings, () => {
  initializeBackground()
}, { deep: true })

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<template>
  <div ref="vantaRef" class="vanta-bg"></div>
</template>

<style scoped>
.vanta-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
