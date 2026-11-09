import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Search, 
  Menu, 
  Home, 
  TrendingUp, 
  Bookmark, 
  History, 
  Film, 
  Heart, 
  Share2, 
  ThumbsUp, 
  X, 
  Clock, 
  Tag, 
  ShieldAlert, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

// ==========================================
// MOCK DATA (Simulando movies.json estático)
// ==========================================
const MOVIES_DATABASE = [
  {
    id: "trip-to-the-moon-1902",
    title: "Le Voyage dans la Lune (A Trip to the Moon)",
    year: 1902,
    duration: "13m",
    genre: "Sci-Fi",
    rating: "Livre",
    thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/ZNAHcMMOHEE?autoplay=1",
    description: "Um clássico seminal do cinema mudo dirigido por Georges Méliès. Um grupo de astrônomos viaja até a Lua em uma cápsula disparada por um canhão gigante e encontra habitantes lunares extraterrestres.",
    views: "1.2M",
    director: "Georges Méliès"
  },
  {
    id: "night-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    duration: "1h 36m",
    genre: "Terror Clássico",
    rating: "+16",
    thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/iD4qj0q7Jjs?autoplay=1",
    description: "Um grupo desorganizado de pessoas se esconde em uma fazenda rural na Pensilvânia para escapar de uma horda repentina de mortos-vivos famintos por carne humana. Obra-prima de George A. Romero em domínio público.",
    views: "3.5M",
    director: "George A. Romero"
  },
  {
    id: "charade-1963",
    title: "Charade (Charada)",
    year: 1963,
    duration: "1h 53m",
    genre: "Film Noir",
    rating: "+12",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/v2Fw5-XQj0U?autoplay=1",
    description: "Após a morte misteriosa de seu marido em Paris, Regina Lampert (Audrey Hepburn) é perseguida por vários homens que buscam a fortuna oculta de seu falecido esposo. Ela recorre à ajuda do charmoso Peter Joshua (Cary Grant).",
    views: "890K",
    director: "Stanley Donen"
  },
  {
    id: "gullivers-travels-1939",
    title: "Gulliver's Travels",
    year: 1939,
    duration: "1h 16m",
    genre: "Comédia",
    rating: "Livre",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/5-j-zUAK-h4?autoplay=1",
    description: "Adaptação clássica em animação produzida pelos Fleischer Studios. Lemuel Gulliver naufraga na ilha de Lilliput, cujos habitantes têm apenas alguns centímetros de altura, bem no momento em que uma rivalidade entre reinos vizinhos se intensifica.",
    views: "2.1M",
    director: "Dave Fleischer"
  },
  {
    id: "the-general-1926",
    title: "The General (A General)",
    year: 1926,
    duration: "1h 18m",
    genre: "Comédia",
    rating: "Livre",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/iHl8mNq9Tcg?autoplay=1",
    description: "Considerado um dos maiores filmes mudos da história. Buster Keaton interpreta um maquinista de trem do Sul durante a Guerra Civil Americana que precisa resgatar sua amada locomotiva e sua noiva raptadas por espiões da União.",
    views: "1.7M",
    director: "Buster Keaton & Clyde Bruckman"
  },
  {
    id: "sherlock-holmes-1939",
    title: "The Adventures of Sherlock Holmes",
    year: 1939,
    duration: "1h 25m",
    genre: "Film Noir",
    rating: "+12",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/c0JWWk71YqU?autoplay=1",
    description: "O lendário detetive Sherlock Holmes (Basil Rathbone) e seu fiel parceiro Dr. Watson entram em um embate genial com o nefasto Professor Moriarty para proteger as Joias da Coroa britânica.",
    views: "950K",
    director: "Alfred L. Werker"
  },
  {
    id: "phantom-opera-1925",
    title: "The Phantom of the Opera",
    year: 1925,
    duration: "1h 33m",
    genre: "Terror Clássico",
    rating: "+14",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/d3W3t2x46oA?autoplay=1",
    description: "Um compositor desfigurado conhecido como o Fantasma aterroriza a Ópera de Paris para promover a carreira da mulher que ama. Com o icônico Lon Chaney no papel principal.",
    views: "1.4M",
    director: "Rupert Julian"
  },
  {
    id: "metropolis-1927",
    title: "Metropolis",
    year: 1927,
    duration: "2h 33m",
    genre: "Sci-Fi",
    rating: "+14",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    embedUrl: "https://www.youtube.com/embed/gdtZv3XGGWc?autoplay=1",
    description: "Monumental obra do expressionismo alemão dirigida por Fritz Lang. Em um futuro distópico, a sociedade é severamente dividida entre a elite pensante e a classe trabalhadora subterrânea.",
    views: "4.1M",
    director: "Fritz Lang"
  }
];

const GENRES = ["Todos", "Sci-Fi", "Terror Clássico", "Film Noir", "Comédia"];
const RATINGS = ["Todas", "Livre", "+12", "+14", "+16"];

export default function App() {
  // States de navegação e filtros
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); // home, trending, favorites, history
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedRating, setSelectedRating] = useState('Todas');
  
  // Player / Watch State
  const [activeMovie, setActiveMovie] = useState(null);
  
  // User Storage States
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('cinepublica_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('cinepublica_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [likedMovies, setLikedMovies] = useState([]);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('cinepublica_favs', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('cinepublica_history', JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  // Toggle Favorito
  const toggleFavorite = (movieId, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Toggle Curtir
  const toggleLike = (movieId) => {
    setLikedMovies(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Selecionar filme para assistir
  const handleSelectMovie = (movie) => {
    setActiveMovie(movie);
    // Adicionar ao histórico se ainda não estiver
    setHistory(prev => {
      const filtered = prev.filter(id => id !== movie.id);
      return [movie.id, ...filtered];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compartilhar link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Filtragem dos filmes
  const filteredMovies = useMemo(() => {
    return MOVIES_DATABASE.filter(movie => {
      // Filtro de aba lateral
      if (activeTab === 'favorites' && !favorites.includes(movie.id)) {
        return false;
      }
      if (activeTab === 'history' && !history.includes(movie.id)) {
        return false;
      }

      // Filtro de Busca
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtro de Gênero
      const matchesGenre = selectedGenre === 'Todos' || movie.genre === selectedGenre;

      // Filtro de Classificação Indicativa
      const matchesRating = selectedRating === 'Todas' || movie.rating === selectedRating;

      return matchesSearch && matchesGenre && matchesRating;
    });
  }, [searchQuery, selectedGenre, selectedRating, activeTab, favorites, history]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans flex flex-col selection:bg-[#E50914] selection:text-white">
      
      {/* ==========================================
          HEADER PRINCIPAL (Design System YouTube)
         ========================================== */}
      <header className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#1F1F1F] px-4 py-2.5 flex items-center justify-between gap-4">
        
        {/* Esquerda: Menu Burger + Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#1F1F1F] rounded-full transition-colors text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
            title="Alternar Menu Lateral"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo CinePública */}
          <div 
            onClick={() => { setActiveMovie(null); setActiveTab('home'); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#E50914] text-black font-black p-1.5 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-[#FF0000] transition-colors">
              <Play className="w-5 h-5 fill-current text-white ml-0.5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Cine<span className="text-[#FFD700]">Pública</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#1E88E5] font-semibold">Domínio Público</span>
            </div>
          </div>
        </div>

        {/* Centro: Barra de Busca com Foco Azul (#1E88E5) */}
        <div className="flex-1 max-w-2xl mx-2">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Buscar filmes clássicos, gêneros ou atores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-[#1F1F1F] text-white placeholder-gray-500 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-14 text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button className="bg-[#1F1F1F] border border-l-0 border-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 hover:text-white px-5 py-2 rounded-r-full transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direita: Ações & Avatar */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setActiveTab('favorites'); setActiveMovie(null); }}
            className="hidden sm:flex items-center gap-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-sm text-[#FFD700] px-3 py-1.5 rounded-full border border-[#FFD700]/20 transition-colors"
          >
            <Bookmark className="w-4 h-4 fill-current text-[#FFD700]" />
            <span className="font-medium text-white">{favorites.length} Salvos</span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-[#1E88E5] text-white flex items-center justify-center font-bold text-xs shadow-md border border-[#1E88E5]/50">
            CP
          </div>
        </div>
      </header>

      {/* ==========================================
          CORPO PRINCIPAL (Sidebar + Feed/Player)
         ========================================== */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* SIDEBAR RETRÁTIL */}
        <aside className={`
          ${sidebarOpen ? 'w-64' : 'w-16'} 
          bg-[#0F0F0F] border-r border-[#1F1F1F] transition-all duration-300 ease-in-out flex flex-col shrink-0 select-none z-40
        `}>
          <div className="p-2 space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setActiveMovie(null); }}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'home' && !activeMovie
                  ? 'bg-[#1E88E5]/15 text-[#1E88E5] font-semibold border-l-4 border-[#1E88E5]'
                  : 'text-gray-300 hover:bg-[#1F1F1F] hover:text-white'
              }`}
            >
              <Home className={`w-5 h-5 shrink-0 ${activeTab === 'home' && !activeMovie ? 'text-[#1E88E5]' : ''}`} />
              {sidebarOpen && <span>Início</span>}
            </button>

            <button
              onClick={() => { setActiveTab('trending'); setActiveMovie(null); }}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'trending' && !activeMovie
                  ? 'bg-[#1E88E5]/15 text-[#1E88E5] font-semibold border-l-4 border-[#1E88E5]'
                  : 'text-gray-300 hover:bg-[#1F1F1F] hover:text-white'
              }`}
            >
              <TrendingUp className={`w-5 h-5 shrink-0 ${activeTab === 'trending' && !activeMovie ? 'text-[#1E88E5]' : ''}`} />
              {sidebarOpen && <span>Em Alta</span>}
            </button>

            <button
              onClick={() => { setActiveTab('favorites'); setActiveMovie(null); }}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'favorites' && !activeMovie
                  ? 'bg-[#1E88E5]/15 text-[#1E88E5] font-semibold border-l-4 border-[#1E88E5]'
                  : 'text-gray-300 hover:bg-[#1F1F1F] hover:text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 shrink-0 ${activeTab === 'favorites' && !activeMovie ? 'text-[#1E88E5]' : ''}`} />
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span>Favoritos</span>
                  {favorites.length > 0 && (
                    <span className="bg-[#FFD700] text-black font-bold text-xs px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </div>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('history'); setActiveMovie(null); }}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'history' && !activeMovie
                  ? 'bg-[#1E88E5]/15 text-[#1E88E5] font-semibold border-l-4 border-[#1E88E5]'
                  : 'text-gray-300 hover:bg-[#1F1F1F] hover:text-white'
              }`}
            >
              <History className={`w-5 h-5 shrink-0 ${activeTab === 'history' && !activeMovie ? 'text-[#1E88E5]' : ''}`} />
              {sidebarOpen && <span>Histórico</span>}
            </button>
          </div>

          {sidebarOpen && (
            <div className="mt-auto p-4 border-t border-[#1F1F1F] text-xs text-gray-500 space-y-2">
              <div className="flex items-center gap-1 text-[#FFD700] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Domínio Público Garantido</span>
              </div>
              <p className="leading-relaxed">
                Todos os filmes exibidos são livres de direitos autorais para fins educacionais e culturais.
              </p>
            </div>
          )}
        </aside>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <main className="flex-1 overflow-y-auto bg-[#0F0F0F] p-4 md:p-6 space-y-6">
          
          {/* ==========================================
              MODO PLAYER (WATCH PAGE)
             ========================================== */}
          {activeMovie ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Coluna Esquerda: Player + Informações do Filme */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Player de Vídeo HTML5/Iframe com Moldura */}
                <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#1F1F1F]">
                  <iframe
                    src={activeMovie.embedUrl}
                    title={activeMovie.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Título e Ações do Filme */}
                <div className="space-y-3 bg-[#121212] p-5 rounded-2xl border border-[#1F1F1F]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-tight">
                        {activeMovie.title}
                      </h1>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                        <span>{activeMovie.year}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded font-semibold text-xs border border-[#FFD700]/30">
                          <Tag className="w-3 h-3" />
                          {activeMovie.genre}
                        </span>
                        <span>•</span>
                        <span className="bg-[#E50914] text-white font-bold text-xs px-2 py-0.5 rounded">
                          {activeMovie.rating}
                        </span>
                        <span>•</span>
                        <span>{activeMovie.views} visualizações</span>
                      </div>
                    </div>

                    {/* Botões de Ação estilo YouTube com Paleta do Design System */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(activeMovie.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          likedMovies.includes(activeMovie.id)
                            ? 'bg-[#1E88E5] text-white'
                            : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{likedMovies.includes(activeMovie.id) ? 'Gostei' : 'Curtir'}</span>
                      </button>

                      <button
                        onClick={(e) => toggleFavorite(activeMovie.id, e)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          favorites.includes(activeMovie.id)
                            ? 'bg-[#FFD700] text-black font-semibold'
                            : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(activeMovie.id) ? 'fill-current' : ''}`} />
                        <span>{favorites.includes(activeMovie.id) ? 'Salvo' : 'Favoritar'}</span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>

                  {/* Toast de Notificação de Compartilhamento */}
                  {copiedNotification && (
                    <div className="bg-[#1E88E5] text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 animate-fade-in">
                      <Check className="w-4 h-4" />
                      <span>Link do filme copiado para a área de transferência!</span>
                    </div>
                  )}

                  {/* Sinopse e Detalhes */}
                  <div className="mt-4 pt-4 border-t border-[#1F1F1F] text-sm text-gray-300 space-y-2">
                    <p className="leading-relaxed">{activeMovie.description}</p>
                    <div className="pt-2 text-xs text-gray-400">
                      <strong>Direção:</strong> {activeMovie.director}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Recomendados (Estilo Lista Lateral YouTube) */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#E50914]" />
                  <span>Próximos Clássicos</span>
                </h3>

                <div className="space-y-3">
                  {MOVIES_DATABASE.filter(m => m.id !== activeMovie.id).map(movie => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie)}
                      className="flex gap-3 bg-[#121212] hover:bg-[#1F1F1F] p-2 rounded-xl border border-[#1F1F1F] cursor-pointer transition-all group"
                    >
                      <div className="relative w-36 h-20 shrink-0 bg-black rounded-lg overflow-hidden">
                        <img 
                          src={movie.thumbnail} 
                          alt={movie.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1 rounded">
                          {movie.duration}
                        </span>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Play className="w-6 h-6 text-[#E50914] fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-[#1E88E5] transition-colors">
                          {movie.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                          <span>{movie.year}</span>
                          <span className="bg-[#FFD700] text-black font-bold px-1 rounded text-[9px]">
                            {movie.rating}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-0.5">{movie.genre}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (

            /* ==========================================
                MODO FEED PRINCIPAL (GRID ESTILO YOUTUBE)
               ========================================== */
            <div className="space-y-6">
              
              {/* BARRA DE FILTROS (Gênero e Classificação Indicativa) */}
              <div className="space-y-3 bg-[#121212] p-4 rounded-2xl border border-[#1F1F1F]">
                
                {/* Pílulas de Gêneros */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 shrink-0">
                    Gênero:
                  </span>
                  {GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedGenre === genre
                          ? 'bg-[#FFD700] text-black shadow-lg scale-105'
                          : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                {/* Pílulas de Classificação Indicativa */}
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#1F1F1F] scrollbar-none">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 shrink-0">
                    Classificação:
                  </span>
                  {RATINGS.map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                        selectedRating === rating
                          ? 'bg-[#E50914] text-white shadow-md'
                          : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-400'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>

              </div>

              {/* Título da Seção Dinâmico */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#E50914]" />
                  <span>
                    {activeTab === 'home' && 'Catálogo de Domínio Público'}
                    {activeTab === 'trending' && 'Filmes Em Alta'}
                    {activeTab === 'favorites' && 'Seus Filmes Favoritos'}
                    {activeTab === 'history' && 'Histórico de Visualização'}
                  </span>
                </h2>
                <span className="text-xs text-gray-400">
                  {filteredMovies.length} filme(s) encontrado(s)
                </span>
              </div>

              {/* GRID DE CARDS ESTILO YOUTUBE */}
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredMovies.map(movie => {
                    const isFav = favorites.includes(movie.id);

                    return (
                      <div
                        key={movie.id}
                        onClick={() => handleSelectMovie(movie)}
                        className="bg-[#121212] rounded-2xl overflow-hidden border border-[#1F1F1F] hover:border-[#1E88E5]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer flex flex-col"
                      >
                        {/* Thumbnail / Capa com Overlays */}
                        <div className="relative aspect-video bg-black overflow-hidden">
                          <img
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Badge de Duração (Inferior Direito) */}
                          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {movie.duration}
                          </div>

                          {/* Overlay de Hover Play */}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-[#E50914] text-white p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Botão de Favoritar Rápido (Canto Superior Direito) */}
                          <button
                            onClick={(e) => toggleFavorite(movie.id, e)}
                            className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm transition-colors z-10"
                            title={isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#E50914] text-[#E50914]' : 'text-white'}`} />
                          </button>
                        </div>

                        {/* Informações do Filme */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="font-bold text-sm text-white group-hover:text-[#1E88E5] transition-colors line-clamp-2 leading-snug">
                              {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {movie.description}
                            </p>
                          </div>

                          {/* Metadados: Ano, Gênero (Amarelo) e Classificação */}
                          <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-xs">
                            <span className="text-gray-400">{movie.year}</span>
                            
                            <div className="flex items-center gap-1.5">
                              {/* Badge de Gênero em Amarelo */}
                              <span className="bg-[#FFD700]/10 text-[#FFD700] font-semibold text-[10px] px-2 py-0.5 rounded border border-[#FFD700]/30">
                                {movie.genre}
                              </span>

                              {/* Badge de Classificação Indicativa */}
                              <span className="bg-[#E50914] text-white font-bold text-[10px] px-1.5 py-0.5 rounded">
                                {movie.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Estado Vazio caso nenhum filme seja encontrado */
                <div className="bg-[#121212] border border-[#1F1F1F] rounded-2xl p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1F1F1F] text-gray-400 rounded-full flex items-center justify-center mx-auto">
                    <Info className="w-8 h-8 text-[#1E88E5]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Nenhum filme encontrado</h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    Não encontramos resultados para os filtros selecionados ou para o termo buscado. Tente alterar suas preferências.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGenre('Todos');
                      setSelectedRating('Todas');
                      setActiveTab('home');
                    }}
                    className="bg-[#E50914] hover:bg-[#FF0000] text-white font-semibold text-sm px-5 py-2 rounded-full transition-colors"
                  >
                    Resetar Filtros
                  </button>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

    </div>
  );
}