from django.shortcuts import render
from rest_framework import viewsets, mixins, generics, permissions, status
from project_app.models import *
from .serializers import *
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import permission_required, login_required
from django.contrib.admin.views.decorators import staff_member_required

User = get_user_model()

# Create your views here.
class AnimeViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    ordering = 'id'
    ordering_fields = ['id']
    search_fields = ['id', 'nombre']
    

class MangaViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer
    ordering = 'id'
    ordering_fields = ['id']
    search_fields = ['id', 'nombre']


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)
        
        # Obtener los datos del usuario
        user_data = self.get_user_data(user)
        
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user_data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    def get_user_data(self, user):
        # Implementa la lógica para obtener los datos del usuario
        # Puedes devolver un diccionario con los datos que deseas incluir en la respuesta
        
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            # Otros campos del usuario
        }
        
        return user_data


@permission_required('project_app.delete_anime')
def eliminar_anime(request, anime_id):
    anime = Anime.objects.get(id=anime_id)
    anime.delete()

@permission_required('project_app.delete_anime')
def editar_anime(request, anime_id):
    if request.method == 'POST':
        anime = Anime.objects.get(id=anime_id)
        # Lógica para editar el elemento en la base de datos
    else:
        # Renderizar el formulario de edición del elemento con los valores actuales
        return render(request, 'editar_anime.html', {'anime': anime})

@permission_required('project_app.delete_anime')
def eliminar_manga(request, manga_id):
    manga = Manga.objects.get(id=manga_id)
    manga.delete()

@permission_required('project_app.delete_anime')
def editar_manga(request, manga_id):
    if request.method == 'POST':
        manga = Manga.objects.get(id=manga_id)
        # Lógica para editar el elemento en la base de datos
    else:
        # Renderizar el formulario de edición del elemento con los valores actuales
        return render(request, 'editar_anime.html', {'anime': manga})