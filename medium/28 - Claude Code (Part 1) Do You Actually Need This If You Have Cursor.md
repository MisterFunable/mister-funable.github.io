<!-- Source: https://funable.medium.com/claude-code-part-1-do-you-actually-need-this-if-you-have-cursor-30b902668de4 -->
<!-- Published: 2026-01-23T21:57:00 -->
# Claude Code (Part 1): Do You Actually Need This If You Have Cursor?

### What It Is, How It Fits Next to Cursor, and How to Track Usage

Cursor is great inside the editor. Claude Code is that same vibe, but in your terminal, and it can spin up parallel subagents to knock out tasks for you.

<!-- Image Source: https://miro.medium.com/1*u11G_0ODJwAuvQh84SuogA.png | Local: images/28/img-01.png -->
![](images/28/img-01.png)

This post is **Part 1** (overview). Part 2 is the one with the "stop wasting tokens" habits and workflows, based on how I burned through my weekly limit in 3 days.

---

## What Claude Code Is

Claude Code is an AI coding assistant you run from the command line. You start it, describe a task, and it works inside your project folder.

The big difference vs plain chat is that Claude Code can:

- **See your repo** (read files you point it to)

- **Make changes** (edits, new files)

- **Run commands** (tests, builds, `git` commands, etc.)

- **Pause and ask permission** before it does anything tool-y (run commands, edit files, etc.)

- **Use subagents in parallel** when you ask it to split work into multiple threads

So yeah, it's interactive. It's not just "answering" you, it's collaborating with you.

---

## Should You Subscribe To It?

This is the part nobody talks about until the bill shows up.

Depending on your setup, you might be already paying for:

- **ChatGPT** (subscription) for general use as chat

- **Cursor** (subscription) for IDE help

And now:

- **Claude Code** (subscription or API usage) for terminal work

That's... a lot. And yeah, sometimes it's redundant, because **the model overlap is real**.

---

## What You're Actually Paying For

Why does the _same prompt_ sometimes work better in one tool than another?

Because you're not only sending "your prompt." Each tool silently changes the situation around the model:

- **Different system prompts**: tools add their own instructions (style, safety, what actions are allowed, how to format edits, etc.).

- **Different context injection**: the tool might automatically include repo context, open files, diffs, project memory, or nothing.

- **Different retrieval**: Cursor can pull relevant snippets via indexing/search; Claude chat can reuse project knowledge; Claude Code can read real files on demand (and it often has `CLAUDE.md` guidance).

- **Different tool access**: Claude Code can run commands and edit files (with permissions). That changes how the model "thinks" about solving the task, because it can verify by running tests instead of guessing.

- **Different guardrails/permissions**: the model may be "more cautious" or more incremental depending on what the wrapper allows without asking you 20 times.

So no, you're usually not paying for a magical new AI. You're paying for **a different environment** around the same AI.

Here's the practical difference in human terms:

- **Cursor**: best for high-speed IDE work - search + edit + refactor loops - because it keeps context tight and iteration cheap.

- **ChatGPT (App/Web)**: best for general Q&A and writing when you want the "just chat" experience (and often a different feel vs the same model embedded inside an IDE).

- **Claude (Desktop/Web)**: best when the job is thinking, writing, or discussing. It's a great chat UX, and projects/memory can help for repeated context.

- **Claude Code**: best when the job is "touch multiple files + run commands + verify." It can act more like a teammate because it can actually _do_ things (tests, builds, `git diff`, etc.), not just suggest them.

That's why the same prompt can feel "smarter" in one place: not because the model changed, but because the tool fed it better context and gave it better ways to verify.

---

## What I Personally Optimize for

- If I need **fast coding in one file**: Cursor.

- If I need **chat + brainstorming + writing**: ChatGPT and Cursor.

- If I need **repo-level work + running commands + taking initiative and actions + multi-file changes**: Claude Code.

So I'm sticking with Cursor for a while, because Claude Code gets me what I want faster, but I burn credits like there's no tomorrow.

I saw this Claude vs Cursor question a while back, and the best answer (in my opinion) was: "use whatever gets you the work done" 😂

---

## Should You Cut Down On AI?

Claude also has a desktop app (a normal chat app) that, for some people, can replace part of their ChatGPT subscription (depending on what models/features they actually use).

It also has IDE integrations (like Visual Studio Code), so in theory that covers the "Cursor approach" too.

I'm not saying "cancel everything right now". Just that if you're trying to simplify your stack, it's an option.

Though... in my experience, free ChatGPT 5.2 _in the ChatGPT browser_ gives me better answers than the same model through Cursor. So I'll leave that up to interpretation. Maybe it's just me.

---

## Cost Basics

Claude Code can be used in two different "billing styles," and it changes how you should think about cost:

- **Subscription (Pro/Max)**: you're not paying per message. You get a usage allowance, and the important part is the limits (you can run out).

- **API-style (pay per token)**: you're literally billed by tokens, like the Claude API. Bigger context = more tokens = more cost.

Practical notes:

- **Every file it reads costs tokens/usage**

- **Long conversations cost more over time**

- **Big "scan my whole repo" requests are expensive**

- On subscription, the commands that matter are usually **`/usage`** (limits) and **`/stats`** (patterns)

---

## The Real Limits

Claude has **two big buckets of limits**:

- **5‑hour session limit**: you get an allowance, you burn through it, then it resets every ~5 hours.

- **Weekly limits**: a cap across the week that can hard-stop you until the reset.

Also important: **these limits apply across Claude AND Claude Code**. So if you spend the day chatting on the desktop/web app, your terminal sessions feel it (and vice versa).

And yes, the "soft limit" feeling is real: you can hit it fast if you go into backlog mode (I hit it in ~20 minutes once). The weekly limit is worse. I hit that too and got **four days without Claude**. Pain.

One more detail that matters: the Usage page shows **weekly limits separately for Opus vs all other models**, so you can accidentally burn the "expensive bucket" first.

---

## How to See Your Limits (So You Don't Guess)

Claude will warn you when you're getting close, but those warnings can be _*fast*_ (and easy to miss if you're in the zone).

So I treat limit-checking like checking the gas tank. You have two good options:

**In the Claude app (best UI):** Settings → Usage `https://claude.ai/settings/usage`

This shows progress bars for:

- **Current session** (how much you used + time remaining until the 5‑hour reset)

- **Weekly limits** (with reset timing; usually split for Opus vs other models)

**In Claude Code (terminal):** run `/usage`

If you're doing a long session, just make it a habit to run `/usage` every once in a while (or right before you start a big "ok now refactor the whole thing" request).

(Part 2 is where I show the habits that keep this under control.)

---

## Setup: the two commands you need

### Start Claude Code

From your project folder: `/claude`

### Generate a starter `CLAUDE.md` (do this once)

Inside Claude Code, run: `/init`

That will generate a starter `CLAUDE.md` so Claude doesn't have to re-learn "how to run tests" and "what not to touch" every session.

---

## What's in Part 2

- The right way to use sessions (`claude -c` vs `claude -r`)

- How permissions work (and how not to click "Allow" 200 times)

- Parallel subagents ("do these 3 things at once")

- The token-saving workflow I actually use

If you want the practical part, go to **Part 2 (Eventually)**.

Peace!

---

Me letting the AI take the control:

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FQjM6xbJglPY%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DQjM6xbJglPY&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FQjM6xbJglPY%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube" title="" height="480" width="854"></iframe>
