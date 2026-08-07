# claude-skills

Personal [Claude Code](https://claude.com/claude-code) skills.

## Skills

### `web-quality`
Build and verify websites so obvious layout, responsive, and interaction
defects never ship.

- `SKILL.md` — core doctrine and workflow
- `references/build-rules.md` — rules that prevent defects while building
- `references/inspection-protocol.md` — 6-step protocol to find defects afterwards
- `scripts/audit.mjs` — automated probe harness (needs Playwright)

Run the probes:

```bash
node scripts/audit.mjs --base http://localhost:8000 --interactive
```

## Install on another machine

```bash
git clone https://github.com/Kaleemify/claude-skills.git ~/.claude/skills
```

If `~/.claude/skills` already exists, clone elsewhere and copy the skill
folders into it instead.
