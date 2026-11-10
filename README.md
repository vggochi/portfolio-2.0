# Portfólio — Valentina Gochi (versão aprimorada)

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html` no navegador ou a pasta no VS Code.
3. Não precisa instalar dependências nem executar npm. A página `certificados.html` é acessada pelo menu ou pelo card de conquistas.

## O que foi aprimorado
- Camadas 3D animadas na composição principal, parallax e movimento dos cartões.
- Efeito tilt 3D nos cartões de projetos e conquistas.
- Logos em imagem para linguagens e ferramentas; bandeiras em imagem para idiomas.
- Área para imagens reais de emblemas Cisco.
- Página separada `certificados.html` com grade de emblemas e certificados.
- Links de demonstração e repositório separados em cada projeto.
- Atalhos para LinkedIn e WhatsApp configuráveis.
- Mantido o visual azul e responsivo e o favicon.

## Personalização obrigatória (config.js)
Abra `config.js` e atualize:
- `linkedin`: URL completa do seu perfil.
- `whatsapp`: link `https://wa.me/55DDDNUMERO`, com código do país, DDD e número, sem espaços.
- `email`: seu e-mail profissional.
- `projects`: links `demo` (site publicado) e `repo` (GitHub) de cada projeto.

TaskUp e Detetives da Informação já têm links de repositório preenchidos com os endereços conhecidos. Confirme se estão corretos antes de publicar. VOLT e MetaVest precisam dos seus links. Os links de demonstração ficam desativados até você informar a URL real.

## Imagens dos emblemas e certificados
- Cisco: coloque a imagem real em `assets/badges/adicionar-emblema-cisco.png`.
- Outro emblema: `assets/badges/adicionar-outro-emblema.png`.
- Certificados: use `assets/certificados/adicionar-certificado-01.png`, `adicionar-certificado-02.png` e `adicionar-certificado-03.png`.
- Você pode substituir os nomes dos arquivos, mas também deve atualizar os caminhos no HTML.
- Os cartões têm texto demonstrativo para orientar a personalização. Não publique nomes/datas que não correspondam a certificados reais.

## Logos de tecnologias
Os logos são carregados por URL do Devicon (requer internet). As imagens de bandeiras também são carregadas online. O restante do site funciona localmente.

## Arquivos
- `index.html`: página principal.
- `certificados.html`: página independente de certificados e emblemas.
- `styles.css`: identidade visual, responsividade e animações.
- `script.js`: menu, reveal, efeitos 3D e links de projetos.
- `config.js`: URLs pessoais e dos projetos.
- `assets/favicon.svg`: ícone da aba do navegador.
