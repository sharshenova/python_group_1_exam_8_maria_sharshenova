from django.db import models


STATUS_CHOICES = (
        ("backlog", 'Очередь'),
        ("in_progress", 'В работе'),
        ("done", 'Сделано')
    )

class Task(models.Model):
    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='backlog')
    time_planned = models.DecimalField(max_digits=6, decimal_places=1, null=True, blank=True)

    # def get_absolute_url(self):
    #     return reverse('api_v1:task-detail', kwargs={'pk': self.pk})

    def __str__(self):
        return self.summary
