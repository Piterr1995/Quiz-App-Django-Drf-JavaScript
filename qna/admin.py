from django.contrib import admin
from .models import Question, Answer


class AnswerInlines(admin.TabularInline):
    model = Answer
    extra = 4


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("text",)
    inlines = [
        AnswerInlines,
    ]
