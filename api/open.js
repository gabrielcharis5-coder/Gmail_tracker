import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const unique_id = url.searchParams.get("id")

    if (unique_id) {
      await supabase
        .from('email_opens')
        .insert([
          { unique_id: unique_id, opened_at: new Date() }
        ])
    }

    // invisible tracking image
    const gif = Buffer.from(
      "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      "base64"
    )

    res.setHeader("Content-Type", "image/gif")
    res.status(200).send(gif)

  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
      }
