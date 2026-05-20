#Essas são as rotas da loja 
from django.urls import path
from rest_framework import routers
from .views import (CarrinhoViewSet, ProdutoViewSet,
                    DisciplinaViewSet, NivelViewSet,
                    AreaViewSet, TipoMaterialViewSet,
                    ItemCarrinhoViewSet, RegistroUsuarioView, 
                    MudarSenhaView, PerfilUsuarioView,
                    gerar_link_infinitepay, webhookinfinitepay,
                    baixar_material, solicitar_redefinicao_senha,
                    confirmar_redefinicao_senha)

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produtos') #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'disciplinas', DisciplinaViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'nivel', NivelViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'areas', AreaViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'tipos', TipoMaterialViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'carrinho', CarrinhoViewSet, basename='carrinho') #O basename='carrinho' é necessário aqui porque sobrescrevemos a lógica padrão do get_queryset e o Django precisa de uma ajuda para nomear a rota
router.register(r'itens', ItemCarrinhoViewSet)


urlpatterns = [
    path('register/', RegistroUsuarioView.as_view(), name='auth_register'),
    path('mudar-senha/', MudarSenhaView.as_view(), name='mudar_senha'),
    path('perfil/', PerfilUsuarioView.as_view(), name='perfil_usuario'),
    path('pagar/<int:carrinho_id>/', gerar_link_infinitepay, name='gerar_pagamento_infinitepay'),
    path('webhook/infinitepay/', webhookinfinitepay, name='webhookinifinitepay'),
    path('baixar-material/<int:item_id>/', baixar_material, name='baixar-material'),
    path('esqueci-senha/', solicitar_redefinicao_senha, name='esqueci_senha'),
    path('resetar-senha/', confirmar_redefinicao_senha, name='resetar_senha'),
] + router.urls