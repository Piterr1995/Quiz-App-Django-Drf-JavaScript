from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=70)

    def __str__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    text = models.CharField(max_length=50)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return self.question.text
