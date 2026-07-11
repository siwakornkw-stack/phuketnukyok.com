# CLAUDE.md — phuketnukyok.com

เว็บธุรกิจ **ภูเก็ตนักยก** (บริษัท เทวาวณิชกิจ จำกัด) — ให้เช่าเครื่องจักรหนัก + รับรื้อถอน + ขายวัสดุ ในภูเก็ต

## Stack
- **Astro v7 static (SSG)** — ไม่มี backend/DB. Output = HTML ล้วน
- Deploy: **Vercel** (project `nukyok/phuketnukyok.com`) · โดเมนจริง phuketnukyok.com (DNS ที่ Cloudflare → Vercel A `76.76.21.21` **grey cloud / DNS only**)
- Blog CMS: **Sveltia CMS** ที่ `/admin` (git-based)

## Commands
```
npm run dev        # localhost:4321
npm run build      # -> dist/
npm run preview
vercel --prod --yes --scope nukyok   # deploy (CLI upload)
```

## โครงสร้าง (data-driven)
- **`src/data/site.ts`** — SINGLE SOURCE: NAP (เบอร์ `082-653-2332`, LINE OA `@phuketnukyok`), ที่อยู่, `serviceAreas`. **แก้เบอร์/ข้อมูลร้านที่นี่ที่เดียว** propagate ทั้งเว็บ + schema + llms.txt
- **`src/data/services.ts`** — 6 บริการ (crane, truck-crane, backhoe, container, materials, demolition) + SEO fields + `faqs`. ขับ home cards, `/services`, `/services/[slug]`
- **`src/data/works.ts`** — GENERATED โดย `scripts/works-images.mjs` **อย่าแก้มือ**
- `src/content/blog/*.md` — บทความ (schema: `src/content.config.ts`)
- `src/layouts/Base.astro` — head (SEO/OG/schema), header/footer/fab, client script (reveal/count-up/back-to-top)
- `src/styles/global.css` — CSS ทั้งหมด (design tokens = CSS vars: `--ink --amber --cream`)
- `src/pages/llms.txt.ts` — GENERATED จาก site.ts (AEO/GEO)
- `public/admin/` — Sveltia CMS · `public/images/` — รูป serve
- `scripts/` — optimize/works-images/favicon/og-card/seo tools (rerun ได้)
- `image-originals/` — รูปต้นฉบับ backup (gitignore, ไม่ ship)

## เพิ่ม content
- **บทความ**: `/admin` (local: `npx @sveltia/cms-proxy-server` + `npm run dev`) หรือวางไฟล์ `.md` ใน `src/content/blog/`. slug = ASCII. `draft: true` = ไม่ขึ้นเว็บ
- **บริการ**: เพิ่ม object ใน `services.ts` (มี slug/seoTitle/metaDesc/h1/faqs/img) — หน้า + schema + sitemap ขึ้นเอง
- **รูป**: วางใน `public/images/` แล้ว `node scripts/optimize.mjs` (อ่านจาก image-originals, idempotent). Works gallery: วางใน folder แล้ว `node scripts/works-images.mjs`

## Conventions
- ทุกหน้าส่ง `jsonLd` เข้า Base (schema graph). Service page = Service + FAQPage + BreadcrumbList. **ต้อง parse valid**
- FAQ = AEO. ตอบราคาแบบ "ขึ้นกับงาน โทรประเมินฟรี" — **ห้ามแต่งราคา/spec**
- meta desc ≤160 · 1 H1/หน้า · alt ทุกรูป

## กฎสำคัญ
- **ห้ามมั่ว business spec** (พิกัดเครน ราคา เคลม "ฟรี") — ยืนยันกับเจ้าของก่อน. ที่ยืนยันแล้ว: เครนถึง 25 ตัน, รื้อถอนฟรีกรณีวัสดุมีมูลค่าพอ
- NAP ต้อง consistent — แก้ที่ `site.ts` เท่านั้น
- CMS `config.yml` production ต้องตั้ง `repo:` เป็น `siwakornkw-stack/phuketnukyok.com` + GitHub OAuth
- เว็บ verify ผ่าน DOM/fetch (preview screenshot ในเครื่องนี้ frozen — scroll/IO/timer ไม่รัน)
