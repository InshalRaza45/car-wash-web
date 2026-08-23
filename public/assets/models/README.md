# 3D Vehicle Models Pipeline

Place optimized vehicle GLB / GLTF files here.

### Performance Specifications:
- **Format**: Binary GLB (`.glb`) preferred
- **Target Polygon Count**: < 120,000 triangles
- **Compression**: Draco geometry compression or Meshopt (`gltf-transform optimize input.glb output.glb --compress draco`)
- **Draw Calls**: Combine meshes where possible (< 25 individual meshes per car)
- **Hierarchy Standard**:
  - `Body_Chassis` (receives dynamic paint shader)
  - `Windows_Glass` (physical transmission material)
  - `Wheel_FL`, `Wheel_FR`, `Wheel_RL`, `Wheel_RR` (for dynamic steering & rotation)
  - `Lights_Headlights`, `Lights_Taillights` (emissive elements)
