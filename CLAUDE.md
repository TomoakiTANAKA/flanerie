# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flanerie is an educational 3D city exploration game designed for learning historical contexts through interactive exploration. Players explore historical neighborhoods in a god's-eye view without a player character, interacting with NPCs and buildings to gather information.

## Architecture

The project follows a Vite + TypeScript + Three.js architecture:

```
Vite Application (TypeScript)
├── Three.js 3D Scene Components
├── Vanilla TypeScript UI System
└── Future: Google Maps API integration
```
****
**Key Technical Stack:**
- **Frontend**: Vite + TypeScript for fast development
- **3D Rendering**: Three.js with TypeScript, starting with basic shapes evolving to GLTF models
- **UI System**: Vanilla TypeScript for conversations and interface
- **Platform**: Web browsers (optimized for educational environments)

## Development Context

**Current Phase**: Phase 1 - Basic System Construction
- Three.js basic 3D scene: ✅ Complete
- Camera operation system: ✅ Complete  
- Basic building placement: ✅ Complete
- Click interaction: 🔄 Next priority
- Simple conversation system: 📋 Planned
- Historical theme implementation: 📋 Planned

**Camera System**: RTS-like overhead perspective with:
- Arrow keys/WASD: Pan movement
- Mouse drag: View rotation
- Mouse wheel: Zoom

**Target Users**: Elementary through high school education, museums, educational committees

## Future Development Phases

**Phase 2**: Multiple historical themes, enhanced NPC systems
**Phase 3**: Google Maps API integration, historical time progression simulation  
**Phase 4**: High-quality GLTF models, performance optimization, internationalization

## Historical Themes
- Edo period Tokyo (castles, row houses, merchant districts, temples)
- Medieval Europe (castles, churches, markets, artisan quarters)
- Meiji era Japan (mixed Japanese-Western architecture)
- Modern applications (career experience, social systems)

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── main.ts          # Entry point
├── scene/           # Three.js scene components
├── ui/              # UI components and systems
├── types/           # TypeScript type definitions
├── style.css        # Global styles
└── vite-env.d.ts    # Vite environment types
```

**Path Aliases**: Use `@/*` for src imports, `@/scene/*`, `@/ui/*`, `@/types/*` for specific directories.

## Documentation

- `documents/README.md` - Project overview and concept documentation
- `documents/development-plan.md` - Detailed development phases and milestones
- `documents/architecture.md` - Technical architecture and system design

## Project Status

Vite + TypeScript + Three.js environment is set up and ready for development. Basic project structure created with proper TypeScript configuration and path mapping. Development documentation organized in documents/ folder.