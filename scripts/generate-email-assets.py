from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

out = Path('public/email')
out.mkdir(parents=True, exist_ok=True)

# Brand yellow: exact sRGB #F2FF00
BRAND_YELLOW = (242, 255, 0)
BRAND_NAVY_STRIP = (20, 38, 47)  # #14262F

font_bold = 'C:/Windows/Fonts/arialbd.ttf'
font_regular = 'C:/Windows/Fonts/arial.ttf'

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()

# 1. LOGO MARK (168 x 236 at 2x)
# Extract clean vector-accurate logo mark with exact #F2FF00 brand yellow
ref_img = Image.open('docs/signature-reference/Email Signature.png')
ref_logo = ref_img.crop((24, 44, 24 + 168, 44 + 236)).convert('RGBA')
bg_color = (26, 61, 79)
pixels_logo = ref_logo.load()
for y in range(ref_logo.height):
    for x in range(ref_logo.width):
        r, g, b, a = pixels_logo[x, y]
        diff_bg = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
        if diff_bg < 15:
            pixels_logo[x, y] = (0, 0, 0, 0)
        elif r > 150 and g > 180:
            pixels_logo[x, y] = (*BRAND_YELLOW, 255)
        else:
            alpha = min(255, int(diff_bg * 1.5))
            pixels_logo[x, y] = (*BRAND_YELLOW, alpha)
ref_logo.save(out / 'logo-mark.png')

# 2. LOGO WORDMARK (184 x 80 at 2x)
wordmark_source = Image.open('public/logo/Asset 25biomonie.png').convert('RGBA')
wordmark = wordmark_source.resize((184, 80), Image.Resampling.LANCZOS)
pixels_wm = wordmark.load()
for y in range(wordmark.height):
    for x in range(wordmark.width):
        r, g, b, a = pixels_wm[x, y]
        if a > 0 and r > 140 and g > 140 and b < 90:
            pixels_wm[x, y] = (*BRAND_YELLOW, a)
wordmark.save(out / 'logo-wordmark.png')

# 3. BANNER (630 x 390 at 2x -> displayed 315 x 195)
# Static crop from Figma reference
banner_static = ref_img.crop((570, 0, 1200, 390))
banner_static.save(out / 'banner.png')

def cover(image, size):
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1])).convert('RGBA')

def banner_frame(filename, eyebrow, headline, sub):
    frame = cover(Image.open(Path('public/imageforslider') / filename), (630, 390))
    overlay = Image.new('RGBA', frame.size, (0, 0, 0, 0))
    pixels = overlay.load()
    for x in range(frame.width):
        alpha = round(205 - min(x, 440) * 0.39)
        for y in range(frame.height):
            pixels[x, y] = (5, 15, 20, max(35, alpha))
    frame = Image.alpha_composite(frame, overlay)
    draw = ImageDraw.Draw(frame)
    yellow = '#F2FF00'
    white = '#FFFFFF'
    draw.text((36, 45), eyebrow.upper(), font=get_font(font_bold, 16), fill=yellow, spacing=4)
    draw.multiline_text((36, 110), headline, font=get_font(font_bold, 36), fill=white, spacing=2)
    draw.multiline_text((36, 260), sub, font=get_font(font_bold, 16), fill=white, spacing=5)
    return frame.convert('RGB')

frames = [
    banner_static.convert('RGB'),
    banner_frame('Showupflexandearnimage.jpg', 'Show up and earn', 'SHOW UP, FLEX\nAND EARN.', 'JUST TRANSACT AND EARN.'),
    banner_frame('YOUareyourmoneyaccessimage.jpg', 'Secure by design', 'YOU ARE THE\nMONEY ACCESS.', 'SAFETY IS ALWAYS ON.'),
    banner_frame('BimoniealwaysaNetgain.jpg', 'Every transaction counts', 'BIOMONIE.\nALWAYS A NET-GAIN.', 'BUILT-IN VALUE EVERY TIME YOU TRANSACT.'),
]
frames[0].save(out / 'banner.gif', save_all=True, append_images=frames[1:], duration=[5000, 4000, 4000, 4000], loop=0, optimize=True)

# 4. STORE BADGES (176 x 52 at 2x -> displayed 88 x 26)
# Google Play
bg_play = Image.new('RGBA', (176, 52), (0, 0, 0, 0))
d_play = ImageDraw.Draw(bg_play)
d_play.rounded_rectangle((0, 0, 175, 51), radius=8, fill='#000000', outline='#333333', width=1)
ox, oy = 14, 12
d_play.polygon([(ox, oy), (ox, oy+28), (ox+14, oy+14)], fill='#4285F4')
d_play.polygon([(ox, oy), (ox+14, oy+14), (ox+18, oy+10), (ox+5, oy-1)], fill='#EA4335')
d_play.polygon([(ox+14, oy+14), (ox+18, oy+10), (ox+25, oy+14), (ox+18, oy+18)], fill='#FBBC04')
d_play.polygon([(ox, oy+28), (ox+14, oy+14), (ox+18, oy+18), (ox+5, oy+29)], fill='#34A853')
d_play.text((45, 8), 'GET IT ON', font=get_font(font_bold, 11), fill='#FFFFFF')
d_play.text((45, 20), 'Google Play', font=get_font(font_bold, 19), fill='#FFFFFF')
bg_play.save(out / 'badge-google-play.png')

# App Store
bg_apple = Image.new('RGBA', (176, 52), (0, 0, 0, 0))
d_apple = ImageDraw.Draw(bg_apple)
d_apple.rounded_rectangle((0, 0, 175, 51), radius=8, fill='#000000', outline='#333333', width=1)
ref_b2_crop = ref_img.crop((570 + 125 + 7, 390 + 2, 570 + 125 + 27, 390 + 24)).resize((22, 24), Image.Resampling.LANCZOS)
apple_rgba = Image.new('RGBA', ref_b2_crop.size, (0, 0, 0, 0))
for y in range(ref_b2_crop.height):
    for x in range(ref_b2_crop.width):
        p = ref_b2_crop.getpixel((x, y))
        val = (p[0] + p[1] + p[2]) // 3
        if val > 60:
            apple_rgba.putpixel((x, y), (255, 255, 255, min(255, val * 2)))
bg_apple.alpha_composite(apple_rgba, (16, 14))
d_apple.text((46, 8), 'Download on the', font=get_font(font_regular, 10), fill='#FFFFFF')
d_apple.text((46, 20), 'App Store', font=get_font(font_bold, 19), fill='#FFFFFF')
bg_apple.save(out / 'badge-app-store.png')

# 5. FINGER STRIP (630 x 100 at 2x -> displayed 315 x 50)
strip = Image.new('RGBA', (630, 100), (*BRAND_NAVY_STRIP, 255))
icon_small = ref_logo.resize((32, 45), Image.Resampling.LANCZOS)
d_strip = ImageDraw.Draw(strip)
f_top = get_font(font_bold, 18)
f_bot = get_font(font_bold, 17)

items = [
    ('Finger', 'Na Money!', False),
    ('Tẹka', 'Gbowó.', False),
    ('Yatsan', 'Kudī.', True),
    ('Áka', 'Ẹgò.', False),
]
col_xs = [16, 172, 328, 484]

for i, (top, bot, is_yellow) in enumerate(items):
    x = col_xs[i]
    strip.alpha_composite(icon_small, (x, 27))
    tx = x + 38
    d_strip.text((tx, 27), top, font=f_top, fill='#FFFFFF')
    d_strip.text((tx, 51), bot, font=f_bot, fill='#F2FF00' if is_yellow else '#FFFFFF')

strip.save(out / 'finger-strip.png')

# 6. SOCIAL ICONS - ensure X and TikTok have solid black backing rounded rects
for filename in ('social-x.png', 'social-tiktok.png'):
    icon_path = out / filename
    if icon_path.exists():
        icon = Image.open(icon_path).convert('RGBA')
        tile = Image.new('RGBA', icon.size, (0, 0, 0, 0))
        ImageDraw.Draw(tile).rounded_rectangle((0, 0, icon.width - 1, icon.height - 1), radius=7, fill='#111111')
        tile.alpha_composite(icon)
        tile.save(icon_path)

print('Successfully generated all email assets in public/email/')
