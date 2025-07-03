<script setup lang="ts">
import type { Produto } from 'src/interfaces/Produtos';
import { ref, computed } from 'vue'

const props = defineProps<{
    itens: Produto[]
}>()

const emit = defineEmits<{
    (e: 'fechar'): void
    (e: 'confirmar'): void
    (e: 'adicionar', index: number): void
    (e: 'remover', index: number): void
}>()

const dialogVisivel = ref(false)

const nome = ref('')
const email = ref('')
const formaPagamento = ref('credito')

const total = computed(() =>
    props.itens.reduce((acc, p) => acc + p.preco * p.quantidade, 0)
)

function finalizarCompra() {
    if (!nome.value || !email.value) {
        alert('Preencha todos os campos!')
        return
    }

    alert(`Compra finalizada no valor de R$ ${total.value.toFixed(2)}!`)
    emit('confirmar')
    hide()
}

function show() {
    dialogVisivel.value = true
}

function hide() {
    dialogVisivel.value = false
    emit('fechar')
}

defineExpose({ show })
</script>

<template>
    <q-dialog v-model="dialogVisivel" persistent>
        <q-card style="min-width: 400px">
            <q-card-section>
                <div class="text-h6">Finalizar Pagamento</div>
            </q-card-section>

            <q-card-section>
                <div v-if="props.itens.length">
                    <div v-for="(item, index) in props.itens" :key="item.id" class="q-mb-md">
                        <div class="row items-center justify-between">
                            <div>
                                {{ item.nome }} - R$ {{ (item.preco * item.quantidade).toFixed(2) }}
                            </div>
                            <div class="row items-center">
                                <q-btn flat dense round icon="remove" color="red" @click="emit('remover', index)" />
                                <div class="q-px-sm">{{ item.quantidade }}</div>
                                <q-btn flat dense round icon="add" color="green" @click="emit('adicionar', index)" />
                            </div>
                        </div>
                    </div>
                    <div class="text-subtitle1 text-weight-bold q-mt-sm">Total: R$ {{ total.toFixed(2) }}</div>
                </div>

                <div v-else class="text-grey text-center">
                    Carrinho vazio.
                </div>

                <q-input v-model="nome" label="Nome Completo" class="q-mt-md" />
                <q-input v-model="email" label="E-mail" type="email" class="q-mt-md" />

                <q-select v-model="formaPagamento" label="Forma de Pagamento" :options="[
                    { label: 'Cartão de Crédito', value: 'credito' },
                    { label: 'Pix', value: 'pix' },
                    { label: 'Boleto', value: 'boleto' }
                ]" class="q-mt-md" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" @click="hide" />

                <q-btn flat label="Finalizar Compra" color="green" @click="finalizarCompra" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
