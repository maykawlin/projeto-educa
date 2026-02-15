from django.db import models

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
    imagem_capa = models.ImageField(upload_to='capas/', blank=True)

    def __str__(self):
        return f"{self.titulo} (R$ {self.preco})"
