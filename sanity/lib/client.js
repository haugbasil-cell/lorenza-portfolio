import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // "cdn: false" damit du während der Entwicklung immer die neuesten Änderungen siehst.
  // Für Produktion kannst du das später auf true stellen (schneller, aber bis zu 1 Min. Cache).
  useCdn: false,
})
