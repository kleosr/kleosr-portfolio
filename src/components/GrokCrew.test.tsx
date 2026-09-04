import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { grokAgents } from "../grok-content";
import { focusSeat, GrokCrew } from "./GrokCrew";

describe("GrokCrew", () => {
  it("locks a seat on click and arrow keys", async () => {
    const user = userEvent.setup();
    render(<GrokCrew />);
    expect(screen.getByText(`${grokAgents[0]?.number} ${grokAgents[0]?.name}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /CTO/ }));
    expect(screen.getByText(`02 ${grokAgents[1]?.name}`)).toBeInTheDocument();
    const list = document.querySelector("ol.grok-agent-list");
    expect(list).toBeTruthy();
    list?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await user.click(screen.getByRole("button", { name: /Chief of Staff/ }));
    screen.getByRole("button", { name: /Chief of Staff/ }).focus();
    await user.keyboard("{ArrowDown}{ArrowUp}{ArrowRight}");
    expect(screen.getByText(`02 ${grokAgents[1]?.name}`)).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}{Home}");
    expect(screen.getByText(`01 ${grokAgents[0]?.name}`)).toBeInTheDocument();
    await user.keyboard("{End}");
    expect(screen.getByText(`07 ${grokAgents[6]?.name}`)).toBeInTheDocument();
  });

  it("ignores focus when the seat is missing", () => {
    const list = document.createElement("ol");
    focusSeat(list, 0);
    expect(list.querySelector("button")).toBeNull();
  });
});
