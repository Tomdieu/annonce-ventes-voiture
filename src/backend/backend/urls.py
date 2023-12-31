"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import RedirectView
from django.views.static import serve

from core.views import react_frontend

schema_view = get_schema_view(
    openapi.Info(
        title="Annonce Voiture API",
        default_version="v4.0.1",
        description="Annonce Voiture API Docs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(
            email="ivantomdio@gmail.com",
            name="ivantom",
            url="https://github.com/tomdieu",
        ),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

admin.site.site_header = "Vente Voiture Annonce"
admin.site.site_title = "Vente Voiture Annonce"
# admin.site.site_url = "https:trix-car-backend.vercel.app"
admin.site.index_title = "Vente Voiture Administration"
admin.empty_value_display = "**Empty**"

urlpatterns = []

urlpatterns += [
    path("admin/", admin.site.urls),
    path(
        "api/",
        include(
            [
                path("accounts/", include("accounts.api.urls")),
                path("core/", include("core.api.urls")),
                re_path(
                    r"docs/?",
                    include(
                        [
                            re_path(
                                r"^swagger(?P<format>\.json|\.yaml)$",
                                schema_view.without_ui(cache_timeout=0),
                                name="schema-json",
                            ),
                            re_path(
                                r"^swagger/$",
                                schema_view.with_ui("swagger", cache_timeout=0),
                                name="schema-swagger-ui",
                            ),
                            re_path(
                                r"^redoc/$",
                                schema_view.with_ui("redoc", cache_timeout=0),
                                name="schema-redoc",
                            ),
                            re_path(
                                r"",
                                schema_view.with_ui("swagger", cache_timeout=0),
                                name="schema-swagger-ui",
                            ),
                        ]
                    ),
                ),
            ]
        ),
    ),
    path("api-auth/", include("rest_framework.urls"), name="api-auth"),
    path("logo.png", RedirectView.as_view(url=settings.STATIC_URL + "logo.png")),
    path(
        "logo-blue.png", RedirectView.as_view(url=settings.STATIC_URL + "logo-blue.png")
    ),
    path("bg.svg", RedirectView.as_view(url=settings.STATIC_URL + "bg.svg")),
    path("rav4.png", RedirectView.as_view(url=settings.STATIC_URL + "rav4.png")),
    path("logo.svg", RedirectView.as_view(url=settings.STATIC_URL + "logo.svg")),
    path(
        "logo-white.png",
        RedirectView.as_view(url=settings.STATIC_URL + "logo-white.png"),
    ),
    re_path(r"^(?P<url>.*)$", react_frontend),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]

urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  
