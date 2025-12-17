import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content, font, ink } = req.body;

  if (!content || !font || !ink) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { data, error } = await supabase
    .from('letters')
    .insert([{ content, font, ink }])
    .select('id')
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ id: data.id });
}
