from django.urls import path
from . import views

urlpatterns = [path("", views.QuestionListView.as_view())]

