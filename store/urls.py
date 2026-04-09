#Essas são as rotas da loja 
from django.urls import path
from rest_framework import routers
from .views import (CarrinhoViewSet, ProdutoViewSet,
                    DisciplinaViewSet, NivelViewSet,
                    AreaViewSet, TipoMaterialViewSet,
                    ItemCarrinhoViewSet, RegistroUsuarioView, 
                    MudarSenhaView, PerfilUsuarioView,
                    gerar_link_infinitepay, webhookinifinitepay)

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
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
    path('webhook/infinitepay/', webhookinifinitepay, name='webhookinifinitepay')
] + router.urls