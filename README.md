# Consulta de Imóveis (EL_IMV)

Site estático para o **GitHub Pages** com busca e filtros sobre a tabela `EL_IMV` hospedada no **Supabase**.
O navegador consulta a API REST do Supabase diretamente — não há servidor intermediário.

## 1. Configurar o Supabase

**a) Pegue a URL e a chave pública:** Supabase → *Project Settings → API*:
- *Project URL* (ex.: `https://abcd1234.supabase.co`)
- chave **anon / publishable** (nunca use a `service_role` / secret)

**b) Libere somente leitura para o site** (SQL Editor). Ajuste o nome da tabela se for diferente:

```sql
alter table public."EL_IMV" enable row level security;

create policy "Leitura publica EL_IMV"
  on public."EL_IMV"
  for select
  to anon
  using (true);
```

> Sem essa política o site recebe 0 registros (o RLS bloqueia em silêncio).
> Com ela, qualquer pessoa com a URL do site consegue **ler** a tabela — mas não alterar.

## 2. Preencher `config.js`

```js
window.SUPABASE_CONFIG = {
  url:     'https://abcd1234.supabase.co',
  anonKey: 'eyJhbGciOi...',
  tabela:  'EL_IMV'      // nome exato no Supabase, ex.: 'el_imv'
};
```

Os nomes das colunas podem estar em qualquer formato (`NumeroImv`, `numeroimv`, `numero_imv`) — o site reconhece todos.

## 3. Publicar no GitHub Pages

```powershell
git init
git add .
git commit -m "Site de consulta de imóveis"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
O site fica em `https://<usuario>.github.io/<repo>/`. Os dados são lidos ao vivo a cada acesso — não é preciso republicar quando a tabela mudar.

## Filtros

- Busca livre (nº do imóvel, endereço, bairro, cidade, descrição, modalidade; ignora acentos)
- UF → Cidade → Bairro (em cascata)
- Modalidade, Financiamento (Sim/Não), somente Favoritos
- Faixa de preço, desconto mínimo (%), área privativa mínima
- Ordenação pelo cabeçalho, paginação e exportação do resultado para CSV

## Importar CSV da Caixa

O botão **Importar CSV…** lê o arquivo "Lista de Imóveis da Caixa" (`Lista_imoveis_XX.csv`, separado por `;`)
e **substitui todos os registros das UFs presentes no arquivo**: tudo dessas UFs é excluído e o conteúdo do
arquivo é inserido, evitando duplicidade. Exclusão e inserção ocorrem numa única transação — se der erro,
nada é apagado. Os favoritos são mantidos para os imóveis que continuarem na lista.

**Configuração (uma vez):** abra `supabase_importacao.sql`, troque `TROQUE-ESTA-SENHA` pela senha desejada
e rode o script no *SQL Editor* do Supabase. O site pede essa senha a cada importação; sem ela a chave
pública continua sendo só de leitura. Para trocar a senha, rode o `update` comentado no fim do script.

## Testar localmente

```powershell
python -m http.server 8000
```
e abra http://localhost:8000.
