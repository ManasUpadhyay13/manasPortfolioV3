import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '@/sanity/env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
