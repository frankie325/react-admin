import { LevelContext } from './levelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      {/* 提供 context：把它们用 context provider 包裹起来 以提供 LevelContext 给它们 */}
      <LevelContext value={level}>{children}</LevelContext>
    </section>
  );
}
