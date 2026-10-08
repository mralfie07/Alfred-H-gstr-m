import sys, glob, re
from PIL import Image, ImageDraw
pattern, out, scale = sys.argv[1], sys.argv[2], float(sys.argv[3])
fs = sorted(glob.glob(pattern), key=lambda f: int(re.findall(r'-(\d+)\.png$', f)[0]))
ims = [Image.open(f) for f in fs]
w, h = int(ims[0].width * scale), int(ims[0].height * scale)
cols = int(sys.argv[4]) if len(sys.argv) > 4 else len(ims)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (w + 6), rows * (h + 6)), (200, 0, 0))
for i, im in enumerate(ims):
    sheet.paste(im.convert('RGB').resize((w, h)), ((i % cols) * (w + 6), (i // cols) * (h + 6)))
sheet.save(out)
print(len(ims), sheet.size)
