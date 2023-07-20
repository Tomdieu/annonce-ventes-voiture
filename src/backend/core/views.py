from django.shortcuts import render

from django.views.generic import TemplateView

# Create your views here.

class ReactApp(TemplateView):

    template_name = "build/index.html"