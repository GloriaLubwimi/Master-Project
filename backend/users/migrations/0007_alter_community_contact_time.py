# Generated by Django 5.0.7 on 2024-08-19 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_rename_time_community_contact_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='contact_time',
            field=models.TimeField(),
        ),
    ]