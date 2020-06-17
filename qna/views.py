from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Question, Answer
from django.http import JsonResponse
import json
import pdb


class QuizView(TemplateView):
    template_name = "qna/index.html"


answers_array = []
correct_answers = Answer.objects.filter(correct=True)


def answers(request):
    if len(answers_array) == len(Question.objects.all()):
        score = len([item for item in correct_answers if item in answers_array])
        return JsonResponse({"score": score}, status=200)
    else:
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            answer = data.get("answer")
            answers_array.append(answer)
            return JsonResponse({"status": 200})
