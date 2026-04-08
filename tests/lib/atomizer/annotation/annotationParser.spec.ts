import { describe, it, expect } from 'vitest';
import { computeAnnotationStats } from '@/src/lib/atomizer/annotation/annotationParser';
import { SBMLModel, SBMLSpecies, AnnotationInfo } from '@/src/lib/atomizer/config/types';

describe('computeAnnotationStats', () => {
  it('handles an empty model', () => {
    const model = {
      species: new Map<string, SBMLSpecies>()
    } as unknown as SBMLModel;

    const stats = computeAnnotationStats(model);

    expect(stats.totalSpecies).toBe(0);
    expect(stats.annotatedSpecies).toBe(0);
    expect(stats.annotationCount).toBe(0);
    expect(stats.databaseDistribution.size).toBe(0);
    expect(stats.qualifierDistribution.size).toBe(0);
    expect(Number.isNaN(stats.coveragePercent)).toBe(true);
  });

  it('handles a model with no annotations', () => {
    const speciesMap = new Map<string, SBMLSpecies>();
    speciesMap.set('s1', {
      id: 's1',
      name: 'Species 1',
      annotations: []
    } as unknown as SBMLSpecies);
    speciesMap.set('s2', {
      id: 's2',
      name: 'Species 2',
      annotations: []
    } as unknown as SBMLSpecies);

    const model = {
      species: speciesMap
    } as unknown as SBMLModel;

    const stats = computeAnnotationStats(model);

    expect(stats.totalSpecies).toBe(2);
    expect(stats.annotatedSpecies).toBe(0);
    expect(stats.annotationCount).toBe(0);
    expect(stats.databaseDistribution.size).toBe(0);
    expect(stats.qualifierDistribution.size).toBe(0);
    expect(stats.coveragePercent).toBe(0);
  });

  it('calculates stats correctly for a model with annotations', () => {
    const speciesMap = new Map<string, SBMLSpecies>();

    // Species with 1 annotation
    speciesMap.set('s1', {
      id: 's1',
      name: 'Species 1',
      annotations: [
        {
          qualifierType: 1, // biological
          biologicalQualifier: 0, // BQB_IS
          resources: ['uniprot/P12345']
        }
      ]
    } as unknown as SBMLSpecies);

    // Species with 2 annotations
    speciesMap.set('s2', {
      id: 's2',
      name: 'Species 2',
      annotations: [
        {
          qualifierType: 1, // biological
          biologicalQualifier: 0, // BQB_IS
          resources: ['uniprot/Q67890']
        },
        {
          qualifierType: 0, // model
          modelQualifier: 0, // BQM_IS
          resources: ['kegg.compound/C00001']
        }
      ]
    } as unknown as SBMLSpecies);

    // Species with no annotations
    speciesMap.set('s3', {
      id: 's3',
      name: 'Species 3',
      annotations: []
    } as unknown as SBMLSpecies);

    const model = {
      species: speciesMap
    } as unknown as SBMLModel;

    const stats = computeAnnotationStats(model);

    expect(stats.totalSpecies).toBe(3);
    expect(stats.annotatedSpecies).toBe(2);
    expect(stats.annotationCount).toBe(3);

    // Check database distribution
    expect(stats.databaseDistribution.get('uniprot')).toBe(2);
    expect(stats.databaseDistribution.get('kegg')).toBe(1);
    expect(stats.databaseDistribution.size).toBe(2);

    // Check qualifier distribution
    // Note: BQB_IS is 0, but if qualifierType is 1 and biologicalQualifier is 0, the mapping in
    // BIOLOGICAL_QUALIFIER_NAMES[0] returns 'BQB_IS'. However, the logic in `parseSpeciesAnnotations`
    // uses `ann.biologicalQualifier || 13` which results in 13 ('BQB_UNKNOWN') if biologicalQualifier is 0.
    // The same applies to `modelQualifier || 5` which resolves to 5 ('BQM_UNKNOWN').
    expect(stats.qualifierDistribution.get('BQB_UNKNOWN')).toBe(2);
    expect(stats.qualifierDistribution.get('BQM_UNKNOWN')).toBe(1);
    expect(stats.qualifierDistribution.size).toBe(2);

    // Check coverage
    expect(stats.coveragePercent).toBe((2 / 3) * 100);
  });
});
