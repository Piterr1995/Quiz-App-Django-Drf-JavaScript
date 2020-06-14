from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Question, Answer


class QuizView(TemplateView):
    template_name = "qna/index.html"
