"""
URL configuration for my_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from project_app.api import views
from project_app.api.views import UserCreateAPIView, UserLoginAPIView, eliminar_anime, editar_anime, eliminar_manga, editar_manga
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'Anime',views.AnimeViewSet),
router.register(r'Manga',views.MangaViewSet),


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/register/', UserCreateAPIView.as_view(), name='user-create'),
    path('api/login/', UserLoginAPIView.as_view(), name='user-login'),
    path('api/logout/', auth_views.LogoutView.as_view(), name='user-logout'),
    path('api/eliminar_anime/<int:anime_id>/', eliminar_anime, name='eliminar_anime'),
    path('api/editar_anime/<int:anime_id>/', editar_anime, name='editar_anime'),
    path('api/eliminar_manga/<int:manga_id>/', eliminar_manga, name='eliminar_manga'),
    path('api/editar_manga/<int:manga_id>/', editar_manga, name='editar_manga'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)