// Configuração do Supabase (Project Settings → API).
// A chave "anon"/"publishable" é pública por natureza: pode ficar no GitHub,
// desde que a tabela tenha RLS ativado com política somente de leitura.
// NUNCA coloque aqui a chave "service_role"/"secret".
window.SUPABASE_CONFIG = {
  url:     'https://tzqdtmophknxnevolaty.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cWR0bW9waGtueG5ldm9sYXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODMzMTYsImV4cCI6MjEwNDU1OTMxNn0.hySi86bm25aEtuWnOwtYxVivLzyrVfCbScDy5RZN73o',
  tabela:  'leilaoimovel'   // nome exato da tabela no Supabase (ex.: 'el_imv')
};
