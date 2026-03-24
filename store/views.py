# aqui você controla em python o banco de dados todas as solicitações que vem do frontend e o que você retorna
# o serializer faz a mudança de linguagem do python para o sql
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto, Carrinho, ItemCarrinho
from .serializer import (AreaSerializer, DisciplinaSerializer, NivelSerializer,
                         TipoMaterialSerializer, ProdutoSerializer, CarrinhoSerializer,
                         ItemCarrinhoSerializer, RegistroSerializer)

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset=Produto.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=ProdutoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset=Disciplina.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=DisciplinaSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class AreaViewSet(viewsets.ModelViewSet):
    queryset=Area.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=AreaSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class NivelViewSet(viewsets.ModelViewSet):
    queryset=Nivel.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=NivelSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class TipoMaterialViewSet(viewsets.ModelViewSet):
    queryset=TipoMaterial.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=TipoMaterialSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class CarrinhoViewSet(viewsets.ModelViewSet):
    serializer_class=CarrinhoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".
    
    def get_queryset(self):
        # REGRA DE SEGURANÇA: O usuário só pode ver o carrinho dele.
        usuario = self.request.user
        
        if usuario.is_anonymous:
            return Carrinho.objects.none() #Retorna um carrinho vazio para usuários anônimos.
        
        return Carrinho.objects.filter(usuario=usuario, confirmado=False) #Retorna apenas o carrinho que ainda não foi confirmado.
    
    def perform_create(self, serializer):
        # 1. Salva o carrinho e vincula ao usuário
        # Quando o carrinho for ser salvo, o Django entra aqui.
        # Nós dizemos: "Guarde o carrinho, mas force o utilizador a ser o utilizador da requisição (do token)!"
        serializer.save(usuario=self.request.user)
        carrinho_salvo = serializer.save(usuario=self.request.user)
        
        # 2. Esperamos receber uma lista de produtos do front-end, cada um com 'produto_id' e 'quantidade'.
        # Se não receber, usamos uma lista vazia [].
        produtos_do_front = self.request.data.get('produtos', []) 
        
        # 3. Fazemos um loop nessa lista de produtos e criamos um ItemCarrinho, ou item, para cada um no banco de dados.
        for item in produtos_do_front:
            ItemCarrinho.objects.create(
                carrinho=carrinho_salvo, # Liga o item ao carrinho que acabamos de criar
                produto_id=item['id'], # O ID do produto vem do front-end
                quantidade=item.get('quantidade',1) # A quantidade também vem do front-end
            )
    # O detail=True significa que essa ação precisa do ID de um carrinho específico
    # methods=['post'] significa que o React precisa mandar um POST para confirmar
    @action(detail=True,methods=['post'])
    def confirmar(self, request, pk=None):
        # 1. Pega o carrinho específico que o usuário quer confirmar pelo ID 
        carrinho_atual = self.get_object()

        # 2. Muda o status dele para True
        carrinho_atual.confirmado=True
        carrinho_atual.save() #salva a operação no banco de dados

        # 3. Devolve uma resposta de sucesso para o react
        return Response({'mensagem': 'Compra confirmada com sucesso!'})

    # detail=False: Não queremos UM carrinho específico, queremos uma LISTA geral.
    # methods=['get']: O React só vai "pedir" os dados para ler, não vai enviar ou alterar nada.
    @action(detail=False, methods=['get'])
    def historico(self, request):

        # 1. Busca no banco de dados: pega todos os carrinhos DO USUÁRIO que estão CONFIRMADOS
        carrinhos_pagos = Carrinho.objects.filter(usuario=request.user, confirmado=True)

        # 2. Chama o Tradutor (Serializer) para transformar essa lista do banco em JSON
        # O 'many=True' avisa o tradutor que isso é uma lista com vários itens, e não um só.
        dados_em_json = self.get_serializer(carrinhos_pagos, many=True)

        # 3. Entrega o arquivo em JSON para o react!
        return Response(dados_em_json.data)
        
class ItemCarrinhoViewSet(viewsets.ModelViewSet):
    serializer_class=ItemCarrinhoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".
    queryset=ItemCarrinho.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    

class RegistroUsuarioView(generics.CreateAPIView):
    queryset = User.objects.all()
    # AllowAny significa que qualquer pessoa (mesmo sem estar logada) pode acessar essa rota para criar a conta
    permission_classes = (AllowAny,) 
    serializer_class = RegistroSerializer