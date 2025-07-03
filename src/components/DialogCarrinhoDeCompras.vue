<script setup lang="ts">
import { ref } from 'vue'
import type { Produto } from 'src/interfaces/Produtos'

const props = defineProps<{
    itens: Produto[]
}>()

const emit = defineEmits<{
    (e: 'remover', index: number): void
    (e: 'adiconar', index: number): void
    (e: 'pagar'): void
}>()

const dialog = ref(false)

function show() {
    dialog.value = true
}

console.log(props)

function hide() {
    dialog.value = false
}

defineExpose({ show })
</script>

<template>
    <q-dialog v-model="dialog" persistent>
        <q-card style="width: 100vw; max-width: 600px">
            <q-card-section class="row items-center justify-between">
                <div class="text-h6">Carrinho de Compras</div>
                <q-btn flat icon="close" @click="hide" />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div v-if="props.itens.length">
                    <q-list>
                        <q-item v-for="(item, index) in props.itens" :key="item.id" class="q-pb-sm">
                            <q-item-section>
                                <div class="text-subtitle1">{{ item.nome }}</div>
                                <div class="text-caption">Preço unitário: R$ {{ item.preco.toFixed(2) }}</div>
                            </q-item-section>

                            <q-item-section side>
                                <div class="row items-center">
                                    <q-btn flat dense round icon="remove" color="red" @click="emit('remover', index)" />
                                    <div class="q-px-sm">{{ item.quantidade }}</div>
                                    <q-btn flat dense round icon="add" color="green" @click="emit('adiconar', index)" />
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>

                <div v-else class="column items-center text-grey q-mt-md">
                    <q-icon name="remove_shopping_cart" size="64px" class="q-mb-md" color="grey-5" />
                    <div class="text-subtitle1">Seu carrinho está vazio</div>
                    <div class="text-caption">Adicione produtos para começar suas compras!</div>
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" v-if="props.itens.length">
                <q-btn label="Ir para o Pagamento" color="primary" @click="() => { hide(); emit('pagar') }" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
