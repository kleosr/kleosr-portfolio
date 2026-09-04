import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { grokAgents } from "../grok-content";
import { focusSeat, GrokCrew } from "./GrokCrew";

describe("GrokCrew", () => {
  it("locks a seat on click and arrow keys", async () => {
    const user = userEvent.setup();
    render(<GrokCrew />);
    expect(screen.getByRole("heading", { name: /agents. Clear ownership/ })).toBeInTheDocument();
    expect(screen.getByText(`${grokAgents[0]?.number} ${grokAgents[0]?.name}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /CTO/ }));
    expect(screen.getByText(`02 ${grokAgents[1]?.name}`)).toBeInTheDocument();
    const list = document.querySelector("ol.grok-agent-list");
    expect(list).toBeTruthy();
    const enter = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
    list?.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(false);
    expect(screen.getByText(`02 ${grokAgents[1]?.name}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Chief of Staff/ }));
    screen.getByRole("button", { name: /Chief of Staff/ }).focus();
    await user.keyboard("{ArrowDown}{ArrowUp}{ArrowRight}");
    expect(screen.getByText(`02 ${grokAgents[1]?.name}`)).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}{Home}");
    expect(screen.getByText(`01 ${grokAgents[0]?.name}`)).toBeInTheDocument();
    const down = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true });
    list?.dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
    await user.keyboard("{End}");
    expect(screen.getByText(`07 ${grokAgents[6]?.name}`)).toBeInTheDocument();
  });

  it("ignores focus when the seat is missing", () => {
    const list = document.createElement("ol");
    focusSeat(list, 0);
    expect(list.querySelector("button")).toBeNull();
  });

  it("focuses an existing seat button", () => {
    const list = document.createElement("ol");
    const first = document.createElement("button");
    const second = document.createElement("button");
    list.append(first, second);
    document.body.append(list);
    focusSeat(list, 1);
    expect(document.activeElement).toBe(second);
  });
});
