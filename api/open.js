import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export default async function handler(req, res) {
  try {
    const unique_id = req.query.id  // simpler than using URL()

    if (unique_id) {
      await supabase
        .from('email_opens')
        .insert([
          { unique_id: unique_id, opened_at: new Date() }
        ])
    }

    // invisible 1x1 GIF
    const gifBuffer = Buffer.from(
      "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      "base64"
    )

    res.setHeader("Content-Type", "image/gif")
    res.send(gifBuffer)

  } catch (error) {
    console.error(error)
    res.status(500).send("Error")
  }
}
