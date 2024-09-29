from time import timezone
from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
