import React, { useState, useEffect } from 'react';
import { Vendor, ServiceCategory, User, QuoteRequest, QuoteResponse, NewUser, Message } from './types';
import { VENDORS, SERVICE_CATEGORIES, USERS as MOCK_USERS, QUOTE_REQUESTS as MOCK_QUOTE_REQUESTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VendorListPage from './pages/VendorListPage';
import VendorProfilePage from './pages/VendorProfilePage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import QuoteResponseModal from './components/QuoteResponseModal';
import ChatModal from './components/ChatModal';

type View = 'home' | 'list' | 'profile' | 'organizer-dashboard' | 'vendor-dashboard' | 'login' | 'signup';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(VENDORS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);


  // Auth and Data State
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(MOCK_QUOTE_REQUESTS);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedQuoteRequest, setSelectedQuoteRequest] = useState<QuoteRequest | null>(null);
  const [signupRole, setSignupRole] = useState<'organizer' | 'vendor' | null>(null);
  const [activeQuoteRequestForChat, setActiveQuoteRequestForChat] = useState<QuoteRequest | null>(null);


  const handleSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setActiveCategory(category);
    setCurrentView('list');
  };
  
  const handleSelectCategory = (category: ServiceCategory) => {
    setActiveCategory(category.name);
    setCurrentView('list');
  };

  const handleSelectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCurrentView('profile');
  };

  const navigateToDashboard = () => {
    if (currentUser?.role === 'organizer') {
      setCurrentView('organizer-dashboard');
    } else if (currentUser?.role === 'vendor') {
      setCurrentView('vendor-dashboard');
    }
  };

  const navigateHome = () => {
    setCurrentView('home');
    setSelectedVendor(null);
    setActiveCategory('All');
    setSearchTerm('');
  };

  const navigateToHowItWorks = () => {
    setCurrentView('home');
    setScrollToSection('how-it-works');
  };
  
  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigateToDashboard();
      return true;
    }
    return false;
  };
  
  const handleGoToSignup = (role: 'organizer' | 'vendor') => {
    setSignupRole(role);
    setCurrentView('signup');
  };

  const handleSignup = (newUser: NewUser) => {
    // In a real app, you'd also check if the email is already taken
    const user: User = {
        id: `u${Date.now()}`,
        ...newUser
    };
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
    // Note: In this demo, a new vendor user doesn't automatically get a vendor profile.
    // That would be the next step in a real application (e.g., a profile creation wizard).
    navigateToDashboard();
    setSignupRole(null); // Reset role after signup
  };


  const handleLogout = () => {
    setCurrentUser(null);
    navigateHome();
  };

  const handleQuoteSubmit = (vendorId: string, details: Omit<QuoteRequest, 'id' | 'organizerId' | 'vendorId' | 'status' | 'responses' | 'messages'>) => {
    if (!currentUser || currentUser.role !== 'organizer') {
      alert("Please log in as an organizer to request a quote.");
      setCurrentView('login');
      return;
    }

    const newQuoteRequest: QuoteRequest = {
      id: `qr${Date.now()}`,
      organizerId: currentUser.id,
      vendorId: vendorId,
      status: 'pending',
      responses: [],
      messages: [],
      ...details,
    };
    setQuoteRequests(prev => [newQuoteRequest, ...prev]);
  };
  
  const handleOpenResponseModal = (request: QuoteRequest) => {
    setSelectedQuoteRequest(request);
    setIsResponseModalOpen(true);
  };
  
  const handleResponseSubmit = (requestId: string, responseDetails: Omit<QuoteResponse, 'id' | 'vendorId' | 'timestamp'>) => {
    if (!currentUser || currentUser.role !== 'vendor') return;

    const newResponse: QuoteResponse = {
        id: `resp${Date.now()}`,
        vendorId: currentUser.vendorProfileId!,
        timestamp: new Date().toISOString(),
        ...responseDetails
    };

    setQuoteRequests(prev => prev.map(req => 
        req.id === requestId 
        ? { ...req, status: 'responded', responses: [newResponse] } 
        : req
    ));
    setIsResponseModalOpen(false);
    setSelectedQuoteRequest(null);
  };
  
  const handleQuoteStatusChange = (requestId: string, status: 'booked' | 'declined') => {
      setQuoteRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status } : req
      ));
  };
  
  const handleOpenChat = (requestId: string) => {
    const request = quoteRequests.find(qr => qr.id === requestId);
    if (request) {
      setActiveQuoteRequestForChat(request);
    }
  };

  const handleCloseChat = () => {
    setActiveQuoteRequestForChat(null);
  };

  const handleSendMessage = (requestId: string, text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      text: text,
      timestamp: new Date().toISOString(),
    };

    setQuoteRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, messages: [...req.messages, newMessage] }
          : req
      )
    );
    
    // Also update the active chat modal's state to re-render immediately
     setActiveQuoteRequestForChat(prev => prev ? {...prev, messages: [...prev.messages, newMessage]} : null);
  };


  useEffect(() => {
    window.scrollTo(0, 0);

    if (scrollToSection && currentView === 'home') {
        setTimeout(() => {
            const element = document.getElementById(scrollToSection);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setScrollToSection(null); // Reset after scrolling
        }, 100);
    }
    
    if (currentView === 'list') {
      let vendors = VENDORS;

      if (activeCategory !== 'All') {
        vendors = vendors.filter(v => v.category === activeCategory);
      }

      if (searchTerm) {
        vendors = vendors.filter(v => 
          v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.bio.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredVendors(vendors);
    }

  }, [currentView, activeCategory, searchTerm, scrollToSection]);


  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return selectedVendor ? (
          <VendorProfilePage 
            vendor={selectedVendor} 
            onBack={() => {
              setCurrentView('list');
              setSelectedVendor(null);
            }} 
            onQuoteRequest={handleQuoteSubmit}
          />
        ) : null;
      case 'list':
        return (
          <VendorListPage
            vendors={filteredVendors}
            onSelectVendor={handleSelectVendor}
            initialCategory={activeCategory}
            initialSearchTerm={searchTerm}
            onFilterChange={(term, category) => {
              setSearchTerm(term);
              setActiveCategory(category);
            }}
          />
        );
      case 'organizer-dashboard':
        return currentUser?.role === 'organizer' ? <OrganizerDashboard user={currentUser} quoteRequests={quoteRequests.filter(qr => qr.organizerId === currentUser.id)} onStatusChange={handleQuoteStatusChange} onViewChat={handleOpenChat} /> : null;
      case 'vendor-dashboard':
         const vendorProfile = VENDORS.find(v => v.id === currentUser?.vendorProfileId);
         return currentUser?.role === 'vendor' && vendorProfile ? <VendorDashboard user={currentUser} vendor={vendorProfile} quoteRequests={quoteRequests.filter(qr => qr.vendorId === vendorProfile.id)} onRespondClick={handleOpenResponseModal} onViewChat={handleOpenChat} /> : null;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => handleGoToSignup('organizer')} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onNavigateToLogin={() => setCurrentView('login')} initialRole={signupRole} />;
      case 'home':
      default:
        return (
          <HomePage
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
            onJoinAsVendor={() => handleGoToSignup('vendor')}
            onSelectVendor={handleSelectVendor}
          />
        );
    }
  };

  const vendorForResponseModal = selectedQuoteRequest ? VENDORS.find(v => v.id === selectedQuoteRequest.vendorId) : null;
  const organizerForChat = activeQuoteRequestForChat ? users.find(u => u.id === activeQuoteRequestForChat.organizerId) : null;
  const vendorForChat = activeQuoteRequestForChat ? VENDORS.find(v => v.id === activeQuoteRequestForChat.vendorId) : null;


  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Header 
        onLogoClick={navigateHome}
        currentUser={currentUser}
        onLoginClick={() => setCurrentView('login')}
        onSignupClick={() => handleGoToSignup('organizer')}
        onJoinVendorClick={() => handleGoToSignup('vendor')}
        onFindVendorClick={() => setCurrentView('list')}
        onLogout={handleLogout}
        onDashboardClick={navigateToDashboard}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer />
      {isResponseModalOpen && selectedQuoteRequest && vendorForResponseModal && (
        <QuoteResponseModal
            request={selectedQuoteRequest}
            vendor={vendorForResponseModal}
            onClose={() => setIsResponseModalOpen(false)}
            onSubmit={handleResponseSubmit}
        />
      )}
       {activeQuoteRequestForChat && currentUser && organizerForChat && vendorForChat && (
        <ChatModal
          request={activeQuoteRequestForChat}
          currentUser={currentUser}
          organizer={organizerForChat}
          vendor={vendorForChat}
          onClose={handleCloseChat}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default App;