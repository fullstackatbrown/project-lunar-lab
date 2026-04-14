import '../globals.css';

interface LabMember {
  name: string;
  title: string;
  description: string;
  image?: string;
}

interface AlumniMember {
  name: string;
  role: string;
  nextPosition: string;
}

interface Collaborator {
  name: string;
  description: string;
  logo?: string;
}

const labMembers: LabMember[] = [
  { 
    name: 'Ellie Pavlick',
    title: 'Assistant Professor', 
    description: 'Proud advisor of the below students. :)',                                              
    image: '/images/ellie_pavlick.png' },
  { 
    name: 'Jack Merullo',          
    title: 'Ph.D. Student',       
    description: 'Mechanistic interpretability, representation learning, large language models',         
    image: '/images/jack_merullo.png' },
  { 
    name: 'Tian Yun',               
    title: 'Ph.D. Student',       
    description: 'Grounded language learning, multimodality, planning, reasoning',                       
    image: '/images/tian_yun.png' },
  { 
    name: 'Michael Lepori',         
    title: 'Ph.D. Student',       
    description: 'Computational cognitive science, mechanistic interpretability, compositionality',       
    image: '/images/michael_leport.png' },
  { 
    name: 'Sam Musker',             
    title: 'Ph.D. Student',       
    description: 'Computational cognitive science, philosophy of language, analogical reasoning',         
    image: '/images/sam_musker.png' },
  { 
    name: 'Alyssa Marie Loo Li Ann', 
    title: 'Undergraduate',       
    description: '' },
  { 
    name: 'Qinan Yu',               
    title: 'Undergraduate',       
    description: '' },
  { 
    name: 'Suraj Anand',           
    title: 'Undergraduate',       
    description: '' },
  { 
    name: 'Noah Foster',            
    title: 'Undergraduate',       
    description: '' },
  { 
    name: 'Kunal Handa',            
    title: 'Undergraduate',       
    description: '' },
];

const alumni: AlumniMember[] = [
  { 
    name: 'Aaron Traylor',    
    role: 'Ph.D. Student', 
    nextPosition: 'Microsoft' },
  { 
    name: 'Tucker Berckmann', 
    role: 'MS Student',    
    nextPosition: 'PhD at Saarland' },
  { 
    name: 'Albert Webson',    
    role: 'Ph.D. Student', 
    nextPosition: 'Google DeepMind' },
  { 
    name: 'Dan Smits',        
    role: 'Undergraduate', 
    nextPosition: '' },
  { 
    name: 'Charlie Lovering', 
    role: 'Ph.D. Student', 
    nextPosition: 'Kensho' },
  { 
    name: 'Sheridan Feucht',  
    role: 'Undergraduate', 
    nextPosition: 'PhD at Northeastern' },
  { 
    name: 'Dylan Ebert',      
    role: 'Ph.D. Student', 
    nextPosition: 'Huggingface' },
  { 
    name: 'Nam Do',           
    role: 'Undergraduate', 
    nextPosition: 'PathAI' },
];

const collaborators: Collaborator[] = [
  { 
    name: 'BigAI',       
    description: 'Brown Integrative General Artificial Intelligence', 
    logo: '/images/bigai.png' },
  { 
    name: 'Carney CCBS', 
    description: 'Center for Computational Brain Science',            
    logo: '/images/ccbs.png' },
  { 
    name: 'BLT',         
    description: 'Brown Language and Thought Lab',                    
    logo: '/images/blt.png' },
  { 
    name: 'PALM',        
    description: 'Perception, Action, and Learning Lab',              
    logo: '/images/palm.png' },
];

export default function MembersPage() {
  return (
    <main className="page">

      <section className="section">
        <h2 className="section-title">Our Lab</h2>
        <div className="grid">
          {labMembers.map((member, index) => (
            <div key={index} className="image-card">
              {member.image && <img src={member.image} alt={member.name} />}
              <div className="image-card-content">
                <div className="image-card-name">{member.name}</div>
                <div className="image-card-title">{member.title}</div>
                {member.description && (
                  <div className="description">{member.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Alumni</h2>
        <div className="alumni-grid">
          {alumni.map((person, index) => (
            <div key={index} className="alumni-item">
              <div className="alumni-name">{person.name}</div>
              <div className="alumni-path">
                {person.role}
                {person.nextPosition && (
                  <><span>→</span>{person.nextPosition}</>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Collaborators</h2>
        <div className="collaborators-grid">
          {collaborators.map((collab, index) => (
            <div key={index} className="collaborator-item">
              {collab.logo && <img src={collab.logo} alt={collab.name} className="collaborator-logo" />}
              <div>
                <div className="collaborator-name">{collab.name}</div>
                <div className="description">{collab.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}