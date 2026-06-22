"""
build_archive.py — UI 레퍼런스 폴더를 WebP로 변환 + archive.json 생성
원본: REF_SRC (Desktop의 references)
출력: archive/{Category}/{Game}/{NN}.webp  +  data/archive.json
사용법: python build_archive.py
"""
import os
import io
import json
import sys

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

REF_SRC = r"C:\Users\deokgoo\Desktop\Game-Oriented\Studio\common\references"
ROOT = os.path.dirname(__file__)
OUT_DIR = os.path.join(ROOT, "archive")
MANIFEST = os.path.join(ROOT, "data", "archive.json")

IMG_EXTS = {".png", ".jpg", ".jpeg", ".jfif", ".gif", ".webp"}
SKIP_TOP = {"_Unmapped"}           # 미분류 제외
MAX_W = 1280
QUALITY = 76


def iter_images():
    """references 하위 이미지들을 (category, game, abspath)로 yield"""
    for dirpath, dirnames, filenames in os.walk(REF_SRC):
        rel = os.path.relpath(dirpath, REF_SRC)
        parts = [] if rel == "." else rel.split(os.sep)
        if parts and parts[0] in SKIP_TOP:
            dirnames[:] = []
            continue
        for fn in filenames:
            if os.path.splitext(fn)[1].lower() not in IMG_EXTS:
                continue
            if not parts:
                continue  # 최상위 직속 파일 무시
            category = parts[0]
            game = parts[1] if len(parts) >= 2 else "_"
            yield category, game, os.path.join(dirpath, fn)


def to_webp(src, dst):
    img = Image.open(src)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")
    w, h = img.size
    if w > MAX_W:
        img = img.resize((MAX_W, round(h * MAX_W / w)), Image.LANCZOS)
    img.save(dst, "WEBP", quality=QUALITY, method=4)
    return os.path.getsize(dst)


def main():
    # 수집 후 (category, game)별로 그룹
    groups = {}
    for category, game, path in iter_images():
        groups.setdefault(category, {}).setdefault(game, []).append(path)

    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)

    categories = []
    total_in = total_out = total_n = 0
    for category in sorted(groups):
        games_out = []
        for game in sorted(groups[category]):
            srcs = sorted(groups[category][game])
            out_game_dir = os.path.join(OUT_DIR, category, game)
            os.makedirs(out_game_dir, exist_ok=True)
            images = []
            for i, src in enumerate(srcs, 1):
                name = f"{i:03d}.webp"
                dst = os.path.join(out_game_dir, name)
                try:
                    total_in += os.path.getsize(src)
                    total_out += to_webp(src, dst)
                    total_n += 1
                    images.append(f"archive/{category}/{game}/{name}")
                except Exception as e:
                    print(f"  skip {src}: {e}")
            if images:
                games_out.append({"name": game, "images": images})
        if games_out:
            img_count = sum(len(g["images"]) for g in games_out)
            categories.append({
                "name": category,
                "games": games_out,
                "game_count": len(games_out),
                "image_count": img_count,
            })
        print(f"  {category}: {len(games_out)} games, "
              f"{sum(len(g['images']) for g in games_out)} imgs")

    manifest = {
        "categories": categories,
        "total_categories": len(categories),
        "total_games": sum(c["game_count"] for c in categories),
        "total_images": total_n,
    }
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))

    print(f"\nOK {total_n} images -> {OUT_DIR}")
    print(f"   {total_in/1024/1024/1024:.1f}GB -> {total_out/1024/1024:.0f}MB "
          f"({total_out/total_in*100:.1f}%)")
    print(f"   categories={len(categories)} manifest={MANIFEST}")


if __name__ == "__main__":
    main()
