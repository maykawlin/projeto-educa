#Essas são as rotas da loja 
from rest_framework import routers
from .views import ProdutoViewSet, DisciplinaViewSet, NivelViewSet, AreaViewSet, TipoMaterialViewSet

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'disciplinas', DisciplinaViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'nivel', NivelViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'areas', AreaViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).
router.register(r'tipos', TipoMaterialViewSet) #(O r antes da string significa "Raw String", útil para caminhos web).

urlpatterns = router.urls
