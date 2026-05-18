// app/api/rss/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mengambil data RSS terurai dari RSS-to-JSON API secara paralel
    const [resRakyat, resSuara] = await Promise.all([
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https://rakyatkalbar.com/rss/', { next: { revalidate: 300 } }).catch(() => null),
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.suarakalbar.co.id/feed/', { next: { revalidate: 300 } }).catch(() => null)
    ]);

    const rakyatData = resRakyat && resRakyat.ok ? await resRakyat.json() : { items: [] };
    const suaraData = resSuara && resSuara.ok ? await resSuara.json() : { items: [] };

    return NextResponse.json({
      rakyatkalbar: { items: rakyatData.items || [] },
      suarakalbar: { items: suaraData.items || [] }
    });
  } catch (error) {
    return NextResponse.json({ rakyatkalbar: { items: [] }, suarakalbar: { items: [] } }, { status: 500 });
  }
}