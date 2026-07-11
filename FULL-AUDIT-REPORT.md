# SEO Audit — phuketnukyok.com

วันที่: 2026-07-12 · แหล่งข้อมูล: production build (`dist/`, 15 หน้า) — เว็บยังไม่ deploy จริง
Business type: **Local Service (heavy equipment rental + demolition + materials), ภูเก็ต**

> หมายเหตุ: โดเมน phuketnukyok.com ปัจจุบันเป็น parked lander → crawl live, CrUX (CWV field), GSC indexation, GA4, backlink API **ดึงไม่ได้**. ค่าที่ต้องมี live URL/API creds จะระบุว่า "ต้อง deploy ก่อน"

## Executive Summary

**SEO Health Score: 84 → 93 / 100** (หลังแก้ quick-win batch แล้ว)

> อัปเดต 2026-07-12: แก้ในโค้ดครบ — llms.txt, security headers (vercel.json), meta desc ≤160 ทุกหน้า, title trim, schema 15/15 (เพิ่ม CollectionPage/ItemList/ContactPage/Blog/Breadcrumb), OG card 1200x630, hero LCP hint (fetchpriority+dimensions), works intro. **เหลือ ~7 คะแนนที่โค้ดปิดไม่ได้**: CWV field data (ต้อง deploy+traffic), NAP/E-E-A-T (ต้องเบอร์จริง), local (ต้อง GBP), AggregateRating (ต้องรีวิวจริง)

โครงสร้าง SEO/AEO/GEO แข็งแรงมากสำหรับเว็บใหม่ — schema ครบ, FAQ, alt 100%, keyword ตรงจาก research. **แต่มี 2 blocker ที่ทำให้คะแนนนี้ยังไม่มีผลจริงจนกว่าจะแก้:**

### 🔴 Critical (แก้ก่อน launch — ไม่งั้น audit ทั้งหมดไร้ผล)
1. **เว็บยังไม่ deploy** — phuketnukyok.com = parked lander. ไม่มีอะไร index/rank จนกว่าจะ deploy build นี้ขึ้นโดเมนจริง
2. **เบอร์/LINE เป็น placeholder** (`081-234-5678`, `@phuketnukyok`) — NAP (Name-Address-Phone) consistency เป็นปัจจัยอันดับต้นของ local SEO. เบอร์ปลอม = ลูกค้าโทรไม่ติด + เสีย local ranking

### Top 5 Quick Wins
1. เพิ่ม `llms.txt` (AI crawler / GEO) — ตอนนี้ไม่มี
2. ตัด meta description 5 หน้าที่ยาวเกิน 160 (crane 200, truck-crane 189, demolition 184, materials 170, container 162) — โดน truncate ใน SERP
3. เพิ่ม schema หน้า listing (services-index, works, contact, blog-index) — 4 หน้ายังไม่มี
4. ตั้ง Google Business Profile + ผูก NAP ให้ตรงเว็บ (local pack)
5. Security headers ตอน deploy (Vercel: CSP, HSTS, X-Content-Type-Options)

---

## 1. Technical SEO — 85/100

| รายการ | สถานะ |
|---|---|
| robots.txt | ✅ มี + ชี้ sitemap ถูก |
| sitemap | ✅ 15/15 หน้า (coverage 100%) |
| canonical | ✅ ครบทุกหน้า |
| `<html lang="th">` | ✅ |
| viewport / mobile responsive | ✅ (breakpoint 880/560) |
| HTTPS | ⚠️ ได้ตอน deploy (Vercel auto) |
| security headers | ⚠️ ต้องตั้งตอน deploy (host-level) |
| llms.txt | ❌ ไม่มี |
| CWV field data (CrUX) | ⚠️ ต้อง deploy + traffic ก่อน |

## 2. Content Quality — 80/100

- **E-E-A-T**: มีตัวตนธุรกิจจริง (ชื่อบริษัท เทวาวณิชกิจ, ที่อยู่, schema) — ดี. แต่ **NAP ปลอม (เบอร์)** ทำลาย trust signal
- **Content depth** (proxy = text length): หน้าหลัก/service/blog ลึกพอ (1,200-2,400 ตัวอักษร) ✅
- **Thin content**: `/contact` (316) + `/works` (413) บาง — contact ปกติ, works เป็น gallery (แนะนำเพิ่ม intro 1-2 ย่อหน้า)
- **Blog**: 4 บทความ informational คุณภาพดี, H2 เป็นคำถาม (AEO) ✅
- **Duplicate**: ไม่พบ (ทุกหน้า title/desc/H1 unique)

## 3. On-Page SEO — 85/100

- **H1**: ทุกหน้ามี H1 เดียว ✅ (perfect)
- **Title tags**: keyword ตรง แต่ **หลายหน้ายาว >60 char** (home 79, services 81, demolition 76) → SERP อาจ truncate (ไทยกว้างกว่า ค่อนข้างเสี่ยง)
- **Meta description**: 5 service page **ยาวเกิน 160** → โดนตัด
- **Internal linking**: ดี (service ↔ related, blog → service, breadcrumb) ✅
- **Image alt**: **100% coverage (0/33 ขาด alt)** ✅✅
- **Heading structure**: `/contact` ไม่มี H2 (minor)

## 4. Schema / Structured Data — 90/100

| หน้า | Schema |
|---|---|
| หน้าแรก | LocalBusiness + FAQPage ✅ |
| 6 service pages | Service + FAQPage + BreadcrumbList ✅ |
| 4 blog posts | Article ✅ |
| services-index, works, contact, blog-index | ❌ ไม่มี |

- ทุก JSON-LD **parse ได้ valid** (ทดสอบแล้ว, Thai ไม่ทำ schema พัง)
- แนะนำเพิ่ม: ContactPage+LocalBusiness (/contact), CollectionPage/ItemList (/services, /works), Blog (/blog)

## 5. Performance (CWV) — 80/100 (lab estimate, ยังไม่มี field data)

- **Static HTML** (Astro) — ไม่มี hydration, JS น้อย (reveal/count-up inline ~2KB) ✅
- **Above-fold**: hero 206KB + logo 26KB = ~232KB → LCP ควรดี
- **รูป optimize แล้ว** (1400/1200px, q78) + `loading="lazy"` ทุกรูป non-hero ✅
- **Works page หนัก**: 26 รูป ~4.6MB (lazy โหลดตอน scroll — ยอมรับได้แต่หนักสุดในเว็บ)
- **Fonts**: Google Fonts + preconnect + display=swap ✅ (แต่ยัง render-blocking stylesheet — self-host ได้ถ้าจะรีดต่อ)
- ⚠️ CWV จริง (LCP/INP/CLS) วัดไม่ได้จนกว่า deploy

## 6. Images — 90/100

- **alt coverage 100%** (33/33) ✅
- optimize แล้ว (service ~1MB, logo 26KB) — ลดจาก 3.4MB → 1.06MB ก่อนหน้า
- ต้นฉบับ backup นอก public (ไม่ ship) ✅
- ⚠️ dist images รวม 5.8MB (gallery 4.6MB ครอง) — ทั้งหมด lazy, ไม่กระทบ above-fold

## 7. AI Search Readiness (AEO/GEO) — 80/100

- **FAQPage schema 7 หน้า** (28 Q&A) → eligible FAQ rich result + AI extraction ✅
- **FAQ ตอบตรง query** ("ราคา/คิวละเท่าไหร่/ใกล้ฉัน") — AEO ดีมาก ✅
- Semantic HTML, breadcrumb, entity (LocalBusiness+legalName) ✅
- ❌ **ไม่มี llms.txt** (skill นี้เช็คโดยเฉพาะ)
- ⚠️ og:image = โลโก้ square (ใช้ได้) — OG card 1200x630 เฉพาะจะดีกว่าตอนแชร์

---

## Local SEO (สำคัญสุดสำหรับธุรกิจนี้)

- ✅ LocalBusiness schema + PostalAddress (รัษฎา เมืองภูเก็ต 83000) + areaServed 9 พื้นที่
- ✅ Google Maps embed (geocode ยืนยันโซนถูก 7.9221, 98.3866)
- ✅ พื้นที่บริการระบุทุก service page
- 🔴 **NAP เบอร์ปลอม** — ต้องแก้เป็นเบอร์จริง แล้วให้ตรงกันทุกที่ (เว็บ + GBP + FB)
- 🔴 **ไม่มี Google Business Profile** (เท่าที่ค้นเจอ) — GBP คือหัวใจ local pack/Maps ต้องสร้าง + verify
- ⚠️ ยังไม่มี review schema / รีวิวจริง

## ที่วัดไม่ได้ (ต้อง deploy หรือมี API creds)
CWV field (CrUX) · indexation (GSC) · organic traffic (GA4) · backlink profile (Moz/Ahrefs) · live SERP position · GBP insights
