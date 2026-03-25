# 🚐 Sistema de Gerenciamento de Transporte Escolar (SGPA)

> **Status do Projeto:** 🟢 Em Desenvolvimento  
> Sistema centralizado para controle de pagamentos, gestão de fluxo de alunos e otimização logística de rotas escolares.

---

## 📝 Descrição do Projeto

Este sistema foi projetado para automatizar e organizar a rotina de transportadores escolares. Ele resolve problemas comuns de gestão, como o esquecimento de baixas de pagamento, a perda de histórico de alunos desligados e a complexidade na organização de rotas diárias com base nos horários variados dos estudantes.

---

## 🎯 Objetivo

O principal objetivo deste projeto é fornecer uma ferramenta robusta que minimize erros humanos na gestão financeira e logística, garantindo um histórico transparente para o prestador de serviço e uma melhor organização das rotas diárias.

---

## 🚀 Tecnologias

* **Frontend:** TypeScript e React.ts
* **Backend:** Python, Django e DjangoRest
* **Banco de Dados:** PostgreSQL
* **Estilização:** Tailwind CSS
* **Segurança:** JWT (JSON Web Tokens)

---

## ✨ Funcionalidades

### 💳 Gestão Financeira
- **Baixa de Pagamentos:** Registro simplificado com campos para descrição ou observações.
- **Automação de Horários:** Registro automático da data e hora exata da baixa de pagamento.
- **Métodos de Pagamento:** Cadastro do método utilizado (Pix, Dinheiro, Cartão, etc.).
- **Cálculo de Pendências:** Sistema inteligente que calcula automaticamente valores adicionais ou valores devidos para o mês subsequente.

### 👥 Gestão de Alunos
- **Cadastro Completo:** Armazenamento de dados críticos (Nome do aluno, nome dos responsáveis, escola atual, contatos, etc.).
- **Controle de Estado:** Alteração de status (Ativo/Inativo) para alunos que cancelarem ou retomarem o serviço.
- **Recuperação de Histórico:** Aba exclusiva para consulta de alunos inativos com opção de reativação imediata.

### 📍 Logística e Rotas
- **Inteligência de Rotas:** Visualização da rota específica de acordo com o horário escolar de cada aluno.
- **Roteirização Automática:** Algoritmo para criação de rotas otimizadas.
- **Edição Flexível:** Permite a criação manual de rotas ou ajustes pontuais nas rotas geradas pelo sistema.

### 🛡️ Segurança e Auditoria
- **Logs do Sistema:** Registro detalhado de todas as ações realizadas (quem alterou, o que foi alterado e quando).

---

## 👨‍💻 Autor

Desenvolvido por Manoel Pinto Junior.
Sinta-se à vontade para entrar em contato para sugestões!
