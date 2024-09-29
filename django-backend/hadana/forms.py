from django import forms
from .models import Todo
from django.forms import ModelForm, TextInput, CheckboxInput

class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ['title', 'done']
        widgets = {
            'title': TextInput(attrs={
                'class': "form-control",
                'placeholder': 'Nama'
                }),
            'done': CheckboxInput(attrs={
                'class': "form-check-input", 
                'placeholder': 'Selesai',
                'id': 'status'
                })
        }
