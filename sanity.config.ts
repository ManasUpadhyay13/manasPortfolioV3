import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schemas';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'portfolio-blog',
  title: 'Portfolio Blog',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
});
