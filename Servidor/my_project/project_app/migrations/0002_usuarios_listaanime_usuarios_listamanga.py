# Generated by Django 4.2.1 on 2023-05-30 08:19

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='listaAnime',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=256), blank=True, null=True, size=None),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='listaManga',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=256), blank=True, null=True, size=None),
        ),
    ]