import { vi } from 'vitest';

vi.mock('../src/services/pathwayCommons/pathwayCommonsService', () => ({
  queryPathwayCommons: vi.fn(async () => ({
    interactions: [],
    missingInteractions: [],
    confirmedInteractions: [],
    pathways: [],
    unknownMolecules: [],
    summary: 'Mocked Pathway Commons result',
  })),
}));
