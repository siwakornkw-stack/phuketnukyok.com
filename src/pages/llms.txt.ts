import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { services } from '../data/services';

export const GET: APIRoute = () => {
  const body = `# ${SITE.name} (Phuket Nukyok)

> ${SITE.company} — ${SITE.description} พร้อมคนขับมืออาชีพ ประเมินหน้างานฟรี

พื้นที่บริการ: ${SITE.serviceAreas.join(', ')} (งานรับรื้อถอนรับทั่วประเทศ)
ติดต่อ: โทร ${SITE.phoneDisplay} · LINE ${SITE.lineId} · เปิด${SITE.hours}
ที่อยู่: ${SITE.address}

## บริการ
${services.map((s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.shortDesc}`).join('\n')}

## หน้าอื่น
- [ผลงานของเรา](${SITE.url}/works): ตัวอย่างงานจริง รับรื้อถอน งานยก งานถม ทั่วภูเก็ต
- [บทความ](${SITE.url}/blog): ความรู้เรื่องเครื่องจักร วัสดุก่อสร้าง และงานรื้อถอน
- [ติดต่อ](${SITE.url}/contact): โทร LINE Facebook และแผนที่
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
