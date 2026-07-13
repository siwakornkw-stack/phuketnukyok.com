# SEO Action Plan (LIVE) — phuketnukyok.com

อัปเดต 2026-07-13 หลัง deploy. ส่วนใหญ่ **เสร็จแล้ว**. เหลือ operational ล้วน

## ✅ เสร็จแล้ว (verified live)
- Deploy live phuketnukyok.com + HTTPS + Vercel CDN
- เบอร์จริง 082-653-2332 (NAP consistent, placeholder leak = 0)
- Security headers (HSTS + 4 ตัว)
- Schema 15/15 valid · alt 100% · meta ≤160 · H1 เดียว · canonical ครบ
- llms.txt + OG card + FAQ 28 ข้อ
- 301/308 redirects: old WP URL 16 ตัว → new (ไม่ 404)
- Sitemap submit GSC + หน้าแรก request indexing

## 🔴 เหลือ (operational — ต้อง account คุณ)
| # | งาน | ทำที่ไหน |
|---|---|---|
| 1 | **Google Business Profile** สร้าง+verify | business.google.com — หัวใจ local pack/Maps |
| 2 | **GA4** ติด tracking | ส่ง Measurement ID (G-XXXX) → ผมใส่ code+deploy |
| 3 | **Vercel↔GitHub** connect (auto-deploy) | Vercel dashboard → Settings → Git (authorize GitHub) |
| 4 | **CWV field data** | รอ traffic สะสมใน CrUX (เพิ่ง launch — time-gated) |
| 5 | **Reviews** เก็บรีวิวจริง → AggregateRating schema | หลังมีรีวิว |

## 🟡 Quick win (โค้ด — ผมทำได้)
| # | งาน | หมายเหตุ |
|---|---|---|
| Q1 | cache-control `og.png`/`favicon.png`/`apple-touch-icon.png` → immutable | ตอนนี้ max-age=0. เพิ่ม header ใน vercel.json |
| Q2 | request indexing หน้า service ที่เหลือใน GSC | เร่ง index (คุณกดใน GSC) |

## Priority
1. **GBP** (local pack = traffic ใหญ่สุดสำหรับธุรกิจนี้)
2. GA4 (ส่ง ID มา)
3. Q1 cache (ผมทำ 1 นาที)
4. รอ CrUX + เก็บรีวิว
