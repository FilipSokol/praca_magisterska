import PIL as pillow
from PIL import Image

import numpy as np
import tifffile

import csv
import os


def get_coords(tiff_arr):
    z, y, x = tiff_arr.shape[:3]
    x_size = x
    y_size = y
    z_size = z

    z_list = []
    for i in range(z_size):
        z_list += [i] * (y_size * x_size)

    y_list = []
    for i in range(y_size):
        y_list += [i] * (x_size)
    y_list *= z_size

    x_list = []
    x_list = np.arange(0, x_size).tolist() * (z_size * y_size)

    # USUNĄĆ ##############################################
    print("Rozmiar listy Z:", len(z_list))
    print("Rozmiar listy Y:", len(y_list))
    print("Rozmiar listy X:", len(x_list))
    # USUNĄĆ ##############################################

    return np.c_[z_list, y_list, x_list]

def tiff_to_csv(input_tiff, output_csv):

    img = tifffile.imread(input_tiff)
    # Moge tutaj jeszcze zoptymalizowac wage i przeoptymalizowac z 16bit na 8bit

    coords_flat = img.flatten() # zpłaszczenie danych do postaci 1D array
    coords = get_coords(img) # Funkcja generująca współrzędne dla układu 4D

    # USUNĄĆ ##############################################
    print("Rozmiar listy coords_flat[::3]:", len(coords_flat[::3]))
    print("Rozmiar listy coords_flat[1::3]:", len(coords_flat[1::3]))
    print("Rozmiar listy coords_flat[2::3]:", len(coords_flat[2::3]))
    # USUNĄĆ ##############################################

    # Połącznie współrzędnych, kolorów i rozmiarów pikseli
    coords_arr = np.c_[coords, coords_flat[::3], coords_flat[1::3], coords_flat[2::3], np.ones((coords_flat[::3].size),dtype=int)]

    print(coords_arr)

# Ścieżka do pliku TIFF
input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample.tiff'

# Nazwa pliku CSV do zapisu
output_csv_path = '/Users/filipsokol/Studia/PRACA MAG/plik.csv'


if __name__ == "__main__":
    tiff_to_csv(input_tiff_path, output_csv_path)

# V2 #################################################################################################################################################################

# import PIL as pillow
# from PIL import Image

# import csv
# import os

# def tiff_to_csv(input_tiff, output_csv):
#     # Wczytaj obraz TIFF
#     img = Image.open(input_tiff)

#     # Pobierz dane pikseli
#     pixels = list(img.getdata())

#     # Pobierz wymiary obrazu
#     width, height = img.size

#     # Zapisz dane do pliku CSV
#     with open(output_csv, 'w', newline='') as csv_file:
#         csv_writer = csv.writer(csv_file)

#         # Zapisz nagłówki (numer kolumny, wartość piksela)
#         csv_writer.writerow(['Column', 'Pixel Value'])

#         # Zapisz dane pikseli
#         for row in range(height):
#             for col in range(width):
#                 pixel_value = pixels[row * width + col]
#                 csv_writer.writerow([f'{row}-{col}', pixel_value])

#     print(f'Plik CSV został zapisany w: {output_csv}')

# # Ścieżka do pliku TIFF
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample.tiff'

# # Nazwa pliku CSV do zapisu
# output_csv_path = '/Users/filipsokol/Studia/PRACA MAG/plik.csv'

# # Przekształć TIFF na CSV
# tiff_to_csv(input_tiff_path, output_csv_path)

# V1 #################################################################################################################################################################

# import cv2
# import numpy as np
# import os

# def tiff_to_csv(tiff_path):
#     # Otwórz plik tiff
#     img = cv2.imread(tiff_path)

#     # Przekonwertuj obraz na tablicę NumPy
#     img = np.array(img)

#     # Wygeneruj tablicę CSV
#     csv_data = []
#     for row in img:
#         for col in row:
#             csv_data.append([col[0], col[1], col[2]])

#     # Zapisz tablicę CSV do pliku
#     csv_path = os.path.join(os.getcwd(), os.path.basename(tiff_path).replace(".tiff", ".csv"))
#     with open(csv_path, "w") as f:
#         f.write("R,G,B\n")
#         for row in csv_data:
#             f.write(", ".join([str(x) for x in row]) + "\n")

# if __name__ == "__main__":
#     tiff_path = "/ścieżka/do/pliku/tiff.tiff"
#     tiff_to_csv(tiff_path)
