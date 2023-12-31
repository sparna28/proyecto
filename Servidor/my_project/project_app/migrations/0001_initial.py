# Generated by Django 4.2.1 on 2023-05-29 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=256, unique=True)),
                ('sinopsis', models.TextField()),
                ('imagen', models.ImageField(blank=True, default=True, upload_to='animes')),
            ],
            options={
                'verbose_name': 'Anime',
                'verbose_name_plural': 'Animes',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Manga',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=256, unique=True)),
                ('sinopsis', models.TextField()),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='mangas')),
            ],
            options={
                'verbose_name': 'Manga',
                'verbose_name_plural': 'Mangas',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('usuario', models.CharField(max_length=256, unique=True)),
                ('email', models.EmailField(max_length=256, unique=True)),
                ('contraseña', models.CharField(max_length=256)),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
                'ordering': ['id'],
            },
        ),
    ]
