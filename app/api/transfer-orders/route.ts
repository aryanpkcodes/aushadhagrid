import { NextResponse } from 'next/server'

// Best-effort audit sink for authorized ISTOs. The simulation itself is
// fully deterministic and client-side; this endpoint simply acknowledges
// receipt so the command tower can log dispatch events without depending
// on any external persistence to function.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('[v0] Transfer order logged:', body?.referenceNo ?? 'unknown')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
