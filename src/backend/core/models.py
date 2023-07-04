from django.utils.html import format_html
from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Marque(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    logo = models.ImageField(upload_to="logo/",null=True,blank=True)

    def __str__(self) -> str:
        return self.nom


class Modele(models.Model):
    
    nom = models.CharField(max_length=100)
    marque = models.ForeignKey(Marque, on_delete=models.CASCADE, related_name="models")
   

    def __str__(self) -> str:
        return f"{self.marque.nom} {self.nom}"
    
class Serie(models.Model):
    nom = models.CharField(max_length=100)
    model = models.ForeignKey(Modele, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.model.marque.nom} {self.model.nom} {self.nom}"

class Voiture(models.Model):

    COUPE = 'coupe'
    BERLINE = 'berline'
    HAYON = 'hayon'
    BREAK = 'break'
    LIMOUSINE = 'limousine'
    PICKUP = 'pick-up'
    CROSSOVER = 'crossover'
    SUV = 'SUV'
    FOURGONNETTE = 'fourgonnette'
    MINI_FOURGONNETTE = 'mini-fourgonnette'
    LIFTBACK = 'liftback'
    CABRIOLET = 'cabriolet'
    MINIBUS = 'minibus'
    ROADSTER = 'roadster'
    TARGA = 'targa'

    TYPE_VEHICULE_CHOICES = [
        (COUPE, 'Véhicule coupé'),
        (BERLINE, 'Voiture berline'),
        (HAYON, 'Véhicule hayon'),
        (BREAK, 'Voiture de type break'),
        (LIMOUSINE, 'Limousine'),
        (PICKUP, 'Voiture de type pick-up'),
        (CROSSOVER, 'Crossover'),
        (SUV, 'Véhicule de type SUV'),
        (FOURGONNETTE, 'Fourgonnette'),
        (MINI_FOURGONNETTE, 'Mini-fourgonnette'),
        (LIFTBACK, 'Carrosserie liftback'),
        (CABRIOLET, 'Voiture cabriolet'),
        (MINIBUS, 'Minibus'),
        (ROADSTER, 'Roadster'),
        (TARGA, 'Voiture de type targa'),
    ]

    
    ELECTRIQUE = 'electrique'
    ESSENCE = 'essence'
    GAZOIL = 'gazoil'
    HYBRIDE = 'hybride'
    TYPE_CARBURANT_CHOICES = [
        (ELECTRIQUE, 'Électrique'),
        (ESSENCE, 'Essence'),
        (GAZOIL, 'Gazoil'),
        (HYBRIDE, 'Hybride'),
    ]
    COLOR_CHOICES = [
        ('black', 'Black'),
        ('white', 'White'),
        ('silver', 'Silver'),
        ('gray', 'Gray'),
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('yellow', 'Yellow'),
        ('orange', 'Orange'),
        ('brown', 'Brown'),
        ('beige', 'Beige'),
        ('purple', 'Purple'),
        ('pink', 'Pink'),
        ('gold', 'Gold'),
        ('bronze', 'Bronze'),
        ('maroon', 'Maroon'),
        ('burgundy', 'Burgundy'),
        ('navy', 'Navy'),
        ('teal', 'Teal'),
        ('turquoise', 'Turquoise'),
    ]

    CHOIX_TRACTION = [
        ('AV', 'Traction avant'),
        ('AR', 'Traction arrière'),
        ('4RM', 'Quatre roues motrices'),
        ('AWD', 'Transmission intégrale'),
    ]

    automatique = 'automatique'
    manuelle = 'manuelle'

    
    BOITE_VITESSE = [
        (automatique,'Automatique'),
        (manuelle,'Manuelle')
    ]

    
    annee = models.IntegerField()
    prix = models.DecimalField(max_digits=15, decimal_places=2, help_text="in XAF")
    description = models.TextField()
    num_chassi = models.CharField(max_length=255,unique=True)
    traction = models.CharField(max_length=3, choices=CHOIX_TRACTION)
    plaque_immatriculation = models.CharField(max_length=20,blank=True,null=True,default='')
    km_parcouru = models.PositiveIntegerField(default=0)
    model = models.ForeignKey(Modele, on_delete=models.CASCADE, related_name="voitures")
    nombre_de_place = models.IntegerField(default=2)
    couleur = models.CharField(max_length=255)
    nombre_de_chevaux = models.PositiveIntegerField()
    couleur = models.CharField(max_length=20, choices=COLOR_CHOICES,default='black')
    boite_vitesse = models.CharField(max_length=20,choices=BOITE_VITESSE,default=manuelle)
    type_carburant = models.CharField(
        max_length=10,
        choices=TYPE_CARBURANT_CHOICES,
        default=ESSENCE,
    )
    type_vehicule = models.CharField(
        max_length=20,
        choices=TYPE_VEHICULE_CHOICES,
        default=COUPE,
    )
    proprietaire = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="annonces"
    )

    @property
    def main_image(self):
        image = self.images.first()

        if image:
            if image.photo:
                return image.photo.url
            return ""
        return ""

    @property
    def km(self):  
        return f"{self.km_parcouru} km"

    def __str__(self) -> str:
        return f"{self.model.marque} {self.model} ({self.annee})"


class Annonce(models.Model):
    STATUTS = (
        ("en attente", "en attente"),
        ("validé", "validé"),
        ("retiré", "retiré"),
    )

    titre = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=255, choices=STATUTS, default="en attente")
    prix = models.DecimalField(max_digits=10, decimal_places=2, help_text="in XAF")
    voiture = models.ForeignKey(
        Voiture, on_delete=models.CASCADE, related_name="annonces"
    )
    latitude = models.DecimalField(max_digits=22, decimal_places=20)
    longitude = models.DecimalField(max_digits=22, decimal_places=20)
    address = models.CharField(max_length=255)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre


class PhotoVoiture(models.Model):
    photo = models.ImageField(upload_to="voitures/")
    voiture = models.ForeignKey(
        Voiture, on_delete=models.CASCADE, related_name="images"
    )

    def photo_preview(self):
        if self.photo:
            return format_html(
                f"<img src='{self.photo.url}' width='400px' heigth='400px' class='rounded float-right' />"
            )

        return None

    def __str__(self):
        return f"Image de {self.voiture.model.marque} {self.voiture.model} ({self.voiture.annee})"
