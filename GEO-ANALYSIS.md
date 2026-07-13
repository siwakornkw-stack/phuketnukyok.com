# GEO / AI-Search Analysis — phuketnukyok.com

วันที่: 2026-07-13 · live site · Business: Local Service (ภูเก็ต heavy equipment/รื้อถอน/วัสดุ)

> กรอบ (ตาม Google primary source ใน skill): **GEO = SEO** สำหรับ AI-search surfaces. Google ปฏิเสธ llms.txt/chunking/mention-farming ว่าไม่ใช่ citation lever. ตัวจริง = SSR + SEO ดี + **brand mentions**

## GEO Readiness Score: **71 / 100**

| เกณฑ์ | น้ำหนัก | คะแนน |
|---|---|---|
| Citability | 25% | 70 |
| Structural readability | 20% | 85 |
| Multi-modal | 15% | 55 |
| Authority & brand | 20% | 50 |
| Technical accessibility | 20% | 92 |

## Platform breakdown
| Platform | คะแนน | เหตุผล |
|---|---|---|
| **Google AI Overviews** | ~80 | SSR + FAQ + schema + SEO ดี = fit สุด (AIO ดึงจาก top-10 ranking) |
| **ChatGPT** | ~45 | พึ่ง Wikipedia 47.9% + Reddit — เว็บไม่มีทั้งคู่ |
| **Perplexity** | ~45 | พึ่ง Reddit 46.7% — ไม่มี Reddit presence |

## 1. Technical Accessibility — 92 ✅ (แข็งสุด)
- **SSR: Astro static** — content ทั้งหมด (FAQ, service, blog) อยู่ใน raw HTML. AI crawler ได้เต็มไม่ต้องรัน JS *(เว็บ WP/JS เก่ามักตกข้อนี้)*
- robots.txt: `*` Allow / → AI crawlers (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot) เข้าได้หมด, block เฉพาะ /admin ✅
- llms.txt: มี ✅ *(หมายเหตุ: Mueller/Illyes = ไม่มี citation weight จริง — checkbox เฉยๆ)*
- RSL 1.0: ไม่มี (ใหม่มาก Dec 2025 — low priority)

## 2. Structural Readability — 85 ✅
- H1→H2→H3 สะอาด, 1 H1/หน้า ✅
- **question-based headings** (FAQ + blog H2 เป็นคำถาม) ✅ ตรง query pattern
- short paragraphs + lists ✅
- ⚠️ **ขาด comparison tables** — blog "แบคโฮ vs แม็คโคร" ใช้ prose/list (table ได้ selection +156%)

## 3. Citability — 70
- **FAQ 28 Q&A** self-contained ตอบตรง query ✅ (ราคา/คิวละเท่าไหร่/ใกล้ฉัน)
- definitions "X คือ..." (แบคโฮ=แม็คโคร) ✅
- ⚠️ answer blocks สั้น (~40-80 คำ) — optimal AI citation = **134-167 คำ**
- ⚠️ **hard statistics น้อย** — เลี่ยงราคา (ไม่มั่ว = ถูกต้อง) แต่ AI ชอบ data จริง. มี: เครน 25 ตัน, 10+ ปี, 100+ งาน, 9 พื้นที่

## 4. Authority & Brand — 50 (จุดอ่อนใหญ่)
- dates: pubDate + updatedDate ✅ · Article schema ✅
- ⚠️ author = **Organization** (ไม่มี Person + credentials)
- ⚠️ **sameAs = Facebook อย่างเดียว** — ไม่มี Wikipedia/Reddit/YouTube/LinkedIn
- 🔴 **brand mentions = จุดตายของ GEO** — Ahrefs: mentions correlate 3x > backlinks กับ AI citation. YouTube ~0.737, Reddit สูง, Wikipedia สูง. เว็บใหม่ = แทบไม่มี off-site presence

## 5. Multi-Modal — 55
- text + images ทุกหน้า ✅
- ⚠️ **ไม่มี video** (YouTube mention = signal แรงสุด), ไม่มี infographic/chart/tool

---

## Top 5 highest-impact
1. 🔴 **Brand presence off-site** (operational, lever ใหญ่สุด GEO): Facebook มีแล้ว → เพิ่ม **Google Business Profile, YouTube (คลิปหน้างาน), Reddit/เว็บบอร์ดไทย, LinkedIn บริษัท**. ใส่ทั้งหมดใน schema `sameAs`
2. 🟡 **Comparison tables** ใน blog (แบคโฮ vs แม็คโคร, + บทความใหม่ หินคลุก vs หินเกล็ด) — code, ผมทำได้
3. 🟡 **ขยาย FAQ answer** คำถามเชิงพาณิชย์ → 134-167 คำ (self-contained) — code
4. 🟢 **robots.txt: explicit AI crawler allow** (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot) — code, signal ชัด
5. 🟢 **YouTube video** ฝังในหน้า service/works (งานยกจริง) — operational + embed

## Code quick-wins (ผมทำได้เลย)
- robots.txt เพิ่ม explicit AI crawler allow + sitemap
- Comparison table ใน blog แบคโฮ vs แม็คโคร
- ขยาย FAQ answer หลัก 2-3 ข้อ

## Operational (คุณ — lever จริงของ GEO)
- GBP + YouTube channel (คลิปหน้างาน) + LinkedIn บริษัท → ใส่ sameAs
- ตอบกระทู้/รีวิวในเว็บไทย (Pantip ฯลฯ) = brand mention
