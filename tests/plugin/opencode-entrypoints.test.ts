import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("repo-local OpenCode entrypoints", () => {
  it("ships the documented commands and relay-room skill", () => {
    const relayRoomSkillPath = resolve(__dirname, "../../.opencode/skills/relay-room/SKILL.md");
    const teamCommandPath = resolve(__dirname, "../../.opencode/commands/team.md");
    const relayStatusCommandPath = resolve(__dirname, "../../.opencode/commands/relay-status.md");
    const relayPauseCommandPath = resolve(__dirname, "../../.opencode/commands/relay-pause.md");
    const relayResumeCommandPath = resolve(__dirname, "../../.opencode/commands/relay-resume.md");
    const relayReplayCommandPath = resolve(__dirname, "../../.opencode/commands/relay-replay.md");

    expect(existsSync(relayRoomSkillPath)).toBe(true);
    expect(existsSync(teamCommandPath)).toBe(true);
    expect(existsSync(relayStatusCommandPath)).toBe(true);
    expect(existsSync(relayPauseCommandPath)).toBe(true);
    expect(existsSync(relayResumeCommandPath)).toBe(true);
    expect(existsSync(relayReplayCommandPath)).toBe(true);

    expect(readFileSync(teamCommandPath, "utf8")).toContain("relay-room");
    expect(readFileSync(relayStatusCommandPath, "utf8")).toContain("relay-status");
    expect(readFileSync(relayPauseCommandPath, "utf8")).toContain("relay-pause");
    expect(readFileSync(relayResumeCommandPath, "utf8")).toContain("relay-resume");
    expect(readFileSync(relayReplayCommandPath, "utf8")).toContain("relay-replay");
  });
});
