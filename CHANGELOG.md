# Changelog

## [1.0.0] - 2024-03-19

### Adicionado
- Implementação inicial do site da Maranjá
- Sistema de seleção de idiomas (PT/EN)
- Componentes de bandeiras para seleção de idioma
- Seções principais do site:
  - Hero
  - Serviços
  - Contato
  - Footer

### Melhorias
- Design responsivo para todas as seções
- Integração com WhatsApp
- Formulário de contato
- Animações e transições suaves

### Correções
- Ajuste nas bandeiras de idioma para melhor visualização
- Correção de espaçamentos e alinhamentos
- Padronização de fontes e cores

### Técnico
- Configuração do Vite + React + TypeScript
- Implementação do Tailwind CSS
- Integração com Supabase
- Configuração de rotas com React Router
- Implementação de componentes reutilizáveis com shadcn/ui

## [1.0.1] - 2024-03-19

### Correções de UI
- Corrigida centralização dos ícones nos cards de serviços
- Ajustado tamanho e alinhamento dos containers de ícones (w-20 h-20)
- Padronizado estilo dos botões de demonstração entre versões PT/EN
- Melhorada consistência visual dos cards de serviços

### Melhorias Técnicas
- Otimizado build de produção
- Atualizado PostCSS config para melhor compatibilidade
- Ajustado tamanho dos chunks no build

## [1.0.0] - 2024-01-17 20:30

### Configuração Inicial do Deploy
- Criado novo repositório maranja-site-new
- Configurado GitHub Pages para usar pasta /docs
- Adicionado CNAME para domínio personalizado maranja.com.br

### Correções de Deploy
- Alterado BrowserRouter para HashRouter para compatibilidade com GitHub Pages
- Ajustado base path no vite.config.ts de "/maranja-site-new/" para "./"
- Removido workflow do GitHub Actions devido a problemas de permissão
- Configurado deploy manual via GitHub Pages usando pasta /docs

### Correções de Domínio
- Adicionado arquivo CNAME na pasta public e docs
- Corrigido problema de carregamento de recursos com paths absolutos
- Ajustado base URL no vite.config.ts para suportar domínio personalizado

### Melhorias de UI
- Implementadas bandeiras do Brasil e EUA usando CSS puro
- Otimizado tamanho e proporções das bandeiras (28x20px)
- Ajustado círculo da bandeira do Brasil para perfeita circularidade
- Melhorada a responsividade geral do site

### Correções Técnicas
- Resolvido problema de 404 em recursos estáticos
- Corrigido carregamento de assets no domínio personalizado
- Ajustado Mixed Content warning para HTTPS
- Otimizado carregamento de imagens e recursos

## [Data de hoje] - Atualizações

- Adicionado checklist de serviços nos formulários (português e inglês)
- Atualizado templates de email para incluir serviços selecionados (equipe e cliente)
- Corrigido e atualizado configuração do PostCSS para compatibilidade com Tailwind e Vite
- Ajustado fontes: títulos e cards agora usam Lora Regular (400)
- Melhorias visuais nos cards de serviços (tamanhos, cores, suavidade)
- Ajustes de layout e responsividade em seções principais
- Corrigido botão do WhatsApp (tamanho, logo, idioma)
- Build de produção gerado para deploy 