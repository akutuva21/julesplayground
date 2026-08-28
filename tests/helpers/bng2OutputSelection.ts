/**
 * Select the GDAT produced for a model without guessing based on file size.
 *
 * BNG2 can emit multiple GDAT files for multi-phase or auxiliary actions. A
 * size-based choice can silently compare the web result with the wrong phase.
 * Prefer the canonical model.gdat when it exists; only accept an arbitrary
 * file when BNG2 emitted exactly one output.
 */
export function selectPrimaryGdat(
  gdatFiles: readonly string[],
  modelFileName: string,
): string | null {
  if (gdatFiles.length === 0) return null;
  if (gdatFiles.length === 1) return gdatFiles[0];

  const modelName = modelFileName.split(/[\\/]/).pop() ?? modelFileName;
  const stem = modelName.replace(/\.[^.]+$/, '');
  const canonical = `${stem}.gdat`.toLowerCase();
  return gdatFiles.find((file) => file.toLowerCase() === canonical) ?? null;
}
