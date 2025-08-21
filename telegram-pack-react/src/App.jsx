import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const tabs = [
  { id: 'all', label: '🏠 Tout' },
  { id: 'entertainment', label: '🎬 Divertissement' },
  { id: 'education', label: '🎓 Éducation' },
  { id: 'tech', label: '💻 Tech' },
  { id: 'business', label: '💼 Business' },
  { id: 'lifestyle', label: '🌟 Lifestyle' },
  { id: 'bots', label: '🤖 Bots' },
  { id: 'news', label: '📰 Actualités' },
  { id: 'crypto', label: '₿ Crypto' },
]

const cards = [
  { cat: 'entertainment', title: 'Films & Séries', desc: "Découvrez les meilleurs canaux pour suivre l'actualité cinéma, des recommandations et des discussions sur vos films préférés.", channels: ['🎬 @CinemaPassionFR','🍿 @SeriesAddictVF','🎭 @CritiquesFilms','🎪 @DivertissementFR'] },
  { cat: 'education', title: 'Formations & Éducation', desc: 'Accédez aux meilleures ressources éducatives, cours gratuits et formations professionnelles disponibles sur Telegram.', channels: ['📚 @CoursGratuitsFR','🎓 @FormationsProfessionnelles','🧠 @DeveloppementPersonnel','📖 @LivresGratuits'] },
  { cat: 'tech', title: 'Tech & Développement', desc: 'Restez à jour avec les dernières tendances tech, outils de développement et innovations technologiques.', channels: ['💻 @DevCommunityFR','⚡ @TechNewsFR','🔧 @OutilsDevFR','🐍 @PythonFrance'] },
  { cat: 'business', title: 'Business & Finance', desc: 'Suivez les marchés financiers, découvrez des opportunités business et développez vos compétences entrepreneuriales.', channels: ['💰 @CryptoTradingFR','📈 @BourseFinanceFR','🚀 @StartupNationFR','💼 @EntrepreneursFR'] },
  { cat: 'lifestyle', title: 'Lifestyle & Bien-être', desc: 'Améliorez votre quotidien avec des conseils lifestyle, santé, cuisine et développement personnel.', channels: ['🥗 @NutritionSanteFR','🏋️ @FitnessSportFR','🧘 @MeditationZenFR','👨‍🍳 @CuisineFacileFR'] },
  { cat: 'entertainment', title: 'Musique & Audio', desc: "Découvrez de nouveaux artistes, partagez vos playlists et restez connecté à l'actualité musicale mondiale.", channels: ['🎵 @NouvellesDecouvertesFR','🎧 @PlaylistsChillFR','🎤 @ActualiteMusicale','🎸 @RockMetalFR'] },
  { cat: 'bots', title: 'Bots Utiles', desc: 'Collection des meilleurs bots Telegram pour automatiser vos tâches et améliorer votre productivité.', channels: ['🤖 @ProductivityBotsCollection','⚙️ @AutomationBotsFR','📊 @AnalyticsBotsFR','🎮 @GamesBotsFR'] },
  { cat: 'news', title: 'Actualités & Info', desc: 'Restez informé avec les dernières actualités françaises et internationales, analyses et débats.', channels: ['📰 @ActualitesFranceFR','🌍 @ActualitesInternational','💬 @DebatsSocieteFR','🔍 @FactCheckingFR'] },
  { cat: 'crypto', title: 'Crypto & Blockchain', desc: 'Suivez le marché des cryptomonnaies, analyses techniques, actualités blockchain et conseils trading.', channels: ['₿ @BitcoinAnalyseFR','🔗 @BlockchainNewsFR','📈 @CryptoSignalsFR','💎 @AltcoinsGemsFR'] },
]

function useDebouncedCallback(cb, delay) {
  const timeoutRef = useRef(null)
  useEffect(() => () => clearTimeout(timeoutRef.current), [])
  return (...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => cb(...args), delay)
  }
}

function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'all')
  const [query, setQuery] = useState('')
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const filteredCards = useMemo(() => {
    const term = query.trim().toLowerCase()
    return cards.filter(c => {
      const categoryMatch = activeTab === 'all' || c.cat === activeTab
      if (!categoryMatch) return false
      if (!term) return true
      return (
        c.title.toLowerCase().includes(term) ||
        c.desc.toLowerCase().includes(term) ||
        c.channels.some(ch => ch.toLowerCase().includes(term))
      )
    })
  }, [activeTab, query])

  const onSearchInput = useDebouncedCallback((v) => setQuery(v), 250)

  return (
    <div>
      <header className="header">
        <div className="container">
          <i className="fab fa-telegram telegram-icon" aria-hidden="true"></i>
          <h1>Pack Ultime Telegram</h1>
          <p>Découvrez tous les canaux et bots secrets pour maximiser votre expérience Telegram</p>
        </div>
      </header>

      <main className="container" id="main-content">
        <section className="search-section">
          <div className="search-bar">
            <label htmlFor="search-input" className="sr-only">Rechercher</label>
            <input
              id="search-input"
              className="search-input"
              placeholder="Rechercher un canal, catégorie ou bot..."
              aria-describedby="search-help"
              autoComplete="off"
              onChange={(e) => onSearchInput(e.target.value)}
            />
            {query && (
              <button className="clear-btn" type="button" aria-label="Effacer la recherche" onClick={() => setQuery('')}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            )}
            <button className="search-btn" type="button" aria-label="Lancer la recherche" onClick={() => setQuery(q => q)}>
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div id="search-help" className="sr-only">Tapez pour rechercher parmi les canaux et catégories disponibles</div>
        </section>

        <nav className="nav-tabs" role="tablist" aria-label="Catégories de canaux">
          {tabs.map(t => (
            <a
              key={t.id}
              href="#"
              className={`nav-tab ${activeTab === t.id ? 'active' : ''}`}
              data-tab={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={t.id}
              onClick={(e) => { e.preventDefault(); setActiveTab(t.id) }}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <section id="all" className="tab-content active" role="tabpanel" aria-labelledby="tab-all">
          <div className="categories-grid">
            {filteredCards.map((c, idx) => (
              <article className="category-card" data-category={c.cat} key={`${c.cat}-${idx}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="category-header">
                  <i className={`category-icon ${c.cat === 'tech' ? 'fas fa-code' : c.cat === 'business' ? 'fas fa-chart-line' : c.cat === 'lifestyle' ? 'fas fa-heart' : c.cat === 'bots' ? 'fas fa-robot' : c.cat === 'news' ? 'fas fa-newspaper' : c.cat === 'crypto' ? 'fab fa-bitcoin' : 'fas fa-film'}`} aria-hidden="true"></i>
                  <h3 className="category-title">{c.title}</h3>
                </div>
                <p className="category-description">{c.desc}</p>
                <ul className="channels-list">
                  {c.channels.map((ch, i) => (
                    <li className="channel-item" key={i}>
                      <a href="#" className="channel-link" aria-label={`Ouvrir ${ch.replace(/^[^@]*@/, '@')}`}>{ch}</a>
                      <span className="channel-members" aria-hidden="true">—</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-section" aria-labelledby="stats-title">
          <div className="container">
            <h2 id="stats-title" className="sr-only">Statistiques du Pack Ultime Telegram</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Canaux Premium</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5M+</div>
                <div className="stat-label">Membres Total</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Bots Exclusifs</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support & MAJ</div>
              </div>
            </div>
          </div>
        </section>

        <section className="telegram-features" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title" className="features-title">🚀 Fonctionnalités Telegram Avancées</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">🤖</div>
                <h4>Bots Intelligents</h4>
                <p>Automatisez vos tâches avec des bots personnalisés pour gagner en productivité</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">📂</div>
                <h4>Stockage Illimité</h4>
                <p>Sauvegardez tous vos fichiers sans limite de taille ni d'espace</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">🔒</div>
                <h4>Sécurité Maximale</h4>
                <p>Chiffrement de bout en bout pour protéger toutes vos données personnelles</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true">⚡</div>
                <h4>Vitesse Lightning</h4>
                <p>Messages instantanés livrés partout dans le monde en quelques millisecondes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
