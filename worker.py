"""Nightly batch worker: re-embeds and re-classifies the ticket backlog."""

import anthropic
import openai

claude = anthropic.Anthropic()
oai = openai.OpenAI()


def classify_backlog(tickets: list[str]) -> list[str]:
    labels = []
    for t in tickets:
        resp = claude.completions.create(
            model="claude-2.1",
            prompt=f"{anthropic.HUMAN_PROMPT} Classify this ticket: {t}{anthropic.AI_PROMPT}",
            max_tokens_to_sample=50,
        )
        labels.append(resp.completion.strip())
    return labels


def describe_screenshot(image_url: str) -> str:
    resp = oai.chat.completions.create(
        model="gpt-4-vision-preview",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the error in this screenshot."},
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            }
        ],
    )
    return resp.choices[0].message.content or ""
