from django.core.management.base import BaseCommand
from django.core.files.storage import FileSystemStorage
import os
from core.models import Marque

class Command(BaseCommand):
    help = 'Uploads an image from the download directory to ImageModel'

    def handle(self, *args, **options):
        download_directory = r"C:\Users\pc\Downloads\Toutes les marques de constructeurs automobiles_files"
        storage = FileSystemStorage(location=download_directory)



        # List all files in the download directory
        files = storage.listdir('')[1]
        
        for filename in files:
            print("Filename : ", filename)
            print("File extendion : ",filename.endswith('.png'))
            if filename.endswith('.jpg') or filename.endswith('.png'):

                marque_name, ext = os.path.splitext(filename)
                print(marque_name,ext)

                try:
                    # Try to find a Marque instance with the same name
                    marque = Marque.objects.get(nom__iexact=marque_name)
                    print("Found Marque : ", marque)
                    
                except Marque.DoesNotExist:
                    # If no Marque instance exists, skip this file
                    print(f"{marque_name} does not exist or already has a logo")
                    continue
                
                with storage.open(filename, 'rb') as img_file:
                    marque.logo.save(filename, img_file, save=True)
                    self.stdout.write(self.style.SUCCESS(f'Successfully updated logo for {marque_name}'))

        self.stdout.write(self.style.SUCCESS('Image upload complete'))
