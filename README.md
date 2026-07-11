# phuketnukyok.com

เว็บไซต์ภูเก็ตนักยก - เช่าเครน รถ 6 ล้อติดเครน แบคโฮ ตู้คอนเทนเนอร์ หิน ดิน ทราย
สร้างด้วย [Astro](https://astro.build) - static site, SEO เต็มรูปแบบ

## คำสั่ง

```
npm run dev       # เปิดเว็บทดสอบที่ localhost:4321
npm run build     # build ไฟล์จริงลงโฟลเดอร์ dist/
npm run preview   # ดูผล build
```

## เพิ่มบทความ

### วิธี A: หน้า Admin /admin (แนะนำ — ไม่ต้องแตะโค้ด)

Sveltia CMS — เขียนบทความใน editor แล้ว publish

**ใช้บนเครื่อง (ตอนนี้):**
```
npx @sveltia/cms-proxy-server   # terminal 1 (local backend)
npm run dev                     # terminal 2
```
เปิด http://localhost:4321/admin → เขียนบทความ → Save/Publish → ไฟล์ `.md` ถูกเขียนลง `src/content/blog/` อัตโนมัติ

**ใช้บนเว็บจริง (หลัง deploy):** ต้องตั้งค่า GitHub ครั้งเดียว
1. push โปรเจกต์ขึ้น GitHub repo
2. แก้ `repo: OWNER/REPO` ใน `public/admin/config.yml` เป็น repo จริง
3. สร้าง GitHub OAuth App + deploy auth handler (`sveltia-cms-auth`) แล้วชี้ `backend.base_url` ไปที่มัน (ดู https://github.com/sveltia/sveltia-cms#github-backend)
4. เปิด `https://phuketnukyok.com/admin` → login GitHub → เขียน → Publish → commit เข้า git → Vercel rebuild → บทความขึ้นเว็บ (~1 นาที)

### วิธี B: เขียนไฟล์ markdown เอง

สร้างไฟล์ `.md` ใหม่ใน `src/content/blog/` เช่น `my-article.md`:

```md
---
title: "ชื่อบทความ"
description: "คำอธิบายสั้นๆ สำหรับ SEO"
pubDate: 2026-08-01
---

เนื้อหาบทความเขียนด้วย Markdown...
```

ชื่อไฟล์ = URL เช่น `my-article.md` → `/blog/my-article`
เสร็จแล้ว build + deploy ใหม่ บทความขึ้นเว็บทันที

## เปลี่ยนรูป placeholder เป็นรูปจริง

รูปทั้งหมดอยู่ `public/images/` เป็นไฟล์ `.svg` placeholder
เอารูปจริง (jpg/webp) มาวางแทน แล้วแก้ path ใน:
- `src/data/services.ts` (รูปบริการ 5 รูป)
- `src/pages/index.astro` (รูป hero + งานเหมา)
- `src/pages/works.astro` (รูปผลงาน 6 รูป)
- `src/pages/contact.astro` (รูปแผนที่)

## แก้เบอร์โทร / LINE / ข้อมูลร้าน

แก้ที่ไฟล์เดียว: `src/data/site.ts` - เปลี่ยนแล้วมีผลทุกหน้า

## Deploy

Vercel: `npm i -g vercel` แล้ว `vercel --prod` (auto-detect Astro)
