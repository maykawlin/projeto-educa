from django.contrib import admin
from .models import (Area, Disciplina, Nivel, TipoMaterial,
                     Produto, Carrinho, ItemCarrinho)

# ==========================================
# 1. TABELAS DE APOIO (Categorias)
# ==========================================
admin.site.register(Area)
admin.site.register(Disciplina)
admin.site.register(Nivel)
admin.site.register(TipoMaterial)

# ==========================================
# 2. A "FÁBRICA" (Gestão de Materiais)
# ==========================================
@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    # Removido o campo 'ativo'
    list_display = ('id', 'titulo', 'preco') 
    
    search_fields = ('titulo', 'descricao') 
    
    # Agora só o preço é editável direto na lista
    list_editable = ('preco',) 

# ==========================================
# 3. O "ESCRITÓRIO" (Gestão de Vendas / Visão CEO)
# ==========================================
class ItemCarrinhoInline(admin.TabularInline):
    model = ItemCarrinho
    extra = 0 
    
    readonly_fields = ('produto', 'quantidade') 
    can_delete = False

@admin.register(Carrinho)
class CarrinhoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'usuario', 'confirmado')
    
    list_filter = ('confirmado',)
    
    search_fields = ('usuario__email', 'usuario__username', 'id') 
    
    inlines = [ItemCarrinhoInline]