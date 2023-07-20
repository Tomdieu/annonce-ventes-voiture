from django.shortcuts import render

# Create your views here.

def react_frontend(request,url,*args,**kwargs):
    template_name = "build/index.html"

    return render(request,template_name)