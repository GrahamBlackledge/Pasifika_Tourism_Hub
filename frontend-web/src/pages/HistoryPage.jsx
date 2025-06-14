import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlagSidebar from '../components/FlagSidebar/FlagSidebar';
import './HistoryPage.css';

import samoaFlag  from '../assets/flags/sa.png';
import fijiFlag   from '../assets/flags/fi.png';
import tongaFlag  from '../assets/flags/to.png';

import samoHero   from '../assets/images/samoa-history-hero.jpg';
import fijiHero   from '../assets/images/fiji-history-hero.jpg';
import tongaHero  from '../assets/images/tonga-history-hero.jpg';
import somoaPhoto from '../assets/images/SamoaHistoryMain.jpg' 
import fijiPhoto from '../assets/images/FijiHistoryMain.jpg' 
import tongaPhoto from '../assets/images/TongaHistoryMain.jpg' 

const HISTORY_DATA = {
  samoa: {
    name: 'Samoa',
    flag: samoaFlag,
    hero: samoHero,
    photo: somoaPhoto,
    intro:
      'Samoa’s history stretches back 3,000 years, from Lapita navigators to independence in 1962.',
    timeline: [
    'c. 1000 BC – First Polynesian settlers arrive',
    '1722 – First recorded European sighting by Jacob Roggeveen',
    '1830 – London Missionary Society brings Christianity',
    '1889 – Samoan Crisis (Germany–US standoff)',
    '1899 – Tripartite Convention partitions the islands',
    '1914 – New Zealand forces occupy German Samoa',
    '1918 – Spanish flu epidemic kills ~22% of population',
    '1962 – First Pacific nation to regain independence',
  ],
    facts:  [
    '“Samoa” means Sacred Centre in Polynesian cosmology.',
    'The Mau movement (1920s–30s) was a non-violent independence struggle.',
    'Traditional tattoo (pe‘a / malu) takes several days and is done with bone combs.',
    'Samoa switched the side of the road (to the left) in 2009.',
    'In 2011 Samoa jumped the International Date Line, skipping 30 Dec.',
    'Savai‘i is one of Earth’s most recently formed subaerial volcanoes.',
  ],
  },
  fiji: {
    name: 'Fiji',
    flag: fijiFlag,
    hero: fijiHero,
    photo: fijiPhoto,
    intro:
      'Fiji’s islands were settled 3,500 years ago; today the nation blends Melanesian roots with Indian and European influences.',
    timeline: [
    'c. 1500 BC – Lapita peoples arrive with pottery & sailing tech',
    '1643 – Abel Tasman sights Vanua Levu & Taveuni',
    '1874 – Chief Cakobau cedes Fiji to Britain',
    '1879 – First Indian indentured labourers arrive',
    '1942 – US Marines base established during WWII',
    '1970 – Independence within the Commonwealth',
    '1987 – Two military coups trigger a republic',
    '2014 – Return to democratic elections after 2006 coup',
  ],
    facts: [
    'Fiji has three official languages: Fijian, Hindi, and English.',
    'The 333 islands of Fiji cover an EEZ the size of Germany.',
    'Fire-walking began on Beqa Island over 500 years ago.',
    'Fijian rugby sevens won Olympic gold in 2016 & 2020.',
    'Fiji’s currency features a nanai (bearded lizard) found nowhere else.',
    'Sigatoka Sand Dunes are Fiji’s first national park and an ancient burial site.',
  ],
  },
  tonga: {
    name: 'Tonga',
    flag: tongaFlag,
    hero: tongaHero,
    photo: tongaPhoto,
    intro:
      'Known as the “Friendly Islands,” Tonga is the only Pacific kingdom never formally colonised.',
    timeline: [
    'c. 1500 BC – First Lapita settlements on Tongatapu',
    '1616 – First European contact: Dutch vessel *Eendracht*',
    '1845 – King George Tupou I unifies Tonga',
    '1875 – First written constitution proclaimed',
    '1900 – Tonga becomes a British protected state',
    '1943 – Tongan troops fight in the Solomon Islands',
    '1970 – Full sovereignty regained; joins Commonwealth',
    '2022 – Hunga Tonga–Hunga Haʻapai volcanic eruption & tsunami',
  ],
    facts: [
    'Tonga spans 170 islands but only 36 are permanently inhabited.',
    'The Tongan calendar still uses traditional lunar months (e.g., *Fakaʻahu*).',
    'Haʻamonga ʻa Maui trilithon weighs ~40 tons per upright stone.',
    'ʻUliʻuli peka is a unique Tongan fruit bat regarded as a delicacy.',
    'Tonga’s monarch waived personal salary after 2011 reforms.',
    'It is illegal to conduct most business in Tonga on Sundays.',
  ],
  },
};

const COUNTRIES = Object.entries(HISTORY_DATA).map(([slug, d]) => ({
  slug,
  name: d.name,
  flag: d.flag,
}));

export default function HistoryPage() {
  const { country: urlSlug } = useParams();
  const navigate             = useNavigate();

  const initialSlug = HISTORY_DATA[urlSlug] ? urlSlug : 'samoa';
  const [selected, setSelected] = useState(initialSlug);

  useEffect(() => {
    if (urlSlug !== selected) {
      if (HISTORY_DATA[urlSlug]) setSelected(urlSlug);
      else navigate('/samoa/history', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  const data = HISTORY_DATA[selected];


  const handleSelect = (slug) => navigate(`/${slug}/history`);

  return (
    <div className="history-page">
      <img className="history-hero-banner" src={data.hero} alt={`${data.name} hero`} />

      <h1 className="history-title">{data.name} History</h1>
    <p className="history-intro">{data.intro}</p>

      <div className="history-body">
        <FlagSidebar
          countries={COUNTRIES}
          selectedCountry={selected}
          onSelect={handleSelect}
        />

        <section className="history-main">
          <div className="history-grid">
            <article className="history-timeline">
              <h3>Timeline</h3>
              <ol>{data.timeline.map((t) => <li key={t}>{t}</li>)}</ol>
            </article>

            <figure className="history-photo">
              <img src={data.photo} alt={`${data.name} historic`} />
            </figure>

            <aside className="history-facts">
              <h3>Did you know?</h3>
              <ul>{data.facts.map((f) => <li key={f}>{f}</li>)}</ul>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
