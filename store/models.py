from pyclbr import Class
from django.db import models
from django.contrib.auth.models import User 

class Area(models.Model): #Área como Ciências da Natureza ou humanas
    nome = models.CharField(max_length=100) #CharField: É o tipo de dado. Texto curto.
    
    def __str__(self): 
        return self.nome
    #Quando imprimir um objeto Area (ex: no painel admin), ele vai mostrar o nome ("Ciências da Antureza") em vez de Area object (1)
    
class Disciplina(models.Model): # Ex: Física, Biologia, Química
    nome = models.CharField(max_length=100) 
    area = models.ForeignKey(Area, on_delete=models.PROTECT) # Liga Física à area de CNT
    #on_delete=models.PROTECT impede que alguém delete e área de CNT se ainda existirem disciplinas ligadas a ela.
    
    def __str__(self):
        return self.nome

class Nivel(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome
    
class TipoMaterial(models.Model): #Ex: Slide, jogo, apostila
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome

class Produto(models.Model): 
    # Informações do produto
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True) #Texto Longo opcional
    preco = models.DecimalField(max_digits=10, decimal_places=2) # R$ 9999999999.99
    
    # As conexões (Foreign Keys)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.PROTECT)
    nivel = models.ForeignKey(Nivel, on_delete=models.PROTECT)
    tipo = models.ForeignKey(TipoMaterial, on_delete=models.PROTECT)
    
    # Arquivos
    arquivo = models.FileField(upload_to='materiais/') #Onde salvar o PDF/ZIP
    arquivo_amostra = models.FileField(upload_to='amostras_produtos/', null=True, blank=True) #O null=True e blank=True significam que não é obrigatório.
    imagem_capa = models.ImageField(upload_to='capas/', blank=True)

    def __str__(self):
        return f"{self.titulo} (R$ {self.preco})"


class Carrinho(models.Model):
    # O dono do carrinho
    usuario = models.ForeignKey(User, on_delete=models.CASCADE) # Se o usuário for deletado, o carrinho também é deletado.
    
    #Se o carrinho está aberto ou fechado (finalizado)
    confirmado = models.BooleanField(default=False)
    criando_em = models.DateTimeField(auto_now_add=True) # Data de criação do carrinho
    atualizado_em = models.DateTimeField(auto_now=True) # Data da última atualização do carrinho
    
    def __str__(self):
        return f"Carrinho de {self.usuario.username} - {'Confirmado' if self.confirmado else 'Aberto'}"

class ItemCarrinho(models.Model):
    # Lacuna 1: A qual carrinho este item pertence?
    carrinho = models.ForeignKey(Carrinho, on_delete=models.CASCADE) # Se o carrinho for deletado, os itens também são deletados.
    
    # LACUNA 2: Qual produto é este?
    produto = models.ForeignKey(Produto, on_delete=models.PROTECT) # Se o produto for deletado, o item não pode ser deletado (PROTECT)
    
    quantidade = models.PositiveIntegerField(default=1) # Quantidade do produto no carrinho (1, 2, 3...)
    
    origem_venda = models.CharField(max_length=50, default='vitrine')

    def __str__(self):
        return f"{self.produto.titulo} ({self.quantidade}x)"     