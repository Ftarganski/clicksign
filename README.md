# 🚀 Clicksign Test SPA

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18.3+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Bem-vindo ao Clicksign Test SPA!** 🎉

Deploy em [Clicksign Test](https://clicksign-two.vercel.app)

_Uma aplicação React + Vite + Tailwind focada em arquitetura moderna, componentes reutilizáveis e experiência de usuário responsiva._

</div>

---

## 🗂️ Estrutura do Projeto

```
clicksign/
├── __tests__/                # Testes unitários (helpers, hooks)
│   ├── helpers/              # Testes dos helpers
│   └── hooks/                # Testes dos hooks customizados
├── messages/                 # Internacionalização (en, pt)
├── public/                   # Assets estáticos (favicon, imagens, etc)
├── src/
│   ├── api/                  # APIs de domínio (ex: projetos)
│   ├── components/           # Componentes de UI e módulos de domínio
│   │   ├── modules/          # Componentes de domínio (Fallbacks, Filters, Forms, Header, Projects, etc)
│   │   └── ui/               # Componentes de UI reutilizáveis (botão, input, tabela, etc)
│   ├── helpers/              # Funções utilitárias
│   ├── hooks/                # React hooks customizados
│   ├── pages/                # Páginas principais da aplicação
│   ├── routes/               # Rotas e layouts
│   ├── styles/               # Estilos globais (Tailwind)
│   ├── types/                # Tipos TypeScript
│   ├── utils/                # Utilidades gerais
│   └── validators/           # Schemas de validação
├── ... (configs, scripts, etc)
```

### 🧩 Arquitetura & Princípios

- **Componentização**: UI dividida em módulos reutilizáveis (Cards, Filtros, Formulários, Header, etc)
- **Hooks customizados**: `useMobile`, `useProcessedData`, `useSearchHistory` e outros
- **i18n**: Suporte a inglês e português via arquivos em `messages/`
- **SOLID & Clean Code**: Separação de responsabilidades, nomes claros, funções pequenas, tipagem forte
- **Tailwind CSS**: Design moderno, responsivo, com tokens customizados e animações
- **Acessibilidade**: ARIA, navegação por teclado, foco visível

---

## ✨ Funcionalidades Implementadas

- Exibição inicial sem nenhum projeto cadastrado, conforme design
- Exibição do título da página e total de projetos cadastrados
- Filtro para exibir apenas projetos favoritos
- Ordenação da listagem por:
  - Ordem alfabética (padrão)
  - Projetos iniciados mais recentemente
  - Projetos próximos à data de finalização
- Página com formulário de criação de projeto
- Página com formulário de edição de projeto
- Modal de confirmação de remoção
- Favoritar/desfavoritar projetos
- Barra de busca (mínimo 3 caracteres para disparar)
- Histórico das últimas 5 buscas recentes
- Highlight no texto dos resultados que correspondam à busca

---

## ⚡ Performance & Qualidade

- 🎯 **Hooks otimizados** com useCallback e useMemo
- 🔄 **Componentes memoizados** para evitar re-renderizações
- ❌ **Tratamento de erros** com mensagens claras e componentes dedicados
- 🕹️ **Feedback visual** para todas as ações (sucesso, erro, vazio)
- 💾 **Persistência**: Filtros, favoritos e preferências salvos no localStorage
- 📱 **Responsivo**: Layout adaptado para desktop e mobile
- � **Internacionalização**: Troca de idioma em tempo real
- ♿ **Acessibilidade total**
- 🧹 **Linting e formatação** automáticos
- 🔒 **Documentação** estilo TypeScript com JSDoc

---

## 🗄️ Backend Simulado (LocalStorage)

Este projeto utiliza uma API simulada baseada em LocalStorage do navegador, válida apenas para a sessão atual. Todos os dados de projetos, favoritos, buscas e alterações são persistidos localmente e não são compartilhados entre diferentes navegadores, dispositivos ou sessões.

> **Atenção:** Para uso em produção, é necessário implementar e conectar uma API real para persistência e integração dos dados.

---

## 💻 Instalação & Execução

### Pré-requisitos

- **Node.js >=20**
- **npm** ou **yarn**
- **Git**

### Passos rápidos

```bash
# 1. Clone o repositório:
git clone https://github.com/Ftarganski/clicksign.git
cd clicksign

# 2. Instale as dependências:
npm install
# ou
yarn

# 3. Inicie o servidor de desenvolvimento:
npm run dev
# ou
yarn dev

# 4. Acesse no navegador:
http://localhost:5173
```

---

## 🧪 Testes Automatizados

O projeto possui cobertura de testes unitários para helpers, hooks e lógica de domínio usando **Jest** e **Testing Library**.

### Rodando os testes

Execute todos os testes:

```bash
npm run test
# ou
npx jest --config=jest.config.cjs
```

Execute apenas os testes de helpers:

```bash
npx jest --config=jest.config.cjs __tests__/helpers
```

### Exemplos de cobertura

- Testes de helpers: formatação de datas, hash, manipulação de imagens, extração de iniciais, truncamento de texto, internacionalização, etc.
- Testes de hooks: responsividade, queries e mutations de API (mockadas), histórico de buscas.

### Boas práticas

- Uso de mocks para APIs e localStorage.
- Separação de testes por domínio (helpers, hooks, components).
- Utilização de `jest.spyOn` para funções globais e side effects.
- Garantia de que todos os helpers e hooks tenham testes!

---

## ⚡ Por que você vai gostar

- 🏎️ **Super Rápido:** Alimentado pelo Vite para recarregamentos instantâneos.
- 🧩 **Modular:** Limpo, escalável e fácil de estender.
- 🎨 **UI Bonita:** TailwindCSS para um visual moderno e responsivo.
- 🌍 **Pronto para i18n:** Inglês e Português nativos.
- 🧠 **TypeScript:** Código seguro e confiável com tipagem.
- 🧪 **Fácil de Testar:** Separação clara entre lógica e interface.
- 📱 **Amigável para Mobile:** Funciona bem em qualquer dispositivo.

---

## 📜 Scripts Disponíveis

| Script    | Descrição                            | Comando           |
| --------- | ------------------------------------ | ----------------- |
| `dev`     | Inicia o servidor de desenvolvimento | `npm run dev`     |
| `build`   | Gera build de produção               | `npm run build`   |
| `preview` | Preview do build de produção         | `npm run preview` |
| `test`    | Executa todos os testes unitários    | `npm run test`    |

---

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/SuaFeature`)
3. **Commit** suas alterações (`git commit -m 'feat: SuaFeature'`)
4. **Push** para o repositório (`git push origin feature/SuaFeature`)
5. Abra um **Pull Request**

### Padrões de Código

- **ESLint** para lint
- **Prettier** para formatação
- **Commits convencionais**
- **JSDoc** para documentação
- **PropTypes** para validações

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Ftarganski](https://github.com/Ftarganski)

- 📧 Email: [dev@targanski.com](mailto:dev@targanski.com)
- 💼 LinkedIn: [Ftarganski](https://www.linkedin.com/in/targanski/)
- 🐱 GitHub: [Ftarganski](https://github.com/Ftarganski)

---

## 📄 Licença

Projeto licenciado sob **MIT License** - veja o arquivo [LICENSE](LICENSE).

---

## 🙏 Agradecimentos

- **Clicksign** pela oportunidade
- **React** pelo framework
- **Vite** pelo build tool
- **Tailwind CSS** pelo design system
- **Comunidade Open Source** pelas ferramentas

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Feito com ☕ por **Ftarganski**
