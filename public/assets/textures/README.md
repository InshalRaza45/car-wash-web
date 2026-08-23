# Automotive Textures Pipeline

Place environment maps, dirt alpha masks, foam textures, and ceramic iridescence maps here.

### Texture Specifications:
- **Formats**: WebP / KTX2 / PNG
- **Resolutions**:
  - Environment HDR/EXR: 1K or 2K max for 60fps performance
  - Normal / Roughness Maps: 1024x1024 or 2048x2048
  - Dirt / Foam Alpha Masks: 1024x1024 (grayscale 8-bit)
- **Power of Two**: Ensure all dimensions are powers of 2 (e.g. 512, 1024, 2048) for optimal mipmapping and GPU cache efficiency.
