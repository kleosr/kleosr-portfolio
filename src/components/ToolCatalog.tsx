import type { ReactElement } from "react";
import { catalog, catalogCopy, type CatalogPack } from "../content";
import { githubRepo, snapshotDay } from "../data/github";

function CatalogRow({ pack }: { pack: CatalogPack }): ReactElement {
  const record = githubRepo(pack.fullName);

  return (
    <li>
      <a className="tool-catalog-row" href={pack.href} target="_blank" rel="noreferrer">
        <span className="tool-catalog-index">{pack.number}</span>
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
      </a>
    </li>
  );
}

export function ToolCatalog(): ReactElement {
  return (
    <section className="section catalog-section" id="catalog" aria-labelledby="catalog-title">
      <header className="section-heading catalog-head" data-reveal>
        <p>{catalogCopy.kicker}</p>
        <div>
          <h2 id="catalog-title">{catalogCopy.title}</h2>
          <span className="section-code">{`${catalogCopy.snapshotKicker} ${snapshotDay()}`}</span>
        </div>
      </header>
      <ol className="tool-catalog">
        {catalog.map((pack) => (
          <CatalogRow pack={pack} key={pack.fullName} />
        ))}
      </ol>
    </section>
  );
}
