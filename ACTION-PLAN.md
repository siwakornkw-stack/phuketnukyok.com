# SEO Action Plan — phuketnukyok.com

เรียงตาม priority. Effort: S (นาที) · M (ชั่วโมง) · L (ต้องข้อมูล/ปฏิบัติการนอกโค้ด)

## 🔴 Critical (แก้ก่อน launch)

| # | งาน | Effort | หมายเหตุ |
|---|---|---|---|
| C1 | **Deploy build ขึ้น phuketnukyok.com** (Vercel) | M | ตอนนี้โดเมน = parked lander ไม่มีอะไร index |
| C2 | **แก้เบอร์/LINE จริง** ใน `src/data/site.ts` | S | `081-234-5678` = placeholder. NAP ต้องตรงทุกที่ |
| C3 | **สร้าง Google Business Profile + verify** ผูก NAP ตรงเว็บ | L | หัวใจ local pack/Maps — ธุรกิจนี้ขาดไม่ได้ |

## 🟠 High (ภายใน 1 สัปดาห์หลัง launch)

| # | งาน | Effort |
|---|---|---|
| H1 | ตัด meta description 5 หน้าให้ ≤160 (crane 200→, truck-crane 189→, demolition 184→, materials 170→, container 162→) | S |
| H2 | เพิ่ม `public/llms.txt` (สรุปธุรกิจ+บริการ+พื้นที่ ให้ AI crawler) | S |
| H3 | Security headers ตอน deploy (`vercel.ts`/host: HSTS, X-Content-Type-Options, Referrer-Policy) | S |
| H4 | ตั้ง GA4 + Google Search Console + submit sitemap | M |

## 🟡 Medium (ภายใน 1 เดือน)

| # | งาน | Effort |
|---|---|---|
| M1 | เพิ่ม schema หน้า listing: ContactPage+LocalBusiness (/contact), CollectionPage (/services, /works), Blog (/blog) | M |
| M2 | ตัด title ที่ยาว >60 (home, services-index, demolition, truck-crane) หรือย้าย brand ไปท้าย/ตัด | S |
| M3 | เพิ่มข้อความ intro 1-2 ย่อหน้าใน /works (ตอนนี้ text บาง 413) | S |
| M4 | สร้าง OG card 1200x630 เฉพาะ (แทนโลโก้ square) เพิ่ม twitter:image | M |
| M5 | เก็บรีวิวลูกค้า → เพิ่ม Review/AggregateRating schema | L |

## 🟢 Low (backlog)

| # | งาน | Effort |
|---|---|---|
| L1 | Self-host fonts ตัด render-blocking Google Fonts | M |
| L2 | เพิ่ม H2 ใน /contact (โครงสร้าง heading) | S |
| L3 | เพิ่มบทความ blog ตาม blog ideas ที่เหลือ (แบคโฮ vs แม็คโคร มีแล้ว; หินคลุก vs หินเกล็ด, ดินถมกี่ประเภท, ราคาเช่าเครน) | M each |
| L4 | Breadcrumb schema บน blog posts + works | S |

## Quick-win batch (แก้ได้เลยในโค้ด — ~30 นาที)
C2 + H1 + H2 + M1 + M2 + M3 + L4 = แก้ในไฟล์ล้วน ไม่ต้องรอข้อมูลนอก
เหลือ C1/C3/H4/M5 = ต้อง action นอกโค้ด (deploy, GBP, analytics, reviews)
