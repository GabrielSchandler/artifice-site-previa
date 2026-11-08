# Prompt — Repaginada de agência para o site da Artífice Ar Condicionado

> Cole tudo abaixo no ChatGPT (de preferência no Codex, com acesso à pasta do projeto). Anexe também `skills-design.zip` e, se o chat não tiver acesso à pasta, os arquivos do projeto.

---

Você é um diretor de arte e design engineer sênior de uma agência premiada (nível Awwwards, Site of the Day). Sua missão é **repaginar o site da Artífice Ar Condicionado** para que ele pareça feito por uma agência grande e de alto valor agregado. Ele será apresentado ao cliente em **vídeo**, então precisa estar impecável em **efeitos, transições, animações, iluminação e sombras**, sem perder clareza, desempenho, acessibilidade nem a verdade das informações.

Trabalhe com o máximo de profundidade e capricho. Pense antes de codar, decida com critério e verifique o resultado olhando para ele. Não entregue o primeiro rascunho.

## 1. Projeto

Pasta: `C:\Users\Gabriel\Desktop\PROJETOS\Outras-Empresas\artifice-ar-condicionado`

- `index.html`, `styles.css`, `sections.css`, `responsive.css`, `polish.css`, `script.js`
- `RESEARCH.md`: **leia inteiro antes de tudo**. Contém os fatos verificados, o público, a estratégia de conversão e os limites do que pode ser afirmado.
- `assets/`: `hero-room-clean.png` (2,2 MB), `ac-hero-conceitual.png` (1,4 MB), `hero-interior.webp`, `ar-condicionado-conceitual.webp`, `artifice-marca-referencia.png` (marca do cliente) e `favicon.svg`.

Site estático (HTML, CSS e JS puros). Mantenha assim, sem framework e sem build.

## 2. Skills que você deve usar

O arquivo `skills-design.zip` contém cinco skills. Cada pasta tem um `SKILL.md` com referências. **Leia cada `SKILL.md` e siga as instruções dele.** Se as skills não estiverem instaladas, descompacte o zip e leia os arquivos diretamente. Se um script de skill não puder rodar, use os `.md` e os `.csv` de dados no lugar dele e siga em frente.

| Skill | Papel nesta tarefa |
|---|---|
| `ui-ux-pro-max` | Definir o design system: paleta, tipografia, espaçamentos, UX de conversão e checklist de acessibilidade. Consulte `data/` (estilos, paletas, pares de fontes, presets GSAP). |
| `design-taste-frontend` | Direção de arte e personalidade. Escolha **uma ideia** que guie o site inteiro, monte a composição por seção e aplique as regras da casa contra “cara de IA”. Faça o ciclo olhar → corrigir com screenshots. |
| `impeccable` | Refino de detalhes: hierarquia, tipografia, cor, estados, responsivo, textos de interface e casos de borda. Use os comandos de auditoria e polimento descritos no `SKILL.md`. |
| `animate` (filosofia Emil Kowalski) | Construir cada animação na ordem certa: deve animar? Com que propósito? Com que ferramenta e propriedades? Qual curva e duração? Como ela é interrompida e como sai? |
| `improve-animations` | Ao final, auditar todo o movimento do site com a régua do `AUDIT.md` e corrigir o que for necessário. |

## 3. Diagnóstico do site atual (problemas a resolver)

1. **Excesso de rótulos numerados e em caixa alta**: “01 / O QUE FAZ DIFERENÇA”, “02 / SOLUÇÕES”, “03 / …”, “01 / 08”, “01—03”, “FIG. 01”. Isso deixa o site com cara de template. Remova os eyebrows e as numerações decorativas. Mantenha numeração só onde existe uma sequência real, como as etapas do atendimento.
2. **Textos em inglês sem motivo** (“THE ART OF AIR”, “ENGINEERED COMFORT”). O site é para clientes de São Paulo: **tudo em português**.
3. **Avisos repetidos em excesso** (“ilustrativo”, “conceitual”, “não representa…”). Concentre-os: uma legenda discreta “Imagem ilustrativa” onde for necessário e uma nota única no rodapé. O conteúdo deve continuar honesto.
4. **Desempenho**: as PNGs do topo pesam 2,2 MB e 1,4 MB. Converta para WebP/AVIF em tamanhos adequados (com `srcset`). Hospede as fontes localmente (woff2) em vez de usar o Google Fonts. São quatro CSS separados: consolide ou organize em camadas.
5. **Cards de avaliação com estrelas repetidas e numeração**: prefira um carrossel em **esteira contínua e suave** (os cards andam sem parar e circulam em loop infinito, sem pausas a cada card). Ele deve desacelerar com suavidade quando o mouse passa por cima, aceitar arrastar com inércia (mouse e toque), ter setas que deslizam um card com easing e um botão Pausar para acessibilidade. Use `transform` com `requestAnimationFrame` e clones `aria-hidden`/`inert` para o loop. Não use scroll-snap com intervalos.
6. Verifique se o rodapé está forte e compacto, sem espaço vazio. Ele deve ter: marca e uma frase, contato (telefone e WhatsApp), região (São Paulo, SP), links (Instagram, Google Maps), a nota sobre avaliações e “Voltar ao topo”.

## 4. Fatos que devem ser preservados (não invente nada)

- Nome: **Artífice Ar Condicionado**. Serviços confirmados: **instalação, manutenção e limpeza** de ar-condicionado.
- Telefone e WhatsApp: **(11) 96526-1945** (`5511965261945`). Base: São Paulo/SP (ver o endereço no `RESEARCH.md`).
- Google: **5,0 com 45 avaliações**, com a nota de que o número pode mudar.
- Avaliações: use **somente trechos reais** já presentes no site e no `RESEARCH.md`, com o nome dos autores. Não invente depoimentos, números, anos de experiência, garantia, preços, horários, marcas atendidas nem bairros atendidos.
- Mantenha a lógica de WhatsApp: mensagem pré-preenchida e o formulário de “solicitação rápida”, que só monta a mensagem e não coleta dados.
- Imagens geradas são **ilustrativas**. Não as apresente como obras reais da empresa.

## 5. Direção criativa sugerida (refine ou proponha algo melhor, desde que seja uma ideia só)

**“O ar invisível, tornado visível.”** O produto da Artífice é algo que não se vê: ar limpo, frio e silencioso. O site deixa esse ar aparecer.

- **Luz e atmosfera**: base azul-marinho profunda (`#071722`) com uma luz fria azul-gelo, como o brilho do display de um split numa sala à noite. As seções claras usam papel quente (`#f2f4f1`) para o site não parecer clínico. Sombras em várias camadas, que dão profundidade real, e brilhos com `mix-blend-mode: screen`/`plus-lighter`.
- **Momento assinatura (um só)**: no topo, linhas de fluxo de ar finas e luminosas (canvas ou SVG) saem da unidade interna e atravessam a sala lentamente, reagindo de leve à rolagem. Pode haver uma partícula de poeira ou brilho ocasional sob a luz. Nada de névoa ou desfoque cobrindo o topo.
- **Abertura**: intro curta (no máximo 1,8 s) em que o logo se desenha e uma “cortina” de ar frio sobe. Use `sessionStorage` (com try/catch) para não repetir a cada F5.
- **Serviços**: seleção guiada pela rolagem. A lista à esquerda acompanha a descida e o visual à direita (sticky) troca com uma revelação em `clip-path`. No celular, cards empilhados com imagem.
- **Precisão técnica**: a vista explodida conceitual se “monta” com scroll (peças com ScrollTrigger e `scrub`), com rótulos que aparecem por máscara.
- **Experiência do cliente**: etapas em rolagem horizontal presa (pin) no desktop e verticais no celular, com barra de progresso.
- **Comparador antes/depois do filtro**: mantenha, mais elegante, com alça magnética e legenda única “ilustrativo”.
- **Final**: CTA forte com o montador de mensagem do WhatsApp em um cartão iluminado (brilho azul-gelo e sombras profundas).
- **Tipografia**: display com personalidade (por exemplo Outfit ou Bricolage, auto-hospedada), títulos de no máximo 2 a 3 linhas, `text-wrap: balance`. Sem palavra destacada em gradiente.

## 6. Regras técnicas e de movimento (obrigatórias)

- **Stack local**: `gsap@3.12.5`, `ScrollTrigger` e `lenis@1.1.13` em `assets/vendor/`, sem CDN. Integração:
  `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`
- **Curvas** (Emil): `--ease-out: cubic-bezier(.23,1,.32,1)` para entradas e `--ease-in-out: cubic-bezier(.77,0,.175,1)` para movimento em tela. Linear apenas para loops contínuos. **Nunca** `ease-in`, `transition: all` ou `scale(0)`.
- Anime apenas `transform`, `opacity` e `clip-path`. Microinterações de UI devem durar menos de 300 ms. Entradas variam por seção (não use o mesmo fade-up em tudo) e listas entram com stagger de 30 a 80 ms.
- Hover só dentro de `@media (hover:hover) and (pointer:fine)`. Botões com `:active { transform: scale(.97) }`.
- **Não altere o cursor do mouse** e não crie efeitos que sigam o mouse pela página inteira.
- `prefers-reduced-motion`: animações **mais suaves, não zero**. Corte movimentos e parallax e mantenha fades. Sem intro e sem esteira automática.
- **Sem JS o conteúdo precisa aparecer.** Os estados ocultos devem ficar só sob `html.js` (classe adicionada por um script no `<head>`).
- Acessibilidade: contraste AA, foco visível, `alt` corretos, menu móvel com `inert` e Esc para fechar, `aria-live` onde fizer sentido, alvos de toque com pelo menos 44 px.
- Desempenho: imagens com `width`/`height`, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` no visual do topo. Animações a 60 fps e nenhum layout shift. Pause canvas e loops quando estiverem fora da tela.
- SEO e local: `<title>`/`description` em PT-BR, Open Graph e JSON-LD `HVACBusiness` com telefone, endereço e `aggregateRating` (5,0 / 45).

## 7. Processo de trabalho

1. Leia `RESEARCH.md`, o código atual e os cinco `SKILL.md`.
2. Escreva um plano curto: a ideia central, o design system (tokens) e o blueprint de cada seção com sua animação e o propósito dela.
3. Faça backup do original (`index-antes-da-repaginada.html` e os CSS e JS atuais numa pasta `backup/`).
4. Implemente por camadas: estrutura → tipografia e cor → layout responsivo → luz e sombras → animações.
5. **Verifique olhando**: rode localmente (`python -m http.server`) e tire screenshots (Playwright ou o navegador) em **1440, 768 e 390 px**, no topo, no meio das animações e no fim. Teste também com reduced motion e sem JS. Confira se o console está sem erros e se não há rolagem horizontal. Corrija o que estiver feio e repita até ficar bom.
6. Rode a auditoria do `improve-animations` e a checklist do `impeccable` e aplique as correções.
7. Atualize `RESEARCH.md` com uma seção “Repaginada de agência” (o que mudou e quais avisos permanecem).

## 8. Entrega

- O site repaginado salvo na mesma pasta (com `index.html` na raiz, abrindo direto pelo `file://`).
- Um resumo curto: a ideia criativa, o que mudou por seção, a lista de efeitos para mostrar no vídeo e na ordem em que aparecem, e os pontos que o cliente precisa confirmar (logo em alta resolução, contagem de avaliações e fotos reais de serviços).

**Critério de sucesso:** alguém que abrir o site deve achar que ele custou caro. Em 5 segundos precisa entender o que a Artífice faz e como pedir um orçamento. Nada pode parecer genérico, e nenhuma informação pode ser inventada.
