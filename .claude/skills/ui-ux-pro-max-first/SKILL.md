---
name: ui-ux-pro-max-first
description: >
  Design intelligence personalizado para a First Brazil. Use SEMPRE que Matheus ou o time
  precisar construir, estruturar, revisar ou melhorar qualquer interface — landing page,
  seção de site, componente, dashboard, formulário ou embed. Ative imediatamente para
  qualquer pedido que contenha "build", "crie", "construa", "monte", "estruture",
  "design", "componente", "seção", "página", "landing", "embed", "layout" ou variações.
  Gera automaticamente: (1) estrutura de página com seções nomeadas e ordenadas,
  (2) paleta de cores por tipo de projeto, (3) tipografia recomendada, (4) anti-patterns
  a evitar, (5) checklist de entrega Framer. Todos os outputs saem prontos para
  Framer embed HTML. Nunca aplica o brand da First Brazil (#504BBF / Montserrat)
  em projetos de clientes — cada cliente recebe identidade própria.
---

# UI/UX Pro Max — First Brazil Edition

Design intelligence especializado para a stack e os clientes da First Brazil.
Toda vez que for construir qualquer interface, execute este fluxo ANTES de gerar código.

---

## FLUXO OBRIGATÓRIO (executar sempre)

```
1. IDENTIFICAR o tipo de projeto (ver Perfis abaixo)
2. GERAR estrutura de página (seções + ordem)
3. DEFINIR paleta + tipografia para o contexto
4. LISTAR anti-patterns a evitar
5. APRESENTAR checklist Framer antes do código
6. ENTÃO gerar o código
```

Nunca pule etapas. A estrutura de página vem SEMPRE primeiro.

---

## STACK: FRAMER EMBED HTML

Todas as interfaces são entregues como embeds HTML para Framer. Regras obrigatórias:

**O que NUNCA incluir:**
- Tags `<html>`, `<head>`, `<body>`, `<!DOCTYPE>`
- `box-shadow` (use `filter: drop-shadow()` ou `outline`)
- `position: fixed` (quebra o canvas do Framer)
- Fontes carregadas via `<link>` no `<head>` (não existe `<head>` no embed)

**O que SEMPRE fazer:**
- Carregar fontes via `@import` dentro do `<style>` do próprio componente
- Usar `ResizeObserver` para detecção de breakpoint (nunca `window.resize` puro)
- Fundo transparente por padrão: `background: transparent`
- Todas as interações em `pointer-events: auto` explicitamente nos elementos clicáveis
- Altura dinâmica: usar `min-height` em vez de `height` fixo sempre que possível
- Z-index máximo seguro: `999` (acima disso conflita com o canvas do Framer)
- Testar em larguras: `375px`, `768px`, `1280px`

**Template base de embed:**
```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=FONTE_AQUI&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .embed-root {
    font-family: 'FONTE_AQUI', sans-serif;
    background: transparent;
    width: 100%;
  }
</style>

<div class="embed-root">
  <!-- conteúdo -->
</div>

<script>
  // ResizeObserver para breakpoints responsivos
  const root = document.querySelector('.embed-root');
  const ro = new ResizeObserver(entries => {
    const w = entries[0].contentRect.width;
    root.classList.toggle('mobile', w < 768);
    root.classList.toggle('tablet', w >= 768 && w < 1024);
    root.classList.toggle('desktop', w >= 1024);
  });
  ro.observe(root);
</script>
```

---

## PERFIS DE PROJETO

### PERFIL 1 — Real Estate / Construção
*Clientes: MassDwell, Mosaico / Villa Avenitts, Izix Home Building, Cisplan*

**Estrutura de página padrão:**
```
1. Hero             — Headline forte + subheadline + CTA primário + imagem/video de impacto
2. Proposta de valor — 3 diferenciais em cards (ícone + título + descrição)
3. Produto / Galeria — Showcase visual (modelos, plantas, renders)
4. Como funciona    — Processo em 3–4 etapas numeradas
5. Prova social     — Depoimentos + números (unidades entregues, m², anos de mercado)
6. CTA secundário   — Formulário de contato ou agendamento
7. Rodapé           — Endereço, redes, copyright
```

**Paleta por sub-tipo:**
| Sub-tipo | Primária | Secundária | CTA | Fundo | Texto |
|----------|----------|------------|-----|-------|-------|
| Luxo / alto padrão | `#1A1A2E` (navy) | `#C9A84C` (gold) | `#C9A84C` | `#F8F5F0` | `#1A1A2E` |
| Modular / industrial | `#2D3436` (carvão) | `#00B894` (verde) | `#00B894` | `#FFFFFF` | `#2D3436` |
| Empreendimento popular | `#1565C0` (azul) | `#FF6F00` (laranja) | `#FF6F00` | `#FAFAFA` | `#212121` |
| ADU / EUA | `#263238` (slate) | `#4CAF50` (green) | `#4CAF50` | `#FFFFFF` | `#263238` |

**Tipografia:**
- Luxo: `Cormorant Garamond` (headings) + `Lato` (body)
- Modular/industrial: `Space Grotesk` (headings) + `Inter` (body)
- ADU/EUA: `Sora` (headings) + `Inter` (body)

**Anti-patterns — NUNCA usar:**
- Gradientes roxos ou "AI aesthetic" (desvia da seriedade do setor)
- Animações rápidas (<150ms) — parecem instáveis para produto de alto valor
- Cards com sombra excessiva (usa `filter: drop-shadow(0 4px 12px rgba(0,0,0,0.08))`)
- Tipografia script/cursiva em títulos
- Background escuro total em sites de construtora brasileira (reservar para luxury)

---

### PERFIL 2 — Hospitalidade / Turismo
*Clientes: Jangal das Araucárias e similares*

**Estrutura de página padrão:**
```
1. Hero imersivo    — Foto/vídeo full-width + headline emocional + CTA de reserva
2. Experiência      — O que o hóspede vai viver (storytelling visual)
3. Acomodações      — Cards com galeria, nome, capacidade, comodidades
4. Localização      — Mapa + como chegar + o que tem por perto
5. Sobre / História — Breve história do espaço (humaniza a marca)
6. Depoimentos      — Reviews com foto + nome + data
7. Reserva / CTA    — Formulário ou botão para booking externo
8. Rodapé
```

**Paleta:**
| Tom | Primária | Secundária | CTA | Fundo | Texto |
|-----|----------|------------|-----|-------|-------|
| Nature premium | `#2D5016` (verde escuro) | `#8B4513` (marrom) | `#C19A6B` (areia dourada) | `#FAF7F2` | `#1C1C1C` |
| Montanha / frio | `#1B3A4B` (azul noite) | `#6B8E7A` (sage) | `#E8C547` (mel) | `#F5F2EE` | `#1C1C1C` |

**Tipografia:**
- Headlines: `Playfair Display` ou `Cormorant Garamond`
- Body: `Lato` ou `Source Serif 4`
- Mood: elegante, orgânico, acolhedor

**Anti-patterns:**
- UI tech/corporativa (fontes geométricas frias, ícones de app)
- Branco puro `#FFFFFF` como fundo (usar off-white quente `#FAF7F2`)
- CTAs vermelhos (associação a urgência/pressão — inadequado para hospitalidade premium)
- Grid rígido com muito espaço vazio sem imagem (hospitality precisa de imagem)

---

### PERFIL 3 — Agência / Consultoria
*Cliente: First Brazil (própria agência) ou consultoria B2B*

**Estrutura de página padrão:**
```
1. Hero             — Proposta de valor + CTA de diagnóstico/reunião
2. Problema         — Dor do cliente (tabbed ou scroll storytelling)
3. Solução / Método — Como a agência resolve (etapas ou framework)
4. Resultados       — Casos, números, depoimentos
5. Serviços         — Cards de serviços com hover state
6. Time / Quem somos — (opcional) humaniza a agência
7. CTA final        — Formulário de contato ou calendly embed
8. Rodapé
```

**Paleta:**
| Contexto | Primária | Secundária | CTA | Fundo | Texto |
|----------|----------|------------|-----|-------|-------|
| First Brazil | `#504BBF` | `#7B76D3` | `#504BBF` | `#0C0B1A` | `#FFFFFF` |
| Agência cliente genérica | Derivar do brief do cliente | — | — | `#0A0A0A` ou `#FFFFFF` | — |

> ⚠️ **REGRA DE ISOLAMENTO DE BRAND:** O sistema de cores da First Brazil (`#504BBF`, Montserrat, `#0C0B1A`) só é aplicado quando o projeto for explicitamente da própria First Brazil. Para qualquer outro cliente, derive a paleta do brief do cliente ou do perfil acima. **Nunca vaze o brand da First em trabalhos de terceiros.**

**Tipografia First Brazil:** `Montserrat` (headings) + `Inter` (body)
**Tipografia agência genérica:** `Plus Jakarta Sans` (headings) + `Inter` (body)

**Anti-patterns:**
- Layouts muito "template-y" (Wix/Squarespace padrão)
- Seção de preços sem ancoragem clara de valor
- Formulário de contato como único CTA (sempre oferecer alternativa: WhatsApp ou reunião)

---

## CHECKLIST DE ENTREGA — FRAMER EMBED

Validar ANTES de entregar qualquer componente:

```
FRAMER
[ ] Sem tags <html>, <head>, <body>, <!DOCTYPE>
[ ] Fontes carregadas via @import no <style>, não via <link>
[ ] Sem box-shadow (usar filter: drop-shadow se necessário)
[ ] Sem position: fixed
[ ] Fundo transparente (background: transparent no elemento raiz)
[ ] ResizeObserver implementado para responsividade
[ ] Z-index máximo: 999
[ ] Testado em 375px, 768px, 1280px

ACESSIBILIDADE
[ ] Contraste texto/fundo mínimo 4.5:1 (WCAG AA)
[ ] Todos os botões com cursor: pointer
[ ] Hover states com transição 150–300ms
[ ] Focus states visíveis para navegação por teclado
[ ] Imagens com alt text

QUALIDADE
[ ] Sem emojis como ícones (usar SVG: Heroicons ou Lucide)
[ ] Sem texto hardcoded em inglês em projetos BR (verificar labels, placeholders)
[ ] CTAs com verbo de ação claro
[ ] Nenhuma animação abaixo de 150ms
[ ] prefers-reduced-motion respeitado
```

---

## OUTPUT PADRÃO

Sempre que receber um pedido de interface, responda nesta ordem:

### 1. ESTRUTURA DE PÁGINA
```
PERFIL DETECTADO: [Real Estate / Hospitalidade / Agência]
PRODUTO: [nome do projeto]

SEÇÕES RECOMENDADAS:
1. [Nome da seção] — [descrição em uma linha]
2. ...
```

### 2. IDENTIDADE VISUAL
```
PALETA:
  Primária:   #XXXXXX  (nome)
  Secundária: #XXXXXX  (nome)
  CTA:        #XXXXXX  (nome)
  Fundo:      #XXXXXX  (nome)
  Texto:      #XXXXXX  (nome)

TIPOGRAFIA:
  Headings: [Fonte] — [Google Fonts URL]
  Body:     [Fonte] — [Google Fonts URL]

ESTILO VISUAL: [nome do estilo + 1 linha de descrição]
```

### 3. ANTI-PATTERNS
```
EVITAR neste projeto:
- [item 1]
- [item 2]
- [item 3]
```

### 4. CHECKLIST FRAMER
(versão resumida dos itens críticos para o componente específico)

### 5. CÓDIGO
Somente após as etapas acima.

---

## REFERÊNCIA RÁPIDA DE ESTILOS

| Estilo | Melhor para | Evitar quando |
|--------|-------------|---------------|
| Minimalism | SaaS, agências, portfólio | Marca quente/emocional |
| Editorial Brutalism | Agências criativas, portfólio | Público conservador (banco, saúde) |
| Soft UI / Neumorphism | Wellness, beleza, apps leves | Dashboards densos de dados |
| Dark Premium | Luxo, tech, imóvel alto padrão | Educação, saúde, público 50+ |
| Bento Grid | SaaS, dashboards, portfólios modernos | Landing pages longas |
| Nature Organic | Hospitalidade, alimentos, sustentabilidade | B2B tech |
| Corporate Clean | Imobiliária padrão, jurídico, finanças | Marca jovem/irreverente |
