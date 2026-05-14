# 🌿 Parque Ilha Bela — Hub de Conteúdo

Hub de geração de prompts, roteiros e métricas para os 4 funis de captura do Parque Ilha Bela.

## O que tem aqui

- **Gerador de Prompts** — selecione funil + ângulo + tipo, gere o prompt completo pronto para colar no ChatGPT
- **4 Funis** — Geral (S1), Sênior 50+ (S2), FGTS CLT (S3), Urgência (S4)
- **9 Ângulos** — Contrário, História, Curiosidade, Conspiração, Paradoxal, Pop Quiz, Truque, Nova Descoberta, Problema/Solução
- **Roteiros Salvos** — salve e organize os prompts gerados
- **Métricas & Testes** — banco de dados de criativos, top hooks, horizontal vs vertical

## Deploy no Vercel (passo a passo)

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "feat: hub inicial Parque Ilha Bela"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ilhabela-hub.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **New Project**
3. Selecione o repositório `ilhabela-hub`
4. Configurações (já detectadas automaticamente via `vercel.json`):
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Clique em **Deploy**

Pronto — o Vercel gera uma URL pública em ~1 minuto.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`
