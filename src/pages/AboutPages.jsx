import { PDF } from '../config.js';
import { ABOUT_SUB } from '../data/nav.js';
import Img from '../components/Img.jsx';
import { Band } from '../components/common.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';

export function About() {
  return (
    <>
      <Band crumb={['About']} title="About the institute" text="Quality pharmacy education with a sense of social responsibility." sub={ABOUT_SUB} />
      <section className="s">
        <div className="wrap split">
          <div className="prose">
            <p>Our institute is a constituent unit of Amaltas University, Dewas. It is run by Amaltas Educational Welfare Society, Dewas. It is established to provide quality education and contribute towards social responsibility.</p>
            <p>Amaltas Institute of Pharmacy was established in 2023. It is approved by the Pharmacy Council of India (PCI), New Delhi, and affiliated to Amaltas University, Dewas. It offers B.Pharm and D.Pharm courses.</p>
            <p>The institute has well defined classrooms, equipped laboratories, a well stocked library, instrumentation facilities and a qualified, dedicated teaching staff for theory and practical work.</p>
            <div className="doclinks">
              {[
                [PDF.pci, 'fileCheck', 'PCI approval letter 2025-26'],
                [PDF.affiliation, 'file', 'Affiliation letter'],
                [PDF.brochure, 'download', 'Brochure (PDF)'],
                [PDF.bulletin, 'newspaper', 'Bulletin (PDF)'],
                [PDF.bulletin2, 'newspaper', 'Bulletin Vol. 02 (PDF)'],
              ].map(([h, ic, t]) => (
                <a key={t} href={h} target="_blank" rel="noopener"><Icon name={ic} size={17} /> {t}</a>
              ))}
            </div>
          </div>
          <Img path="assets/images/About amaltas - 540 x 465px_2.jpg" alt="Amaltas Institute of Pharmacy" />
        </div>
      </section>
      <section className="s alt">
        <div className="wrap">
          <h2>Aim, vision and mission</h2>
          <div className="vm" style={{ marginTop: 24 }}>
            <div><IconBox name="target" /><h3>Aim</h3><p>To become a centre of excellence in pharmacy education and research, and to prepare qualified, professional pharmacists who can compete in the workplace.</p></div>
            <div><IconBox name="eye" /><h3>Vision</h3><p>To create a functional, globally competitive and research focused department that responds to the needs of society.</p></div>
            <div><IconBox name="compass" /><h3>Mission</h3><p>To impart pharmacy knowledge through continuous improvement in teaching and learning, build ethics, social empathy and management skills, and motivate students towards higher education and research.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

function Message({ img, alt, paras, cite }) {
  return (
    <section className="s">
      <div className="wrap">
        <div className="msg big">
          <Img path={img} alt={alt} />
          <blockquote>
            <span className="qmark" aria-hidden="true">&ldquo;</span>
            {paras.map((p, i) => <p key={i}>{p}</p>)}
            <cite>{cite[0]}<br />{cite[1]}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function Chairman() {
  return (
    <>
      <Band crumb={['About', 'Chairman message']} title="Chairman message" text="A welcome to students and knowledge seekers." sub={ABOUT_SUB} />
      <Message
        img="assets/images/chairman.jpg"
        alt="Shri Mayankraj Singh Bhadoria"
        cite={['Shri Mayankraj Singh Bhadoria', 'Chairman, Amaltas University']}
        paras={[
          'As the Chairman of Amaltas University, I am humbled by the enormous faith given to me by the community. I accept the challenges and responsibility of developing a university that puts social responsibility, integrity and accessibility first, one that we can all be proud of. It is with great pleasure that I greet the students and knowledge aspirants in Amaltas University.',
          'Our objective is to inculcate value education in our students, to demand the highest standards of service, and to enable them to identify hidden talents, provide opportunities and build them into future leaders, entrepreneurs and good human beings towards society.',
          'I wish to welcome potential students to the Amaltas family. May your journey be fulfilling and help towards your comprehensive development. You will also learn to acquire life-long learning skills in this temple of knowledge.',
          'I welcome you to this wholesome experience at Amaltas University, a youthful university for the young. Best wishes.',
        ]}
      />
    </>
  );
}

export function Principal() {
  return (
    <>
      <Band crumb={['About', 'Principal message']} title="Principal message" text="A welcome from the head of the institute." sub={ABOUT_SUB} />
      <Message
        img="assets/images/principal.png"
        alt="Dr. Neelam Khan"
        cite={['Dr. Neelam Khan (M.Pharm, Ph.D)', 'Principal, Amaltas Institute of Pharmacy, Amaltas University']}
        paras={[
          'It is my pleasure to welcome you to Amaltas Institute of Pharmacy, Amaltas University, Dewas.',
          'At AIP, our vision is to create a functional, globally competitive and research focused department that responds to the needs of society.',
          'The aim is to train students to a high level of technical skill in pharmaceutical sciences, and to nurture disciplined, excellent pharmacists who are exposed to every aspect of the profession. We are dedicated to giving society quality education and health care by providing the best future pharmacists.',
          'Wish you the best of luck.',
        ]}
      />
    </>
  );
}
