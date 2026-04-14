// ─── Data ──────────────────────────────────────────────────────────────────

interface LabMember {
  name: string;
  role: string;
  description?: string;
  image?: string;
}

interface AlumniMember {
  name: string;
  role: string;
  nextPosition?: string;
}

interface Collaborator {
  name: string;
  description: string;
  image?: string;
  logoStyle?: "logo" | "photo"; // logo = smaller, photo = full 375×247
}

const phdMembers: [LabMember, LabMember][] = [
  [
    {
      name: "Ellie Pavlick",
      role: "Assistant Professor",
      description: "Proud advisor of the below students. :)",
      image: "/images/ellie_pavlick.png",
    },
    {
      name: "Jack Merullo",
      role: "Ph.D. Student",
      description: "Mechanistic interpretability, representation learning, large language models",
      image: "/images/jack_merullo.png",
    },
  ],
  [
    {
      name: "Tian Yun",
      role: "Ph.D. Student",
      description: "Grounded language learning, multimodality, planning, reasoning",
      image: "/images/tian_yun.png",
    },
    {
      name: "Michael Lepori",
      role: "Ph.D. Student",
      description: "Computational cognitive science, mechanistic interpretability, compositionality",
      image: "/images/michael_lepori.png",
    },
  ],
  [
    {
      name: "Sam Musker",
      role: "Ph.D. Student",
      description: "Computational cognitive science, philosophy of language, analogical reasoning",
      image: "/images/sam_musker.png",
    },
    {
      name: "Alyssa Marie Loo Li Ann",
      role: "Undergraduate",
    },
  ],
];

const undergradRows: [LabMember, LabMember][] = [
  [
    { name: "Qinan Yu",    role: "Undergraduate" },
    { name: "Suraj Anand", role: "Undergraduate" },
  ],
  [
    { name: "Noah Foster", role: "Undergraduate" },
    { name: "Kunal Handa", role: "Undergraduate" },
  ],
];

const alumni: [AlumniMember, AlumniMember][] = [
  [
    { name: "Aaron Traylor",    role: "Ph.D. Student", nextPosition: "Microsoft" },
    { name: "Tucker Berckmann", role: "MS Student",    nextPosition: "PhD at Saarland" },
  ],
  [
    { name: "Albert Webson", role: "Ph.D. Student", nextPosition: "Google DeepMind" },
    { name: "Dan Smits",     role: "Undergraduate" },
  ],
  [
    { name: "Charlie Lovering", role: "Ph.D. Student", nextPosition: "Kensho" },
    { name: "Sheridan Feucht",  role: "Undergraduate",  nextPosition: "PhD at Northeastern" },
  ],
  [
    { name: "Dylan Ebert", role: "Ph.D. Student", nextPosition: "Huggingface" },
    { name: "Nam Do",      role: "Undergraduate",  nextPosition: "PathAI" },
  ],
];

const collaborators: [Collaborator, Collaborator][] = [
  [
    {
      name: "BigAI",
      description: "Brown Integrative General Artificial Intelligence",
      image: "/images/bigai.png",
      logoStyle: "logo",
    },
    {
      name: "Carney CCBS",
      description: "Center for Computational Brain Science",
      image: "/images/ccbs.png",
      logoStyle: "photo",
    },
  ],
  [
    {
      name: "BLT",
      description: "Brown Language and Thought Lab",
      image: "/images/blt.png",
      logoStyle: "photo",
    },
    {
      name: "PALM",
      description: "Perception, Action, and Learning Lab",
      image: "/images/palm.png",
      logoStyle: "photo",
    },
  ],
];

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
  lineHeight: "28px",
  color: "var(--foreground)",
  marginBottom: 20,
};

const MEMBER_ROLE: React.CSSProperties = {
  fontFamily: "'FreightText Pro', serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 30,
  lineHeight: "28px",
  color: "var(--foreground)",
  marginBottom: 24,
};

const MEMBER_DESC: React.CSSProperties = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "28px",
  color: "var(--foreground)",
};

// ─── Sub-components ────────────────────────────────────────────────────────

function PhotoPlaceholder({ width, height }: { width: number; height: number }) {
  return (
    <div
      style={{
        width,
        height,
        background: "#D9D9D9",
        flexShrink: 0,
      }}
    />
  );
}

function MemberCard({ member, hasPhoto = true }: { member: LabMember; hasPhoto?: boolean }) {
  const showImage = hasPhoto;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, height: "100%" }}>
      {showImage && (
        <>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{ width: 375, height: 247, objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <PhotoPlaceholder width={375} height={247} />
          )}
          <div style={{ width: 40, flexShrink: 0 }} />
        </>
      )}
      <div style={{ paddingTop: showImage ? 8 : 0 }}>
        <div style={MEMBER_NAME}>{member.name}</div>
        <div style={MEMBER_ROLE}>{member.role}</div>
        {member.description && <div style={MEMBER_DESC}>{member.description}</div>}
      </div>
    </div>
  );
}

function CollaboratorCard({ collab }: { collab: Collaborator }) {
  const isLogo = collab.logoStyle === "logo";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      {collab.image ? (
        <img
          src={collab.image}
          alt={collab.name}
          style={{
            width: isLogo ? 251 : 375,
            height: isLogo ? 176 : 247,
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
      ) : (
        <PhotoPlaceholder width={isLogo ? 251 : 375} height={isLogo ? 176 : 247} />
      )}
      <div style={{ paddingLeft: isLogo ? 16 : 40, paddingTop: 8 }}>
        <div style={MEMBER_NAME}>{collab.name}</div>
        <div style={MEMBER_DESC}>{collab.description}</div>
      </div>
    </div>
  );
}

function AlumniEntry({ person }: { person: AlumniMember }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'FreightText Pro', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 36,
          lineHeight: "36px",
          color: "var(--foreground)",
          marginBottom: 6,
        }}
      >
        {person.name}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 400,
          fontSize: 18,
          color: "var(--foreground)",
        }}
      >
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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function MembersPage() {
  return (
    <main style={{ paddingLeft: 90, paddingRight: 90, paddingTop: 46, paddingBottom: 80 }}>

      {/* ── Our Lab ── */}
      <section style={{ marginBottom: 0 }}>
        <div style={SECTION_TITLE}>Our Lab</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {/* PhD + mixed rows (with photos) */}
        {phdMembers.map(([left, right], i) => (
          <div key={i} style={ROW}>
            <div style={LEFT_CELL}>
              <MemberCard member={left} hasPhoto />
            </div>
            <div style={RIGHT_CELL}>
              <MemberCard member={right} hasPhoto={!!right.image} />
            </div>
          </div>
        ))}

        {/* Undergrad-only rows (no photos) */}
        {undergradRows.map(([left, right], i) => (
          <div key={i} style={ROW}>
            <div style={{ ...LEFT_CELL, padding: "48px 40px 48px 0" }}>
              <MemberCard member={left} hasPhoto={false} />
            </div>
            <div style={{ ...RIGHT_CELL, padding: "48px 0 48px 40px" }}>
              <MemberCard member={right} hasPhoto={false} />
            </div>
          </div>
        ))}
      </section>

      {/* ── Collaborators ── */}
      <section style={{ marginTop: 80 }}>
        <div style={SECTION_TITLE}>Collaborators</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {collaborators.map(([left, right], i) => (
          <div key={i} style={ROW}>
            <div style={LEFT_CELL}>
              <CollaboratorCard collab={left} />
            </div>
            <div style={RIGHT_CELL}>
              <CollaboratorCard collab={right} />
            </div>
          </div>
        ))}
      </section>

      {/* ── Alumni ── */}
      <section style={{ marginTop: 80 }}>
        <div style={SECTION_TITLE}>Alumni</div>
        <div style={{ ...DIVIDER, marginBottom: 0 }} />

        {alumni.map(([left, right], i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "1px solid var(--foreground)",
              padding: "24px 0",
            }}
          >
            <div style={{ paddingRight: 40 }}>
              <AlumniEntry person={left} />
            </div>
            <div style={{ paddingLeft: 40 }}>
              <AlumniEntry person={right} />
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}
