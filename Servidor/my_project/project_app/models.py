from django.db import models

# Create your models here.
class Anime(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=256, unique=True)
    sinopsis = models.TextField()
    imagen = models.ImageField(blank=True, default=True, upload_to='animes')

    def __str__(self):
        return self.nombre
    
    class Meta:
        ordering = ['id']
        verbose_name = 'Anime'
        verbose_name_plural = 'Animes'


class Manga(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=256, unique=True)
    sinopsis = models.TextField()
    imagen = models.ImageField(blank=True, null=True, upload_to='mangas')

    def __str__(self):
        return self.nombre
    
    class Meta:
        ordering = ['id']
        verbose_name = 'Manga'
        verbose_name_plural = 'Mangas'


class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Añade cualquier otro campo personalizado que necesites

    def __str__(self):
        return self.username