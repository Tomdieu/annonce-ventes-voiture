import json

from django.core.management.base import BaseCommand

from core.models import Marque,Modele



class Command(BaseCommand):

    help = "Fill the database with a list of jsons cars"

    def handle(self,*args,**options):

        with open("cars.json", "r",encoding="UTF-8") as f:
            cars = json.load(f)

        for car in cars["brands"]:
            print(car["name"])
            # Create the car brand
            if not Marque.objects.filter(nom=car["name"]).exists():
                brand = Marque.objects.create(nom=car["name"])
                self.stdout.write(f"Successfully created car {car['name']}")
                for model in car["models"]:
                    # print("Car Model: ", model)
                    Modele.objects.create(nom=model, marque=brand)
                    self.stdout.write(f"Successfully created model {model} for car {car['name']}")
            else:
                brand = Marque.objects.get(nom=car["name"])
                for model in car["models"]:
                    # print("Car Model: ", model)
                    if not Modele.objects.filter(nom=model, marque=brand).exists():
                        Modele.objects.create(nom=model, marque=brand)
                        self.stdout.write(f"Successfully created model {model} for car {car['name']}")
                