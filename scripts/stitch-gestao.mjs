// Copia o build do gestao-horizon (já gerado em apps/gestao/dist, prefixado
// com /app/ via VITE_BASE_PATH — ver package.json "build:gestao") para
// dist/app/, dentro do output desta app. Usa fs.cpSync em vez de `cp -r`/
// `mkdir -p` porque esses são comandos de shell POSIX — funcionam na Vercel
// (Linux), mas não no cmd.exe que o npm usa por padrão no Windows local.
import { cpSync, mkdirSync } from 'node:fs'

mkdirSync('dist/app', { recursive: true })
cpSync('apps/gestao/dist', 'dist/app', { recursive: true })
