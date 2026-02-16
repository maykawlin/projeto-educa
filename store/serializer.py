#Aqui irá fazer a tradução da linguagem de banco de dados para JSON
# fazendo a comunicação entre o banco de dados e o REACT
from rest_framework import serializers
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto

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
        