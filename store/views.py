from rest_framework import viewsets
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto
from .serializer import AreaSerializer, DisciplinaSerializer, NivelSerializer, TipoMaterialSerializer, ProdutoSerializer

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


