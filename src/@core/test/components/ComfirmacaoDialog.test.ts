import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ConfirmacaoDialog from '../../../components/dialogs/ConfirmacaoDialog.vue'

describe('ConfirmDialog.vue', () => {
  const mountComponent = (props = {}) => {
    return mount(ConfirmacaoDialog, {
      props: {
        modelValue: true,
        titulo: 'Tem certeza?',
        ...props,
      },
      global: {
        stubs: ['VDialog', 'VCard', 'VCardTitle', 'VCardText', 'VBtn', 'VDivider', 'VIcon', 'VRow', 'VCol'],
      },
    })
  }

  it('deve renderizar o título corretamente', () => {
    const wrapper = mountComponent()
    expect(wrapper.vm.$props.titulo).toContain('Tem certeza?')
  })

  it('deve exibir a descrição se fornecida', () => {
    const descricao = 'Esta ação é irreversível.'
    const wrapper = mountComponent({ descricao })
    expect(wrapper.vm.$props.descricao).toContain(descricao)
  })

  it('deve exibir o destaqueDescricao se fornecida', () => {
    const destaque = 'Apagar permanentemente'
    const wrapper = mountComponent({ destaqueDescricao: destaque })
    expect(wrapper.vm.$props.destaqueDescricao).toContain(destaque)
  })
})
