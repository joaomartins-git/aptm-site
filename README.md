[![CI](https://github.com/joaomartins-git/aptm-site/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/joaomartins-git/aptm-site/actions/workflows/ci.yml)


# APTM Website

Modern, responsive business website for [Associação Portuguesa de Terapia da Mão](https://aptm.pt) built with Next.js 16, TypeScript, and Tailwind CSS.

## ✨ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with APTM brand colors
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **UI Components**: Radix UI

## 🎨 Design System

### Cores da Marca APTM
- **Primary Blue**: #2563eb (Blue-600)
- **Secondary Blue**: #1e40af (Blue-800)
- **Light Gray**: #f8fafc (Slate-50)
- **Medium Gray**: #64748b (Slate-500)
- **Dark Gray**: #1e293b (Slate-800)
- **White**: #ffffff

### Breakpoints Responsivos
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px+

## 📱 Funcionalidades Implementadas

### ✅ Páginas Principais
- **Home** (`/`) - Hero secção, serviços destacados, eventos, CTA
- **About** (`/about`) - Missão, visão, equipa, histórico, estatísticas
- **Services** (`/services`) - Catálogo completo de serviços e preços
- **Events** (`/events`) - Placeholder com tipos de eventos e calendário
- **Trainings** (`/trainings`) - Placeholder com programa de certificação
- **Contact** (`/contact`) - Formulário de contacto, FAQ, localização

### ✅ Componentes e Funcionalidades
- **Header** - Navegação responsiva com dropdowns
- **Footer** - Links úteis e informações de contacto
- **SearchBar** - Barra de pesquisa integrada
- **Form Validation** - Validação com React Hook Form e Zod
- **Responsive Design** - Mobile-first approach
- **SEO Optimization** - Meta tags otimizadas
- **Accessibility** - Componentes acessíveis

### ✅ Componentes UI Reutilizáveis
- `Button` - Variants (primary, secondary, outline, ghost, destructive)
- `Card` - Header, content, footer
- `Input` - Com labels e validation
- `Textarea` - Para formulários
- `Badge` - Para tags e status

## 🚀 Setup e Instalação

### Pré-requisitos
- Node.js 18+ ou superior
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd aptm-site
```

2. Instale as dependências:
```bash
npm install
```

3. Copie o ficheiro de ambiente (se necessário):
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔧 Configuração

### Variáveis de Ambiente
Configure as seguintes variáveis em `.env.local`:

```env
# Configurações do site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=APTM

# Configurações de contacto
NEXT_PUBLIC_CONTACT_EMAIL=geral@aptm.pt
NEXT_PUBLIC_CONTACT_PHONE=+351210000000

# Configurações sociais
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TWITTER_URL=
```

## Contact Form Configuration

The contact form can send emails via Resend or use mock delivery in development.

### Production Email Setup (Resend)

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. Configure environment variables:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_RECIPIENT=your-email@example.com
```

### Development Mock Mode

If `RESEND_API_KEY` or `CONTACT_RECIPIENT` are not set, the form will:
- Log submissions to console
- Return success response without sending real emails
- Perfect for development and testing

### Rate Limiting

The contact API includes basic rate limiting (1 request per minute per IP) to prevent abuse.

## 📊 SEO e Performance

### Meta Tags
- Title templates dinâmicos
- Descrições otimizadas
- Open Graph e Twitter Cards
- Sitemap automático

### Performance
- Imagens otimizadas com Next.js Image
- Code splitting automático
- Static generation onde possível
- Fontes otimizadas

## 🧪 Testes e Qualidade

### Validação
```bash
# Verificar tipos TypeScript
npm run type-check

# Verificar linting
npm run lint

# Build de produção
npm run build
```

### Browser Compatibility
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Outras Plataformas
O site pode ser deployado em qualquer plataforma que suporte aplicações Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📋 TODO (Desenvolvimento Futuro)

- [ ] Sistema de gestão de eventos dinâmico
- [ ] Portal de membros com autenticação
- [ ] Integração com CMS para gestão de conteúdo
- [ ] Sistema de pagamentos online
- [ ] Newsletter e notificações
- [ ] Blog com artigos técnicos
- [ ] Área de recursos para membros
- [ ] Integração Google Maps
- [ ] API para dados de eventos e formações

## 🤝 Contribuição

1. Fork o repositório
2. Crie uma feature branch (`git checkout -b feature/amazing-feature`)
3. Commit as suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o ficheiro [LICENSE](LICENSE) para detalhes.

## 📞 Contacto

**APTM - Associação Portuguesa de Terapia da Mão**
- 📧 geral@aptm.pt
- 📞 +351 210 000 000
- 📍 Rua da Saúde, 123, 1000-001 Lisboa, Portugal

---

**Desenvolvido com ❤️ para a comunidade de terapia da mão em Portugal**