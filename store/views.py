from rest_framework import viewsets
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto, Carrinho, ItemCarrinho
from .serializer import (AreaSerializer, DisciplinaSerializer, NivelSerializer,
                         TipoMaterialSerializer, ProdutoSerializer, CarrinhoSerializer,
                         ItemCarrinhoSerializer)

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
        
        return Carrinho.objects.filter(usuario, confirmado=False) #Retorna apenas o carrinho que ainda não foi confirmado.
    
class ItemCarrinhoViewSet(viewsets.ModelViewSet):
    serializer_class=ItemCarrinhoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".
    queryset=ItemCarrinho.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    