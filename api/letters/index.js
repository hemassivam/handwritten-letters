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

  if (!content) {
    return res.status(400).json({ error: 'Content required' });
  }

  const { data, error } = await supabase
    .from('letters')
    .insert([
      {
        content,
        font,
        ink,
        is_public: true
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ id: data.id });
}
