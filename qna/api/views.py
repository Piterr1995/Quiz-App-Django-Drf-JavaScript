from rest_framework import generics
from .serializers import QuestionSerializer
from qna.models import Question


class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
