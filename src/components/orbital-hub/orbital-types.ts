export type SectionId = 'projects' | 'skills' | 'about' | 'contact';

export interface OrbitalNodeData {
  id: SectionId;
  label: string;
  subtitle: string;
  iconName: string;
  color: string;
  glowColor: string;
  radius: number; // orbital radius
  speed: number;  // angular velocity factor
  phaseOffset: number; // angle offset in radians
  inclination: number; // orbital tilt in radians
  yAmplitude: number; // vertical oscillation
  geometryType: 'octahedron' | 'icosahedron' | 'torus' | 'box';
}

export const ORBITAL_NODES_CONFIG: OrbitalNodeData[] = [
  {
    id: 'projects',
    label: 'Projects Bento',
    subtitle: 'Featured Systems & Code',
    iconName: 'FolderGit2',
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    radius: 5.2,
    speed: 0.35,
    phaseOffset: 0,
    inclination: 0.25,
    yAmplitude: 0.8,
    geometryType: 'octahedron',
  },
  {
    id: 'skills',
    label: 'Skills Matrix',
    subtitle: 'Tech Stack & Engineering',
    iconName: 'Cpu',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    radius: 7.0,
    speed: 0.25,
    phaseOffset: (Math.PI * 2) / 3,
    inclination: -0.3,
    yAmplitude: 1.2,
    geometryType: 'icosahedron',
  },
  {
    id: 'about',
    label: 'About & Bio',
    subtitle: 'Background & Principles',
    iconName: 'UserCheck',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    radius: 8.8,
    speed: 0.18,
    phaseOffset: (Math.PI * 4) / 3,
    inclination: 0.15,
    yAmplitude: 0.6,
    geometryType: 'torus',
  },
  {
    id: 'contact',
    label: 'Terminal Contact',
    subtitle: 'Direct Link & Signals',
    iconName: 'Terminal',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    radius: 10.5,
    speed: 0.12,
    phaseOffset: Math.PI / 2,
    inclination: -0.1,
    yAmplitude: 1.0,
    geometryType: 'box',
  },
];
