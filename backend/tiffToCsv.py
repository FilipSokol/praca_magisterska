import skimage
from skimage.util import img_as_ubyte

import skimage
from skimage import exposure

import numpy as np
import tifffile

import matplotlib.pyplot as plt

def transform_to_8bit(imageFile):
    # Przekształcenia 16-bitowego pliku na 8-bitowy (głębia kolorów)
    if imageFile.dtype == np.uint8:
        return imageFile
    return img_as_ubyte(exposure.rescale_intensity(imageFile))

def get_coords(tiff_arr):
    z, _, y, x = tiff_arr.shape[:4]
    x_size = x
    y_size = y
    z_size = z

    print('x_size', x_size)
    print('y_size', y_size)
    print('z_size', z_size)

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

def remove_dark_pixel(tiff_arr, threshold):
    tiff_arr = tiff_arr[(tiff_arr[:,3]>threshold)
                        | (tiff_arr[:,4]>threshold)
                        | (tiff_arr[:,5]>threshold)]
    return tiff_arr

# ! ================ REMOVE ================
def scatter_3d(tiff_arr):
    x = tiff_arr[:, 2]
    y = tiff_arr[:, 1]
    z = tiff_arr[:, 0]
    colors = tiff_arr[:, 3:6] / 255.0  # Normalizacja wartości kolorów do zakresu [0, 1]
    # Tworzenie wykresu 3D
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    # Wyświetlenie punktów
    ax.scatter(x, y, z, c=colors, marker='o')

    # Ustawienie etykiet osi
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')

    # Wyświetlenie wykresu
    plt.show()
# ! ================ REMOVE ================

def tiff_to_csv(input_tiff, output_csv):

    img = tifffile.imread(input_tiff)
    file_8bit = transform_to_8bit(img)

    print("Tifffile Shape: ", file_8bit.shape)
    print("Tifffile Dtype: ", file_8bit.dtype)
    print("Tifffile Type: ", type(file_8bit))

    # ? zpłaszczenie danych do postaci 1D array   
    coords_flat = file_8bit.flatten()
    # ? Funkcja generująca współrzędne dla układu 4D
    coords = get_coords(file_8bit) 

    # ? Połącznie współrzędnych, kolorów i rozmiarów pikseli
    coords_arr = np.c_[coords, coords_flat[::3], coords_flat[1::3], coords_flat[2::3], np.ones((coords_flat[::3].size),dtype=int)]

    # ? Usuwanie ciemnego tła
    print ("Rozmiar danych przed usunięciem tła",
    coords_arr.shape)
    clear_tiff = remove_dark_pixel(coords_arr, 50)
    print ("Rozmiar danych po usunięciu tła",
    clear_tiff.shape)

    # ! ================ REMOVE ================
    scatter_3d(clear_tiff)
    # ! ================ REMOVE ================

    # ! plt.hist(clear_tiff[:,5], bins=50, range=(0,255))
    header = "Z,Y,X,Red,Green,Blue,Size"
    np.savetxt(output_csv, clear_tiff, delimiter=',', header=header, comments='', fmt='%d', encoding='utf-8')


# Ścieżka do pliku TIFF
input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/1.tif'
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/image.tiff'
# input_tiff_path = '/Users/filipsokol/Studia/PRACA MAG/glowa.tif'

# Nazwa pliku CSV do zapisu
output_csv_path = '/Users/filipsokol/Studia/PRACA MAG/plik.csv'

if __name__ == "__main__":
    tiff_to_csv(input_tiff_path, output_csv_path)
    # ! plt.show()
