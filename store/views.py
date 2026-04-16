# aqui você controla em python o banco de dados todas as solicitações que vem do frontend e o que você retorna
# o serializer faz a mudança de linguagem do python para o sql
import requests
import uuid
from django.http import FileResponse
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import Area, Disciplina, Nivel, TipoMaterial, Produto, Carrinho, ItemCarrinho
from .serializer import (AreaSerializer, DisciplinaSerializer, NivelSerializer,
                         TipoMaterialSerializer, ProdutoSerializer, CarrinhoSerializer,
                         ItemCarrinhoSerializer, RegistroSerializer, MudarSenhaSerializer,
                         PerfilSerializer)

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset=Produto.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    serializer_class=ProdutoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset=Disciplina.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Disciplina".
    serializer_class=DisciplinaSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class AreaViewSet(viewsets.ModelViewSet):
    queryset=Area.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Area".
    serializer_class=AreaSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class NivelViewSet(viewsets.ModelViewSet):
    queryset=Nivel.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Nivel".
    serializer_class=NivelSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class TipoMaterialViewSet(viewsets.ModelViewSet):
    queryset=TipoMaterial.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela TipoMaterial".
    serializer_class=TipoMaterialSerializer #Significado: "Use esta classe para transformar os produtos em JSON".

class CarrinhoViewSet(viewsets.ModelViewSet):
    serializer_class=CarrinhoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".
    
    def get_queryset(self):
        # REGRA DE SEGURANÇA: O usuário só pode ver o carrinho dele.
        usuario = self.request.user
        
        if usuario.is_anonymous:
            return Carrinho.objects.none() #Retorna um carrinho vazio para usuários anônimos.
        
        return Carrinho.objects.filter(usuario=usuario, confirmado=False) #Retorna apenas o carrinho que ainda não foi confirmado.
    
    def perform_create(self, serializer):
        # 1. Salva o carrinho e vincula ao usuário
        # Quando o carrinho for ser salvo, o Django entra aqui.
        # Nós dizemos: "Guarde o carrinho, mas force o utilizador a ser o utilizador da requisição (do token)!"
        serializer.save(usuario=self.request.user)
        carrinho_salvo = serializer.save(usuario=self.request.user)
        
        # 2. Esperamos receber uma lista de produtos do front-end, cada um com 'produto_id' e 'quantidade'.
        # Se não receber, usamos uma lista vazia [].
        produtos_do_front = self.request.data.get('produtos', []) 
        
        # 3. Fazemos um loop nessa lista de produtos e criamos um ItemCarrinho, ou item, para cada um no banco de dados.
        for item in produtos_do_front:
            ItemCarrinho.objects.create(
                carrinho=carrinho_salvo, # Liga o item ao carrinho que acabamos de criar
                produto_id=item['id'], # O ID do produto vem do front-end
                quantidade=item.get('quantidade',1) # A quantidade também vem do front-end
            )
    # O detail=True significa que essa ação precisa do ID de um carrinho específico
    # methods=['post'] significa que o React precisa mandar um POST para confirmar
    @action(detail=True,methods=['post'])
    def confirmar(self, request, pk=None):
        # 1. Pega o carrinho específico que o usuário quer confirmar pelo ID 
        carrinho_atual = self.get_object()

        # 2. Muda o status dele para True
        carrinho_atual.confirmado=True
        carrinho_atual.save() #salva a operação no banco de dados

        # 3. Devolve uma resposta de sucesso para o react
        return Response({'mensagem': 'Compra confirmada com sucesso!'})

    # detail=False: Não queremos UM carrinho específico, queremos uma LISTA geral.
    # methods=['get']: O React só vai "pedir" os dados para ler, não vai enviar ou alterar nada.
    @action(detail=False, methods=['get'])
    def historico(self, request):

        # 1. Busca no banco de dados: pega todos os carrinhos DO USUÁRIO que estão CONFIRMADOS
        carrinhos_pagos = Carrinho.objects.filter(usuario=request.user, confirmado=True)

        # 2. Chama o Tradutor (Serializer) para transformar essa lista do banco em JSON
        # O 'many=True' avisa o tradutor que isso é uma lista com vários itens, e não um só.
        dados_em_json = self.get_serializer(carrinhos_pagos, many=True)

        # 3. Entrega o arquivo em JSON para o react!
        return Response(dados_em_json.data)
        
class ItemCarrinhoViewSet(viewsets.ModelViewSet):
    serializer_class=ItemCarrinhoSerializer #Significado: "Use esta classe para transformar os produtos em JSON".
    queryset=ItemCarrinho.objects.all() #Significado: "Quando alguém chamar essa View, pegue todos os objetos da tabela Produto".
    

class RegistroUsuarioView(generics.CreateAPIView):
    queryset = User.objects.all()
    # AllowAny significa que qualquer pessoa (mesmo sem estar logada) pode acessar essa rota para criar a conta
    permission_classes = (AllowAny,) 
    serializer_class = RegistroSerializer


class MudarSenhaView(generics.UpdateAPIView):
    # EXTREMAMENTE IMPORTANTE: Só usuários logados com Token podem acessar essa rota!
    permission_classes = (IsAuthenticated,)
    serializer_class = MudarSenhaSerializer

    def get_object(self):
        # O "alvo" da mudança é o próprio usuário que está logado
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        # Se a senha atual passou pelo nosso validador...
        if serializer.is_valid():
            # Pegamos a nova senha
            nova_senha = serializer.validated_data.get("nova_senha")
            
            # set_password é mágico: ele pega a senha crua ("Mudar@123") e transforma num código criptografado seguro
            user.set_password(nova_senha)
            user.save()
            
            return Response({"mensagem": "Senha atualizada com sucesso!"}, status=status.HTTP_200_OK)

        # Se a senha atual estiver errada, devolvemos o erro (ex: código 400)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PerfilUsuarioView(generics.RetrieveAPIView):
    
    permission_classes = (IsAuthenticated,)
    serializer_class = PerfilSerializer

    def get_object(self):
        # Retorna magicamente os dados do dono do Token
        return self.request.user


### DOWNLOAD SEGURO DO PDF

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def baixar_material(request, item_id):
    try:
        # Pega o item específico que o cliente quer baixar
        item = ItemCarrinho.objects.get(id=item_id)

        # Verifica se o carrinho é do usuário E está pago
        if item.carrinho.usuario != request.user or not item.carrinho.confirmado:
            return Response({"erro": "Acesso negado"}, status = status.HTTP_402_FORBIDDEN)

        # Verifica se o produto tem um arquivo salvo
        if not item.produto.arquivo:
            return Response({"erro": "Arquivo não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # Entrega o arquivo para o navegador baixar
        arquivo = item.produto.arquivo
        return FileResponse(arquivo.open('rb'), as_attachment=True, filename=arquivo.name.split('/')[-1])

    except ItemCarrinho.DoesNotExist:
        return Response({"erro": "Item não encontrado."}, status=status.HTTP_404_NOT_FOUND)




### INFINITEPAY GERAR LINK

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def gerar_link_infinitepay(request, carrinho_id):
    try:
        # Pega o carrinho aberto do usuário logado
        carrinho = Carrinho.objects.get(id=carrinho_id, usuario=request.user, confirmado=False)
        itens_carrinho = ItemCarrinho.objects.filter(carrinho=carrinho)
        
        itens_payload = []
        for item in itens_carrinho:
            # InfinitePay exige o valor em CENTAVOS
            preco_centavos = int(item.produto.preco * 100) 
            itens_payload.append({
                "quantity": item.quantidade,
                "price": preco_centavos,
                "description": item.produto.titulo[:50] 
            })
            
        if len(itens_payload) == 0:
            return Response({"erro": "O carrinho está vazio."}, status=status.HTTP_400_BAD_REQUEST)

        order_nsu_personalizado = f"PEDIDO-{carrinho.id}-{str(uuid.uuid4())[:8]}"
        
        payload = {
            "handle": "MINHA-TAG-AQUI", # ⚠️ ATENÇÃO: COLOQUE SUA TAG AQUI ⚠️
            "order_nsu": order_nsu_personalizado,
            "items": itens_payload,
            "redirect_url": "http://localhost:5173/historico",
            "webhook_url": "MEU-NGROK-AQUI/api/webhook/infinitepay/", 
            "customer": {
                "name": request.user.first_name or request.user.username,
                "email": request.user.email
            }
        }
        
        url_infinitepay = "https://api.infinitepay.io/invoices/public/checkout/links"
        headers = { "Content-Type": "application/json" }
        
        resposta = requests.post(url_infinitepay, json=payload, headers=headers)
        
        if resposta.status_code == 200 or resposta.status_code == 201:
            dados_resposta = resposta.json()
            return Response({"url_pagamento": dados_resposta.get("url")})
        else:
            print("Erro InfinitePay:", resposta.text)
            return Response({"erro": "Falha ao gerar link de pagamento na InfinitePay."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    except Carrinho.DoesNotExist:
        return Response({"erro": "Carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)


### INFINITEPAY WEBHOOK

@api_view(['POST'])
@permission_classes([AllowAny]) # Permite que os robôs da infinitepay, que não tem login nos dê o link de confirmação.
def webhookinfinitepay(request):
    try:
        # 1. Recebemos os dados da InfinitePay
        dados = request.data
        print("\n 🔔 [WEBHOOK] Mensagem recebida da InfinitePay:", dados)

        if not dados:
            print("⚠️ [WEBHOOK] Mensagem chegou vazia!")
            return Response({"erro": "Sem dados"}, status=status.HTTP_400_BAD_REQUEST)

        print("\n🔔 [WEBHOOK] Mensagem recebida da InfinitePay:", dados)

        # 2. Pegamos o número do pedido que geramos antes
        order_nsu = dados.get('order_nsu')

        if not order_nsu:
            return Response({"erro": "Faltou o order_nsu"},status=status.HTTP_400_BAD_REQUEST)
        
        # 3. Enviamos o pedido no formato "PEDIDO-15-a1b2". Vamos extrair o ID, que no caso é o 15.
        partes_nsu = order_nsu.split('-')

        if len(partes_nsu) >= 2 and partes_nsu[0] == "PEDIDO":
            carrinho_id = partes_nsu[1]

            try:
                # 4. Temos que encontrar esse carrinho no banco de dados
                carrinho = Carrinho.objects.get(id=carrinho_id)

                # 5. Muda o status daquele carrinho para pago
                carrinho.confirmado = True
                carrinho.save()

                print(f"✅ [SUCESSO] Carrinho {carrinho_id} atualizado para PAGO")

                # A InfinitePay exige uma resposta rápida com 200 OK
                return Response({"mensagem": "Webhook processado com sucesso"}, status=status.HTTP_200_OK)

            except Carrinho.DoesNotExist:
                print(f"❌ [ERRO] Carrinho {carrinho_id} não encontrado no banco")
                return Response({"erro": "Carrinho não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"erro": "Formato de order_nsu inválido"},status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print("❌ [ERRO GRAVE NO WEBHOOK]:",str(e))
        return Response({'erro': "Erro interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)