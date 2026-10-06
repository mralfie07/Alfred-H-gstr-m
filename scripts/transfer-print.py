"""Moves the real-looking print from the camo tee onto the long sleeve.

The tee photos carry a printed, cracked, fabric-textured version of the kiss print; the long-sleeve
visual had the clean print file composited on. This finds the print's bounding box on both images
(bright cream or green camo pixels), then copies the tee's print pixels into the long sleeve's box,
masked by the original print file's alpha so only the artwork moves.

Usage: python3 transfer-print.py <tee image> <long-sleeve image> <print file> <out>
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def print_bbox(rgba):
    a = rgba.astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    cream = (lum > 150) & (abs(r - b) < 70)
    green = (g > r + 5) & (g > b + 8) & (lum > 40)
    m = (cream | green) & (a[..., 3] > 200)
    m = ndimage.binary_closing(m, iterations=10)
    lab, n = ndimage.label(m)
    sizes = ndimage.sum(m, lab, range(1, n + 1))
    ys, xs = np.nonzero(lab == 1 + int(np.argmax(sizes)))
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def main(tee_path, ls_path, print_path, out_path):
    tee = Image.open(tee_path).convert('RGBA')
    ls = Image.open(ls_path).convert('RGBA')
    art = Image.open(print_path).convert('RGBA')
    art = art.crop(art.getbbox())

    tb = print_bbox(np.array(tee))
    lb = print_bbox(np.array(ls))
    # The long sleeve keeps its print position; size comes from its own box so the old print is covered.
    w, h = lb[2] - lb[0], lb[3] - lb[1]
    patch = tee.crop(tb).resize((w, h), Image.LANCZOS)
    alpha = art.split()[3].resize((w, h), Image.LANCZOS)
    alpha = alpha.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1))
    patch.putalpha(alpha)
    ls.alpha_composite(patch, (lb[0], lb[1]))
    if out_path.lower().endswith(('.jpg', '.jpeg')):
        ls.convert('RGB').save(out_path, quality=92)
    else:
        ls.save(out_path, quality=90)
    print(out_path, 'tee box', tb, 'ls box', lb)


if __name__ == '__main__':
    main(*sys.argv[1:5])
