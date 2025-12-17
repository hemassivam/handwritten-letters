import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('letters')
    .select('id, content, font, ink, created_at')
    .eq('id', id)
    .eq('is_public', true)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Letter not found' });
  }

  return res.status(200).json(data);
}
