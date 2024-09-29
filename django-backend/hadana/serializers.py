from rest_framework import serializers # type: ignore
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'  # or list specific fields like ['id', 'title', 'author', 'published_date']
