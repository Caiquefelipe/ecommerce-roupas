<script setup lang="ts">
import { ref, computed } from 'vue'
import jaquetaImagem from 'src/assets/jaqueta-de-couro-chanel-3-750x937-removebg-preview.png'
import VestidoImagem from 'src/assets/vestido-floral.png'
import CalcaAzulEscuro from 'src/assets/calca-jeans-azul-escuro.png'
import Camiseta from 'src/assets/camiseta.png'
import CamisetaPreta from 'src/assets/camiseta-preta.png'
import DialogCarrinhoDeCompras from 'src/components/DialogCarrinhoDeCompras.vue'
import DialogDetalhesProduto from 'src/components/DialogDetalhesProduto.vue'
import type { Produto } from 'src/interfaces/Produtos'
import DialogPagamento from './DialogPagamento.vue'

const filtro = ref('')
const dialogCarrinhoDeCompra = ref<typeof DialogCarrinhoDeCompras>()
const dialogPagamento = ref<typeof DialogPagamento>()
const produtoSelecionado = ref<Produto | null>(null)

const produtos = ref<Produto[]>([
  {
    id: 1,
    nome: 'Camiseta Branca',
    preco: 49.9,
    descricao: 'Camiseta de algodão confortável.',
    imagem: Camiseta,
    quantidade: 0
  },
  {
    id: 2,
    nome: 'Calça Jeans',
    preco: 129.9,
    descricao: 'Calça jeans azul escuro.',
    imagem: CalcaAzulEscuro,
    quantidade: 0
  },
  {
    id: 3,
    nome: 'Vestido Floral',
    preco: 89.9,
    descricao: 'Vestido leve com estampa floral.',
    imagem: VestidoImagem,
    quantidade: 0
  },
  {
    id: 4,
    nome: 'Jaqueta de Couro',
    preco: 199.9,
    descricao: 'Jaqueta estilosa de couro sintético.',
    imagem: jaquetaImagem,
    quantidade: 0
  },
  {
    id: 5,
    nome: 'Camiseta Preta',
    preco: 49.9,
    descricao: 'Camiseta preta básica.',
    imagem: CamisetaPreta,
    quantidade: 0
  }
])

const produtosAdicionados = ref<Produto[]>([])

function adicionarAoCarrinho(produto: Produto) {
  const item = produtosAdicionados.value.find(p => p.id === produto.id)
  if (item) {
    item.quantidade++
  } else {
    produtosAdicionados.value.push({
      ...produto,
      quantidade: 1
    })
  }
}

function adiconarProduto(index: number) {
  const item = produtosAdicionados.value[index]
  if (item) {
    item.quantidade++
  }
}

function removerProduto(index: number) {
  const item = produtosAdicionados.value[index]
  if (item!.quantidade > 1) {
    item!.quantidade--
  } else {
    produtosAdicionados.value.splice(index, 1)
  }
}

function voltarParaCarrinho() {
  dialogCarrinhoDeCompra.value?.show()
}


function verDetalhes(produto: Produto) {
  produtoSelecionado.value = produto
}

function fecharDetalhes() {
  produtoSelecionado.value = null
}

const totalItens = computed(() =>
  produtosAdicionados.value.reduce((acc, p) => acc + p.quantidade, 0)
)

const produtosFiltrados = computed(() =>
  produtos.value.filter(p =>
    p.nome.toLowerCase().includes(filtro.value.toLowerCase())
  )
)
</script>

<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="text-h4 text-center q-mb-lg text-primary">🛍️ Minha Loja de Roupas</div>
    <div class="row items-center q-mb-md">
      <q-input filled v-model="filtro" label="Buscar produto..." style="width: 94vw;" />
      <q-btn flat round color="primary" icon="fa-solid fa-cart-shopping" size="lg"
        @click="dialogCarrinhoDeCompra?.show()">
        <q-badge v-if="totalItens > 0" color="red" floating>
          {{ totalItens }}
        </q-badge>
      </q-btn>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="produto in produtosFiltrados" :key="produto.id">
        <q-card class="my-card shadow-3 column full-height" style="height: 100%;">
          <q-img :src="produto.imagem" :alt="produto.nome" height="250px" fit="contain" />

          <q-card-section>
            <div class="text-subtitle1 text-weight-bold">{{ produto.nome }}</div>
            <div class="text-subtitle2 text-green-9">R$ {{ produto.preco.toFixed(2) }}</div>
            <div class="text-caption q-mt-sm">{{ produto.descricao }}</div>
          </q-card-section>

          <q-card-actions class="q-mt-auto flex justify-around">
            <q-btn label="Detalhes" flat color="primary" @click="verDetalhes(produto)" />
            <q-btn label="Adicionar ao Carrinho" flat color="green" icon="shopping_cart"
              @click="adicionarAoCarrinho(produto)" />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </q-page>
  <DialogCarrinhoDeCompras ref="dialogCarrinhoDeCompra" :itens="produtosAdicionados" @remover="removerProduto"
    @adiconar="adiconarProduto" @pagar="dialogPagamento?.show()" />



  <DialogDetalhesProduto :produto="produtoSelecionado" @fechar="fecharDetalhes" @adicionar="adicionarAoCarrinho" />

  <DialogPagamento ref="dialogPagamento" :itens="produtosAdicionados"
    @confirmar="() => { produtosAdicionados.length = 0 }" @adicionar="adiconarProduto" @remover="removerProduto"
    @fechar="voltarParaCarrinho" />


</template>

<style scoped>
.my-card {
  transition: transform 0.2s ease-in-out;
}

.my-card:hover {
  transform: scale(1.03);
}
</style>
