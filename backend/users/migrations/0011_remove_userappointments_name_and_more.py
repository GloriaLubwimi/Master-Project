# Generated by Django 5.0.7 on 2024-08-24 09:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_customuser_name_customuser_phone_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userappointments',
            name='name',
        ),
        migrations.RemoveField(
            model_name='userappointments',
            name='phone_number',
        ),
    ]
