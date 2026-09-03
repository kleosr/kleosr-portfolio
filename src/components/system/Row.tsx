import type { KeyboardEvent, ReactElement } from "react";
import type { CatalogPack } from "../../content";
import type { GrokAgent } from "../../grok-content";
import { githubRepo } from "../../data/github";
import { Button } from "./Button";
import { Index } from "./Index";
import { Link } from "./Link";

type CatalogRowProps = {
  variant: "catalog";
  pack: CatalogPack;
};

type CrewSeatRowProps = {
  variant: "crew-seat";
  agent: GrokAgent;
  pressed: boolean;
  onLock: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

type RowProps = CatalogRowProps | CrewSeatRowProps;

export function Row(props: RowProps): ReactElement {
  if (props.variant === "catalog") {
    const { pack } = props;
    const record = githubRepo(pack.fullName);

    return (
      <li>
        <Link className="tool-catalog-row" href={pack.href} external>
          <Index value={pack.number} className="tool-catalog-index" />
          <div className="tool-catalog-body">
            <strong>{pack.name}</strong>
            <p>{pack.description}</p>
            <ul aria-label={`${pack.name} tags`}>
              {pack.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          {record ? (
            <data value={record.stargazersCount}>{record.stargazersCount}</data>
          ) : null}
        </Link>
      </li>
    );
  }

  const { agent, pressed, onLock, onKeyDown } = props;

  return (
    <Button
      className="grok-seat"
      aria-pressed={pressed}
      onClick={onLock}
      onKeyDown={onKeyDown}
    >
      <Index value={agent.number} className="grok-seat-index" />
      <span className="grok-seat-body">
        <strong>{agent.name}</strong>
        <p>{agent.role}</p>
      </span>
      <span className="grok-seat-vector">{agent.channel}</span>
    </Button>
  );
}
