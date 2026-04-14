#Aqui irá fazer a tradução da linguagem de banco de dados para JSON
# fazendo a comunicação entre o banco de dados e o REACT
from django.contrib.auth.models import User
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


class RegistroSerializer(serializers.ModelSerializer):
    nome_completo = serializers.CharField(write_only=True, required=True)
    senha = serializers.CharField(write_only=True, required=True, min_length=4)
    confirmar_senha = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('nome_completo', 'email', 'senha', 'confirmar_senha')
        # write_only garante que a senha nunca seja devolvida na resposta (Segurança!)
        extra_kwargs = {'senha': {'write_only': True}}

    def validate(self, dados):
        if dados['senha'] != dados['confirmar_senha']:
            raise serializers.ValidationError({"senha": "As senhas não coincidem."})

        if User.objects.filter(email=dados['email']).exists():
            raise serializers.ValidationError({"email": "Este e-mail já está cadastrado."})

        return dados


    def create(self, dados_validados):
        # Pega o email
        email_do_cliente = dados_validados['email']

        # Separa o nome do sobrenome no primeiro espaço
        nome_inteiro = dados_validados['nome_completo'].strip()
        partes_do_nome = nome_inteiro.split(' ',1)

        primero_nome = partes_do_nome[0]
        sobrenome = partes_do_nome[1] if len(partes_do_nome)>1 else ''

        # Usamos o email  para que o Django faça o hash (criptografia) da senha automaticamente
        user = User.objects.create_user(
            username= email_do_cliente,
            email=email_do_cliente,
            password=dados_validados['senha'],
            first_name = primero_nome,
            last_name = sobrenome
        )
        return user


class MudarSenhaSerializer(serializers.Serializer):
    senha_atual = serializers.CharField(required=True)
    nova_senha = serializers.CharField(required=True)

    def validate_senha_atual(self, value):
        # Pega o usuário que está fazendo o pedido (através do Token)
        user = self.context['request'].user
        
        # Verifica se a senha que ele digitou bate com a do banco de dados
        if not user.check_password(value):
            raise serializers.ValidationError("A senha atual está incorreta.")
        return value

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')