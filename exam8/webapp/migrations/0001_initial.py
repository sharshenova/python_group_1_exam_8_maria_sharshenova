# Generated by Django 2.1.7 on 2019-03-09 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('summary', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, max_length=2000, null=True)),
                ('due_date', models.DateTimeField()),
                ('status', models.CharField(choices=[('backlog', 'Очередь'), ('in progress', 'В работе'), ('done', 'Сделано')], default='backlog', max_length=20)),
                ('time_planned', models.DecimalField(blank=True, decimal_places=1, max_digits=6, null=True)),
            ],
        ),
    ]
