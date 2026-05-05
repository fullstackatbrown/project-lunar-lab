import { getAllMembers, DEFAULT_MEMBER_IMAGE } from "@/lib/data/members";
import { getAllAlumni } from "@/lib/data/alumni";
import { getAllCollaborators } from "@/lib/data/collaborators";
import type { Member } from "@/lib/schemas/memberSchema";
import type { Alumnus } from "@/lib/schemas/alumnusSchema";
import type { Collaborator } from "@/lib/schemas/collaboratorSchema";
import { withBasePath } from "@/lib/basePath";

// ─── Shared styles ─────────────────────────────────────────────────────────

const DIVIDER: React.CSSProperties = {
  width: "100%",
  height: 0,
  outline: "1px solid var(--foreground)",
  outlineOffset: -0.5,
};

const SECTION_TITLE: React.CSSProperties = {
  fontFamily: "'FreightText Pro', serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 72,
  lineHeight: "90px",
  color: "var(--foreground)",
  margin: 0,
};

const MEMBER_NAME: React.CSSProperties = {
  fontFamily: "'FreightText Pro', serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 48,
  lineHeight: 1.1,
  color: "var(--foreground)",
  marginBottom: 12,
  overflowWrap: "break-word",
};

const MEMBER_ROLE: React.CSSProperties = {
  fontFamily: "'FreightText Pro', serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 30,
  lineHeight: 1.15,
  color: "var(--foreground)",
  marginBottom: 18,
  overflowWrap: "break-word",
};

const MEMBER_DESC: React.CSSProperties = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "28px",
  color: "var(--foreground)",
};

const ALUMNI_NAME: React.CSSProperties = {
  fontFamily: "'FreightText Pro', serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 36,
  lineHeight: "36px",
  color: "var(--foreground)",
  marginBottom: 6,
};

const ALUMNI_META: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontWeight: 400,
  fontSize: 18,
  color: "var(--foreground)",
};

// ─── Grid cell wrappers ────────────────────────────────────────────────────

const LEFT_CELL: React.CSSProperties = {
  borderRight: "1px solid var(--foreground)",
  padding: "40px 40px 40px 0",
};

const RIGHT_CELL: React.CSSProperties = {
  padding: "40px 0 40px 40px",
};

const ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderBottom: "1px solid var(--foreground)",
};

const UNDERGRAD_ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderBottom: "1px solid var(--foreground)",
  padding: "24px 0",
};

const ALUMNI_ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderBottom: "1px solid var(--foreground)",
  padding: "24px 0",
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function chunkPairs<T>(items: T[]): Array<[T, T | undefined]> {
  const rows: Array<[T, T | undefined]> = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push([items[i], items[i + 1]]);
  }
  return rows;
}

// ─── Sub-components ────────────────────────────────────────────────────────

// Renders professors, PhD students, and graduate students with photo + role + description.
function MemberCard({ member }: { member: Member }) {
  const imageSrc = withBasePath(member.image ?? DEFAULT_MEMBER_IMAGE);

  const imageEl = (
    <img
      src={imageSrc}
      alt={member.name}
      style={{
        width: 375,
        height: 247,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );

  const nameEl = <div style={MEMBER_NAME}>{member.name}</div>;

  const linkedImage = member.url ? (
    <a
      href={member.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", flexShrink: 0, lineHeight: 0 }}
    >
      {imageEl}
    </a>
  ) : (
    imageEl
  );

  const linkedName = member.url ? (
    <a
      href={member.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {nameEl}
    </a>
  ) : (
    nameEl
  );

  return (
    <div
      style={{ display: "flex", alignItems: "flex-start", gap: 0, height: "100%" }}
    >
      {linkedImage}
      <div style={{ width: 40, flexShrink: 0 }} />
      <div style={{ paddingTop: 8 }}>
        {linkedName}
        {member.role && <div style={MEMBER_ROLE}>{member.role}</div>}
        {member.description && (
          <div style={MEMBER_DESC}>{member.description}</div>
        )}
      </div>
    </div>
  );
}

// Compact entry for undergraduate students — name + "Undergraduate Student" only.
function UndergradEntry({ member }: { member: Member }) {
  return (
    <div>
      <div style={ALUMNI_NAME}>{member.name}</div>
      <div style={ALUMNI_META}>
        <span>Undergraduate Student</span>
      </div>
    </div>
  );
}

function CollaboratorCard({ collab }: { collab: Collaborator }) {
  const isLogo = collab.logoStyle === "logo";
  const inner = (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      <img
        src={withBasePath(collab.image)}
        alt={collab.name}
        style={{
          width: isLogo ? 251 : 375,
          height: isLogo ? 176 : 247,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      <div style={{ paddingLeft: isLogo ? 16 : 40, paddingTop: 8 }}>
        <div style={MEMBER_NAME}>{collab.name}</div>
        <div style={MEMBER_DESC}>{collab.description}</div>
      </div>
    </div>
  );

  if (!collab.url) return inner;

  return (
    <a
      href={collab.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", textDecoration: "none", display: "block" }}
    >
      {inner}
    </a>
  );
}

function AlumnusEntry({ person }: { person: Alumnus }) {
  const nameNode = person.url ? (
    <a
      href={person.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {person.name}
    </a>
  ) : (
    person.name
  );

  return (
    <div>
      <div style={ALUMNI_NAME}>{nameNode}</div>
      <div style={ALUMNI_META}>
        <span>{person.role}</span>
        {person.nextPosition && (
          <>
            <span
              style={{
                fontFamily: "'FreightText Pro', serif",
                fontStyle: "italic",
                fontSize: 32,
                lineHeight: 1,
              }}
            >
              →
            </span>
            <span>{person.nextPosition}</span>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const members = getAllMembers();
  const alumni = getAllAlumni();
  const collaborators = getAllCollaborators();

  const photoMembers = members.filter((m) => m.category !== "undergraduate");
  const undergradMembers = members.filter((m) => m.category === "undergraduate");

  const photoRows = chunkPairs(photoMembers);
  const undergradRows = chunkPairs(undergradMembers);
  const alumniRows = chunkPairs(alumni);
  const collabRows = chunkPairs(collaborators);

  return (
    <main
      style={{
        paddingLeft: 90,
        paddingRight: 90,
        paddingTop: 46,
        paddingBottom: 80,
      }}
    >
      {/* ── Our Lab ── */}
      <section style={{ marginBottom: 0 }}>
        <div style={SECTION_TITLE}>Our Lab</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {/* Photo rows: professors, PhD, graduate students */}
        {photoRows.map(([left, right]) => (
          <div key={left.id} style={ROW}>
            <div style={LEFT_CELL}>
              <MemberCard member={left} />
            </div>
            <div style={RIGHT_CELL}>
              {right ? <MemberCard member={right} /> : null}
            </div>
          </div>
        ))}

        {/* Undergraduate rows: compact, name + "Undergraduate Student" */}
        {undergradRows.map(([left, right]) => (
          <div key={left.id} style={UNDERGRAD_ROW}>
            <div style={{ paddingRight: 40 }}>
              <UndergradEntry member={left} />
            </div>
            <div style={{ paddingLeft: 40 }}>
              {right ? <UndergradEntry member={right} /> : null}
            </div>
          </div>
        ))}
      </section>

      {/* ── Alumni ── */}
      <section style={{ marginTop: 80 }}>
        <div style={SECTION_TITLE}>Alumni</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {alumniRows.map(([left, right]) => (
          <div key={left.id} style={ALUMNI_ROW}>
            <div style={{ paddingRight: 40 }}>
              <AlumnusEntry person={left} />
            </div>
            <div style={{ paddingLeft: 40 }}>
              {right ? <AlumnusEntry person={right} /> : null}
            </div>
          </div>
        ))}
      </section>

      {/* ── Collaborators ── */}
      <section style={{ marginTop: 80 }}>
        <div style={SECTION_TITLE}>Collaborators</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {collabRows.map(([left, right]) => (
          <div key={left.id} style={ROW}>
            <div style={LEFT_CELL}>
              <CollaboratorCard collab={left} />
            </div>
            <div style={RIGHT_CELL}>
              {right ? <CollaboratorCard collab={right} /> : null}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
