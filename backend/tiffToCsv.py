import PIL as pillow
from PIL import Image

import skimage
from skimage.util import img_as_ubyte

import skimage
from skimage import exposure

import numpy as np
import tifffile

                    # import matplotlib.pyplot as plt


def transform_to_8bit(imageFile):
    # Jezeli plik nie jest juz 8bit to przerob go na 8bit
    if imageFile.dtype == np.uint8:
        return imageFile
    return img_as_ubyte(exposure.rescale_intensity(imageFile))

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

    return np.c_[z_list, y_list, x_list]

def tiff_to_csv(input_tiff, output_csv):

    img = tifffile.imread(input_tiff)
    file_8bit = transform_to_8bit(img)

    # coords_flat = file_8bit.flatten() # zpłaszczenie danych do postaci 1D array
    coords = get_coords(file_8bit) # Funkcja generująca współrzędne dla układu 4D

    # Połącznie współrzędnych, kolorów i rozmiarów pikseli
    coords_arr = np.c_[coords, coords[::3].flatten(), coords[1::3].flatten(), coords[2::3].flatten()]

    print(coords_arr)

                    # plt.hist(coords_arr[:,5], bins=50, range=(0,255))

    header = "Z,Y,X,Red,Green,Blue"
    np.savetxt(output_csv, coords_arr, delimiter=',', header=header, comments='', fmt='%d', encoding='utf-8')

# Ścieżka do pliku TIFF
input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/sample5.tif'

# Nazwa pliku CSV do zapisu
output_csv_path = '/Users/filipsokol/Studia/PRACA MAG/plik.csv'

if __name__ == "__main__":
    tiff_to_csv(input_tiff_path, output_csv_path)
                    # plt.show()
