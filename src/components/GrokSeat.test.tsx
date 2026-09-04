import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { crewAt } from "../grok-content";
import { GrokSeat } from "./GrokSeat";

describe("GrokSeat", () => {
  it("exposes pressed state and lock", async () => {
    const onLock = vi.fn();
    const user = userEvent.setup();
    render(<GrokSeat agent={crewAt(0)} pressed onLock={onLock} />);
    const button = screen.getByRole("button", { name: /Chief of Staff/ });
    expect(button).toHaveAttribute("aria-pressed", "true");
    await user.click(button);
    expect(onLock).toHaveBeenCalledOnce();
  });
});
