from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import Aluno
from .serializers import AlunoSerializer, UserSerializer, LoginSerializer

User = get_user_model()


class RegisterView(APIView):
    """View para registro de novos usuários"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """View para login de usuários"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })
            return Response(
                {'error': 'Credenciais inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """View para logout de usuários"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'detail': 'Logout realizado com sucesso'})
        except Exception:
            return Response(
                {'error': 'Token inválido'},
                status=status.HTTP_400_BAD_REQUEST
            )


class MeView(APIView):
    """View para obter dados do usuário autenticado"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(UserSerializer(request.user).data)


class AlunoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar operações CRUD de Alunos.
    
    Endpoints disponíveis:
    - GET /api/alunos/ - Lista todos os alunos
    - POST /api/alunos/ - Cria um novo aluno
    - GET /api/alunos/{id}/ - Obtém detalhes de um aluno
    - PUT /api/alunos/{id}/ - Atualiza um aluno
    - PATCH /api/alunos/{id}/ - Atualização parcial de um aluno
    - DELETE /api/alunos/{id}/ - Deleta um aluno
    """
    
    queryset = Aluno.objects.filter(ativo=True)
    serializer_class = AlunoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Permite filtrar alunos por escola e outros parâmetros"""
        queryset = Aluno.objects.all()
        
        # Filtro por escola
        escola = self.request.query_params.get('escola', None)
        if escola:
            queryset = queryset.filter(escola=escola)
        
        # Filtro por turno
        turno = self.request.query_params.get('turno', None)
        if turno:
            queryset = queryset.filter(turno=turno)
        
        # Filtro por tipo de transporte
        tipo = self.request.query_params.get('tipo', None)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        
        # Filtro por forma de pagamento
        forma_pagamento = self.request.query_params.get('forma_pagamento', None)
        if forma_pagamento:
            queryset = queryset.filter(forma_pagamento=forma_pagamento)
        
        # Filtro por status
        ativo = self.request.query_params.get('ativo', None)
        if ativo is not None:
            ativo_bool = ativo.lower() == 'true'
            queryset = queryset.filter(ativo=ativo_bool)
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Cria um novo aluno com validação completa"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def perform_update(self, serializer):
        """Realiza a atualização do aluno"""
        serializer.save()
    
    def destroy(self, request, *args, **kwargs):
        """Soft delete - marca aluno como inativo ao invés de deletar"""
        instance = self.get_object()
        instance.ativo = False
        instance.save()
        return Response(
            {'detail': 'Aluno marcado como inativo.'},
            status=status.HTTP_204_NO_CONTENT
        )
    
    @action(detail=False, methods=['get'])
    def por_escola(self, request):
        """
        Endpoint customizado para listar alunos por escola.
        
        Uso: GET /api/alunos/por_escola/?escola=Colégio%20Pinheiros
        """
        escola = request.query_params.get('escola', None)
        if not escola:
            return Response(
                {'error': 'Parâmetro "escola" é obrigatório'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        alunos = Aluno.objects.filter(escola=escola, ativo=True)
        serializer = self.get_serializer(alunos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_turno(self, request):
        """
        Endpoint customizado para listar alunos por turno.
        
        Uso: GET /api/alunos/por_turno/?turno=matutino
        """
        turno = request.query_params.get('turno', None)
        if not turno:
            return Response(
                {'error': 'Parâmetro "turno" é obrigatório'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        alunos = Aluno.objects.filter(turno=turno, ativo=True)
        serializer = self.get_serializer(alunos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def estatisticas(self, request):
        """
        Retorna estatísticas sobre os alunos.
        
        Uso: GET /api/alunos/estatisticas/
        """
        total_alunos = Aluno.objects.filter(ativo=True).count()
        por_turno = {}
        for turno, label in Aluno.TURNO_CHOICES:
            por_turno[label] = Aluno.objects.filter(turno=turno, ativo=True).count()
        
        por_tipo = {}
        for tipo, label in Aluno.TIPO_CHOICES:
            por_tipo[label] = Aluno.objects.filter(tipo=tipo, ativo=True).count()
        
        por_pagamento = {}
        for forma, label in Aluno.FORMA_PAGAMENTO_CHOICES:
            por_pagamento[label] = Aluno.objects.filter(forma_pagamento=forma, ativo=True).count()
        
        return Response({
            'total_alunos': total_alunos,
            'por_turno': por_turno,
            'por_tipo': por_tipo,
            'por_forma_pagamento': por_pagamento,
        })
