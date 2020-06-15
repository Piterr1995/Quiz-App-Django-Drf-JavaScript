from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.QuizView.as_view(), name="quiz"),
    path("answer/", views.answers, name="answers"),
    path("api/", include("qna.api.urls")),
]
