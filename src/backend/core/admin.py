from django.contrib import admin
from .models import Voiture, Annonce, PhotoVoiture, Marque, Modele,Serie
from django.utils.translation import gettext_lazy as _
# Register your models here.


class SerieInlineAdmin(admin.TabularInline):

    model = Serie
    extra = 0

class ModeleInlineAdmin(admin.TabularInline):
    model = Modele
    extra = 0
    

class MarqueInlineAdmin(admin.TabularInline):
    model = Marque
    extra = 0
    

@admin.register(Marque)
class MarqueAdmin(admin.ModelAdmin):
    list_display = ("id", "nom")
    search_fields = ("nom",)
    inlines = [ModeleInlineAdmin]


@admin.register(Modele)
class ModeleAdmin(admin.ModelAdmin):
    list_display = ("id", "nom",'marque')
    search_fields = ("nom",'marque__nom',)

    inlines = [SerieInlineAdmin]


class PhotoVoitureInline(admin.TabularInline):
    model = PhotoVoiture
    extra = 0

class AnnonceInline(admin.TabularInline):
    model = Annonce
    extra = 0

@admin.register(Voiture)
class VoitureAdmin(admin.ModelAdmin):
    list_display = ("id", "model", "prix", "annee","km", "description", "proprietaire")
    search_fields = ("model__nom","model__marque__nom", "annee", "prix")
    list_filter = ("annee", "model", "prix")
    readonly_fields = ['date_creation']

    inlines= [PhotoVoitureInline,AnnonceInline]


@admin.register(PhotoVoiture)
class PhotoVoiture(admin.ModelAdmin):
    list_display = ("id","voiture", "photo_preview")

    readonly_fields = ["photo_preview"]


@admin.action(description="Valide annonce")
def valider_annonce(modeladmin, request, queryset):
    queryset.update(status="validé")

@admin.register(Annonce)
class AnnonceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "titre",
        "prix",
        "voiture",
        "description",
        "status",
        "date_creation",
    )
    search_fields = ("titre", "status", "prix")

    actions = [valider_annonce]

    


