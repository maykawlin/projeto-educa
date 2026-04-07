from rest_framework.test import APITestCase
from rest_framework import status

class LojaAPITest(APITestCase):
    
    def test_api_produtos_esta_online(self):
        """Testa se a rota da vitrine de produtos está respondendo corretamente"""
        
        # 1. O nosso "robô" entra na URL da API
        resposta = self.client.get('/api/produtos/')
        
        # 2. Nós afirmamos (Assert) que o código de status DEVE ser 200 (OK / Sucesso)
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        
    def test_acesso_carrinho_usuario_anonimo(self):
        """Testa se o Django bloqueia usuários sem login de verem históricos alheios"""
        
        # 1. O robô tenta acessar o carrinho (sem estar logado/sem token)
        resposta = self.client.get('/api/carrinho/')
        
        # 2. Como não tem login, a resposta TEM que ser uma lista vazia ou erro 401
        # No seu views.py, você configurou para retornar vazio (código 200, mas sem dados)
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        # Verifica se o carrinho devolvido tem 0 itens
        self.assertEqual(len(resposta.data), 0)


    def test_perfil_bloqueado_sem_login(self):
        """Testa se a rota de perfil barra curiosos sem Token/Bearer"""
        
        # 1. O robô tenta acessar o perfil sem se identificar (sem enviar o token)
        resposta = self.client.get('/api/perfil/')
        
        # 2. Nós afirmamos que o Django DEVE dar um tapa na mão dele com o Erro 401 (Não Autorizado)
        self.assertEqual(resposta.status_code, status.HTTP_401_UNAUTHORIZED)