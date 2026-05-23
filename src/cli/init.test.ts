import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initProject } from './index.js';
import { mkdtemp, rm, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('claytube init smoke tests', () => {
  let tempBaseDir: string;

  beforeEach(async () => {
    tempBaseDir = await mkdtemp(join(tmpdir(), 'claytube-test-'));
  });

  afterEach(async () => {
    await rm(tempBaseDir, { recursive: true, force: true });
  });

  it('should successfully initialize a project in an empty directory', async () => {
    const targetDir = join(tempBaseDir, 'my-new-site');
    
    // Simulate CLI arguments passing the target directory
    await initProject([targetDir]);
    
    const entries = await readdir(targetDir);
    expect(entries).toContain('claytube.config.yaml');
    expect(entries).toContain('package.json');
    expect(entries).toContain('src');
  });

  it('should throw an error when the target directory is not empty', async () => {
    const targetDir = join(tempBaseDir, 'not-empty');
    await mkdir(targetDir);
    await writeFile(join(targetDir, 'dummy.txt'), 'content');
    
    await expect(initProject([targetDir]))
      .rejects.toThrow(/is not empty/);
  });
});