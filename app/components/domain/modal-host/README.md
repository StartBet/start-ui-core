# StModalHost

Host central de modais da aplicação (camada de UI global). Ele escuta o `modalStore` e decide qual modal renderizar.

## Objetivo

- Manter o `DefaultLayout` limpo, sem blocos grandes de markup de modais
- Centralizar a lógica de qual modal está ativo

## Arquivos

- Implementação: [StModalHost.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/domain/modal-host/StModalHost.vue)
- Testes: [StModalHost.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/domain/modal-host/StModalHost.test.ts)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/domain/modal-host/index.ts)

## Como adicionar um novo modal (passo a passo)

1. Adicione o novo nome do modal no store:
   - Edite `AppModalName` em [modalStore/index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/stores/modalStore/index.ts)
   - Exemplo: `export type AppModalName = 'login' | 'register'`

2. Crie o componente do modal dentro de `domain/modals`:
   - Crie uma pasta: `app/components/domain/modals/<nome-do-modal>/`
   - Siga o padrão do projeto:
     - `README.md`
     - `St<Nome>Modal.vue`
     - `St<Nome>Modal.interface.ts` (se necessário)
     - `St<Nome>Modal.test.ts`
     - `index.ts`
   - Padrão de API recomendado: `open?: boolean` + `@update:open` para fechar (compatível com `v-model:open`).

3. Registre o modal no Host:
   - Importe o componente em [StModalHost.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/domain/modal-host/StModalHost.vue)
   - Crie o `computed` de visibilidade baseado em `modal.active`
   - Renderize o componente com `:open="..."` e `@update:open="..."` para chamar `modal.open(...)`/`modal.close()`

4. Dispare a abertura de qualquer lugar da UI:
   - Use o store `useModalStore()` e chame `modal.open('<nome>')`
   - Exemplo no header: `@click="modal.open('login')"`

5. Garanta testes:
   - Adicione/ajuste teste do `StModalHost` para cobrir o novo modal
   - Adicione teste do modal (`St<Nome>Modal.test.ts`) validando render/fechamento
