<!-- Source: https://funable.medium.com/a-silly-little-osascript-utility-that-types-notes-for-you-dc5948a523d2 -->
<!-- Published: 2025-12-29T14:11:37 -->
# A Silly Little `osascript` Utility That Types Notes For You

I went down a rabbit hole the other day: "How do people make a tiny local bot that can interact with a single chat app window, without building a whole app?"

<!-- Image Source: https://miro.medium.com/1*tun1SnglV7mdYOGeR7uDVQ.png | Local: images/18/img-01.png -->
![](images/18/img-01.png)

Not for anything dramatic. Just... local automation. The kind where you run a command, your Mac does a tiny task, and you get that "wait, I can just do that?" feeling. Like the `say hello` command.

So I ended up with this: a tiny AppleScript you run with `osascript` that:

- Picks a random pre-written line

- Opens TextEdit

- Types it

- Waits a bit

- Repeats

On paper, it's a "predefined notes writer." In practice... it's a fun example of **screen-driven automation** where a script can interact with apps like a person would (focus window, type keys, press return).

And yeah, that has... _other_ implications. But let's keep this PG and pretend I'm doing it purely for journaling and "testing keyboard automation." Sure.

---

## What This Is (And Why It's Kinda Cool)

AppleScript has two sides:

- **App scripting**: "Hey TextEdit, create a document."

- **UI scripting** (via System Events): "Now type these keys like a human."

When you combine them, you get something that can drive your Mac's UI in a way that's weirdly powerful for local utilities.

The fun part is the _shape_ of it:

- You can generate messages (predefined, AI-generated, pulled from a file, whatever)

- You can choose the destination app (TextEdit, Notes, Slack draft window, a scratchpad)

- You can control timing (every 4 minutes, or randomized)

- You can wrap it with shell commands to run it for a fixed duration

> **Again**: purely for wholesome reasons. Obviously.

---

## The Script (Star Trek-flavored "notes")

Save this as `st-lore.applescript`:

```lua
-- Stealth idle activity script with subtle Star Trek trivia
set messageList to {¬
    "Need to refactor the backup job. Replication lag feels... subspace-y.", ¬
    "Note to self: check if the warp-factor tuning is messing with packet jitter.", ¬
    "Cloning strategies are efficient, but scaling costs are approaching Borg levels.", ¬
    "Reminder: not all random failures are random. Sometimes it's just a weird Prime Directive of the system.", ¬
    "Transporter pattern buffer math was inconclusive - might require deeper analysis (and less coffee).", ¬
    "Why does the Kobayashi Maru test case always fail silently? Feels personal.", ¬
    "Starfleet-grade logging would help. Right now it's more 'redshirt with a clipboard.'", ¬
    "Some protocols vanish without a trace. Very 'cloaking device,' very rude.", ¬
    "Force multipliers in distributed systems behave unpredictably - like Q got bored.", ¬
    "No one really deletes anything. Even a jettisoned core leaves a trail in the logs."}
repeat
    set msg to some item of messageList
    tell application "TextEdit"
        activate
        if not (exists document 1) then
            make new document
        end if
    end tell
    delay 1 -- Wait for TextEdit to come into focus
    tell application "System Events"
        keystroke msg
        keystroke return
    end tell
    delay 240 -- Wait 4 minutes
end repeat
```

The "Trek trivia" is just to have something written, it could be anything.

---

## How to Run It

Run it directly:

```typescript
osascript st-lore.applescript
```

This will loop forever until you stop it (Ctrl+C in the terminal).

If you want a "run later" vibe, you can sleep first:

```bash
sleep 3600; osascript st-lore.applescript
```

And if you want it to run only for a fixed time, you can wrap it with `timeout`.

On macOS, `timeout` usually means installing GNU coreutils:

```typescript
brew install coreutils
```

Then you get `gtimeout`:

```bash
sleep 3600; gtimeout 245m bash -c 'osascript st-lore.applescript'
```

That's a really nice pattern for "do X for a while, then stop automatically."

---

## The Part macOS Will Make You Do (Permissions)

If you try this and nothing gets typed, it's not broken. macOS is just being macOS.

UI scripting needs permission because you're literally telling your computer:

"Please let this terminal process control the keyboard and interact with other apps."

So you'll likely need to grant **Accessibility** access:

- **System Settings** → **Privacy & Security** → **Accessibility**

- Enable your terminal app (Terminal, iTerm, whatever you're using)

Sometimes you also need the **Automation** permission (it may pop up the first time):

- Allow your terminal/`osascript` to control **System Events** and/or **TextEdit**

If it still doesn't behave, close and reopen the terminal after granting permissions. macOS loves a good "restart the app" ritual.

**One more practical warning**: this types into whatever is focused. If you click somewhere else at the wrong time, congratulations, you just pasted Starfleet nonsense into the wrong app.

---

## TL;DR

> _`osascript` + AppleScript + UI scripting is a surprisingly powerful combo for local automations.
And sometimes it makes you think about how much our "presence" is just UI theatre._

And that's it. Live long and automate responsibly.
