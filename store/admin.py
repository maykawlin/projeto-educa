from django.contrib import admin
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto

# Isso diz ao Django: "Crie uma interface para eu gerenciar essas tabelas"

admin.site.register(Area)
admin.site.register(Disciplina)
admin.site.register(Nivel)
admin.site.register(TipoMaterial)
admin.site.register(Produto)
