#Aqui irá fazer a tradução da linguagem de banco de dados para JSON
# fazendo a comunicação entre o banco de dados e o REACT
from rest_framework import serializers
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto, Carrinho, ItemCarrinho

# Tradutor da Área
class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

#Tradutor da Disciplina
class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Disciplina
        fields='__all__'
        
#Tradutor do Nível
class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Nivel
        fields='__all__'
        
#Tradutor do Tipo do Material
class TipoMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model=TipoMaterial
        fields='__all__'
        
        
#Tradutor do Produto
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Produto
        fields='__all__'
        depth = 1 # gera o JSON com os dados relacionados (chaves estrangeiras) em vez de apenas os IDs.
        
class ItemCarrinhoSerializer(serializers.ModelSerializer):
    # Aqui já mostrremos o título e preço do produto para o fron-end não ter trabalho extra para buscar essas informações.
    produto_titulo = serializers.CharField(source='produto.titulo', read_only=True) # Campo extra para mostrar o título do produto
    produto_preco = serializers.DecimalField(source='produto.preco', max_digits=10, decimal_places=2, read_only=True) # Campo extra para mostrar o preço do produto
    produto_arquivo = serializers.FileField(source='produto.arquivo', read_only=True)

    class Meta:
        model = ItemCarrinho
        fields = ['id', 'carrinho', 'produto', 'produto_titulo', 'produto_preco', 'produto_arquivo', 'quantidade'] # Inclui os campos extras no JSON

class CarrinhoSerializer(serializers.ModelSerializer):
    # Aqui trazemos os itens do carrinho já com as informações do produto (título e preço) para facilitar o trabalho do front-end.
    itens = ItemCarrinhoSerializer(source='itemcarrinho_set', many=True, read_only=True) # Campo extra para mostrar os itens do carrinho   
    
    class Meta:
        model = Carrinho
        fields = ['id', 'usuario', 'confirmado', 'itens'] # Inclui os itens do carrinho no JSON
        read_only_fields = ['usuario'] # O campo 'usuario' é somente leitura, pois será definido automaticamente com base no usuário autenticado.