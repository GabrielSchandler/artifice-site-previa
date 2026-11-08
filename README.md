# Artífice Ar Condicionado — Prévia do site

Prévia do novo site da Artífice Ar Condicionado: instalação, manutenção e limpeza de ar-condicionado em São Paulo.
Preview of the new website for Artífice Ar Condicionado, an air-conditioning installation, maintenance and cleaning company in São Paulo.

[🇧🇷 Português](#-português) · [🇺🇸 English](#-english)

<p align="center">
  <img src="docs/screenshot-desktop.jpg" alt="Página inicial / Home page — desktop" width="76%">
  <img src="docs/screenshot-mobile.jpg" alt="Página inicial / Home page — mobile" width="20%">
</p>

---

## 🇧🇷 Português

### Sobre o projeto

Página única para a **Artífice Ar Condicionado**, empresa de São Paulo com nota máxima no Google. O site destaca o cuidado técnico e o atendimento direto, e todas as chamadas levam a um orçamento pelo **WhatsApp**.

> ℹ️ **Prévia de demonstração**, feita para apresentar ao cliente. Ainda não foi publicada. Contatos, avaliações e informações comerciais precisam ser confirmados com a empresa antes de ir ao ar. As fontes e pendências estão em `RESEARCH.md`.

**Seções da página:**
- **Abertura:** "Ar bem cuidado. Conforto que fica."
- **Conforto começa com cuidado:** apresentação da empresa.
- **Serviços:** instalação, manutenção e limpeza.
- **Detalhes que importam:** o padrão de acabamento.
- **Do contato ao conforto:** as etapas do atendimento.
- **Avaliações** de clientes.
- **Orçamento:** chamada final para o WhatsApp.

### Tecnologias

- HTML, CSS e JavaScript puro (sem build)
- [GSAP](https://gsap.com/) + ScrollTrigger para as animações
- [Lenis](https://lenis.darkroom.engineering/) para a rolagem suave

### Como ver localmente

Abra o `index.html` no navegador ou suba um servidor simples na pasta (recomendado, por causa das animações):

```bash
python -m http.server 8000   # http://localhost:8000
```

### Estrutura

```
index.html        página completa
site.css, styles.css, sections.css,
agency.css, responsive.css, polish.css   estilos, divididos por camada
script.js         interações e animações
assets/           imagens, logo e bibliotecas
RESEARCH.md       pesquisa, fontes e pendências
```

---

## 🇺🇸 English

### About

A single-page site for **Artífice Ar Condicionado**, a São Paulo company with a perfect Google rating. It highlights technical care and direct service, and every call-to-action leads to a **WhatsApp** quote.

> ℹ️ **Demo preview** built to pitch to the client. It hasn't been published yet. Contacts, reviews and business details must be confirmed with the company before going live. Sources and open items are in `RESEARCH.md`.

**Page sections:**
- **Hero:** "Well-kept air. Comfort that lasts."
- **Comfort starts with care:** about the company.
- **Services:** installation, maintenance and cleaning.
- **Details that matter:** the finishing standard.
- **From contact to comfort:** how the service works.
- **Customer reviews.**
- **Quote:** a final WhatsApp call-to-action.

### Tech stack

- Vanilla HTML, CSS and JavaScript (no build step)
- [GSAP](https://gsap.com/) + ScrollTrigger for animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling

### Viewing locally

Open `index.html` in a browser, or serve the folder (recommended, because of the animations):

```bash
python -m http.server 8000   # http://localhost:8000
```
