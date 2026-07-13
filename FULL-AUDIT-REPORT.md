# SEO Audit (LIVE) — phuketnukyok.com

วันที่: 2026-07-13 · แหล่งข้อมูล: **live site** https://phuketnukyok.com (deploy แล้ว, Vercel)
Business type: **Local Service** (heavy equipment rental + demolition + materials), ภูเก็ต

> เว็บ live แล้ว → audit นี้เช็ค URL จริง (ต่างจากรอบก่อนที่ audit `dist/` pre-deploy). CWV field (CrUX), GSC/GA4 API, backlink API ยังต้อง creds/traffic history → ระบุว่า "time-gated"

## Executive Summary

**SEO Health Score: 95 / 100** (live, on-page/technical เกือบเต็ม)

on-page + technical + schema แทบ perfect. เหลือช่องว่างที่ **เวลา/operational** ล้วน (ไม่ใช่โค้ด)

### Top 5 จุดแข็ง (verified live)
1. **Security headers ครบ + live** — HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (server: Vercel)
2. **Schema 15/15 หน้า valid** — LocalBusiness, Service, FAQPage, BreadcrumbList, Article, CollectionPage, ItemList, Blog, ContactPage
3. **On-page เต็ม** — H1 เดียวทุกหน้า, meta desc ≤160 ทุกหน้า, canonical ครบ, **alt 100% (0 ขาด)**, og:image ครบ
4. **301/308 redirects live** — old WP URL → new (about-us/gallery/contact-us/Thai slugs) ไม่ 404
5. **AEO/GEO** — FAQ 28 ข้อ + llms.txt live + LocalBusiness NAP จริง (082-653-2332)

### เหลือถึง 100 (5 คะแนน — time/operational, ไม่ใช่โค้ด)
1. **CWV field data** — CrUX ต้องมี traffic history (เพิ่ง launch) → รอสะสม
2. **Google Business Profile** — ยังไม่มี → หัวใจ local pack/Maps (คุณสร้าง+verify)
3. **Reviews / AggregateRating** — ต้องมีรีวิวจริงก่อน (มั่วไม่ได้)
4. **GA4** — ยังไม่ติด (ส่ง Measurement ID → ผมใส่ code)
5. **(minor) cache-control** — og.png/favicon/apple-touch `max-age=0` (ควร long cache)

---

## 1. Technical SEO — 98/100
| รายการ | สถานะ (live) |
|---|---|
| HTTPS | ✅ (Vercel auto SSL) |
| HSTS | ✅ max-age 2y, includeSubDomains, preload |
| X-Content-Type-Options / X-Frame-Options / Referrer / Permissions | ✅ ครบ |
| robots.txt / llms.txt / sitemap-index / og / favicon | ✅ 200 ทุกตัว |
| canonical ทุกหน้า | ✅ |
| sitemap | ✅ 15 URLs (submit GSC แล้ว) |
| 301/308 redirects (legacy) | ✅ live |
| CWV field (CrUX) | ⏳ time-gated (เพิ่ง launch) |

## 2. Content Quality — 90/100
- E-E-A-T แข็ง: ธุรกิจจริง + NAP จริง + ที่อยู่ + schema. **เบอร์จริงแล้ว** (082-653-2332)
- depth ดีทุกหน้าหลัก, FAQ 28, blog 4 บทความ, ไม่ duplicate
- thin: /contact (แต่มี schema+map — ปกติ)

## 3. On-Page SEO — 97/100
- H1 เดียว **ทุกหน้า** · meta desc **≤160 ทุกหน้า** · canonical ครบ
- **alt 100% (0/รูปทั้งหมด ขาด)** · og:image ครบทุกหน้า
- internal linking + breadcrumb ครบ · keyword ตรง research

## 4. Schema — 98/100
- **15/15 หน้ามี JSON-LD valid** (parse ผ่านหมด, Thai ไม่ทำพัง)
- ครบ type: LocalBusiness+FAQPage (home), Service+FAQPage+Breadcrumb (6 service), CollectionPage/ItemList (/services,/works), ContactPage+LocalBusiness (/contact), Blog (/blog), Article+publisher+Breadcrumb (posts)

## 5. Performance (CWV) — 88/100 (lab; field time-gated)
- static + Vercel edge CDN + HTTPS ✅ · above-fold hero 206KB+logo 26KB
- รูป optimize + lazy · JS inline ~2KB · hero fetchpriority+dimensions (LCP/CLS)
- ⚠️ CWV จริง (LCP/INP/CLS) รอ CrUX สะสม traffic

## 6. Images — 95/100
- **alt 100%** · optimize แล้ว
- minor: og.png/favicon/apple-touch cache-control `max-age=0` → ควร immutable

## 7. AI Search Readiness (AEO/GEO) — 95/100
- FAQPage 7 หน้า (28 Q&A) → FAQ rich result + AI extraction
- **llms.txt live** · OG card 1200x630 · semantic HTML + entity
- GEO: LocalBusiness + PostalAddress + areaServed 9 พื้นที่ + Google Maps embed

## Local SEO
- ✅ LocalBusiness schema + NAP จริง consistent (verify: เบอร์เก่า leak = 0)
- ✅ areaServed 9 พื้นที่ + map embed (geocode รัษฎา เมืองภูเก็ต)
- 🔴 **ยังไม่มี Google Business Profile** → ต้องสร้าง+verify (local pack)
- ⚠️ ยังไม่มี review

## ที่วัดไม่ได้ (ต้อง creds/traffic)
CWV field (CrUX) · organic traffic (GA4) · backlink profile · live SERP position · GBP insights
