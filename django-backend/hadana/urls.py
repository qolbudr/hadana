"""
URL configuration for hadana project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import todo_list, todo_create, todo_update, todo_delete
from .api import TodoViewSet

router = DefaultRouter()
router.register(r'todo', TodoViewSet)

urlpatterns = [
    path('', todo_list, name='todo_list'),
    path('new/', todo_create, name='todo_create'),
    path('<int:key>/edit/', todo_update, name='todo_update'),
    path('<int:key>/delete/', todo_delete, name='todo_delete'),
    path('api/', include(router.urls)),
]
