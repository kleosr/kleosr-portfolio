import type { ReactElement } from "react";
import { catalog, catalogCopy } from "../content";
import { snapshotDay } from "../data/github";
import { Row, SectionHeader } from "./system";

export function ToolCatalog(): ReactElement {
  return (
    <section className="section catalog-section" id="catalog" aria-labelledby="catalog-title">
      <SectionHeader
        className="section-heading catalog-head"
        kicker={catalogCopy.kicker}
        title={catalogCopy.title}
        titleId="catalog-title"
        code={`${catalogCopy.snapshotKicker} ${snapshotDay()}`}
        reveal
      />
      <ol className="tool-catalog">
        {catalog.map((pack) => (
          <Row variant="catalog" pack={pack} key={pack.fullName} />
        ))}
      </ol>
    </section>
  );
}
