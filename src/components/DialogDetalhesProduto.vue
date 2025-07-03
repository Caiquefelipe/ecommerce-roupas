<script setup lang="ts">
import { Produto } from 'src/interfaces/Produtos'
import { ref, watch } from 'vue'

const props = defineProps<{
  produto: Produto | null
}>()

const emit = defineEmits<{
  (e: 'fechar'): void
  (e: 'adicionar', produto: Produto): void
}>()

const dialogVisivel = ref(false)

watch(() => props.produto, (val) => {
  dialogVisivel.value = val !== null
})
</script>

<template>
  <q-dialog v-model="dialogVisivel" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ produto?.nome }}</div>
      </q-card-section>

      <q-img :src="produto?.imagem" :alt="produto?.nome" height="250px" width="400px" fit="contain" />

      <q-card-section>
        <div class="text-subtitle1 text-green-9">
          R$ {{ produto?.preco.toFixed(2) }}
        </div>
        <div class="q-mt-sm">{{ produto?.descricao }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" @click="emit('fechar')" />
        <q-btn flat label="Adicionar ao Carrinho" color="green" @click="emit('adicionar', produto!)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
