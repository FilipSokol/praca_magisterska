import PIL as pillow
from PIL import Image

import skimage
from skimage.util import img_as_ubyte

import skimage
from skimage import exposure

import numpy as np
import tifffile


def transform_to_8bit(file_16bit):
    return img_as_ubyte(exposure.rescale_intensity(file_16bit))


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

    file_8bit = transform_to_8bit(img)

    # coords_flat = img.flatten() # zpłaszczenie danych do postaci 1D array
    # coords = get_coords(img) # Funkcja generująca współrzędne dla układu 4D
    
    # print(img.shape)
    # print(img.dtype)
    # print(type(img))

    print(file_8bit.shape)
    print(file_8bit.dtype)
    print(type(file_8bit))


    coords_flat = file_8bit.flatten() # zpłaszczenie danych do postaci 1D array
    coords = get_coords(file_8bit) # Funkcja generująca współrzędne dla układu 4D

    # USUNĄĆ ##############################################
    print("Rozmiar listy coords_flat[::3]:", len(coords_flat[::3]))
    print("Rozmiar listy coords_flat[1::3]:", len(coords_flat[1::3]))
    print("Rozmiar listy coords_flat[2::3]:", len(coords_flat[2::3]))
    # USUNĄĆ ##############################################

    # Połącznie współrzędnych, kolorów i rozmiarów pikseli
    # coords_arr = np.c_[coords, coords_flat[::3], coords_flat[1::3], coords_flat[2::3], np.ones((coords_flat[::3].size),dtype=int)]

    # print(coords_arr)

# Ścieżka do pliku TIFF
input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample.tiff'
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample2.tif'
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample3.tif'
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample4.tif'

# Nazwa pliku CSV do zapisu
output_csv_path = '/Users/filipsokol/Studia/PRACA MAG/plik.csv'

if __name__ == "__main__":
    tiff_to_csv(input_tiff_path, output_csv_path)
