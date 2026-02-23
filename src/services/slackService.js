export async function sendToSlack({ email, title, message }) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `📩\ntitle : ${title}\nemail: ${email}\nmessage : ${message}`,
    }),
  });
}
